export const getStringByCharCount = (str: string, maxSize: number) => {
  const trimmedText = str.slice(0, maxSize);

  return { text: trimmedText, count: trimmedText.length };
};
