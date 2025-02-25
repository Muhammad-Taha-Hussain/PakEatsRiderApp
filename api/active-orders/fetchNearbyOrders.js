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
        const radiusInKm = 10;
        const earthRadiusKm = 6371;

        // Convert degrees to radians
        const latInDegrees = riderLat * (180 / Math.PI);
        const lngInDegrees = riderLng * (180 / Math.PI);
        console.log('Rider\'s current location', { latInDegrees, lngInDegrees });

        const roundedLat = parseFloat(riderLat.toFixed(6));
        const roundedLng = parseFloat(riderLng.toFixed(6));
        
        const { data: orders, error } = await supabase.rpc("fetch_nearby_orders", {
            rider_lat: 31.4330211, 
            rider_lng: 74.3035832,
            radius_km: 5
        });
        

        
        // const { data: orders, error } = await supabase
        //     .from("orders")
        //     .select("*")

        console.log('Orders', orders);
        

        if (error) {
            console.error("Error fetching the orders:", error);
            return [];
        }

        return orders;
    } catch (err) {
        console.error("Error processing orders:", err);
        return [];
    }
}
