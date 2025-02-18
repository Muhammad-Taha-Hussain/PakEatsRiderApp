import * as React from "react";
import { StyleSheet, View, Image, Text } from "react-native";
import {
  FontFamily,
  Padding,
  FontSize,
  Color,
  Gap,
  Border,
} from "../GlobalStyles";
import { SafeAreaView } from "react-native-safe-area-context";

const LoginField = () => {
  return (
    <SafeAreaView style={styles.loginField}>
      <View style={styles.titledescription}>
        <Text style={[styles.welcomeBackRider, styles.button1Typo]}>
          Welcome Back, Rider! Access Your Dashboard
        </Text>
        <Text
          style={[styles.pleaseSignIn, styles.pleaseSignInFlexBox]}
        >{`Please sign in to your account `}</Text>
      </View>
      <View style={[styles.inputField, styles.inputPosition]}>
        <Text style={[styles.emailAddress, styles.pleaseSignInFlexBox]}>
          Email Address / Phone No
        </Text>
        <View style={[styles.input, styles.inputFlexBox1]}>
          <View style={[styles.input1, styles.inputFlexBox]}>
            <Text style={[styles.enterEmaila, styles.timeTypo]}>
              Albertstevano@gmail.com
            </Text>
          </View>
        </View>
      </View>
      <View style={[styles.inputField1, styles.inputPosition]}>
        <Text style={[styles.emailAddress, styles.pleaseSignInFlexBox]}>
          Password
        </Text>
        <View style={[styles.input, styles.inputFlexBox1]}>
          <View style={[styles.input3, styles.inputFlexBox]}>
            <Text style={[styles.enterEmaila, styles.timeTypo]}>
              **********
            </Text>
            {/* <Image style={styles.icon} resizeMode="cover" source="Icon.png" /> */}
          </View>
        </View>
      </View>
      <View style={[styles.button, styles.inputFlexBox]}>
        <Text style={[styles.button1, styles.button1Typo]}>Sign In</Text>
      </View>
      <Text style={styles.dontHaveAnContainer}>
        <Text style={[styles.dontHaveAn, styles.timeTypo]}>
          Don't have an account?
        </Text>
        <Text style={styles.text}>{` `}</Text>
        <Text style={[styles.register, styles.button1Typo]}>Register</Text>
      </Text>
      <Text style={[styles.forgotPassword, styles.timeTypo]}>
        Forgot password?
      </Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  otherLayout: {
    height: 44,
    width: 375,
    position: "absolute",
  },
  timeLayout: {
    width: 54,
    position: "absolute",
  },
  timeFlexBox: {
    textAlign: "center",
    lineHeight: 20,
  },
  button1Typo: {
    fontFamily: FontFamily.headingH4SemiBold,
    fontWeight: "600",
  },
  pleaseSignInFlexBox: {
    alignSelf: "stretch",
    textAlign: "left",
  },
  inputPosition: {
    left: 24,
    position: "absolute",
  },
  inputFlexBox1: {
    justifyContent: "center",
    width: 327,
  },
  inputFlexBox: {
    padding: Padding.p_base,
    alignItems: "center",
    flexDirection: "row",
  },
  timeTypo: {
    fontFamily: FontFamily.bodyMediumMedium,
    fontWeight: "500",
    fontSize: FontSize.bodyMediumMedium_size,
  },
  rectangle: {
    height: "100%",
    top: "0%",
    right: "0%",
    bottom: "0%",
    left: "0%",
    position: "absolute",
    width: "100%",
  },
  border: {
    right: 2,
    borderRadius: 3,
    borderColor: Color.neutral100,
    width: 22,
    opacity: 0.35,
    borderWidth: 1,
    borderStyle: "solid",
    height: 11,
    top: 0,
    position: "absolute",
  },
  capIcon: {
    top: 4,
    right: 0,
    width: 1,
    height: 4,
    opacity: 0.4,
    position: "absolute",
  },
  capacity: {
    top: 2,
    right: 4,
    borderRadius: 1,
    backgroundColor: Color.neutral100,
    width: 18,
    height: 7,
    position: "absolute",
  },
  battery: {
    top: 17,
    right: 15,
    width: 24,
    height: 11,
    position: "absolute",
  },
  wifiIcon: {
    width: 15,
    height: 11,
  },
  cellularConnectionIcon: {
    width: 17,
    height: 11,
  },
  time: {
    marginTop: -8,
    left: -1,
    color: Color.neutral100,
    fontFamily: FontFamily.bodyMediumMedium,
    fontWeight: "500",
    fontSize: FontSize.bodyMediumMedium_size,
    width: 54,
    position: "absolute",
    top: "50%",
  },
  timeStyle: {
    top: 12,
    left: 21,
    height: 20,
  },
  iphoneXstatusBarsstatusBa: {
    marginTop: -22,
    marginLeft: -187.5,
    left: "50%",
    top: "50%",
    overflow: "hidden",
  },
  other: {
    left: 0,
    top: 0,
    height: 44,
    width: 375,
  },
  welcomeBackRider: {
    fontSize: FontSize.headingH4SemiBold_size,
    lineHeight: 40,
    textAlign: "left",
    alignSelf: "stretch",
    color: Color.neutral100,
  },
  pleaseSignIn: {
    color: Color.neutral60,
    textAlign: "left",
    fontFamily: FontFamily.bodyMediumMedium,
    fontWeight: "500",
    fontSize: FontSize.bodyMediumMedium_size,
    lineHeight: 20,
  },
  titledescription: {
    top: 48,
    gap: Gap.gap_md,
    width: 327,
    left: 24,
    position: "absolute",
  },
  emailAddress: {
    textAlign: "left",
    color: Color.neutral100,
    fontFamily: FontFamily.bodyMediumMedium,
    fontWeight: "500",
    fontSize: FontSize.bodyMediumMedium_size,
    lineHeight: 20,
  },
  enterEmaila: {
    textAlign: "left",
    color: Color.neutral100,
    lineHeight: 20,
    flex: 1,
  },
  input1: {
    borderColor: Color.colorLightgray,
    padding: Padding.p_base,
    alignItems: "center",
    flexDirection: "row",
    borderRadius: Border.br_5xs,
    alignSelf: "stretch",
    borderWidth: 1,
    borderStyle: "solid",
    backgroundColor: Color.neutral10,
  },
  input: {
    borderRadius: Border.br_5xs,
    justifyContent: "center",
    overflow: "hidden",
  },
  inputField: {
    top: 216,
    gap: Gap.gap_md,
  },
  icon: {
    width: 20,
    height: 20,
    overflow: "hidden",
  },
  input3: {
    borderColor: Color.colorLightgray,
    padding: Padding.p_base,
    alignItems: "center",
    flexDirection: "row",
    borderRadius: Border.br_5xs,
    alignSelf: "stretch",
    borderWidth: 1,
    borderStyle: "solid",
    backgroundColor: Color.neutral10,
    gap: Gap.gap_md,
  },
  inputField1: {
    top: 310,
    gap: Gap.gap_md,
  },
  button1: {
    letterSpacing: 2.6,
    color: Color.neutral10,
    fontSize: FontSize.size_base,
    textAlign: "center",
    lineHeight: 20,
  },
  button: {
    top: 458,
    borderRadius: 100,
    backgroundColor: "#2a8f19",
    justifyContent: "center",
    width: 327,
    left: 24,
    position: "absolute",
  },
  dontHaveAn: {
    color: Color.neutral100,
    lineHeight: 20,
  },
  text: {
    lineHeight: 24,
    fontFamily: FontFamily.plusJakartaSansRegular,
    color: "#292a2e",
    fontSize: FontSize.size_base,
  },
  register: {
    color: "#0b6e4f",
    lineHeight: 20,
    fontSize: FontSize.bodyMediumMedium_size,
    fontWeight: "600",
  },
  dontHaveAnContainer: {
    top: 651,
    left: 80,
    textAlign: "left",
    position: "absolute",
  },
  forgotPassword: {
    top: 414,
    left: 236,
    color: "#073b3a",
    textAlign: "left",
    lineHeight: 20,
    position: "absolute",
  },
  loginField: {
    height: 844,
    overflow: "hidden",
    width: "100%",
    flex: 1,
    backgroundColor: Color.neutral10,
  },
});

export default LoginField;
