const faker = require('faker');

class Profiler {
  static generateProfile = requestsLeft => {
    const profile = {
      name: faker.name.findName(),
      dob: createBirthday(),
      profession: faker.name.jobTitle(),
      hometown: faker.address.city(),
      trait: createTrait(),
      image: faker.image.avatar()
    }

    const profile64 = Buffer.from(JSON.stringify(profile)).toString('base64')

    return { profile, link: `localhost:5000/user/${profile64}` }
  }

  static convertBase64 = base64String => {
    const buffer = new Buffer.from(base64String, 'base64');
    const string = buffer.toString('ascii');
    return { profile: JSON.parse(string) }
  }
}

const createBirthday = () => {
  let date = faker.date.between('1976-05-11', '1996-09-26')
  return `${date.getFullYear()}-${date.getMonth() < 9 ? `0${date.getMonth() + 1}` : date.getMonth() + 1}-${date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()}`
}

const createTrait = () => {
  const first = ['Balloon', 'Panda', 'Bicycle', 'Razor', 'Beer', 'Gold', 'Synth', 'Tree', 'Machine', 'Tape']
  const last = ['enthusiast', 'hater', 'provider', 'collector', 'user', 'player', 'lover', 'mender', 'engineer', 'smoker']

  return `${first[Math.floor(Math.random() * first.length)]} ${last[Math.floor(Math.random() * last.length)]}`
}

module.exports = Profiler