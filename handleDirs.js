const fs = require('fs');
const fsPromises = require('fs').promises;
const path = require('path');

// Create a directory
// If the directory does not exist, then create the direcotry else don't create it 
const handleDirectory = async () => {
  try {
    if (!fs.existsSync('./backend')) {
      await fsPromises.mkdir('./backend');
      console.log('New directory created');
    }

    /*     if(fs.existsSync('./backend')){
          await fsPromises.rmdir('./backend');
          console.log('Directory removed');
        } 
    */

  } catch (error) {
    console.log(error);
  }
}

handleDirectory();

// Complete operation from folder creation to adding content to it and more
const dir_file = async () => {
  try {
    // Create a new directory
    if(!fs.existsSync('./frontend')){
    await fsPromises.mkdir('./frontend');
    }
    // Create a new file inside the frontend directory
    await fsPromises.writeFile(path.join(__dirname, 'frontend', 'style.css'), 
    'body {background-color: balck;}')
    // Read style.css file
    const data = await fsPromises.readFile(path.join(__dirname, 'frontend', 'style.css'), 'utf-8');
    console.log(data);
    // Append content 
    await fsPromises.appendFile(path.join(__dirname, 'frontend', 'style.css'), '\np {color: white;}')
    // Rename file
    await fsPromises.rename(path.join(__dirname, 'frontend', 'style.css'), path.join(__dirname, 'frontend', 'style_v2.css'));
  } catch (error) {
    console.log(error);
  }
}

// Calling the function 
dir_file();

