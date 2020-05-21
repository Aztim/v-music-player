export default function minutes (value) {
  if (!value || typeof value !== 'number') return '00:00'
  let min = parseInt(value / 60)
  let sec = parseInt(value % 60)
  min = min < 10 ? '0' + min : min
  sec = sec < 10 ? '0' + sec : sec
  value = min + ':' + sec
  return value
}
