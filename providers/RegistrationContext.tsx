import React, { createContext, useContext, useState } from "react";

type RegisterType = {
  name: string;
  phone: string;
  password: string;
  vehicleType: string;
  cnicFrontImage: string | null;
  cnicBackImage: string | null;
  vehicleFrontImage: string | null;
  vehicleBackImage: string | null;
  ridinglicenseimage: string | null;
  profileImage: string | null;
};

// Define a new type that includes both the registration data and update function
type RegistrationContextType = {
  registrationData: RegisterType;
  updateData: (key: keyof RegisterType, value: string | null) => void;
};

// Create a context with the correct type
const RegistrationContext = createContext<RegistrationContextType | undefined>(undefined);

export const useRegistration = () => {
  const context = useContext(RegistrationContext);
  if (!context) {
    throw new Error("useRegistration must be used within a RegistrationProvider");
  }
  return context;
};

export const RegistrationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [registrationData, setRegistrationData] = useState<RegisterType>({
    name: "",
    phone: "",
    password: "",
    vehicleType: "",
    cnicFrontImage: null,
    cnicBackImage: null,
    vehicleFrontImage: null,
    vehicleBackImage: null,
    ridinglicenseimage: null,
    profileImage: null,
  });

  const updateData = (key: keyof RegisterType, value: string | null) => {
    setRegistrationData((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  };

  return (
    <RegistrationContext.Provider value={{ registrationData, updateData }}>
      {children}
    </RegistrationContext.Provider>
  );
};
