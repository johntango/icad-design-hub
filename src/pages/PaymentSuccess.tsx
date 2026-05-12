import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckCircle, AlertCircle, Printer } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface Receipt {
  tier: string;
  email: string;
  name: string | null;
  amount_cents: number;
  currency: string;
  session_id: string;
  payment_intent: string | null;
  paid_at: string;
}

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [paymentVerified, setPaymentVerified] = useState(false);
  const [receipt, setReceipt] = useState<Receipt | null>(null);
  const [name, setName] = useState("");
  const [affiliation, setAffiliation] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    const verifyPayment = async () => {
      if (searchParams.get("demo") === "1") {
        const demo: Receipt = {
          tier: "Regular",
          email: "attendee@example.com",
          name: "Jane Doe",
          amount_cents: 60000,
          currency: "usd",
          session_id: "cs_test_demo_123",
          payment_intent: "pi_test_demo_123",
          paid_at: new Date().toISOString(),
        };
        setPaymentVerified(true);
        setReceipt(demo);
        setName(demo.name || "");
        setLoading(false);
        return;
      }
      const sessionId = searchParams.get("session_id");
      if (!sessionId) {
        setLoading(false);
        toast({
          title: "Session not found",
          description: "Payment session ID is missing.",
          variant: "destructive",
        });
        return;
      }

      try {
        const { data, error } = await supabase.functions.invoke("verify-payment", {
          body: { sessionId },
        });
        if (error) throw error;
        if (data?.success) {
          setPaymentVerified(true);
          setReceipt(data as Receipt);
          setName(data.name || "");
          toast({ title: "Payment verified", description: "Your receipt is ready." });
        }
      } catch (err) {
        console.error("verify-payment error", err);
        toast({
          title: "Verification failed",
          description: "Could not verify your payment. Please contact support.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };
    verifyPayment();
  }, [searchParams, toast]);

  const formatAmount = (cents: number, currency: string) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency.toUpperCase(),
    }).format(cents / 100);

  if (loading) {
    return (
      <Layout currentPage="payment">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-2xl mx-auto text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <h1 className="text-2xl font-bold mb-4">Verifying Payment...</h1>
            <p className="text-muted-foreground">Please wait while we confirm your registration.</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (!paymentVerified || !receipt) {
    return (
      <Layout currentPage="payment">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-2xl mx-auto text-center">
            <div className="mx-auto p-4 rounded-full bg-destructive/10 text-destructive w-fit mb-6">
              <AlertCircle className="h-12 w-12" />
            </div>
            <h1 className="text-4xl font-bold mb-4">Payment Verification Failed</h1>
            <p className="text-xl text-muted-foreground mb-8">
              We couldn't verify your payment. If you completed a payment, please contact support.
            </p>
            <div className="space-x-4">
              <Button onClick={() => (window.location.href = "/payment")}>Try Again</Button>
              <Button variant="outline" onClick={() => (window.location.href = "/")}>
                Return to Home
              </Button>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout currentPage="payment">
      <style>{`
        @media print {
          header, footer, nav, .no-print { display: none !important; }
          body { background: white !important; }
        }
      `}</style>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8 no-print">
            <div className="mx-auto p-3 rounded-full bg-primary/10 text-primary w-fit mb-4">
              <CheckCircle className="h-10 w-10" />
            </div>
            <h1 className="text-3xl font-bold">Payment Receipt</h1>
            <p className="text-muted-foreground">Thank you for your registration.</p>
          </div>

          <Card className="shadow-card" id="receipt">
            <CardHeader>
              <CardTitle className="text-center text-2xl">
                Official Payment Receipt
              </CardTitle>
              <p className="text-center text-sm text-muted-foreground mt-2">
                International Conference on Axiomatic Design @ MIT
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-sm leading-relaxed">
                Payment received by the <strong>International Conference on Axiomatic Design @ MIT</strong>{" "}
                for attendance at <strong>Massachusetts Institute of Technology, Samberg Center,
                Cambridge MA 02139</strong>.
              </p>

              <div className="border-t border-b py-4 space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subscription Category</span>
                  <span className="font-semibold">{receipt.tier}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Amount Received</span>
                  <span className="font-semibold">
                    {formatAmount(receipt.amount_cents, receipt.currency)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Email</span>
                  <span className="font-semibold">{receipt.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Date</span>
                  <span className="font-semibold">
                    {new Date(receipt.paid_at).toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Reference</span>
                  <span className="font-mono text-xs break-all text-right max-w-[60%]">
                    {receipt.payment_intent || receipt.session_id}
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <Label htmlFor="receipt-name">Name</Label>
                  <Input
                    id="receipt-name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter the name for this receipt"
                  />
                </div>
                <div>
                  <Label htmlFor="receipt-affiliation">Affiliation (optional)</Label>
                  <Input
                    id="receipt-affiliation"
                    value={affiliation}
                    onChange={(e) => setAffiliation(e.target.value)}
                    placeholder="Institution / Organization"
                  />
                </div>
              </div>

              <p className="text-xs text-muted-foreground text-center">
                Please retain this receipt for your records.
              </p>
            </CardContent>
          </Card>

          <div className="mt-6 flex flex-wrap gap-3 justify-center no-print">
            <Button onClick={() => window.print()}>
              <Printer className="mr-2 h-4 w-4" /> Print / Save as PDF
            </Button>
            <Button variant="outline" onClick={() => (window.location.href = "/")}>
              Return to Home
            </Button>
            <Button variant="outline" onClick={() => (window.location.href = "/program")}>
              View Program
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PaymentSuccess;
