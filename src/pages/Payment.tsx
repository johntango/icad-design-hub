import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Check, Users, Star } from "lucide-react";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const STRIPE_PUBLISHABLE_KEY = "pk_live_51HaLhVGgpfLkdZwmLuC9F1kTLNVK9D2c18Jb6P6mkLJD24qE1K7SK9HsLiJBvWOkVPioNlmBHqTYLlHQOvMQxQ6D008p3eXeiM";

const ADMIN_TEST_EMAIL = "jrw@mit.edu";

const Payment = () => {
  const [registrationType, setRegistrationType] = useState<"interest" | "paid">("interest");
  const [loading, setLoading] = useState(false);
  const [dinnerEmail, setDinnerEmail] = useState("");
  const [dinnerUnlocked, setDinnerUnlocked] = useState(false);
  const [checkingDinner, setCheckingDinner] = useState(false);
  const [showTestProduct, setShowTestProduct] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const existingScript = document.querySelector('script[src="https://js.stripe.com/v3/buy-button.js"]');
    if (!existingScript) {
      const script = document.createElement("script");
      script.src = "https://js.stripe.com/v3/buy-button.js";
      script.async = true;
      document.head.appendChild(script);
    }
  }, []);

  const pricingPlans = [
    {
      name: "Regular",
      price: "$600",
      deadline: "May 17, 2026",
      badge: "Standard",
      buyButtonId: "buy_btn_1THTV3GgpfLkdZwmHTau6h6c",
      features: [
        "Full conference access",
        "Welcome reception",
        "Coffee breaks",
        "Conference materials",
        "Certificate of attendance",
      ],
    },
    {
      name: "Student",
      price: "$200",
      deadline: "May 15, 2026",
      badge: "Student ID Required",
      buyButtonId: "buy_btn_1THTSxGgpfLkdZwmtJz8hChE",
      features: [
        "Full conference access",
        "Coffee breaks",
        "Conference materials",
        "Student networking session",
        "Certificate of attendance",
      ],
    },
  ];

  const handleInterestRegistration = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.target as HTMLFormElement);
    const email = formData.get("email") as string;
    const name = formData.get("name") as string;
    const affiliation = formData.get("affiliation") as string;

    try {
      const { error } = await supabase.from("interest").insert([
        {
          email,
          name: name || "Not provided",
          affiliation: affiliation || null,
          notes: null,
        },
      ]);

      if (error) {
        throw error;
      }

      toast({
        title: "Registration successful!",
        description: "Thank you for your interest! We'll send you updates about the conference.",
      });

      (e.target as HTMLFormElement).reset();
    } catch (error) {
      console.error("Error registering interest:", error);
      toast({
        title: "Registration failed",
        description: "Please try again or contact support.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDinnerVerification = async () => {
    const normalizedEmail = dinnerEmail.trim().toLowerCase();

    if (!normalizedEmail) {
      return;
    }

    setCheckingDinner(true);

    try {
      const { data, error } = await supabase.functions.invoke("check-dinner-eligibility", {
        body: { email: normalizedEmail },
      });

      if (error) {
        throw error;
      }

      if (data?.eligible) {
        setDinnerUnlocked(true);
        setShowTestProduct(normalizedEmail === ADMIN_TEST_EMAIL.toLowerCase());
        toast({
          title: "Registration verified!",
          description: "You can now purchase the conference dinner.",
        });
      } else {
        toast({
          title: "No registration found",
          description: "Please complete your conference registration first.",
          variant: "destructive",
        });
      }
    } catch (err) {
      console.error("Error checking registration:", err);
      toast({
        title: "Error",
        description: "Could not verify registration. Please try again.",
        variant: "destructive",
      });
    } finally {
      setCheckingDinner(false);
    }
  };

  return (
    <Layout currentPage="payment">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 gradient-hero bg-clip-text text-transparent">
            Registration
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Secure your spot at the premier AI & UX Design conference. Choose from our flexible registration options.
          </p>
        </div>

        <div className="flex justify-center mb-12">
          <div className="flex bg-muted rounded-lg p-1">
            <Button
              variant={registrationType === "interest" ? "default" : "ghost"}
              onClick={() => setRegistrationType("interest")}
              className="rounded-md"
            >
              Interest Registration (Free)
            </Button>
            <Button
              variant={registrationType === "paid" ? "default" : "ghost"}
              onClick={() => setRegistrationType("paid")}
              className="rounded-md"
            >
              Full Registration
            </Button>
          </div>
        </div>

        {registrationType === "interest" ? (
          <div className="max-w-md mx-auto">
            <Card className="shadow-card">
              <CardHeader className="text-center">
                <div className="mx-auto p-3 rounded-full gradient-accent text-white w-fit mb-4">
                  <Users className="h-6 w-6" />
                </div>
                <CardTitle>Stay Updated</CardTitle>
                <p className="text-muted-foreground">
                  Register your interest to receive conference updates and early bird notifications.
                </p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleInterestRegistration} className="space-y-4">
                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <Input id="email" name="email" type="email" required placeholder="your@email.com" />
                  </div>
                  <div>
                    <Label htmlFor="name">Full Name (Optional)</Label>
                    <Input id="name" name="name" type="text" placeholder="Your full name" />
                  </div>
                  <div>
                    <Label htmlFor="affiliation">Affiliation (Optional)</Label>
                    <Input id="affiliation" name="affiliation" type="text" placeholder="Your organization" />
                  </div>
                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? "Registering..." : "Register Interest"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        ) : (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-12">
              <Card className="shadow-card hover:shadow-glow transition-smooth">
                <CardHeader className="text-center p-4">
                  <Badge className="w-fit mx-auto mb-3 bg-muted">Student ID Required</Badge>
                  <CardTitle className="text-xl">Student Product</CardTitle>
                  <div className="flex items-center justify-center space-x-2">
                    <span className="text-2xl font-bold text-primary">$280</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Deadline: May 17, 2026</p>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <div className="flex justify-center">
                    <div
                      dangerouslySetInnerHTML={{
                        __html: `<stripe-buy-button
                          buy-button-id="buy_btn_1TRYrXGgpfLkdZwmjAUbrCMf"
                          publishable-key="${STRIPE_PUBLISHABLE_KEY}"
                        ></stripe-buy-button>`,
                      }}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-card hover:shadow-glow transition-smooth">
                <CardHeader className="text-center p-4">
                  <Badge className="w-fit mx-auto mb-3 bg-muted">Standard</Badge>
                  <CardTitle className="text-xl">Regular Attendee</CardTitle>
                  <div className="flex items-center justify-center space-x-2">
                    <span className="text-2xl font-bold text-primary">$680</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Deadline: May 17, 2026</p>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <div className="flex justify-center">
                    <div
                      dangerouslySetInnerHTML={{
                        __html: `<stripe-buy-button
                          buy-button-id="buy_btn_1TRYv5GgpfLkdZwmwXxgU3X7"
                          publishable-key="${STRIPE_PUBLISHABLE_KEY}"
                        ></stripe-buy-button>`,
                      }}
                    />
                  </div>
                </CardContent>
              </Card>

              {pricingPlans.map((plan, index) => (
                <Card
                  key={index}
                  className={`shadow-card hover:shadow-glow transition-smooth ${index === 0 ? "border-primary shadow-hero" : ""}`}
                >
                  <CardHeader className="text-center p-4">
                    <Badge className={`w-fit mx-auto mb-3 ${index === 0 ? "bg-primary" : "bg-muted"}`}>
                      {plan.badge}
                    </Badge>
                    <CardTitle className="text-xl">{plan.name}</CardTitle>
                    <div className="flex items-center justify-center space-x-2">
                      <span className="text-2xl font-bold text-primary">{plan.price}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">Deadline: {plan.deadline}</p>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <div className="flex justify-center">
                      <div
                        dangerouslySetInnerHTML={{
                          __html: `<stripe-buy-button
                            buy-button-id="${plan.buyButtonId}"
                            publishable-key="${STRIPE_PUBLISHABLE_KEY}"
                          ></stripe-buy-button>`,
                        }}
                      />
                    </div>
                  </CardContent>
                </Card>
              ))}

              <Card className="shadow-card hover:shadow-glow transition-smooth">
                <CardHeader className="text-center p-4">
                  <Badge className="w-fit mx-auto mb-3 bg-accent">Optional Add-on</Badge>
                  <CardTitle className="text-xl">Nam Suh Conference Dinner</CardTitle>
                  <div className="flex items-center justify-center space-x-2">
                    <span className="text-2xl font-bold text-primary">$80</span>
                  </div>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <ul className="space-y-2 mb-4">
                    <li className="flex items-center space-x-2">
                      <Check className="h-3 w-3 text-primary flex-shrink-0" />
                      <span className="text-xs">Exclusive conference dinner event</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <Check className="h-3 w-3 text-primary flex-shrink-0" />
                      <span className="text-xs">Networking with speakers & attendees</span>
                    </li>
                  </ul>
                  {dinnerUnlocked ? (
                    <div className="flex justify-center">
                      <div
                        dangerouslySetInnerHTML={{
                          __html: `<stripe-buy-button
                            buy-button-id="buy_btn_1TI6qgGgpfLkdZwmw9ZsooYY"
                            publishable-key="${STRIPE_PUBLISHABLE_KEY}"
                          ></stripe-buy-button>`,
                        }}
                      />
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <p className="text-xs text-muted-foreground text-center">
                        Enter the email you used for registration to unlock this add-on.
                      </p>
                      <div className="flex gap-2">
                        <Input
                          type="email"
                          placeholder="your@email.com"
                          value={dinnerEmail}
                          onChange={(e) => setDinnerEmail(e.target.value)}
                          className="text-sm"
                        />
                        <Button
                          size="sm"
                          disabled={checkingDinner || !dinnerEmail.trim()}
                          onClick={handleDinnerVerification}
                        >
                          {checkingDinner ? "..." : "Verify"}
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {showTestProduct && (
                <Card className="shadow-card hover:shadow-glow transition-smooth">
                  <CardHeader className="text-center p-4">
                    <Badge className="w-fit mx-auto mb-3 bg-muted">Test</Badge>
                    <CardTitle className="text-xl">Test Product</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <div className="flex justify-center">
                      <div
                        dangerouslySetInnerHTML={{
                          __html: `<stripe-buy-button
                            buy-button-id="buy_btn_1THl5mGgpfLkdZwmgrhhBhH3"
                            publishable-key="${STRIPE_PUBLISHABLE_KEY}"
                          ></stripe-buy-button>`,
                        }}
                      />
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            <Card className="shadow-card max-w-4xl mx-auto">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Star className="mr-2 h-5 w-5 text-primary" />
                  Registration Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold mb-3">What's Included</h3>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>• Access to all sessions and workshops</li>
                      <li>• Conference materials and swag bag</li>
                      <li>• Networking opportunities</li>
                      <li>• Digital access to presentations</li>
                      <li>• Certificate of attendance</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-3">Cancellation Policy</h3>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>• Full refund until April 1, 2026</li>
                      <li>• 50% refund until May 1, 2026</li>
                      <li>• No refunds after May 1, 2026</li>
                      <li>• Transfers allowed until June 1, 2026</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Payment;
