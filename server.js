let express = require('express');
let app = express();
let http = require('http').Server(app);
var io = require('socket.io')(http);
let readline = require('readline');
let fs = require('fs');
var Map = require('./server/map.js');
var rl = readline.createInterface(process.stdin, process.stdout);
let port = 80;

console.log('\033c');

app.set('view engine', 'ejs');
app.use('/client', express.static('client'));

console.log = function (str) {

    process.stdout.write(str + '\n');
    rl.prompt();

}

generateMap = function () {

    console.log('Creating Map file');

    let map = new Map(6400, 3200);

    console.log('Generating Map');

    fs.writeFileSync('./server/map.json', JSON.stringify(map));

    console.log('Map file created');

}

let svFolder = fs.readdirSync('./server');
if (svFolder.indexOf('map.json') > -1) {

    console.log('Map file exists');

} else {

    console.log('Map file doesnt exist');
    generateMap();

}

map = JSON.parse(fs.readFileSync('./server/map.json'));

require('./server/routes.js')(app, map);
require('./server/socket.js')(io, map);

http.listen(port, function () {
    console.log('listening on: ' + port);

    rl.setPrompt('Server> ');
    rl.prompt();

    rl.on('line', function (line) {

        let c = line.trim().split(' ');

        switch (c[0]) {

            case 'map':
                switch (c[1]) {

                    case 'generate': generateMap(); break;
                    default: console.log('Invalid command'); break;

                }
                break;

            default: console.log('Invalid command'); break;
        }
        rl.prompt();
    }).on('close', function () {   

        process.exit(0);
    });

});