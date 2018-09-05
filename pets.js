const fs = require('fs');


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
    
})


