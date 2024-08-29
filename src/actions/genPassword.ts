interface GenPasswordProps {
  caracter: number;
  passwordTypes: {
    uppercase?: boolean;
    lowercase?: boolean;
    numbers?: boolean;
    symbols?: boolean;
  };
}

export function genPassword({
  caracter,
  passwordTypes = {},
}: GenPasswordProps) {
  const uppercaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lowercaseLetters = "abcdefghijklmnopqrstuvwxyz";
  const numbersCharacters = "0123456789";
  const symbolsCharacters = "!@#$%^&*()_+";

  let characters = "";

  if (passwordTypes.uppercase) characters += uppercaseLetters;
  if (passwordTypes.lowercase) characters += lowercaseLetters;
  if (passwordTypes.numbers) characters += numbersCharacters;
  if (passwordTypes.symbols) characters += symbolsCharacters;

  if (characters.length === 0) {
    return {
      password: "Empty characters",
      percent: 0,
    };
  }

  let password = "";

  for (let i = 0; i < caracter; i++) {
    const character = characters[Math.floor(Math.random() * characters.length)];
    password += character;
  }

  const boolCount = [
    passwordTypes.uppercase,
    passwordTypes.lowercase,
    passwordTypes.numbers,
    passwordTypes.symbols,
  ].filter(Boolean).length;

  const percentageMapping: { [key: string]: number } = {
    "4-12": 75,
    "3-50": 75,
    "3-11": 50,
    "2-8": 25,
    "1-8": 0,
  };

  const percent = Object.keys(percentageMapping).reduce((acc, key) => {
    const [types, minCaracter] = key.split("-").map(Number);
    return boolCount === types && caracter >= minCaracter
      ? percentageMapping[key]
      : acc;
  }, 0);

  return {
    password,
    percent,
  };
}
