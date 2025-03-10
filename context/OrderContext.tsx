import React, { createContext, useState, useContext, PropsWithChildren } from "react";

// Create the Auth Context
const OrderContext = createContext({
    selectedOrder: null,
    setSelectedOrder: null,
});


export const OrderProvider = ({ children }: PropsWithChildren) => {
  const [selectedOrder, setSelectedOrder] = useState(null);

  return (
    <OrderContext.Provider value={{ selectedOrder, setSelectedOrder }}>
      {children}
    </OrderContext.Provider>
  );
};


export const useOrder = () => useContext(OrderContext);
