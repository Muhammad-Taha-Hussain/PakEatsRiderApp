import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import { supabase } from "../lib/supabase";
import { router } from "expo-router";
// import axios from "axios";
// import twilio from "twilio";
import {
  uploadCNICBackImage,
  uploadCNICFrontImage,
  uploadRidingLicenseImage,
  uploadVehicleBackImage,
  uploadVehicleFrontImage,
} from "../api/upload-images/register-images-upload";

// Create the Auth Context
const AuthContext = createContext({
  user: null,
  profile: null,
  loading: true,
  signUp: async (registrationData: any) => {
    return { success: false, message: "Not implemented" };
  },
  sendOTP: async (phone: string) => {
    return { success: false, message: "Not implemented" };
  },
  verifyOTP: async (otp: string) => {
    return { success: false, message: "Not implemented" };
  },
  login: async (email: string, password: string) => {},
  logout: async () => {},
  forgotPassword: async (email: string) => {}, // Fix: accept email parameter
  resetPassword: async (email: string, code: string, newPassword: string) => {}, // Fix: accept parameters
});

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [otp, setOtp] = useState("");
  const [tempUserData, setTempUserData] = useState(null);
  const [resetCode, setResetCode] = useState(null);
  const [resetExpiration, setResetExpiration] = useState(null);

  // Check session on initial load
  useEffect(() => {
    const checkSession = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();

        const currentUser = session?.user || null;
        setUser(currentUser);

        if (currentUser) {
        } else {
          setProfile(null); // Ensure profile is null when no session exists
        }
      } catch (error) {
        console.error("Error during session check:", error);
        setProfile(null);
      } finally {
        setLoading(false); // Ensure loading is set to false in all cases
      }
    };
    checkSession();

    // Listen for changes in auth state
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        const currentUser = session?.user || null;
        setUser(currentUser);

        if (currentUser) {
        }
      }
    );

    const profileSubscription = supabase
      .channel("custom-update-channel")
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "customers" },
        (payload) => {
          console.log("Change received!", payload);
          setProfile(payload.new);
        }
      )
      .subscribe();

    return () => {
      authListener.subscription.unsubscribe();
      profileSubscription.unsubscribe();
    };
  }, []);

  // Step 1: Request OTP
  const sendOTP = async (phone: string) => {
    // Ensure the phone number is not empty
    if (!phone || phone.trim() === "") {
      console.error("Error: Phone number is required.");
      return { success: false, message: "Phone number is required." };
    }

    // Ensure the phone number is in E.164 format
    if (!phone.startsWith("+")) {
      if (phone.startsWith("0")) {
        phone = "+92" + phone.slice(1); // Convert 03084591990 -> +923084591990
      } else {
        console.error("Error: Invalid phone number format.");
        return { success: false, message: "Invalid phone number format." };
      }
    }

    // Validate the phone number format
    if (!/^\+92\d{10}$/.test(phone)) {
      console.error("Error: Phone number must be in E.164 format.");
      return {
        success: false,
        message: "Phone number must be in E.164 format (e.g., +923001234567).",
      };
    }
    console.log("phone no hai", phone);

    const { data, error } = await supabase.auth.signInWithOtp({
      phone: phone,
    });

    console.log("otp se data hai", data);

    if (error) {
      console.error("OTP Request Error:", error.message);
      return { success: false, message: "Error sending OTP" };
    }
    alert("OTP sent successfully!");
    return { success: true, message: "OTP sent successfully!" };
  };

  //cnicBackImage, cnicFrontImage, ridingridingridinglicenseimage, name, password, phone, profileImage, vehicleBackImage, vehicleFrontImage, vehicleType

  useEffect(() => {
    console.log("Updated tempUserData:", tempUserData);
  }, [tempUserData]);

  // Sign Up Function
  const signUp = async (
    registrationData: any
  ): Promise<{ success: boolean; message: string }> => {
    try {
      setLoading(true);
      console.log("Signing up:", registrationData);

      const {
        password,
        name,
        phone,
        vehicleType,
        vehicleFrontImage,
        vehicleBackImage,
        ridinglicenseimage,
      } = registrationData;

      // Send OTP
      // const otpResponse = await sendOTP(phone);
      // if (!otpResponse.success) {
      //   setLoading(false);
      //   return otpResponse;
      // }

      // Temporarily store user data until OTP is verified
      console.log(registrationData);

      setTempUserData(registrationData);
      console.log("temp data hai", tempUserData);

      setLoading(false);
      return { success: true, message: "OTP sent. Please verify." };
    } catch (error) {
      console.error("Sign Up Error:", error);
      setLoading(false);
      return { success: false, message: "An unexpected error occurred" };
    }
  };

  // Step 2: Verify OTP and Insert User Data
  const verifyOTP = async (otp: string) => {
    const {
      password,
      name,
      phone,
      vehicleType,
      vehicleFrontImage,
      vehicleBackImage,
      ridinglicenseimage,
    } = tempUserData;
    // const { data, error } = await supabase.auth.verifyOtp({
    //   phone,
    //   token: otp,
    //   type: "sms",
    // });
    const { data, error } = await supabase.auth.signUp({
      email: "zahoor50838@gmail.com",
      // phone: phone,
      password: password,
    });

    if (error) {
      console.error("OTP Verification Error:", error.message);
      return;
    }

    // Now proceed with completing the registration if the user exists
    if (tempUserData) {
      return await completeRegistration(data.user.id);
    }
    return { success: true, message: "OTP verified successfully!" };
  };

  const completeRegistration = async (userId: string) => {
    if (!tempUserData) {
      return { success: false, message: "No registration data found." };
    }
    console.log("Hello Taha");

    // Upload images correctly
    const vehicleFrontImagePath = await uploadVehicleFrontImage(
      tempUserData.vehicleFrontImage
    );
    const vehicleBackImagePath = await uploadVehicleBackImage(
      tempUserData.vehicleBackImage
    );
    const cnicFrontImagePath = await uploadCNICFrontImage(
      tempUserData.cnicFrontImage
    );
    const cnicBackImagePath = await uploadCNICBackImage(
      tempUserData.cnicBackImage
    );
    const ridingLicenseImagePath = await uploadRidingLicenseImage(
      tempUserData.ridinglicenseimage
    );

    if (
      !vehicleFrontImagePath ||
      !vehicleBackImagePath ||
      !ridingLicenseImagePath ||
      !cnicFrontImagePath ||
      !cnicBackImagePath
    ) {
      return { success: false, message: "Image upload failed." };
    }

    const {
      name,
      phone,
      password,
      vehicleType,
      vehicleFrontImage,
      vehicleBackImage,
      ridinglicenseimage,
    } = tempUserData;

    const { data, error } = await supabase.from("riders").insert([
      {
        riderid: userId,
        name,
        phone,
        password,
        vehicletype: vehicleType,
        cnicfrontimage: vehicleFrontImage,
        cnicbackimage: vehicleBackImage,
        vehiclefrontimage: vehicleFrontImage,
        vehiclebackimage: vehicleBackImage,
        ridinglicenseimage,
      },
    ]);

    if (error) {
      console.error("Supabase Insert Error:", error.message);
      return { success: false, message: error.message };
    }

    console.log("Successfully Registered:", data);
    setTempUserData(null);
    return { success: true, message: "Registration completed successfully!" };
  };

  // Login Function
  const login = async (phone: string, password: string) => {
    try {
      const { data: authData, error } = await supabase.auth.signInWithPassword({
        email: phone,
        password,
      });

      const { data, error: errorData } = await supabase.from("riders").select("*").eq("riderid", authData?.user?.id);
      console.log("data", data);
      if (error) throw error;
      if (errorData) throw errorData;
      // const currentUser = authData?.user;
      // if (currentUser) {
      //   await ensureUserInCustomersTable(currentUser, userName);
      // }
      
      setProfile(data[0]);
      console.log("profile", profile);
      
    } catch (error) {
      console.error("Login Error:", error.message);
      throw error;
    }
  };

  // Logout Function
  const logout = async () => {
    await supabase.auth.signOut();
    console.log('profile', profile);
    
    setUser(null);
    setProfile(null);
  };

  const forgotPassword = async (email) => {
    try {
      const generatedCode = Math.floor(1000 + Math.random() * 9000).toString();
      setResetCode(generatedCode);
      setResetExpiration(Date.now() + 10 * 60 * 1000); // Code expires in 10 minutes
      // Send code via email using Supabase or a third-party service
      const { error } = await supabase.auth.resetPasswordForEmail(email);

      if (error) throw error;
      console.log("Reset code sent.");
    } catch (error) {
      console.error("Forgot Password Error:", error);
      throw error;
    }
  };

  const resetPassword = async (email, code, newPassword) => {
    if (!resetCode || !resetExpiration || Date.now() > resetExpiration) {
      alert("The reset code has expired. Please request a new one.");
      return;
    }
    if (code !== resetCode) {
      alert("Invalid reset code.");
      return;
    }
    try {
      const { error } = await supabase.auth.updateUser({
        email,
        password: newPassword,
      });
      if (error) throw error;
      alert("Password updated successfully.");
      router.replace("/(auth)/login");
    } catch (error) {
      console.error("Reset Password Error:", error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        loading,
        signUp,
        sendOTP,
        verifyOTP,
        login,
        logout,
        forgotPassword,
        resetPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
