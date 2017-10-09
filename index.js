// task02
// console.log('Hello World');

// task03
// const name = process.argv[2];
// console.log(`Hi ${name}!`);

// task04
// process.argv.forEach((val, index) => {
//    if(index > 1) console.log(`${index}: ${val}`);
// });

// task05
const path = require('path');
const fs = require('fs');

const DIR_PATH = process.argv[2];
let prefix ="";
const sum = fs.createWriteStream("summary.js");

let readDirectory = function(path, prefix) {
    fs.readdir(path, (err, files) => {
        if(err) console.error(err);
        else {
            files.forEach(function(element) {
                let new_dir = path + "/" + element;
                if(fs.statSync(new_dir).isDirectory()) {
                    readDirectory(new_dir, prefix + "/" + element);
                } else {
                    sum.write('console.log(\'' + prefix + '/' + element +'\');\n');
                }
            }, this);
        }
    })
}

readDirectory(DIR_PATH,prefix);