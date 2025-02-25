import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, Alert } from "react-native";
import EarningsSummary from "../../components/Payment/EarningsSummary";
import PayoutMethods from "../../components/Payment/PayoutMethods";
import PaymentHistory from "../../components/Payment/PaymentHistory";
import WithdrawalRequests from "../../components/Payment/WithdrawalRequest";
import TaxesInvoices from "../../components/Payment/TaxesAndInvoices";
import SupportFAQ from "../../components/Payment/SupportFAQ";

import { useDrawerStatus } from '@react-navigation/drawer';

const PaymentDetailsScreen = ({ navigation }) => {
    const drawerStatus = useDrawerStatus();

    useEffect(() => {
        // Disable the drawer when this screen is open
        navigation.setOptions({ swipeEnabled: false });
    
        return () => {
          // Re-enable the drawer when leaving
          navigation.setOptions({ swipeEnabled: true });
        };
      }, [navigation]);
  // Dummy data (Replace with API or Context data later)
  const earningsData = {
    totalEarnings: "$5000",
    pendingPayments: "$200",
    transactions: [
      { id: 1, date: "2025-02-20", amount: "$200", status: "Completed" },
      { id: 2, date: "2025-02-18", amount: "$150", status: "Pending" },
    ],
  };

  const payoutMethods = [
    { id: 1, type: "Bank Transfer", account: "**** 1234" },
    { id: 2, type: "PayPal", account: "user@example.com" },
  ];

  const [selectedMethod, setSelectedMethod] = useState(payoutMethods[0]);

  // Handlers
  const handleSelectMethod = (method) => {
    setSelectedMethod(method);
  };

  const handleRequestWithdrawal = () => {
    Alert.alert(
      "Withdrawal Requested",
      "Your withdrawal request has been submitted."
    );
  };

  const handleDownloadInvoice = () => {
    Alert.alert("Download Invoice", "Your invoice has been downloaded.");
  };

  return (
    <ScrollView className="flex-1 bg-white p-4">
      <Text className="text-2xl font-bold text-center mb-4">
        Payment Details
      </Text>

      {/* Earnings Summary */}
      <EarningsSummary earnings={earningsData} />

      {/* Payout Methods */}
      <PayoutMethods
        payoutMethods={payoutMethods}
        selectedMethod={selectedMethod}
        onSelectMethod={handleSelectMethod}
      />

      {/* Payment History */}
      <PaymentHistory transactions={earningsData.transactions} />

      {/* Withdrawal Requests */}
      <WithdrawalRequests onRequestWithdrawal={handleRequestWithdrawal} />

      {/* Taxes & Invoices (Optional) */}
      <TaxesInvoices onDownloadInvoice={handleDownloadInvoice} />

      {/* Support & FAQs */}
      <SupportFAQ />
    </ScrollView>
  );
};

export default PaymentDetailsScreen;
