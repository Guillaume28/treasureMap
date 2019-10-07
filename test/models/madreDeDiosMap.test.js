const assert = require('assert');
const {factory} = require('../factory');
let map;

describe('MadreDeDiosMap', () => {
    beforeEach(() => {
        map = factory.createMap()
    });
    describe('#clearAdventurerPosition', () => {
        it('must clear the position', () => {
            map.clearAdventurerPosition({x: 1, y: 1});
            assert.strictEqual(map.occupiedSquare.length, 0)
        })
    });
    describe('#outOfArea', () => {
        it('must return true when coordonates are outside of the map', () => {
            assert.strictEqual(map.outOfArea({x: 21, y: 19}), true)
        });
        it('must return false when coordonates are inside the map', () => {
            assert.strictEqual(map.outOfArea({x: 1, y: 1}), false)
        })
    });
    describe('#busySquare', () => {
        it('must return true when the cell is busy', () => {
            assert.strictEqual(map.busySquare({x: 1, y: 1}), true)
        });
        it('must return false when he cell is not busy', () => {
            assert.strictEqual(map.busySquare({x: 1, y: 2}), false)
        })
    });
    describe('#mountainsPosition', () => {
        it('must return true when the cell is a mountain', () => {
            map.mountains.push({x:3, y:2});
            assert.strictEqual(map.occupiedByMountain({x: 3, y: 2}), true)
        });

        it('must return false when the cell is not a mountain', () => {
            map.mountains.push({x:3, y:2});
            assert.strictEqual(map.occupiedByMountain({x: 1, y: 1}), false)
        })
    });
    describe('#treasuresPosition', () => {
        it('must return true when the cell is a treasure', () => {
            map.treasures.push({x:3, y:2});
            assert.strictEqual(map.occupiedByTreasure({x: 3, y: 2}), true)
        });

        it('must return false when the cell is not  a treasure', () => {
            map.treasures.push({x:3, y:2});
            assert.strictEqual(map.occupiedByTreasure({x: 1, y: 1}), false)
        })
    });
    describe('#registerAdventurer', () => {
        it('must throw an exception if square is occupied', () => {
            assert.throws(() => map.registerAdventurer({x: 1, y: 1}), Error, "Occupied square");
        });
        it('must add adventurer on map', () => {
            const position = {x: 1, y: 2};
            map.registerAdventurer(position);
            assert.strictEqual(map.occupiedSquare[1], position)
        })
    })
});
