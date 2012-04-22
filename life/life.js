
jQuery(document).ready(function($) {
	'use strict';
	var draw = false;
	console.log("Loading life");
	
	/* Grid object */
	function Grid(height, width) {
		this.height = height;
		this.width = width;
		this.cells = new Array();
		this.first = null;
		
		this.reset = function() {
			this.cells = this.first;
			this.first = null;
		};
		
		this.clear = function() {
			this.cells = new Array();
			this.first = null;
		};
		
		this.get = function(row, col) {
			return this.cells[row + (col * height)];
		};
		
		this.set = function(row, col, obj) {
			this.cells[row + (col * height)] = obj;
		};
		
		this.count = function(centerRow, centerCol) {
			var r, c, count = 0;
			for(r = -1; r < 2; r += 1) {
				for(c = -1; c < 2; c += 1) {
					var row = centerRow + r;
					var col = centerCol + c;
					if((r != 0 || c != 0)
							&& row >= 0 && row < this.height 
							&& col >= 0 && col < this.width) {
						if(this.get(row, col)) {
							count += 1;
						}
					}
				}
			}
			return count;
		};
		
		this.step = function(render, ctx) {
			var row, col, changes = 0;
			var next = new Array();
			if(!this.first) {
				this.first = this.cells;
			}
			for(row = 0; row < this.height; row += 1) {
				for(col = 0; col < this.width; col += 1) {
					var alive = this.get(row, col);
					var total = this.count(row, col);
					if(this.get(row, col)) {
						if(total < 2 || total > 3) {
							// Over crowded
							alive = false;
							changes += 1;
							if(render) {
								render(row, col, false, ctx);
							}
						} 
					} else {
						// Spawn a cell when 3 cells are close by
						if(total === 3) {
							alive = true;
							changes += 1;
							if(render) {
								render(row, col, true, ctx);
							}
						}
					}
					next[row + (col * height)] = alive;
				}
			}
			this.cells = next;
			return changes;
		};
		
		this.rand = function() {
			this.clear();
			var row, col;
			for(row = 0; row < this.height; row += 1) {
				for(col = 0; col < this.width; col += 1) {
					this.cells[row + (col * height)] = (Math.floor(Math.random() * 100) % 2);
					//console.log("Number:" + this.cells[row + (col * height)]);
				}
			}
		};
	}
	
	/* Configs */
	var mode = 'draw';
	var world = $('#world');
	var prevX = 0, prevY = 0;
	var FPS = 10;
	var CELL_SIZE = 5;
	var config= {
		CELL_SIZE: 2,
		FPS: 20
	};
	var grid = new Grid(world[0].height / CELL_SIZE, world[0].width / CELL_SIZE);
		
	function renderCell(row, col, alive, ctx) {
		if(alive) {
			ctx.fillStyle = 'rgb(0, 150, 25)';
		} else {
			
			if((row & 1 && col & 1) || (!(row & 1) && !(col & 1))) {
				ctx.fillStyle = 'white';
			} else {
				ctx.fillStyle = 'rgb(200, 200, 200)';
			}		
		}
		ctx.fillRect(col * CELL_SIZE, row * CELL_SIZE, CELL_SIZE, CELL_SIZE);
	}
	
	function renderStep() {
		var ctx = world[0].getContext('2d');
		var changes = grid.step(renderCell, ctx);
		ctx.stroke();
		return changes;
	}
	
	function renderGrid() {
		var row, col;
		var ctx = world[0].getContext('2d');
		ctx.beginPath();
		for(row = 0; row < grid.height; row += 1) {
			for(col = 0; col < grid.width; col += 1) {
				if(grid.get(row, col)) {
					ctx.fillStyle = 'rgb(0, 150, 25)';
				} else {
					
					if((row & 1 && col & 1) || (!(row & 1) && !(col & 1))) {
						ctx.fillStyle = 'white';
					} else {
						ctx.fillStyle = 'rgb(200, 200, 200)';
					}		
				}
				ctx.fillRect(col * CELL_SIZE, row * CELL_SIZE, CELL_SIZE, CELL_SIZE);
			}
		}
		ctx.stroke();
	}
	
	renderGrid();
	
	world.click(function(e) {
		if(mode === 'draw') {
			var offset = world.offset();
			var row = (e.pageY - offset.top);
			row = (row - (row % 5)) / 5;
			var col = (e.pageX - offset.left);
			col = (col - (col % 5)) / 5;
			console.log("Plotting row: " + row + " col: " + col);
			grid.set(row, col, true);
			renderGrid();
		}
	});
	
	world.mousedown(function(e) {
		if(mode === 'draw') {
			mode = 'select';
			var offset = world.offset();
			prevX = (e.pageX - offset.left);
			prevY = (e.pageY - offset.top);
		}
	});
	
	world.mousemove(function(e) {
		if(mode === 'select') {
			var offset = world.offset();
			var row = (e.pageY - offset.top);
			row = (row - (row % CELL_SIZE)) / CELL_SIZE;
			var col = (e.pageX - offset.left);
			col = (col - (col % CELL_SIZE)) / CELL_SIZE;
			console.log("Plotting row: " + row + " col: " + col);
			grid.set(row, col, true);
			renderGrid();
			prevX = (e.pageX - offset.left);
			prevY = (e.pageY - offset.top);
		}
	});
	
	world.mouseup(function(e) {
		if(mode === 'select') {
			mode = 'draw';
		}
	});
	
	var stepID = 0;
	function step() {
		console.log('step');
		if(!renderStep()) {
			pause();
		}
		if(mode === 'running') {
			stepID = window.setTimeout(step, 1000 / FPS);
		}
	}
	
	function run() {
		mode = 'running';
		$('#start-button').attr('value', 'Pause');
		$('#step-button').attr('disabled', 'disabled');
		step();
	}
	
	function pause() {
		mode = 'draw';
		window.clearTimeout(stepID);
		$('#start-button').attr('value', 'Start');
		$('#step-button').removeAttr('disabled');
	}
	
	$('#start-button').click(function(e) {
		if(mode === 'running') {
			pause();
		} else {
			run();
		}
	});
	
	
	$('#step-button').click(function(e) {
		if(mode === 'draw') {
			renderStep();
		}
	});
	
	$('#reset-button').click(function() {
		grid.reset();
		renderGrid();
	});
	
	$('#clear-button').click(function() {
		if(mode !== 'draw') {
			pause();
		}
		grid.clear();
		renderGrid();
	});
	
	$('#random-button').click(function() {
		pause();
		if(mode == 'draw') {
			grid.rand();
			renderGrid();
			run();
		}
	});
	
	console.log("Loaded");
});
