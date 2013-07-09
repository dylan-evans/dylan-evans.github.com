/*
 * A Candle for no particular reason 
 */
var debug = true;
var console = console || {};

console.log = (debug && console.log) ? console.log : function() {};

/*
 * Candle class models the 
 */
function Candle(baseX, baseY, size) {
    function randrange(min, max) {
        var diff = max - min;
        return ((Math.random() * 1000000) % diff) + min;
    }
    this.randrange = randrange;
    // The tip of the flame
    this.head = [0, 200];
    this.h_dir = [];
    this.shoulder = [-25, 150, 25, 150];
    // The middle of the flame
    this.waist = [-50, 100, 50, 100];
    this.w_dir = [];

    this.feet = [-10, 0, 10, 0];
    
    this.p_x = 0;
    this.breeze = 0;

    this.height = function() {
        return this.head[1];
    };

    this.width = function() {
        return this.waist[2] - this.waist[0];
    };

    this.frame = function() {
        // left, top, right, bottom
        return [

        ];
    };

    this.update = function() {

        this.head[1] = 350 - (this.waist[2] - this.waist[0]);
        var midX = this.waist[0] + ((this.waist[2] - this.waist[0]) / 2);

        if(this.head[0] < midX) {
            if(this.head[0] + 3 > midX) {
                this.head[0] = midX;
            } else {
                this.head[0]++ ;
            }
        } else {
            if(this.head[0] - 3 < midX) {
                this.head[0] = midX;
            } else {
                this.head[0]--;
            }
        }

        this.waist[0] += randrange(-5, 5);
        if(this.waist[0] > -30) this.waist[0] = -30;
        else if(this.waist[0] < -90) this.waist[0] = -90;
        this.waist[2] += randrange(-5, 5);
        if(this.waist[2] < 30) this.waist[2] = 30;
        else if(this.waist[2] > 90) this.waist[2] = 90;

        //this.head[1] = 350 - (this.waist[2] - this.waist[0]);
        //this.head[0] = this.waist[0] + ((this.waist[2] - this.waist[0]) / 2);
    };

    this.map = function(x, y) {
        return [
            this.feet[0] + x, y - this.feet[1],
            this.waist[0] + x + this.breeze, 
            y - this.waist[1],
            this.head[0] + x + this.breeze * 1.25, 
            y - this.head[1],
            this.waist[2] + x, y - this.waist[3],
            this.feet[2] + x, y - this.feet[3] 
        ];
    };

    this.draw = function(canvas, ctx, x, y) {
        ctx.beginPath();
        ctx.moveTo(this.feet[0] + x, y - this.feet[1]);
        ctx.bezierCurveTo(
            (this.waist[0] + x + this.breeze), (y - this.waist[1]),
            (this.waist[0] + x + this.breeze), (y - this.waist[1] - 10),
            (this.head[0] + x + this.breeze * 1.5), (y - this.head[1])
        );
        ctx.bezierCurveTo(
            (this.waist[2] + x + this.breeze), (y - this.waist[3] - 10),
            (this.waist[2] + x + this.breeze), (y - this.waist[3]),
            (this.feet[2] + x), (y - this.feet[3])
        );
        //var grad = ctx.createRadialGradient(x, y, 30, x, y, this.height());
        //grad.addColorStop(0, 'yellow');
        //grad.addColorStop(1, 'rgba(256,256,0, 0)');
        ctx.fillStyle = 'yellow';
        ctx.fill();


        ctx.beginPath();
        ctx.moveTo(this.feet[0] + x + 5, this.feet[1] + y);
        ctx.bezierCurveTo(
            (this.waist[0] + x + 20 + this.breeze), y - (this.waist[1] + 10),
            (this.waist[0] + x + 20 + this.breeze), y - (this.waist[1] + 20),
            (this.head[0] + x + this.breeze * 1.5), y - this.head[1] + 20
        );
        ctx.bezierCurveTo(
            (this.waist[2] + x + -20 + this.breeze), y - (this.waist[3] + 20),
            (this.waist[2] + x + -20 + this.breeze), y - (this.waist[3] + 10),
            this.feet[2] + x - 5, y - this.feet[3]  
        );
         var grad = ctx.createRadialGradient(canvas.width/2, canvas.height, 0
            , canvas.width/2, canvas.height, candle.height());
        grad.addColorStop(0, 'rgb(256, 80, 20)');
        grad.addColorStop(1, 'rgba(256,256,0, 0.2)');
        ctx.fillStyle = grad;
        ctx.fill();

    };
    
}

var candle;
function main() {
    var canvas = document.getElementById('candle-canvas');
    var ctx = canvas.getContext('2d');
    candle = new Candle();

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight - 20;

    var maxBreeze = 0;
    var breezeStrength = 2;

    var update = function() {
        canvas.width = canvas.width;
        candle.update();
        candle.draw(canvas, ctx, canvas.width/2, canvas.height);

        //boxBlurCanvasRGB('candle-canvas', map[2] - 10 , map[5] - 10, 
        //    map[6] + 10, canvas.height, 5, 1);
        var r = Math.random();
        if(r < 0.05) {
            //maxBreeze = candle.randrange(-20, 20);
            maxBreeze = Math.pow(Math.random(), 2) * 100;
            if(Math.random() > 0.5) maxBreeze = -maxBreeze;
            breezeStrength = 2 * Math.random();
            console.log("set maxBreeze " + maxBreeze);
        } else if(r > 0.9) {
            maxBreeze = 0;
        }
        if(candle.breeze > maxBreeze) {
            candle.breeze -= breezeStrength;
        } else if(candle.breeze < maxBreeze) {
            candle.breeze += breezeStrength;
        }
        setTimeout(update, 35);
    }
    update();
}

