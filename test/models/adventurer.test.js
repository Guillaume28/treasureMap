const assert = require('assert');
const {Adventurer} = require("../../app/models/adventurer");
const {factory} = require('../factory');
let map, adventurer;

describe('Adventurer', () => {
    beforeEach(() => {
        map = factory.createMap();
        adventurer = factory.createAdventurer();
        adventurer.register(map);
    });
    describe('#register', () => {
        it('must register the adventurer on map', () => {
            assert.deepStrictEqual(map.occupiedSquare[1], adventurer.position)
        })
    });
    describe('#moves', () => {
        it('must move the adventurer on the correct square', () => {
            adventurer.move();
            assert.deepStrictEqual(adventurer.position, {x: 3, y: 2});
            assert.deepStrictEqual(adventurer.instructions, ['A', 'D', 'A', 'D', 'A', 'G', 'G', 'A']);
        });
        it('if the square is busy the adventurer skip his move', () => {
            map.mountains.push({x: 3, y: 2});
            adventurer.move();
            assert.deepStrictEqual(adventurer.position, {x: 3, y: 3});
            assert.deepStrictEqual(adventurer.instructions, ['A', 'D', 'A', 'D', 'A', 'G', 'G', 'A']);
        });
        it('must pick the treasure and remove it from the square', () => {
            const moves = ['A', 'A', 'D', 'A', 'A'];
            adventurer.instructions = moves.concat();
            moves.forEach(_ => adventurer.move());
            assert.deepStrictEqual(adventurer.position, {x: 1, y: 1});
            assert.strictEqual(adventurer.orientation, 'W');

        });
        it('must pick the treasure and remove one from the square ', () => {
            const adventurer = new Adventurer({
                start: {x: 1, y: 3}, orientation: 'S', name: 'Link',
                instructions: ['A']
            });
            adventurer.register(map);
            map.treasures.push({x: 1, y: 2, amount: 2});
            adventurer.move();
            assert.strictEqual(map.treasures[0].amount, 1);
            assert.strictEqual(adventurer.treasures, 1);
        })
    });
    describe('#performRotate', () => {
        it('must return the correct orientation', () => {
            adventurer.performRotate('D');
            assert.deepStrictEqual(adventurer.orientation, 'W');
            adventurer.performRotate('G');
            assert.deepStrictEqual(adventurer.orientation, 'S');
        })
    });
});
