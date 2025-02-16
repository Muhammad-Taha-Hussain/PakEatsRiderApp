
import React, { useState, useRef, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";


const EmailVerificationScreen = ({ navigation }) => {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [timer, setTimer] = useState(600); // 10 minutes in seconds
  const [resendVisible, setResendVisible] = useState(false);

  const inputRefs = useRef([]);

  // Handle OTP input
  const handleOtpChange = (value, index) => {
    const newOtp = [...otp];
    newOtp[index] = value;

    if (value && index < otp.length - 1) {
      inputRefs.current[index + 1].focus();
      setActiveIndex(index + 1);
    } else if (!value && index > 0) {
      inputRefs.current[index - 1].focus();
      setActiveIndex(index - 1);
    }
    setOtp(newOtp);
  };

  // Timer logic
  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else {
      setResendVisible(true);
    }
    return () => clearInterval(interval);
  }, [timer]);

  // Timer display format
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  // Resend Code Handler
  const handleResendCode = () => {
    setTimer(600); // Reset timer
    setResendVisible(false);
  };

  return (
    <View className="flex-1 items-center justify-center bg-white p-4">
      {/* Header */}
      <Text className="text-2xl font-bold mb-2">Email Verification</Text>
      <Text className="text-gray-500 mb-8 text-center">
        Enter the verification code we sent you on: {"\n"} Alberts*****@gmail.com
      </Text>

      {/* OTP Input Fields */}
      <View className="flex-row justify-between px-10 mb-6">
        {otp.map((digit, index) => (
          <TextInput
            key={index}
            ref={(ref) => (inputRefs.current[index] = ref)}
            value={digit}
            maxLength={1}
            keyboardType="number-pad"
            onChangeText={(value) => handleOtpChange(value, index)}
            onFocus={() => setActiveIndex(index)}
            className={`w-12 h-14 border mr-4 ${
              activeIndex === index ? "border-green-500" : "border-gray-300"
            } text-center text-lg font-bold rounded`}
          />
        ))}
      </View>

      {/* Timer or Resend Code */}
      {resendVisible ? (
        <TouchableOpacity onPress={handleResendCode}>
          <Text className="text-green-600 font-medium">Resend Code</Text>
        </TouchableOpacity>
      ) : (
        <Text className="text-gray-500 mb-4">{formatTime(timer)}</Text>
      )}

      {/* Continue Button */}
      <TouchableOpacity className="rounded-full bg-green-500 w-full py-3" activeOpacity={0.7} onPress={() => navigation.navigate('ChangePasswordScreen')}>
        <Text className="text-white text-center font-bold text-lg">Continue</Text>
      </TouchableOpacity>
    </View>
  );
};

export default EmailVerificationScreen;
