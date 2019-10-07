const assert = require('assert');
const Parser = require('../../app/utils/parser');
const MadreDeDiosMap = require('../../app/models/madreDeDiosMap');
const {Adventurer} = require('../../app/models/adventurer');

let entry = `C - 20 - 19
M - 1 - 0
M - 2 - 1
T - 0 - 3 - 2
T - 1 - 3 - 3
A - Link - 1 - 1 - S - AADADAGGA`;

describe('parserEntry', () => {
    it('should return the file value as data', () => {
        const parser = new Parser();
        const actual = parser.parseEntry(entry);
        const expected = {
            map: {x: 20, y: 19},
            mountains: [{x: 1, y: 0}, {x: 2, y: 1}],
            treasures: [{x: 0, y: 3, amount: 2}, {x: 1, y: 3, amount: 3}],
            adventurers: [{
                name: "Link",
                start: {x: 1, y: 1},
                orientation: 'S',
                instructions: ['A', 'A', 'D', 'A', 'D', 'A', 'G', 'G', 'A']
            }]
        };
        assert.deepStrictEqual(actual, expected)
    });

    it('should return the object values as string', () => {
        const map = new MadreDeDiosMap({ map: {x: 3, y: 3},
            mountains: [{x: 1, y: 0}, {x: 2, y: 1}],
            treasures: [{x: 0, y: 3, amount: 2}, {x: 1, y: 3, amount: 3}]});
        const adventurer = new Adventurer({
            name: "Link",
            start: {x: 1, y: 1},
            orientation: 'N',
            instructions: ['A', 'A']
        });
        adventurer.treasures = 1;
        const adventurers = [adventurer];
        const actual = Parser.dumpData({map, adventurers});
        const expected = `C - 3 - 3
M - 1 - 0
M - 2 - 1
T - 0 - 3 - 2
T - 1 - 3 - 3
A - Link - 1 - 1 - N - 1`;
        assert.deepStrictEqual(actual, expected)
    });
});
