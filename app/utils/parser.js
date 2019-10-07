class Parser {

    constructor() {
        this.data = {
            mountains: [],
            treasures: [],
            adventurers: []
        }
    }

    /**
     *
     * @param input
     * @returns {{mountains: [], treasures: [], adventurers: []}|*}
     */
    parseEntry(input) {
        input.split('\n').forEach(this.parseData, this);
        return this.data
    }

    /**
     *
     * @param line
     */
    parseData(line) {
        let firstLetter = line.split(' - ').shift();
        switch (firstLetter) {
            case 'C':
                this.data['map'] = Parser.baseParser(line);
                break;
            case 'M':
                this.data['mountains'].push(Parser.baseParser(line));
                break;
            case 'T':
                this.data['treasures'].push(Parser.treasureParser(line));
                break;
            case 'A':
                this.data['adventurers'].push(Parser.adventurersParser(line));
                break;
        }
    }

    static dumpData({adventurers, map}) {
        let output = [];
        output.push(`C - ${map.maxX} - ${map.maxY}`);
        output.push(map.mountains.map(m => ['M', m.x, m.y].join(' - ')).join('\n'));
        output.push(map.treasures.map(t => ['T', t.x, t.y, t.amount].join(' - ')).join('\n'));
        output.push(adventurers.map(a => ['A', a.name, a.x, a.y, a.orientation, a.treasures].join(' - ')).join('\n'));
        return output.join('\n')
    }

    /**
     *
     * @param line
     * @returns {{x: *, y: *}}
     */
    static baseParser(line) {
        const parsed =
            line.split('-')
                .splice(1)
                .map(Number);
        return {x: parsed[0], y: parsed[1]}
    }

    /**
     *
     * @param line
     * @returns {{amount: *, x: *, y: *}}
     */
    static treasureParser(line) {
        const parsed =
            line.split('-')
                .splice(1)
                .map(Number);
        return {x: parsed[0], y: parsed[1], amount: parsed[2]}
    }

    /**
     *
     * @param line
     * @returns {{orientation: *, moves: *, name: *, start: {x: *, y: *}}}
     */
    static adventurersParser(line) {
        const splited = line.split(' - ');
        const name = splited.splice(1, 1).shift();
        const startingPos = splited.splice(1, 2).map(Number);
        return {
            name,
            start: {x: startingPos[0], y: startingPos[1]},
            orientation: splited[1],
            instructions: splited[2].split('')
        }
    }

}

module.exports = Parser;
