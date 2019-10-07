class MadreDeDiosMap {

    constructor({map, mountains, treasures}) {
        this.maxX = map.x;
        this.maxY = map.y;
        this.mountains = mountains || [];
        this.treasures = treasures || [];
        this.occupiedSquare = [];
    }

    // Cherche la la case avec l'index pour ensuite la retirer du tableau
    /**
     *
     * @param position
     */
    clearAdventurerPosition(position) {
        const idx = this.occupiedSquare.findIndex(value => value.x === position.x && value.y === position.y);
        this.occupiedSquare.splice(idx, 1)
    }

    // Check si l'on dépasse les valeurs x et y en négatif et positif
    /**
     *
     * @param destination
     * @returns {boolean}
     */
    outOfArea(destination) {
        return destination.y < 0 || destination.x < 0 || destination.y > this.maxY || destination.x > this.maxX
    }

    /**
     *
     * @param position
     * @returns {boolean}
     */
    occupiedByMountain(position) {
        return !!this.mountains.filter(value => value.x === position.x && value.y === position.y).length;
    }

    /**
     *
     * @param position
     * @returns {boolean}
     */
    occupiedByTreasure(position) {
        return !!this.treasures.filter(value => value.x === position.x && value.y === position.y).length;
    }

    // Cherche si la case est occupée
    /**
     *
     * @param destination
     * @returns {boolean}
     */
    busySquare(destination) {
        return !!this.occupiedSquare.filter(value => value.y === destination.y && value.x === destination.x).length
    }

    /**
     *
     * @param position
     * @returns {number}
     */
    registerAdventurer(position) {
        if (this.occupiedByMountain(position) || this.busySquare(position)) {
            throw new Error('This square is occupied')
        }
        return this.occupiedSquare.push(position)
    }
}

module.exports = MadreDeDiosMap;
