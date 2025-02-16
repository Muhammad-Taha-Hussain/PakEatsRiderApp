import { supabase } from "../../lib/supabase";
import { useRegistration } from "../../providers/RegistrationContext";
import { decode } from "base64-arraybuffer";
import { randomUUID } from "expo-crypto";
import * as FileSystem from "expo-file-system";


export const uploadVehicleFrontImage = async (vehicleFrontImage: string) => {
  if (!vehicleFrontImage?.startsWith("file://")) {
    console.error("Invalid file path:", vehicleFrontImage);
    return null;
  }

  try {
    const base64 = await FileSystem.readAsStringAsync(vehicleFrontImage, {
      encoding: "base64",
    });
    const filePath = `${randomUUID()}.png`;
    const contentType = "image/png";

    const { data, error } = await supabase.storage
      .from("Vehicle-front-images")
      .upload(filePath, decode(base64), { contentType });

    if (error) {
      console.error("Image Upload Error:", error.message);
      return null;
    }

    console.log("Uploaded Image Path:", data.path);
    return data.path;
  } catch (err) {
    console.error("Unexpected Error in Upload:", err);
    return null;
  }
};
export const uploadVehicleBackImage = async (vehicleBackImage: string) => {
  if (!vehicleBackImage?.startsWith("file://")) {
    console.error("Invalid file path:", vehicleBackImage);
    return null;
  }

  try {
    const base64 = await FileSystem.readAsStringAsync(vehicleBackImage, {
      encoding: "base64",
    });
    const filePath = `${randomUUID()}.png`;
    const contentType = "image/png";

    const { data, error } = await supabase.storage
      .from("Vehicle-back-images")
      .upload(filePath, decode(base64), { contentType });

    if (error) {
      console.error("Image Upload Error:", error.message);
      return null;
    }

    console.log("Uploaded Image Path:", data.path);
    return data.path;
  } catch (err) {
    console.error("Unexpected Error in Upload:", err);
    return null;
  }
};
export const uploadCNICFrontImage = async (cnicFrontImage: string) => {
  if (!cnicFrontImage?.startsWith("file://")) {
    console.error("Invalid file path:", cnicFrontImage);
    return null;
  }

  try {
    const base64 = await FileSystem.readAsStringAsync(cnicFrontImage, {
      encoding: "base64",
    });
    const filePath = `${randomUUID()}.png`;
    const contentType = "image/png";

    const { data, error } = await supabase.storage
      .from("CNIC-front-images")
      .upload(filePath, decode(base64), { contentType });

    if (error) {
      console.error("Image Upload Error:", error.message);
      return null;
    }

    console.log("Uploaded Image Path:", data.path);
    return data.path;
  } catch (err) {
    console.error("Unexpected Error in Upload:", err);
    return null;
  }
};
export const uploadCNICBackImage = async (cnicBackImage: string) => {
  if (!cnicBackImage?.startsWith("file://")) {
    console.error("Invalid file path:", cnicBackImage);
    return null;
  }

  try {
    const base64 = await FileSystem.readAsStringAsync(cnicBackImage, {
      encoding: "base64",
    });
    const filePath = `${randomUUID()}.png`;
    const contentType = "image/png";

    const { data, error } = await supabase.storage
      .from("CNIC-back-images")
      .upload(filePath, decode(base64), { contentType });

    if (error) {
      console.error("Image Upload Error:", error.message);
      return null;
    }

    console.log("Uploaded Image Path:", data.path);
    return data.path;
  } catch (err) {
    console.error("Unexpected Error in Upload:", err);
    return null;
  }
};
export const uploadRidingLicenseImage = async (ridinglicenseimage: string) => {
  if (!ridinglicenseimage?.startsWith("file://")) {
    console.error("Invalid file path:", ridinglicenseimage);
    return null;
  }

  try {
    const base64 = await FileSystem.readAsStringAsync(ridinglicenseimage, {
      encoding: "base64",
    });
    const filePath = `${randomUUID()}.png`;
    const contentType = "image/png";

    const { data, error } = await supabase.storage
      .from("Riding-Lisence-images")
      .upload(filePath, decode(base64), { contentType });

    if (error) {
      console.error("Image Upload Error:", error.message);
      return null;
    }

    console.log("Uploaded Image Path:", data.path);
    return data.path;
  } catch (err) {
    console.error("Unexpected Error in Upload:", err);
    return null;
  }
};