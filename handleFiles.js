// 1st way of reading the content of a file using toString() method
/* 
const fs = require('fs');
fs.readFile('./texts/textToRead.txt', (err, data) => {
  if(err) throw err;
  console.log(data.toString())
}) 
*/

// Instead of toString(), we can put in a parameter which defines the encoding this way we don't need to convert it to string format
/* 
const fs = require('fs');
fs.readFile('./texts/textToRead.txt', 'utf-8', (err, data) => {
  if(err) throw err;
  console.log(data);
}) 
*/

// Exit on uncaught process & handle the errors
/* 
process.on('uncaughtException', err => {
  console.log(`There was an uncaught error: ${err}`);
  process.exit(1);
}); 
*/

// Instead of directly using the file path to access the file ('./files/starter.text'), we can use the path module, because sometimes there can be problems with
/* 
const fs = require('fs');
const path = require('path');
 fs.readFile(path.join(__dirname, 'texts', 'textToRead.txt'), 'utf-8', (err, data) => {
  if(err) throw err;
  console.log(data);
}); 
*/

// Write a new file
/* 
const fs = require('fs');
const path = require('path');
fs.writeFile(path.join(__dirname, 'texts', 'new.txt'), 'Hello from Earth', (err) => {
  if(err) throw err;
  console.log('Write complete');
}); 
*/

// Append file will append new content to a file, if the file doesn't exist it will create the file
// Creating a new file
/* 
const fs = require('fs');
const path = require('path');
fs.appendFile(path.join(__dirname, 'texts', 'bing.txt'), 'This is a test for appending file', (err) => {
  if(err) throw err;
  console.log('Append complete');
}); 
*/

// Appending a text to an existing file
/* 
const fs = require('fs');
const path = require('path');
fs.appendFile(path.join(__dirname, 'texts', 'bing.txt'), '\nHello from Mars', (err, data) => {
  if(err) throw err;
  console.log('New text is appended to an exisitng file');
})
 */

// Functions and methods in node are asynchronous, although console.log('hello...') is after readFile method, in the terminal first the 'hello...' is printed then readFile is printed, here node is processing the readfile() while going to exectue the rest of the code. 
/* 

const fs = require('fs');
const path = require('path');
fs.readFile(path.join(__dirname, 'texts', 'textToRead.txt'), 'utf-8', (err, data) => {
  if(err) throw err;
  console.log(data);
})
console.log('hello...');

Here the callback function is 
(err, data) => {
  if(err) throw err;
  console.log(data);
}
which is passed to readFile()

- A function is called a "callback function" because it is passed as an argument to another function and is intended to be "called back" (invoked) at a later time when the operation completes. The callback function allows for asynchronous execution, meaning that the program can continue to run other code while waiting for the operation to finish, and then "call back" the function to handle the result once it's done.

- Imagine you order food at a restaurant. You give your order (the callback function) to the waiter (the main function). The waiter (main function) processes your order (asynchronous operation). When the food is ready, the waiter comes back to your table and delivers the food (invokes the callback function)

*/

/* 
In order to make the asynchronous functions to look like synchrounous functions, we can put the appendFile inside the call back of writeFile operation, these functions are asynchronous, but because we're putting the appendFile inside the callback of writeFile and putting the rename inside the call back of appendFile, they're executing in a hierachical level. 
But we need to avoid the call back function hell, and there is another way in node where we can achieve it by avoiding using call back functions over and over again. 
*/

/* 
fs.writeFile(path.join(__dirname, 'files', 'testingFile.txt'), 'First',  (err) => {
  if(err) throw err;
  console.log('New file is created');

 fs.appendFile(path.join(__dirname, 'files', 'testingFile.txt'), '\nSecond', (err, data) => {
  if(err) throw err;
  console.log('New text is appended to an exsiting file');
  //This way we control the asynchronous nature of NodeJS and make it look like a synchronous function

  fs.rename(path.join(__dirname, 'files', 'testingFile.txt'), path.join(__dirname, 'files', 'newTestingFile.txt'), (err) => {
    if (err) throw err;
    console.log('File is renamed from testingFile.txt to testingFile.txt')
  })
 })
}); 
*/

// Avoiding call back functions in node.js
/* 
When you use require('fs').promises, you get access to a set of file system methods that are essentially the same as the traditional methods found in the fs module, but they return promises instead of using callbacks. Promises are a way to handle asynchronous operations more cleanly and avoid callback hell (nested callbacks).
fsPromises.readFile returns a promise, and we need to await that promise to get the actual data, before moving on to the next code
*/

/* 
const fsPromises = require('fs').promises;
const fileOps = async () => {

  try {
    const data = await fsPromises.readFile(path.join(__dirname, 'files', 'starter.txt'), 'utf8');
    console.log(data,'Promise is used');

    await fsPromises.unlink(path.join(__dirname, 'files', 'starter.txt')); // deletes file of starter.txt

    await fsPromises.writeFile(path.join(__dirname, 'files', 'promiseWrite.txt'), data);
    await fsPromises.appendFile(path.join(__dirname, 'files', 'promiseWrite.txt'), '\n\n\nNice to meet you Aloshan!');
    await fsPromises.rename(path.join(__dirname, 'files','promiseWrite.txt'), path.join(__dirname, 'files', 'promiseComplete.txt'));
    const newData = await fsPromises.readFile(path.join(__dirname, 'files', 'promiseComplete.txt'), 'utf8');
    console.log(newData);

  } catch (err) {
    console.log(err)
  }
} 
fileOps();
*/














