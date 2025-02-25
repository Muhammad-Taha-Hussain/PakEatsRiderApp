
import { createContext, useContext, useState, useEffect } from "react";
import { fetchPaymentSummary, fetchPaymentMethods, fetchPaymentHistory } from "../api/payment/payments";

const PaymentContext = createContext();

export const PaymentProvider = ({ children }) => {
  const [earnings, setEarnings] = useState(null);
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [paymentHistory, setPaymentHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPaymentData = async () => {
      setLoading(true);
      try {
        const earningsData = await fetchPaymentSummary();
        const methodsData = await fetchPaymentMethods();
        const historyData = await fetchPaymentHistory();
        
        setEarnings(earningsData);
        setPaymentMethods(methodsData);
        setPaymentHistory(historyData);
      } catch (error) {
        console.error("Error loading payment data:", error);
      }
      setLoading(false);
    };

    loadPaymentData();
  }, []);

  return (
    <PaymentContext.Provider value={{ earnings, paymentMethods, paymentHistory, loading, setPaymentMethods }}>
      {children}
    </PaymentContext.Provider>
  );
};

export const usePayment = () => useContext(PaymentContext);
