let number = '1113122113'

for (let i = 0; i < 40; i++) {
  const digits = number.split('')
  number = ''
  let occurrences = 0;
  let currentDigit = digits[0]
  for (let j = 0; j < digits.length; j++) {
    if (currentDigit === digits[j]) occurrences++
    else {
      number += occurrences + currentDigit
      currentDigit = digits[j]
      occurrences = 1
    }
  }
  number += occurrences + currentDigit
}

console.log(number.length)
