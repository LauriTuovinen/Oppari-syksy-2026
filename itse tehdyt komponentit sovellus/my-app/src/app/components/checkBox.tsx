import { Pressable, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";


//checked kertoo checkboxin tilan, onko se valittu vai ei. 
// onChange on funktio, joka kutsutaan, kun checkboxin tila muuttuu.
type CheckboxProps = {
  checked: boolean; //tarkistaa tiedon ulkopuolelta, onko checkbox valittu vai ei
  onChange: (checked: boolean) => void; // tämä on funktio, joka kutsutaan, kun checkboxin tila muuttuu
  label?: string;
  disabled?: boolean;
};

export default function Checkbox({
  checked,
  onChange,
  label,
  disabled = false,
}: CheckboxProps) {
  return (
    <Pressable
    // Kun käyttäjä painaa checkboxia, kutsutaan onChange-funktiota, joka vaihtaa checkboxin tilan onChange-funktion avulla.
      onPress={() => onChange(!checked)}
      disabled={disabled}
      className="flex-row items-center self-start"
      accessibilityRole="checkbox"
      accessibilityState={{
        checked,
        disabled,
      }}
    >
        {/* Checkboxin ulkoasu vaihtuu checked-arvon perusteella */}
      <View
        className={`h-5 w-5 items-center justify-center rounded border ${
          checked
            ? "border-black border-2"
            : "border-black"
        } ${disabled ? "opacity-50" : ""}`}
      >
        {checked && (
          <Ionicons name="checkmark" size={14} color="black" />
        )}
      </View>

      {label && (
        <Text
          className={`ml-2 font-body text-base text-gray-800 ${
            disabled ? "opacity-50" : ""
          }`}
        >
          {label}
        </Text>
      )}
    </Pressable>
  );
}