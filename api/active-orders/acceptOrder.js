import { supabase } from "../../lib/supabase";

export async function acceptOrder(orderId, riderId) {
    const { error } = await supabase
        .from("RiderOrders")
        .insert([{ OrderId: orderId, RiderId: riderId, Status: "Accepted" }]);

    if (error) {
        console.error("Error accepting order:", error);
        return false;
    }

    return true;
}
