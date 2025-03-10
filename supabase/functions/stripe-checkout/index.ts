// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

// Setup type definitions for built-in Supabase Runtime APIs
// import "jsr:@supabase/functions-js/edge-runtime.d.ts";
// import { stripe } from "../_utils/stripe.ts";

// console.log("Hello from Functions!");

// Deno.serve(async (req) => {
//   try {
//     const { amount } = await req.json();

//     const paymentIntent = await stripe.paymentIntents.create({
//       amount: amount,
//       currency: "usd",
//       customer: customer,
//     });

//     const res = {
//       paymentIntent: paymentIntent.client_secret,
//       publishableKey: DelayNode.env.get("STRIPE_PUBLISHABLE_KEY"),
//     };
//     const data = {
//       message: `Hello ${name}!`,
//     };

//     return new Response(JSON.stringify(res), {
//       headers: { "Content-Type": "application/json" },
//     });
//   } catch (error) {
//     return new Response(JSON.stringify(error), {
//       headers: { "Content-Type": "application/json" },
//       status: 400
//     });
//   }
// });

import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { stripe } from "../_utils/stripe.ts";

// import Stripe from 'https://esm.sh/stripe@17.7.0?target=deno';


console.log("Hello from Functions!");

Deno.serve(async (req) => {
  try {
    const { amount } = await req.json();

    // Initialize Stripe inside the function
    // const stripeSecretKey = Deno.env.get('STRIPE_SECRET_KEY') ?? '';
    // if (!stripeSecretKey) {
    //   throw new Error('STRIPE_SECRET_KEY is not set');
    // }
    
    // const stripe = Stripe(stripeSecretKey, {
    //   httpClient: Stripe.createFetchHttpClient(),
    // });
    

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: "usd",
      // Ensure 'customer' is defined or remove it if not needed
    });

    const res = {
      paymentIntent: paymentIntent.client_secret,
      publishableKey:"pk_test_51PsQRY1om7WfioWhk7gin7GHAYvG3hv2CNVvKJIinGnX2XeeRp9DOedjXqvOAihgBrW3LFGL96omh2LxirqUDSWN0023m4W56j",
    };

    return new Response(JSON.stringify(res), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { "Content-Type": "application/json" },
      status: 400,
    });
  }
});


/* To invoke locally:

  1. Run `supabase start` (see: https://supabase.com/docs/reference/cli/supabase-start)
  2. Make an HTTP request:

  curl -i --location --request POST 'http://127.0.0.1:54321/functions/v1/stripe-checkout' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
    --header 'Content-Type: application/json' \
    --data '{"name":"Functions"}'

   curl -i --request POST "http://127.0.0.1:54321/functions/v1/stripe-checkout" --header "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0" --header "Content-Type: application/json" --data "{\"amount\": 1099}"




*/