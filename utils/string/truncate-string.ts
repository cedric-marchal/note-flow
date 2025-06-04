export function truncateString(
  text: string,
  charLimit: number,
  suffix = "..."
): string {
  if (!text || charLimit <= 0 || text.length <= charLimit) {
    return text;
  }

  return text.slice(0, charLimit) + suffix;
}
