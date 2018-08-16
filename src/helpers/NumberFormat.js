export const THOUSAND = 1000
export const MILLION = THOUSAND * 1000
export const BILLION = MILLION * 1000

export const format = (count) => {
  if (!count) {
    return '0'
  }

  if (count <= 0) {
    return '0'
  }
  if (count < THOUSAND) {
    return count
  }
  if (count < MILLION) {
    return `${(count / THOUSAND).toString()}k`
  }
  if (count < BILLION) {
    return `${(count / MILLION).toString()}M`
  }

  return `${(count / BILLION).toString()}G`
}
