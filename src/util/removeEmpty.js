const removeEmpty = obj => {
  const newObj = { ...obj }
  Object.keys(newObj).forEach(
    val => newObj[val] === undefined && delete newObj[val]
  )
  return newObj
}
export default removeEmpty
