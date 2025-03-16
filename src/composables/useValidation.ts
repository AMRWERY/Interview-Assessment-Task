export const useValidation = () => {
  const validateRequired = (value: string, fieldKey: string): string | null => {
    if (!value.trim()) return fieldKey;
    return null;
  };

  return { validateRequired };
};
