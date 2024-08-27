import { useSlider } from "@/hooks/useSlider";
import { Slider } from "../slider/Slider";
import { useState } from "react";
import { Copy, RefreshCcw } from "lucide-react";
import { useGenPassword } from "@/hooks/useGenPassword";
import { copyToClipboardNewPassword } from "@/actions/copyToClipboard";

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
          <div>
            <input
              className="w-5 h-5"
              type="checkbox"
              onChange={() => handlePasswordTypeChange("uppercase")}
            />
            <label className="ml-4 text-gray-900 dark:text-white">
              Uppercase
            </label>
          </div>
          <div>
            <input
              type="checkbox"
              className="w-5 h-5"
              onChange={() => handlePasswordTypeChange("lowercase")}
            />
            <label className="ml-4 text-gray-900 dark:text-white">
              Lowercase
            </label>
          </div>
        </div>
        <div className="grid-cols-2 grid">
          <div>
            <input
              type="checkbox"
              className="w-5 h-5"
              onChange={() => handlePasswordTypeChange("symbols")}
            />
            <label className="ml-4 text-gray-900 dark:text-white">
              Symbols
            </label>
          </div>
          <div>
            <input
              type="checkbox"
              className="w-5 h-5"
              onChange={() => handlePasswordTypeChange("numbers")}
            />
            <label className="ml-4 text-gray-900 dark:text-white">
              Numbers
            </label>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-2 p-4">
        <div className="flex gap-2 items-center">
          <h2 className="block mb-2 font-medium text-gray-900 dark:text-white">
            Your generated password
          </h2>
          <div className="h-5 w-40 rounded-full bg-green-700 mb-1 items-center flex text-lg font-medium justify-center text-white/70">
            Good
          </div>
        </div>
        <span className="flex gap-4">
          <input
            className={`h-12 rounded-md w-60 p-2 ${
              password === "Empty characters" ? "bg-red-700" : "bg-green-700"
            }`}
            type="text "
            disabled
            value={password}
          />
          <div className="flex justify-evenly w-40">
            <button
              className="text-white"
              onClick={() => copyToClipboardNewPassword(password)}
            >
              <Copy />
            </button>
            <button className="text-white" onClick={() => generate()}>
              <RefreshCcw />
            </button>
          </div>
        </span>
      </div>
    </div>
  );
}
