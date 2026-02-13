import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { supabase } from "../../_shared/_shared.ts";
import { json } from "../../_shared/_shared.ts";

serve(async (req) => {
  try {
    // جلب المستخدمين
    const { data: users, error: usersError } = await supabase
      .from("users")
      .select("id, email, first_name, last_name, phone, status, created_at")
      .order("created_at", { ascending: false });

    if (usersError) {
      return json({ success: false, error: usersError.message }, 500);
    }

    // جلب الموردين
    const { data: suppliers, error: suppliersError } = await supabase
      .from("suppliers")
      .select("id, name, contact_person, email, phone, website")
      .order("name", { ascending: true });

    if (suppliersError) {
      return json({ success: false, error: suppliersError.message }, 500);
    }

    return json({ success: true, users, suppliers });
  } catch (error) {
    console.error(error);
    return json({ success: false, message: "Internal Server Error" }, 500);
  }
});
