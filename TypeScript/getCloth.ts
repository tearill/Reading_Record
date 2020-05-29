interface Male {
  gender: 'male'
  Malecloth: 'shirt'
}

interface Female {
  gender: 'female'
  Femalecloth: 'skirt'
}

function getCloth(gender: Male | Female) {
  switch(gender.gender) {
    case 'male': 
      console.log(gender.Malecloth)
      break
    case 'female':
      console.log(gender.Femalecloth)
      break
    default:
      break
  }
}