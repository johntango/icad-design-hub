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

    console.log('Clearing all attendee records...');

    // Delete all attendee records with elevated privileges (bypasses RLS)
    const { error: deleteError, count } = await supabaseAdmin
      .from('attendee')
      .delete()
      .neq('id', ''); // This condition matches all rows

    if (deleteError) {
      console.error('Error deleting attendees:', deleteError);
      return new Response(
        JSON.stringify({ error: deleteError.message }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log(`Successfully deleted ${count || 0} attendee records`);

    return new Response(
      JSON.stringify({
        success: true,
        message: `Deleted ${count || 0} attendee records`,
        count: count || 0
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in clear-attendees:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
