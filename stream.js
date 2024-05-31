/* 

If we have larger files, it's better not to grab all of the data at once, in case the file is large we use stream

Streams are a way of handling data that allows you to read or write input/output sequentially, in small chunks, instead of loading the entire data into memory all at once. This makes streams memory-efficient and time-efficient when working with large amounts of data, such as reading/writing files, network communications, or any kind of end-to-end information exchange.

The key advantages of using streams are:
Memory efficiency: Streams allow you to process data in smaller chunks, without having to load the entire dataset into memory.

Time efficiency: You can start processing the data as soon as the first chunk is available, instead of waiting for the entire dataset to be loaded.

Composability: Streams can be "piped" together, allowing you to create complex data processing pipelines by combining smaller, reusable components. 
*/

const fs = require('fs')
const fsPromises = require('fs').promises;
const path = require('path');

const streamOperations = async () => {
  try {
    if(!fs.existsSync('./Stream')){
      await fsPromises.mkdir('./Stream');
    }
    await fsPromises.writeFile(path.join(__dirname, 'Stream', 'stream.txt'), 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec dapibus ipsum. Nulla facilisi. Maecenas ac felis at erat bibendum laoreet. Fusce eget malesuada augue. Vestibulum fermentum tristique justo, ut dapibus orci varius nec. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Integer ultricies lacinia arcu non feugiat. Aliquam erat volutpat. Sed at felis non felis blandit tempus. Integer vitae justo felis. Nullam ut consequat metus. Duis auctor, libero eget ultricies dictum, turpis metus aliquet nisi, vitae faucibus orci eros in nulla. Aliquam tincidunt neque nec turpis dictum, nec pharetra lorem laoreet. Duis non est at erat bibendum ultrices. Cras vestibulum pharetra elit, ac tempor mauris sodales non. Phasellus cursus vehicula lectus');
    const readStream = fs.createReadStream(path.join(__dirname, 'Stream', 'stream.txt'), {encoding: 'utf-8'});
    const writeStream = fs.createWriteStream(path.join(__dirname, 'Stream', 'newStream.txt'));
    
    readStream.on('data', chunk => {
      writeStream.write(chunk)
    })

  } catch (error) {
    console.log(error);
  }
}

streamOperations();

// More efficient compared to the readStream.on()
// readStream.pipe(writeStream);

/* 
The 'data' event is emitted by the readStream whenever there is data available to be read.
The callback function (dataChunk) => { ws.write(dataChunk); } is invoked for each data chunk.
Inside the callback, ws.write(dataChunk) writes the data chunk to the writeStream , effectively copying the data from the input file to the output file. 
*/

/* With readStream.pipe(writeStream), the data is automatically transferred from the readStream to the writeStream stream (ws), which is more efficient */











