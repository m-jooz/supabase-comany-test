// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.
// @ts-nocheck
// Setup type definitions for built-in Supabase Runtime APIs

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { supabase } from "../../_shared/_shared.ts";
import { json } from "../../_shared/_shared.ts";
serve(async (req) => {
  try {
    // جلب الطلبات
    const { data: deliveries, error: deliveriesError } = await supabase
      .from("deliveries")
      .select(
        "id, external_reference_id, delivery_date, package_details,status,notes,delivery_code,barcode,shipment_label_url,shipment_label_status, supplier_id",
      )
      .order("id", { ascending: false });

    if (deliveriesError) {
      return json({ success: false, error: deliveriesError.message }, 500);
    }

    return json({ success: true, deliveries }, 200);
  } catch (error) {
    console.error(error);
    return json({ success: false, error: "Internal server error" }, 500);
  }
});
