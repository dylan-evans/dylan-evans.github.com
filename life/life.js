
jQuery(document).ready(function($) {
	'use strict';
	var draw = false;
	
	var config= {
		CELL_SIZE: 5,
		FPS: 20,
		width: 60,
		height: 40
	};

	//console.log("Loading life");
	
	/* Grid object */
	function Grid(height, width) {
		
		this.height = height;
		this.width = width;
		
		// The frame number
		this.frame = 0
		
		// This is the state of the grid when it is started
		this.first = null;
		
		// The current grid
		this.grid = new Array();
		
		// Change the Grid back to the start state
		this.reset = function() {
			this.grid = this.first;
			this.first = null;
			this.frame = 0;
		};
		
		// Clear the grid
		this.clear = function() {
			this.grid = new Array();
			this.first = null;
			this.frame = 0;
		};
		
		// Get the state of a cell
		this.get = function(row, col) {
			return this.grid[row + (col * height)];
		};
		
		// Set the state of a cell
		this.set = function(row, col, obj) {
			this.grid[row + (col * height)] = obj;
		};
		
		// Count the number of cells adjacent to a cell which are set 
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
		
		// Advance the grid one tick
		this.step = function(render, ctx) {
			var row, col, changes = 0;
			var next = new Array();
			if(!this.first) {
				this.first = this.grid;
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
			this.grid = next;
			this.frame += 1;
			return changes;
		};
		
		// Set the entire grid to a random state
		this.rand = function() {
			this.clear();
			var row, col;
			for(row = 0; row < this.height; row += 1) {
				for(col = 0; col < this.width; col += 1) {
					this.grid[row + (col * height)] = (Math.floor(Math.random() * 100) % 2);
					//console.log("Number:" + this.grid[row + (col * height)]);
				}
			}
		};
	}
	
	function Life(world, grid, config) {
		// Render a single cell on the grid
		this.renderCell = function(row, col, alive, ctx) {
			if(alive) {
				ctx.fillStyle = 'rgb(0, 150, 25)';
			} else {
				
				if((row & 1 && col & 1) || (!(row & 1) && !(col & 1))) {
					ctx.fillStyle = 'white';
				} else {
					ctx.fillStyle = 'rgb(200, 200, 200)';
				}		
			}
			ctx.fillRect(col * config.CELL_SIZE, row * config.CELL_SIZE, 
				config.CELL_SIZE, config.CELL_SIZE);
		}

		// Call step and render each cell which has changed
		this.renderStep = function() {
			var ctx = world[0].getContext('2d');
			var changes = grid.step(this.renderCell, ctx);
			ctx.stroke();
			return changes;
		}

		// Render every cell in the grid
		this.renderGrid = function() {
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
					ctx.fillRect(col * config.CELL_SIZE, row * config.CELL_SIZE, config.CELL_SIZE, config.CELL_SIZE);
				}
			}
			ctx.stroke();
		}
	}
	
	// The timeout id
	var stepID = 0;
	
	// Step through
	function step() {
		//console.log('step');
		if(!life.renderStep()) {
			pause();
		}
		if(mode === 'running') {
			stepID = window.setTimeout(step, 1000 / config.FPS);
		}
		$('#step-counter').text(grid.frame);
	}
	
	// Switch to run mode
	function run() {
		mode = 'running';
		$('#start-button').attr('value', 'Pause');
		$('#step-button').attr('disabled', 'disabled');
		step();
	}
	
	// Stop running
	function pause() {
		mode = 'draw';
		window.clearTimeout(stepID);
		$('#start-button').attr('value', 'Start');
		$('#step-button').removeAttr('disabled');
	}
	
	
	// If world is defined run the script
	var world = $('#world');
	if(world !== undefined) {
		var mode = 'draw';
		var grid = new Grid(world[0].height / config.CELL_SIZE, world[0].width / config.CELL_SIZE);
		var life = new Life(world, grid, config);
		
		life.renderGrid();
		
		// Any click on the grid
		world.click(function(e) {
			if(mode === 'draw') {
				var offset = world.offset();
				//Find the row and column
				var row = (e.pageY - offset.top);
				row = (row - (row % config.CELL_SIZE)) / config.CELL_SIZE;
				var col = (e.pageX - offset.left);
				col = (col - (col % config.CELL_SIZE)) / config.CELL_SIZE;
				//console.log("Plotting row: " + row + " col: " + col);
				grid.set(row, col, true);
				life.renderGrid();
			}
		});
		
		// 
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
				//console.log("Plotting row: " + row + " col: " + col);
				grid.set(row, col, true);
				life.renderGrid();
				prevX = (e.pageX - offset.left);
				prevY = (e.pageY - offset.top);
			}
		});
		
		world.mouseup(function(e) {
			if(mode === 'select') {
				mode = 'draw';
			}
		});
		
		$('#start-button').click(function(e) {
			if(mode === 'running') {
				pause();
			} else {
				run();
			}
		});
		
		
		$('#step-button').click(function(e) {
			if(mode === 'draw') {
				life.renderStep();
			}
		});
		
		$('#reset-button').click(function() {
			grid.reset();
			life.renderGrid();
		});
		
		// Clear button 
		$('#clear-button').click(function() {
			if(mode !== 'draw') {
				pause();
			}
			grid.clear();
			life.renderGrid();
		});
		
		// Random button sets 
		$('#random-button').click(function() {
			pause();
			if(mode == 'draw') {
				grid.rand();
				life.renderGrid();
				run();
			}
		});
	}
	//console.log("Loaded");
});
