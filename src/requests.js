import products from './products.json'
/** True = 65%, False = 35% */
const rejectByChance = () => {
  return Math.random() <= 0.35
}

/** Get table data */
export const emulateGetRequest = () => new Promise((resolve, reject) => {
  if (rejectByChance()) {
    return reject({
      error: 'Server error'
    })
  }
  const delay = parseInt( Math.random() * 1000 )
  setTimeout(() => { resolve(products) }, delay)
})

/** Emuate delete request */
export const emulateDeleteRequest = () => new Promise((resolve, reject) => {
  if (rejectByChance()) {
    return reject({
      error: 'Server error'
    })
  }
  const delay = parseInt( Math.random() * 1000 )
  setTimeout(() => { resolve({message: 'deleted'}) }, delay)
})
