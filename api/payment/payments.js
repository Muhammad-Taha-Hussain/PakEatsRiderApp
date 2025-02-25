import { supabase } from "../../lib/supabase";

// Fetch payment summary (total earnings, pending payments)
export const fetchPaymentSummary = async () => {
  const { data, error } = await supabase
    .from("RiderEarnings")
    .select("total_earnings, pending_payouts")
    .single();

  if (error) {
    console.error("Error fetching payment summary:", error);
    return { total_earnings: 0, pending_payouts: 0 };
  }

  return data;
};

// Fetch saved payout methods (bank accounts, wallets)
export const fetchPaymentMethods = async () => {
  const { data, error } = await supabase
    .from("RiderPayoutMethods")
    .select("*");

  if (error) {
    console.error("Error fetching payment methods:", error);
    return [];
  }

  return data;
};

// Fetch payment history (past transactions)
export const fetchPaymentHistory = async () => {
  const { data, error } = await supabase
    .from("PaymentHistory")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching payment history:", error);
    return [];
  }

  return data;
};

// Add a new payout method
export const addPayoutMethod = async (method) => {
  const { data, error } = await supabase
    .from("RiderPayoutMethods")
    .insert([method]);

  if (error) {
    console.error("Error adding payout method:", error);
    return null;
  }

  return data;
};

// Request withdrawal
export const requestWithdrawal = async (amount, methodId) => {
  const { data, error } = await supabase
    .from("WithdrawalRequests")
    .insert([{ amount, method_id: methodId }]);

  if (error) {
    console.error("Error requesting withdrawal:", error);
    return null;
  }

  return data;
};
