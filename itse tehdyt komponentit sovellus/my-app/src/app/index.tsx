import { useState } from "react";
import { Text, View, ImageBackground } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

import FormControl from "./components/formControl";
import Input from "./components/input";
import Button from "./components/button";
import Checkbox from "./components/checkBox";
import {useUser} from "./hook/userContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const router = useRouter();
  const { login } = useUser();

const handleLogin = () => {
    // Tyhjennetään edellisen kirjautumisyrityksen virheet.
  setEmailError("");
  setPasswordError("");

  let hasError = false;

  // Tarkistetaan sähköpostin muoto.
  if (email.trim() === "" || !email.includes("@")) {
    setEmailError("Anna kelvollinen sähköpostiosoite.");
    hasError = true;
  }

  // Tarkistetaan salasanan pituus.
  if (password === "" || password.length < 6) {
    setPasswordError(
      "Salasanan on oltava vähintään 6 merkkiä pitkä."
    );
    hasError = true;
  }

  // Jos lomakkeessa on virheitä, kirjautumista ei yritetä.
  if (hasError) {
    return;
  }

  setIsLoading(true);

  {/*
    Simuloidaan palvelimelle tehtävää kirjautumispyyntöä.
  */}
  setTimeout(() => {
    const success = login(email, password);

    setIsLoading(false);

    if (!success) {
      setPasswordError(
        "Sähköposti tai salasana on virheellinen."
      );
      return;
    }

    router.replace("/home");
  }, 1000);
  }

  return (
    <ImageBackground
      source={require("../../assets/oulu.png")}
      className="flex-1"
      resizeMode="cover"
    >
    <View className="flex-1 bg-white/10 px-6 pt-20">
      <Text className="mb-8 font-heading-bold text-5xl text-gray-900 text-center">
        VisitOulu
      </Text>
      <View className="flex-1 justify-center mt-16">
      

      <Text className="mb-8 mt-16 font-body-semibold text-lg text-gray-800">
        Syötä sähköpostiosoitteesi ja salasanasi.
      </Text>

      <View className="gap-5">
        <FormControl
          label="Sähköposti"
          isRequired
          isInvalid={!!emailError}
          errorMessage={emailError}
        >
          <Input
            icon="mail-outline"
            value={email}
            onChangeText={setEmail}
            placeholder="Sähköposti"
            keyboardType="email-address"
            autoCapitalize="none"
            isInvalid={!!emailError}
          />
          
        </FormControl>

        <FormControl
          label="Salasana"
          isRequired
          isInvalid={!!passwordError}
          errorMessage={passwordError}
        >
          <Input
            icon="lock-closed-outline"
            value={password}
            onChangeText={setPassword}
            placeholder="Salasana"
            secureTextEntry
            showPasswordToggle
            isInvalid={!!passwordError}
          />
        </FormControl>

        <Checkbox
          checked={rememberMe}
          onChange={setRememberMe}
          label="Muista minut"
        />
        </View>

    <View className ="flex-1 mt-8 justify-center items-center">
        <Button
          title="Kirjaudu"
          onPress={handleLogin}
          isLoading={isLoading}
        />
      </View>
    </View>
    </View>
    
    </ImageBackground>
  );
}