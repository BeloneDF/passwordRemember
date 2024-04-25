export function useValidationEmail(email: string): boolean {
  return /.+@.+/.test(email);
}
