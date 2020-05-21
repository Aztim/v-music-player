export default function numbers (value) {
  const number = value + 1
  if (number < 10) {
    return '0' + number + '.'
  }
  return number + '.'
}
