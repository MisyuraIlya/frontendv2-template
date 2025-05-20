export const numberWithCommas = (x: number | string | null | undefined) => {
  if (x !== null && x !== undefined) {
    const [integerPart] = x.toString().split('.')

    const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',')

    return formattedInteger
  } else {
    return '0'
  }
}
