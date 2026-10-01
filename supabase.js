// Modem Technologies - Supabase client
const MODEM_SUPABASE_URL = "https://qrwekafcblukxnoficeo.supabase.co";
const MODEM_SUPABASE_KEY = "sb_publishable_WwmKxupdfvpF9DV9baOCLQ_jeII1j66";

const { createClient } = supabase;
const modem = createClient(MODEM_SUPABASE_URL, MODEM_SUPABASE_KEY);

async function requireUser() {
  const { data, error } = await modem.auth.getUser();
  if (error || !data.user) {
    window.location.href = "auth.html";
    return null;
  }
  return data.user;
}

async function getProfile(userId) {
  const { data } = await modem.from("profiles").select("*").eq("id", userId).maybeSingle();
  return data;
}

function esc(value) {
  return String(value ?? "").replace(/[&<>"']/g, c => ({
    "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"
  }[c]));
}
