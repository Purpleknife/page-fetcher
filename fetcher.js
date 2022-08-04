//Input: > node fetcher.js http://www.example.edu/ ./index.html

const request = require('request');
const fs = require('fs'); //To write file.
const readline = require('readline');

const r1 = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const args = process.argv.slice(2);
const URL = args[0];
const path = args[1];


request(URL, (error, response, body) => {
  if (error) {
    console.log('URL is invalid.'); //If URL is not typed correctly or invalid.
    process.exit();
  }

  fs.access(path, (error) => { //Found in Node website. To check if the path ./index.html exists. Zoom to the last if statement, that's how the file gets created.
    if (error) {
      console.log(`File path is invalid. A new file named ${path} will be created accordingly.`);
      process.exit();
    }
  });

  if (fs.existsSync(path)) { //If file already exists.
    r1.question(`The file already exists. Do you want to overwrite it? Type Y followed by ENTER.\n`, (answer) => {
      if (answer === 'Y') {
        fs.writeFile(path, body, (error) => {
          if (error) {
            console.log(`Ooops, something went wrong!`);
          }
          if (!error) {
            console.log(`Your file was successfully overwritten. Downloaded and saved ${body.length} bytes to ${path}`);
            r1.close();
          }
        });
      }
    });
  }

  if (!fs.existsSync(path)) { //If file doesn't exist/ file path is invalid, create it.
    fs.writeFile(path, body, (error) => {
      if (error) {
        console.log(`Ooops, something went wrong!`);
      }
      process.exit();
    });
  }
});


//body is a bunch of characters, and 1 char = 1 byte.