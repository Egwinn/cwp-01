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

if (process.argv.length < 3) {
    console.log("Недостаточно аргументов");
    process.exit();
}
if (process.argv.length > 3) {
    console.log("Слишком много аргументов");
    process.exit();
}

const DIR_PATH = process.argv[2];
let prefix = "";
const sum = fs.createWriteStream('summary.js');
let array_of_files = [];
let copyright = "";

let readDirectory = function(dir, prefix) {
    fs.readdir(dir, (err, files) => {
        if(err) {
            console.error(err);
        } else {
            files.forEach(function(element) {
                let new_dir = dir + '/' + element;
                if(fs.statSync(new_dir).isDirectory()) {
                    readDirectory(new_dir, prefix + element + '/');
                } else {
                    array_of_files.push(new_dir);
                    sum.write('console.log(\'' + prefix + element + '\');\n');
                }
            }, this);
        }
    })
}

readDirectory(DIR_PATH, prefix);

fs.readFile("config.json", (err, data) => {
    if (err) console.error(err)
    else {
        copyright = JSON.parse(data).copyright;
        let new_directory = DIR_PATH + '\\' + path.basename(DIR_PATH);
        fs.access(new_directory, (err) => {
            if(err && err.code == 'ENOENT')
                fs.mkdir(new_directory, (err) => {
                    console.error(err);
                })
        })
    }
})