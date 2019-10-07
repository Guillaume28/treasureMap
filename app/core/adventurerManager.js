const {Adventurer} = require('../models/adventurer');
const MadreDeDiosMap = require('../models/madreDeDiosMap');

class AdventurerManager {

    constructor({map, mountains, treasures, adventurers}) {
        this.map = new MadreDeDiosMap({map, mountains, treasures});
        this.adventurers = adventurers.map(adventurerData => new Adventurer(adventurerData));
        this.adventurers.forEach(adventurer => adventurer.register(this.map));
    }

    /**
     *
     * @param map
     * @returns {*}
     */
    start() {
        const adventurersAsMoves = adv => adv.instructions.length > 0;
        while (this.adventurers.every(adventurersAsMoves)) {
            this.adventurers.forEach(adv => adv.move())
        }
        return {adventurers: this.adventurers, map: this.map}
    }

}

module.exports = {
    AdventurerManager
};
