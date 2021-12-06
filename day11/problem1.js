const isIncludeThreeIncreasingLetters = (password) => {
  let currentChar = ''
  let isOnSeries = false
  
  for (let i = 0; i < password.length; i++) {
    if (currentChar.charCodeAt(0) + 1 === password.charCodeAt(i)) {
      if (isOnSeries) return true
      isOnSeries = true
    } else {
      isOnSeries = false
    }
    currentChar = password[i]
  }
  return false
}

const isNotContainsNotAllowedLetters = (password) => {
  return !password.includes('i') && !password.includes('o') && !password.includes('l')
}

const isContainsTwoDifferentPairsOfLetters = (password) => {
  let currentChar = ''
  let isFirstPairSame = false
  
  for (let i = 0; i < password.length; i++) {
    if (currentChar === password[i]) {
      if (isFirstPairSame) return true
      isFirstPairSame = true
      currentChar = ''
      continue
    }
    currentChar = password[i]
  }
  return false
}

const isValid = (password) => {
  return isIncludeThreeIncreasingLetters(password)
    && isNotContainsNotAllowedLetters(password)
    && isContainsTwoDifferentPairsOfLetters(password)
};


const convertInWords = (newPassword, charCodeA, base) => {
  const numbers = newPassword.split('').map(it => Number.parseInt(it, base))
  let password = ''
  numbers.forEach(number => {
    password += String.fromCharCode(number + charCodeA)
  })
  return password
};

const increment = (password) => {
  const base = 26
  const charCodeA = 'a'.charCodeAt(0)
  const chars = password.split('')
  let number = ''
  chars.forEach((char) => {
    number += (char.charCodeAt(0) - charCodeA).toString(base)
  })
  const newPasswordInNumber = Number.parseInt(number, base) + 1
  const newPassword = newPasswordInNumber.toString(base).padStart(8, '0')
  return convertInWords(newPassword, charCodeA, base)
}

const main = () => {
  let password = increment('hxbxxyzz')
  while (!isValid(password)) {
    password = increment(password)
  }
  console.log(password)
}

main()
