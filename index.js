const {Create, Read, GetRandNum, ConcatFiles, ReadAllFiles} = require('./functions')
const {EventHandler} = require('./utils/EventHandler')

async function Main() {
    // read file event
    EventHandler.CreateEvent('readFile', async() => {
        // gets a random number
        let randNum = GetRandNum();
        // and reads the file with the corresponding number
        console.log(`Reading file${randNum}:`);
        await Read(randNum);
        console.log(`Finished reading the random file. Moving to next event...`);
    })
    EventHandler.CreateEvent('endProgram', async() => {
        await ReadAllFiles()
    })
    EventHandler.RunEvent('readFile')
    EventHandler.RunEvent('endProgram')
}

Main();