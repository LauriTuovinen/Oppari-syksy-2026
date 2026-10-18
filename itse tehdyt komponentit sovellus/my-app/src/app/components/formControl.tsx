import { ReactNode } from "react";
import { Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";


//FormControl-komponentti on tarkoitettu käytettäväksi muiden inputien kanssa 
// huolehtii labelista, apuviestistä ja virheilmoituksesta.


type FormControlProps = {
  children: ReactNode;
  label?: string;
  helperText?: string;
  errorMessage?: string;
  isInvalid?: boolean;
  isRequired?: boolean;
};

export default function FormControl({
  children,
  label,
  helperText,
  errorMessage,
  isInvalid = false,
  isRequired = false,
}: FormControlProps) {
  return (
    <View className="w-full">

        {/* Jos label on annettu, näytetään se. Jos isRequired on true, näytetään punainen tähti. */}
      {label && (
        <Text className="mb-2 text-sm font-body text-gray-800">
          {label}
          {isRequired && <Text className="text-red-500"> *</Text>}
        </Text>
      )}


      {children}

      {/* Jos helperText on annettu ja isInvalid on false, näytetään apuviesti. */}
      {helperText && !isInvalid && (
        <Text className="mt-1 text-sm text-gray-500">
          {helperText}
        </Text>
      )}

      {/* Jos isInvalid on true ja errorMessage on annettu, näytetään virheilmoitus. */}

      {isInvalid && errorMessage && (
        <View className="mt-1 flex-row items-center">
          <Ionicons name="alert-circle-outline" size={16} color="red" />
          <Text className="text-sm text-red-500 ml-2">
            {errorMessage}
          </Text>
        </View>
      )}
    </View>
  );
}