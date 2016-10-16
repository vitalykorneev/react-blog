export default (str, n, useWordBoundary) => {
  const isTooLong = str.length > n
  let modStr = isTooLong ? str.substr(0, n - 1) : str

  modStr = (useWordBoundary && isTooLong) ? modStr.substr(0, modStr.lastIndexOf(' ')) : modStr

  return isTooLong ? `${modStr} …` : modStr
}
