#!/usr/bin/env node
let fs = require('fs');
const http = require('http');



fs.readFile('./pets.json', 'utf8', (err, data)=> {
    
    const myPets = JSON.parse(data);
    const command = process.argv[2];
    const index = process.argv[3]

    if (!command) {
        console.error('Usage: node pets.js [read | create | update | destroy]');
        process.exit(1);
    }
    
    if (command === 'read') {
        if (index) {
            console.log(myPets[index]);
        }
        if (index < 0 || index > myPets.length) {
            console.error('Usage: node pets.js read INDEX');
        }
        if (!index) {
            console.log(myPets);
        }
    }

    //create a new pet
    if (command === 'create') {

        const age = parseInt(process.argv[3]);
        const kind = process.argv[4];
        const name = process.argv[5];

        if (age && kind && name) {
            let newPet = {age,kind,name};
            myPets.push(newPet);
            fs.writeFile('pets.json', JSON.stringify(myPets), (err) => {
                if (err) {
                    throw err;
                }
                console.log(newPet);
            })
        }
        else {
            console.error('Usage: node pets.js create AGE KIND NAME');
            process.exit(1);
        }
    }

    //update an existing pet
    if (command === 'update') {

        const index = process.argv[3];
        const age = parseInt(process.argv[4]);
        const kind = process.argv[5];
        const name = process.argv[6];

        if(index && age && kind && name) {
            let updatedPet = {age,kind,name};
            myPets[index] = updatedPet;
            fs.writeFile('pets.json', JSON.stringify(myPets), (err) => {
                if (err) {
                    throw err;
                }
                console.log(myPets[index]);
            })
        }
        else {
            console.error('Usage: node pets.js update INDEX AGE KIND NAME');
            process.exit(1);
        }
    }

    if(command === 'destroy') {
        if(index) {
            const soldPet = myPets.splice(index,1);
            
            fs.writeFile('pets.json', JSON.stringify(myPets), (err) => {
                if (err) {
                    console.error('Usage: node pets.js destroy INDEX');
                    process.exit(1);
                }
                console.log(soldPet[0]);
            })
        }
        else {
            console.error('Usage: node pets.js destroy INDEX');
            process.exit(1);
        }

    }
    
})




