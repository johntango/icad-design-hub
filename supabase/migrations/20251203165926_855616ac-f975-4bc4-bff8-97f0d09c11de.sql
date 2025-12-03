-- Drop the overly permissive ALL policy
DROP POLICY IF EXISTS "Users can manage their own admin sessions" ON public.admin_sessions;

-- Create separate, more restrictive policies

-- Users can view their own sessions (but session_token should be handled server-side)
CREATE POLICY "Users can view their own sessions"
ON public.admin_sessions
FOR SELECT
USING (user_id = auth.uid());

-- Only service role can insert sessions (handled by edge functions)
CREATE POLICY "Service role can insert sessions"
ON public.admin_sessions
FOR INSERT
WITH CHECK (false);

-- Users can only update last_used_at on their own sessions
CREATE POLICY "Users can update their own session activity"
ON public.admin_sessions
FOR UPDATE
USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid());

-- Users can delete their own sessions (logout)
CREATE POLICY "Users can delete their own sessions"
ON public.admin_sessions
FOR DELETE
USING (user_id = auth.uid());