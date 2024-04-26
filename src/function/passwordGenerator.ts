function generatePassword(length: number): string {
  const charset =
    'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+~`|}{[]:;?><,./-=';
  let password = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    password += charset[randomIndex];
  }
  return password;
}

function generateRandomLength(minLength: number, maxLength: number): number {
  return Math.floor(Math.random() * (maxLength - minLength + 1)) + minLength;
}

function newPassword(): string {
  const minLength = 12;
  const maxLength = 16;
  const length = generateRandomLength(minLength, maxLength);
  return generatePassword(length);
}

export default newPassword;
