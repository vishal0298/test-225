export function limit(element: any) {
  const maxChars = 6;

  if (element.target.value.length > maxChars) {
    element.target.value = element.target.value.substr(0, maxChars);
  }
}
