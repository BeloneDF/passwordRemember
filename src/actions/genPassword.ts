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
    return "Empty characters";
  }

  let password = "";

  for (let i = 0; i < caracter; i++) {
    const character = characters[Math.floor(Math.random() * characters.length)];
    password += character;
  }

  return password;
}
