const fs = require('fs');
const http = require('http');
let serveIndex = require('serve-index')


//GET POST DELETE UPDATE
//CRUD --> POST GET UPDATE DELETE

//create a server?
const server = http.createServer((req,res) => {
        fs.readFile('./pets.json', 'utf8', (err, data)=> {
            let pets = JSON.parse(data);
            let index = req.url.split('/');
            let num = parseInt(index[2]);
            res.setHeader('Content-Type', 'application/json');
        //GET
        if (req.method === 'GET') {
            if (req.url === `/pets`) {
                let petsJSON = JSON.stringify(pets);
                res.end(petsJSON);
            }
            if (typeof(num) === 'number' && num < pets.length && num > -1) {
                let petsJSON = JSON.stringify(pets[num]);
                res.end(petsJSON)
            }
        }
            else {
                res.statusCode = 404;
                res.setHeader('Content-Type', 'text/plain');
                return res.end('Not Found');
            }
        //POST
        if (req.method === 'POST' && req.url === `/pets`) {
            const age = parseInt(process.argv[3]);
            const kind = process.argv[4];
            const name = process.argv[5];

            if (age && kind && name) {
                let newPet = {age,kind,name};
                let myPets = JSON.parse(data);
                myPets.push(newPet);
                fs.writeFile('pets.json', JSON.stringify(myPets), (err) => {
                    if (err) {
                        console.error('Usage: node pets.js create AGE KIND NAME');
                        process.exit(1);
                    }
                    res.end(newPet);
                })
            }
            else {
                res.statusCode = 404;
                res.setHeader('Content-Type', 'text/plain');
                return res.end('Bad Request');
            }
        }
        })  
})

server.listen(8000, () => {
    console.log('hey, server is on!');
})

module.exports = server;