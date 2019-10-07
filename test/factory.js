const {Adventurer} = require('../app/models/adventurer');
const MadreDeDiosMap = require('../app/models/madreDeDiosMap');

class Factory {
    createMap() {
        const map = new MadreDeDiosMap({map: {x: 20, y: 19}});
        map.occupiedSquare.push({x: 1, y: 1});
        return map
    }

    createAdventurer() {
        return new Adventurer(
            {
                start: {x: 3, y: 3}, orientation: 'S', name: 'Link',
                instructions: ['A', 'A', 'D', 'A', 'D', 'A', 'G', 'G', 'A']
            }
        )
    }
}

const factory = new Factory();

module.exports = {
    factory
};
