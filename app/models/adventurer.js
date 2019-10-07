const {compass} = require('../constants');

class Adventurer {

    constructor({start, name, orientation, instructions}) {
        this.position = start;
        this.orientation = orientation;
        this.instructions = instructions || [];
        this.name = name;
        this.treasures = 0;
    }

    /**
     *
     * @param x
     * @param y
     */
    set position({x, y}) {
        this.x = x;
        this.y = y;
    }

    /**
     *
     * @returns {{x: *, y: *}}
     */
    get position() {
        return {x: this.x, y: this.y}
    }

    /**
     *
     * @param map
     * @returns {*}
     */
    register(map) {
        this.map = map;
        return map.registerAdventurer(this.position)
    }

    // Exécute les déplacements de l'aventurier
    move() {
        let nextDirection = this.instructions.shift();
        let nextMovePosition = this._performMove(this.orientation);
        if (nextDirection === 'A') {
            if (!this.map.occupiedByMountain(nextMovePosition) && !this.map.busySquare(nextMovePosition)) {
                this.position = nextMovePosition;
                this.map.clearAdventurerPosition(this.position);
                if (this.map.occupiedByTreasure(nextMovePosition)) {
                    this._pickTreasure(nextMovePosition)
                }
            }
        } else {
            this.performRotate(nextDirection);
        }
    }

    // Donne exclusivement les mouvements gauche et droite
    /**
     *
     * @param orientation
     */
    performRotate(orientation) {
        let orientationIndex = compass.indexOf(this.orientation);
        if (orientation === 'G') {
            let newOrientation = orientationIndex - 1;
            this.orientation = compass.hasOwnProperty(newOrientation) ? compass[newOrientation] : compass.slice(-1)[0]
        } else if (orientation === 'D') {
            let newOrientation = orientationIndex + 1;
            this.orientation = compass.hasOwnProperty(newOrientation) ? compass[newOrientation] : compass[0]
        }
    }

    /**
     *
     * @param orientation
     * @returns {*}
     * @private
     */
    _performMove(orientation) {
        const cardinalPoints = {
            'W': {x: this.x - 1, y: this.y},
            'N': {x: this.x, y: this.y + 1},
            'E': {x: this.x + 1, y: this.y},
            'S': {x: this.x, y: this.y - 1}
        };
        return cardinalPoints[orientation]
    }

    /**
     *
     * @param position
     * @private
     */
    _pickTreasure(position) {
        this.treasures += 1;
        let treasure = this.map.treasures.filter(t => t.x === position.x && t.y === position.y)[0];
        if (treasure.amount) {
            treasure.amount -= 1
        } else {
            this.map.treasures = this.map.treasures.filter(t => t.x !== position.x && t.y !== position.y);
        }
    }

}

module.exports = {
    Adventurer
};
