import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";
import { z } from "https://esm.sh/zod@3.23.8";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const RequestSchema = z.object({
  email: z.string().trim().email().max(320),
});

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  const supabaseClient = createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
    { auth: { persistSession: false } }
  );

  try {
    const parsed = RequestSchema.safeParse(await req.json());

    if (!parsed.success) {
      return new Response(
        JSON.stringify({ eligible: false, error: "Valid email required" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const normalizedEmail = parsed.data.email.toLowerCase();

    const { data, error } = await supabaseClient
      .from("payments")
      .select("id, product_type, amount_cents, created_at")
      .ilike("email", normalizedEmail)
      .order("created_at", { ascending: false });

    if (error) {
      throw error;
    }

    const matchedPayment = (data ?? []).find(
      (payment) =>
        ["Regular", "Student"].includes(payment.product_type) ||
        [60000, 20000].includes(payment.amount_cents)
    );

    return new Response(
      JSON.stringify({
        eligible: Boolean(matchedPayment),
        matchedPayment: matchedPayment
          ? {
              id: matchedPayment.id,
              productType: matchedPayment.product_type,
              amountCents: matchedPayment.amount_cents,
              createdAt: matchedPayment.created_at,
            }
          : null,
      }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unexpected error";

    return new Response(JSON.stringify({ eligible: false, error: message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
