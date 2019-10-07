const assert = require('assert');
const Parser = require('../../app/utils/parser');
const {AdventurerManager} = require('../../app/core/adventurerManager');

const entry = `C - 3 - 3
M - 2 - 1
T - 1 - 3 - 2
T - 2 - 3 - 3
A - Link - 1 - 1 - N - AA`;

describe('AdventurerManager', () => {
    describe('#start', () => {
        it('should return the expected objects', () => {
            const data = new Parser().parseEntry(entry);
            const manager = new AdventurerManager(data);
            const {map, adventurers} = manager.start();
            const adventurer = adventurers[0];

            assert.strictEqual(adventurer.name, 'Link');
            assert.deepStrictEqual(adventurer.instructions, []);
            assert.deepStrictEqual(adventurer.treasures, 1);
            assert.strictEqual(adventurer.orientation, 'N');

            assert.strictEqual(map.treasures.length, 2);
            assert.deepStrictEqual(map.treasures, [{x: 1, y: 3, amount: 1}, {x: 2, y: 3, amount: 3}]);
        });
    })
});
