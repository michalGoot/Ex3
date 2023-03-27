const { existsSync } = require('node:fs');
const fs = require('node:fs/promises');
const path = require('node:path')

exports.Create = async (fileNum, text) => {
    try{
        // check if folder "files" exists and if not, creates it
        if (!existsSync(path.join(__dirname, 'files')))
            await mkdir(path.join(__dirname, 'files'));
        await fs.appendFile(path.join(__dirname, 'files', `file${fileNum}.txt`), `${text}\n`);
        console.log(`file${fileNum} has been created/updated!`);
    }
    catch(err){
        console.error(err);
    }
}

exports.Read = async (fileNum) => {
    try{
        let data = await fs.readFile(path.join(__dirname, 'files', `file${fileNum}.txt`));
        console.log(data.toString());
    }
    catch(err){
        console.error(err);
    }
}

exports.GetRandNum = () => {

    return Math.floor(Math.random() * 5) + 1;

}

exports.ConcatFiles = async()=> {
    try{

        // deleting the file before it exists should show an error and continue the function - not working!
        try{
            fs.unlink(path.join(__dirname, 'files', 'concatTextFile.txt'))
        }
        catch(unlinkErr){
            console.log(`Cannot delete concatTextFile.txt as it does not exist`);
        }

        let randomNum = this.GetRandNum(); 
        console.log(randomNum);
        
         const files = await fs.readdir(path.join(__dirname, 'files'))
         console.log(files);
         for(let i = 0; i < files.length; i++){
             let fileName = files[i].toString();
             let fileData = await fs.readFile(path.join(__dirname, 'files', fileName));
             fs.appendFile(path.join(__dirname, 'files', 'stringtxt.txt'), fileData + '\n');
             if (fileName.indexOf(randomNum.toString()) != -1){
                 break
            }
        }
        console.log(`Successfully written data from first file until file${randomNum}!`);
        console.log(`Renaming file to concatTextFile.txt`);
        await fs.rename(path.join(__dirname, 'files', 'stringtxt.txt'), path.join(__dirname, 'files', 'concatTextFile.txt'))
        
    }
    catch(err){
        console.error(err);
    }
}

exports.ReadAllFiles = async() => {
    try {
        const files = await fs.readdir(path.join(__dirname, 'files'));
        for(let i = 0; i < files.length; i++){
            let fileName = files[i].toString();
            let fileData = await fs.readFile(path.join(__dirname, 'files', fileName));
            console.log(fileData.toString());
            console.log(`**********`);
       }
    } catch (error) {
        console.log(error);
    }
}



