'use strict';

const gameBoardArray = [
	{
		name: 'Gameboard 1',
		array: [
			[0, 0, 0, 1, 1, 1, 0, 0, 0, 0],
			[1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[1, 0, 0, 0, 1, 1, 1, 1, 0, 0],
			[1, 0, 1, 0, 0, 0, 0, 0, 0, 0],
			[1, 0, 1, 0, 0, 0, 1, 0, 0, 0],
			[1, 0, 0, 1, 1, 0, 0, 0, 1, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[1, 1, 1, 0, 0, 0, 0, 1, 1, 0],
			[0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    	]
	},
	{
		name: 'Gameboard 2',
		array: [
			[0, 0, 0, 1, 1, 1, 0, 0, 0, 0],
			[1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[1, 0, 0, 0, 1, 1, 1, 1, 0, 0],
			[1, 0, 1, 0, 0, 0, 0, 0, 0, 0],
			[1, 0, 1, 0, 0, 0, 1, 0, 0, 0],
			[1, 0, 0, 1, 1, 0, 0, 0, 1, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[1, 1, 1, 0, 0, 0, 0, 1, 1, 0],
			[0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
	]
	}, 
	{
		name: 'Gameboard 3',
		array: [
			[0, 0, 0, 0, 0, 1, 1, 0, 0, 0],
			[1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[1, 0, 0, 0, 0, 1, 1, 1, 0, 0],
			[1, 0, 1, 0, 0, 0, 0, 0, 0, 0],
			[1, 0, 1, 0, 0, 0, 1, 1, 1, 1],
			[1, 0, 0, 1, 1, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[1, 1, 1, 0, 0, 0, 0, 1, 1, 0],
			[0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    	]
	}
];

class BaseElement {
	createElement() {
		throw new Error('not implemented');
	}
	
	getElement() {
		return this.elementState.element;
	}
	
	setElement() {
		this.elementState = {
		element: this.createElement()
		}
		this.initialize();
		return this.getElement();
	}

	initialize() {
	}
	
}

class Cell extends BaseElement {
	constructor({isShip, location, gameboard}) {
		super();
		this.isShip = isShip;
		this.state = 'unknown';
		this.gameboard = gameboard;
		this.onClick = this.fireTorpedo;
	}
	
	createElement() {
		const element = document.createElement('div');
		element.addEventListener('click', this.onClick.bind(this));

		return element;
	}

	setState(state) {
		this.state = state;
		this.refresh();
	}

	fireTorpedo() {
		if(this.isShip) {
			this.setState('hit');
			this.gameboard.score += 1;
			while(gameResult.firstChild) {
				gameResult.removeChild(gameResult.firstChild);
			}
			
			gameResult.append(`${this.gameboard.score} / ${this.gameboard.totalScore}`);
		} else {
			this.setState('miss');
		}

	}

	refresh() {
		this.getElement().className = `cell-${this.state}`;
	}

	initialize() {
		this.refresh();
	}

}

class Gameboard extends BaseElement {
	constructor({size}) {
		super();
		this.cells = [];
		this.columnNumber = size;
		this.rowNumber = size;
		this.fleet = gameBoardArray[Math.floor(Math.random() * gameBoardArray.length)];
		this.score = 0;
		this.totalScore = this.getTotalScore(this.fleet);


		for(let rowIndex = 0; rowIndex < this.rowNumber; rowIndex++) {
			for(let columnIndex = 0; columnIndex < this.columnNumber; columnIndex++) {
				this.cells.push(new Cell( {
					isShip:this.fleet.array[rowIndex][columnIndex] === 1,
					location: [rowIndex,columnIndex],
					gameboard: this
				}));
			}
		}
		gameResult.append(`${this.score} / ${this.totalScore}`)
	}

	createElement() {
		const gameboard = document.createElement('div');
		gameboard.className = 'gameboard';

		for(let rowIndex = 0; rowIndex < this.rowNumber; rowIndex++) {
			
			const row = document.createElement('div');
			row.className = 'board-row';
			for(let columnIndex = 0; columnIndex < this.columnNumber; columnIndex++) {
				const cell = this.cells[rowIndex * this.columnNumber + columnIndex];
				console.log(cell);
				row.appendChild(cell.setElement());
			}
			gameboard.appendChild(row)
		}
		return gameboard;
	}

	getTotalScore(fleet){
		let total = 0;
		fleet.array.forEach((row) => {
			total += row.filter((x) => {return x === 1}).length;
			});
		return total;
	}


}

const gameboardContainer = document.getElementById('gameContainer');
const gameResult = document.getElementById('gameResult');
const gameboard = new Gameboard({size: 10});
gameboardContainer.appendChild(gameboard.setElement());
