const fs = require('fs');
const { resolve } = require('path');
const superagent = require('superagent');
const { reject } = require('superagent/lib/request-base');

const readFilePro = file => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      if (err) reject('Could not find that file 🤬');
      resolve(data);
    });
  });
};

const writeFilePro = (file, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, data, err => {
      if (err) reject('Could not find that file 🤬');
      resolve('sucess');
    })
  })
}

const getDocPic = async () => {

  try {
    const data = await readFilePro(`${__dirname}/dog.txt`);
    console.log(`Breed: ${data}`);

    const res = await superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
    console.log(res.body.message);

    await writeFilePro('dog-img.txt', res.body.message)
    console.log('Random img dogs');
  } catch (err) {
    console.log(err);
  }

};

getDocPic();

/*
readFilePro(`${__dirname}/dog.txt`).then(data => {
  console.log(`Breed: ${data}`);

  return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`)
})
  .then(res => {
    console.log(res.body.message);

    return writeFilePro('dog-img.txt', res.body.message)

  }).then(() => {
    console.log('Random img dogs');
  })
  .catch(err => {
    console.log(err);
  });
*/
