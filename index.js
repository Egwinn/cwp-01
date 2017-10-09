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

// разбор содержимого директория
let readDirectory = function(dir, prefix) {
    fs.readdir(dir, (err, files) => {
        if(err) {
            console.error("Невозможно прочитать содержимое директория " + dir);
        } else {
            files.forEach(function(element) {
                let new_unit = dir + '\\' + element;
                if(fs.statSync(new_unit).isDirectory()) {
                    readDirectory(new_unit, prefix + element + '/');
                } else {
                    array_of_files.push(new_unit);
                    sum.write('console.log(\'' + prefix + element + '\');\n');
                }
            }, this);
        }
    })
}

readDirectory(DIR_PATH, prefix);

// получение copyright
fs.readFile("config.json", (err, data) => {
    if (err) console.error(err)
    else copyright = JSON.parse(data).copyright;
})
let new_directory = DIR_PATH + '\\' + path.basename(DIR_PATH);
// создание нового директория
fs.access(new_directory, (err) => {
    if(err && err.code == 'ENOENT') {
        fs.mkdir(new_directory, (err) => {
            if (err) console.error(err);
        })
        // копирование файлов с добавлением copyright
        for (let i = 0; i < array_of_files.length; i++) {
            let new_file = new_directory + '\\' + path.basename(array_of_files[i]);
            const logger = fs.createWriteStream(new_file);
            fs.readFile(array_of_files[i], (err, data) => {
                if(err) console.error(err)
                else logger.write(copyright + '\n\n--------\n' + data + '\n--------\n\n' + copyright);
            })
        }
    }
    else console.log("Такой директорий уже существует!");
})

// fs.watch(new_directory, (err, file) => {
//     if(err) console.error(err)
//     else console.log(file.toString());
// })
