import { supabase } from "../../lib/supabase";

// export async function acceptOrder(orderId, riderId) {
//     const { error } = await supabase
//         .from("RiderOrders")
//         .insert([{ OrderId: orderId, RiderId: riderId, Status: "Accepted" }]);

//     if (error) {
//         console.error("Error accepting order:", error);
//         return false;
//     }

//     return true;
// }

export async function acceptOrderCurrent(orderId, riderId) {
  console.log(
    "Accepting order with ID:",
    orderId,
    "for rider with ID:",
    riderId
  );
  const { data, error } = await supabase
    .from("orders")
    .update([
      {
        orderid: orderId, // Ensure you specify the primary key (orderid)
        status: "Accepted by Rider",
        riderid: riderId,
        // Don't include totalamount so it won't be updated
      },
    ])
    .select("*") // Select all columns to get the updated data
    .eq("orderid", orderId); // Ensure you specify the primary key (orderid);

    console.log("Data:", data);
  if (error) {
    console.error("Error updating order status:", error);
    return false;
  } else {
    console.log("Order status updated successfully:", data);
  }

  const { data: summary, error: err } = await supabase
    .from("riderpaymentsummary")
    .insert([
      {
        orderid: orderId, // Ensure you specify the primary key (orderid)
        riderid: riderId,
        earningamount: parseFloat((data[0].totalamount * 0.1).toFixed(2)), // Calculate 10% of totalamount
        // Don't include totalamount so it won't be updated
      },
    ])
    .select("") // Select all columns to get the updated data

  if (err) {
    console.error("Error updating order status:", err);
    return false;
  } else {
    console.log("Order status updated successfully:", summary);
  }

  return summary;
}

export async function acceptConfirmArrival(orderId) {
  console.log("Confirming Arrival with ID:", orderId);
  const { data, error } = await supabase
    .from("orders")
    .update([
      {
        orderid: orderId, // Ensure you specify the primary key (orderid)
        status: "Picked Up",
      },
    ])
    .select("*") // Select all columns to get the updated data
    .eq("orderid", orderId); // Ensure you specify the primary key (orderid);

  if (error) {
    console.error("Error updating order status:", error);
    return false;
  } else {
    console.log("Order status updated successfully:", data);
  }

  return true;
}

export async function acceptOrderCompleted(orderId, riderpaymentid) {
  console.log("Confirming Arrival with ID:", orderId, "riderpaymentid:", riderpaymentid);
  const { data, error } = await supabase
    .from("orders")
    .update([
      {
        orderid: orderId, // Ensure you specify the primary key (orderid)
        status: "Delivered",
      },
    ])
    .select("*") // Select all columns to get the updated data
    .eq("orderid", orderId); // Ensure you specify the primary key (orderid);

  if (error) {
    console.error("Error updating order status:", error);
    return false;
  } else {
    console.log("Order status updated successfully:", data);
  }

  const { data: riderStatus, error: err } = await supabase
    .from("riderpaymentsummary")
    .update([
      {
        isActive: "False",
      },
    ])
    .select("*") // Select all columns to get the updated data
    .eq("riderpaymentid", riderpaymentid); // Ensure you specify the primary key (orderid);

  if (err) {
    console.error("Error updating order status:", error);
    return false;
  } else {
    console.log("Rider status updated successfully:", riderStatus);
  }

  return true;
}
