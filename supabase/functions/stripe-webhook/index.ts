import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const logStep = (step: string, details?: any) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : '';
  console.log(`[STRIPE-WEBHOOK] ${step}${detailsStr}`);
};

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
    apiVersion: "2023-10-16",
  });

  const supabaseClient = createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
    { auth: { persistSession: false } }
  );

  try {
    const body = await req.text();
    const signature = req.headers.get("stripe-signature");

    if (!signature) {
      logStep("No stripe-signature header found");
      return new Response(JSON.stringify({ error: "No signature" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const webhookSecret = Deno.env.get("STRIPE_WEBHOOK_SECRET");
    if (!webhookSecret) {
      logStep("STRIPE_WEBHOOK_SECRET not configured");
      return new Response(JSON.stringify({ error: "Webhook secret not configured" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Verify the event signature
    let event: Stripe.Event;
    try {
      event = await stripe.webhooks.constructEventAsync(body, signature, webhookSecret);
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      logStep("Signature verification failed", { error: msg });
      return new Response(JSON.stringify({ error: `Signature verification failed: ${msg}` }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    logStep("Event received", { type: event.type, id: event.id });

    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;
      const customerEmail = session.customer_email || session.customer_details?.email;
      const customerName = session.customer_details?.name || "Conference Attendee";
      const amountTotal = session.amount_total || 0;

      logStep("Checkout session completed", {
        email: customerEmail,
        name: customerName,
        amount: amountTotal,
        sessionId: session.id,
        paymentIntent: session.payment_intent,
      });

      if (!customerEmail) {
        logStep("No customer email found in session");
        return new Response(JSON.stringify({ error: "No customer email" }), {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      // Determine registration tier based on amount
      let subscriptionTier = "Regular";
      if (amountTotal <= 20000) {
        subscriptionTier = "Student";
      }

      // Upsert into attendee table
      const { error: attendeeError } = await supabaseClient
        .from("attendee")
        .upsert(
          {
            email: customerEmail,
            name: customerName,
            affiliation: null,
            stripesessionid: session.id,
            stripepaymentintentid: typeof session.payment_intent === "string"
              ? session.payment_intent
              : null,
            status: "PAID",
            id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          },
          { onConflict: "email", ignoreDuplicates: false }
        );

      if (attendeeError) {
        logStep("Error upserting attendee", { error: attendeeError.message });
        throw attendeeError;
      }

      logStep("Attendee record created/updated", { email: customerEmail, tier: subscriptionTier });

      // Also update subscribers table
      const { error: subscriberError } = await supabaseClient
        .from("subscribers")
        .upsert(
          {
            email: customerEmail,
            stripe_customer_id: typeof session.customer === "string" ? session.customer : null,
            subscribed: true,
            subscription_tier: subscriptionTier,
            subscription_end: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
            updated_at: new Date().toISOString(),
          },
          { onConflict: "email" }
        );

      if (subscriberError) {
        logStep("Error upserting subscriber", { error: subscriberError.message });
      } else {
        logStep("Subscriber record created/updated");
      }
    }

    return new Response(JSON.stringify({ received: true }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logStep("ERROR", { message: errorMessage });
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
