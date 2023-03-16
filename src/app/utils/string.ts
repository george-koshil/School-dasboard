export function getFullName(firstName: string | null, secondName: string | null, lastName: string | null) {
  return `${firstName ?? ''} ${secondName ?? ''} ${lastName ?? ''}`
}