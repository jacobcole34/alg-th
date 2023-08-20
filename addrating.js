const fs = require('fs');

const jsonData = require('./2023_movies.json');

function generateRandomRating() {
  return Math.floor(Math.random() * 100) / 10; 
}

jsonData.forEach((movie, index) => {
  movie.rating = generateRandomRating();
  movie.id = index + 1; 
});

const modifiedJsonData = JSON.stringify(jsonData, null, 2);

fs.writeFile('2023movies_edited.json', modifiedJsonData, err => {
  if (err) {
    console.error('Error writing to file:', err);
  } else {
    console.log('File has been successfully written: 2023movies_edited.json');
  }
});
