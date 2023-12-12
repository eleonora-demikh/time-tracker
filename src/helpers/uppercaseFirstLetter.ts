export const uppercaseFirstLetter = (str: string | undefined) => {
  if (!str) return str;

  return str[0].toUpperCase() + str.slice(1)
}