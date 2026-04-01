
CREATE TABLE public.payments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL,
  name TEXT,
  product_type TEXT NOT NULL,
  amount_cents INTEGER NOT NULL,
  currency TEXT NOT NULL DEFAULT 'usd',
  stripe_session_id TEXT,
  stripe_payment_intent_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;

-- Public insert for webhook (service role)
CREATE POLICY "Allow public insert to payments"
ON public.payments
FOR INSERT
TO public
WITH CHECK (true);

-- Users can view their own payments
CREATE POLICY "Users can read their own payments"
ON public.payments
FOR SELECT
TO public
USING ((auth.email() = email) AND (auth.role() = 'authenticated'::text));

-- Admins can access all payments
CREATE POLICY "Admin can access all payments"
ON public.payments
FOR ALL
TO authenticated
USING (is_admin());

-- Index for lookups by email
CREATE INDEX idx_payments_email ON public.payments (email);
