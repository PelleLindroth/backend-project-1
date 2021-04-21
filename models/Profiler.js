const faker = require('faker');

const generateProfile = requestsLeft => {
  const profile = {
    name: faker.name.findName(),
    dob: createBirthday(),
    profession: faker.name.jobTitle(),
    hometown: faker.address.city(),
    image: faker.image.avatar()
  }

  return { profile, requestsLeft }
}

const createBirthday = () => {
  let date = faker.date.between('1976-05-11', '1996-09-26')
  return `${date.getFullYear()}-${date.getMonth() < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1}-${date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()}`
}

module.exports = {
  generateProfile
}