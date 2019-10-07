const Parser = require('./utils/parser');
const {AdventurerManager} = require('./core/adventurerManager');
const fs = require('fs');


fs.readFile('./entry.txt', 'utf8', (err, data) => {
    let parsed = new Parser().parseEntry(data);
    const manager = new AdventurerManager(parsed);
    const {map, adventurers} = manager.start();
    const output = Parser.dumpData({map, adventurers})
    fs.writeFile('output.txt', output, 'utf8', (err) => {
        if (err) throw err;
    })
});
