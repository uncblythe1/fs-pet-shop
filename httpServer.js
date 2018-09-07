let fs = require('fs');
const http = require('http');
const port = process.env.PORT || 8000;


//GET POST DELETE UPDATE
//CRUD --> POST GET UPDATE DELETE

//create a server?
const server = http.createServer((req,res) => {
        fs.readFile('./pets.json', 'utf8', (err, data)=> {
            res.setHeader('Content-Type', 'application/json');
            let pets = JSON.parse(data);
            let index = req.url.split('/');
            let num = parseInt(index[2]);
            
        //GET
        if (req.method === 'GET') {
            if (req.url === `/pets`) {
                res.end(data);
            }
            else if (typeof(num) === 'number' && num < pets.length && num > -1) {
                let petsJSON = JSON.stringify(pets[num]);
                res.end(petsJSON)
            }
            else {
                res.statusCode = 404;
                res.setHeader('Content-Type', 'text/plain');
                res.end('Not Found');
            }
        }
        //POST
        else if (req.method === 'POST' && req.url === `/pets`) {
            let body = '';
            req.on('data', (chunk) => {
                body += chunk;
            });
            req.on('end', () => {
                let newPet = JSON.parse(body);
                let age = parseInt(newPet.age);
                let kind = newPet.kind;
                let name = newPet.name;
                if (age && kind && name){
                    pets.push(newPet);
                    fs.writeFile('pets.json', JSON.stringify(pets), (err) => {
                        res.end(JSON.stringify(newPet));
                    })
                }
                else {
                    res.statusCode = 400;
                    res.setHeader('Content-Type', 'text/plain');
                    res.end('Bad Request');
                }
            })
        }
        else {
            res.statusCode = 404;
            res.setHeader('Content-Type', 'text/plain');
            res.end('Bad Request');
        }

        //UPDATE
        else if {req.method === ''

        }
    })
})


server.listen(port, () => {
    console.log('hey, server is on!');
})

module.exports = server;