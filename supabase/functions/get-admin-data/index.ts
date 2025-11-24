import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.56.1';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    // Initialize Supabase client with service role key for elevated privileges
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false
        }
      }
    );

    // Validate admin session token
    const { sessionToken } = await req.json();
    
    if (!sessionToken) {
      return new Response(
        JSON.stringify({ error: 'Session token required' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Verify the session token is valid
    const { data: validSession, error: sessionError } = await supabaseAdmin
      .rpc('validate_admin_session', { token: sessionToken });

    if (sessionError || !validSession) {
      return new Response(
        JSON.stringify({ error: 'Invalid or expired session' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Fetch attendees with elevated privileges (bypasses RLS)
    const { data: attendees, error: attendeeError } = await supabaseAdmin
      .from('attendee')
      .select('*')
      .order('createdat', { ascending: false });

    if (attendeeError) {
      console.error('Error fetching attendees:', attendeeError);
    }

    // Fetch interests with elevated privileges (bypasses RLS)
    const { data: interests, error: interestError } = await supabaseAdmin
      .from('interest')
      .select('*')
      .order('createdat', { ascending: false });

    if (interestError) {
      console.error('Error fetching interests:', interestError);
    }

    return new Response(
      JSON.stringify({
        success: true,
        attendees: attendees || [],
        interests: interests || []
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in get-admin-data:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
