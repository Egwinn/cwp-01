// task02
//console.log('Hello World');

// task03
//const name = process.argv[2];
//console.log(`Hi ${name}!`);

// task04
process.argv.forEach((val, index) => {
    if(index > 1) console.log(`${index}: ${val}`);
});