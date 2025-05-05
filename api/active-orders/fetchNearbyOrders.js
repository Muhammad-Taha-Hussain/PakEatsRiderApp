import { supabase } from "../../lib/supabase";

/**
 * Fetch orders that are within 5km of the rider's location and not yet picked.
 * @param {number} riderLat - Rider's current latitude
 * @param {number} riderLng - Rider's current longitude
 * @returns {Promise<Array>} - List of filtered orders
 */
export async function fetchNearbyOrders(riderLat, riderLng) {
  try {
    // Set the radius in kilometers
    // const radiusInKm = 10;
    // const earthRadiusKm = 6371;

    // Convert degrees to radians
    // const latInDegrees = riderLat * (180 / Math.PI);
    // const lngInDegrees = riderLng * (180 / Math.PI);
    // console.log("Rider's current location", { latInDegrees, lngInDegrees });

    const roundedLat = parseFloat(riderLat.toFixed(6));
    const roundedLng = parseFloat(riderLng.toFixed(6));

    const { data: orders, error } = await supabase.rpc("fetch_nearby_orders", {
      rider_lat: riderLat,
      rider_lng: riderLng,
      radius_km: 5,
    });

    if (error) {
      console.error("Error fetching nearby orders:", error);
      return null;
    }

    // Fetch additional details for customers, restaurants, and ordered items
    const ordersWithDetails = await Promise.all(
      orders.map(async (order) => {
        // Fetch customer details
        const { data: customerData } = await supabase
          .from("customers")
          .select("name, email")
          .eq("customerid", order.customerid)
          .single();

        // Fetch restaurant details
        const { data: restaurantData } = await supabase
          .from("restaurants")
          .select("restaurantname, restaurantlocation, rating, restaurantImage")
          .eq("restaurantid", order.restaurantid)
          .single();

        // Fetch ordered items (Only items that the customer ordered)
        //   const { data: orderItemsData } = await supabase
        //     .from('orders') // This table should store which items were ordered in a specific order
        //     .select('orderid, cartid, restaurantitems(itemname, baseprice, discount, availablestatus)')
        //     .eq('orderid', order.orderid);

        return {
          ...order,
          customer: customerData || null,
          restaurant: restaurantData || null,
          // orderedItems: orderItemsData || [],
        };
      })
    );

    console.log("Nearby Orders with Details:", ordersWithDetails);

    // console.log('Orders', orders);

    return ordersWithDetails;
    // return orders;
  } catch (err) {
    console.error("Error processing orders:", err);
    return [];
  }
}
