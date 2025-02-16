import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useAuth } from '../../providers/AuthProviders';

const OTPScreen = ({ route, navigation }) => {
  const { verifyOTP } = useAuth();
  const { phoneNumber } = route.params; // Passed from Register screen
  
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);

  const handleVerifyOTP = async () => {
    if (otp.length !== 6) {
      Alert.alert('Error', 'Please enter a valid 6-digit OTP.');
      return;
    }

    setLoading(true);
    const success = await verifyOTP(otp);
    setLoading(false);

    if (success) {
      Alert.alert('Success', 'OTP Verified successfully!');
      navigation.replace('Drawer');
    } else {
      Alert.alert('Error', 'Invalid OTP, please try again.');
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 20 }}>Enter OTP</Text>
      <Text style={{ marginBottom: 10 }}>OTP sent to {phoneNumber}</Text>
      <TextInput
        style={{
          width: '80%',
          borderBottomWidth: 1,
          borderColor: 'gray',
          fontSize: 18,
          textAlign: 'center',
          marginBottom: 20,
        }}
        keyboardType="numeric"
        maxLength={6}
        value={otp}
        onChangeText={setOtp}
      />
      <TouchableOpacity
        onPress={handleVerifyOTP}
        style={{
          backgroundColor: '#007bff',
          padding: 15,
          borderRadius: 10,
          width: '80%',
          alignItems: 'center',
          opacity: loading ? 0.5 : 1,
        }}
        disabled={loading}
      >
        <Text style={{ color: 'white', fontSize: 16 }}>{loading ? 'Verifying...' : 'Verify OTP'}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default OTPScreen;
