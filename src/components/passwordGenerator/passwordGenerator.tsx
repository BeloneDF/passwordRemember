import { useSlider } from "@/hooks/useSlider";
import { Slider } from "../slider/Slider";
import { useState } from "react";
import { Copy, RefreshCcw } from "lucide-react";
import { useGenPassword } from "@/hooks/useGenPassword";
import { copyToClipboardNewPassword } from "@/actions/copyToClipboard";
import { ProgressBar } from "../progressBar/progressBar";
import { MyCheckBox } from "../inputText/inputCheckbox";

type PasswordType = "uppercase" | "lowercase" | "symbols" | "numbers";

export function PasswordGenerator() {
  const { caracter, setCaracter, handleChange } = useSlider();
  const [passwordTypes, setPasswordTypes] = useState({
    uppercase: false,
    lowercase: false,
    symbols: false,
    numbers: false,
  });
  const { password, generate } = useGenPassword({ caracter, passwordTypes });

  const handlePasswordTypeChange = (type: PasswordType) => {
    setPasswordTypes((prevTypes) => ({
      ...prevTypes,
      [type]: !prevTypes[type],
    }));
  };

  return (
    <div>
      <Slider
        value={caracter}
        handleChange={handleChange}
        setValue={setCaracter}
      />
      <div className="p-4 flex flex-col gap-2">
        <div className="grid-cols-2 grid">
          <MyCheckBox
            label="Uppercase"
            onChange={() => handlePasswordTypeChange("uppercase")}
          />
          <MyCheckBox
            label="Lowercase"
            onChange={() => handlePasswordTypeChange("lowercase")}
          />
        </div>
        <div className="grid-cols-2 grid">
          <MyCheckBox
            label="Symbols"
            onChange={() => handlePasswordTypeChange("symbols")}
          />
          <MyCheckBox
            label="Numbers"
            onChange={() => handlePasswordTypeChange("numbers")}
          />
        </div>
      </div>

      <div className="flex flex-col gap-2 p-4">
        <div className="flex gap-2 items-center">
          <h2 className="block mb-2 font-medium text-gray-900 dark:text-white">
            Your generated password
          </h2>
          <ProgressBar percent={password.percent} />
        </div>
        <span className="flex gap-4">
          <input
            className={`h-12 rounded-md w-60 p-2 text-white/70 ${
              password.password === "Empty characters"
                ? "bg-red-700"
                : "bg-green-700"
            }`}
            type="text"
            disabled
            value={password.password}
          />
          <div className="flex justify-evenly  items-center w-40">
            <button
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-9 h-9 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              onClick={() => copyToClipboardNewPassword(password.password)}
            >
              <Copy />
            </button>
            <button
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-9 h-9 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              onClick={() => generate()}
            >
              <RefreshCcw />
            </button>
          </div>
        </span>
      </div>
    </div>
  );
}
