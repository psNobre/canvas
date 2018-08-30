var canvas = document.querySelector("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext('2d');

var mouse = {
    x: undefined,
    y: undefined
}

window.addEventListener('mousemove', function (event) {
    mouse.x = event.x;
    mouse.y = event.y;
});

window.addEventListener('mouseout', function (event) {
    mouse.x = undefined;
    mouse.y = undefined;
});

window.addEventListener('resize', function (event) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
});

function Circle(x, y, dx, dy, radius, color, maxRadius, minRadius) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.color = color;
    this.maxRadius = maxRadius;
    this.minRadius = minRadius;

    this.draw = function () {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.fillStyle = this.color;
        c.fill();
    }

    this.interactivity = function () {
        var normalColor = "#FFCC80";

        if (mouse.x - this.x < 50 &&
            mouse.x - this.x > -50 &&
            mouse.y - this.y < 50 &&
            mouse.y - this.y > -50){

            if (this.radius < this.maxRadius)
                this.radius +=1;
                this.color = color;
        } else if(this.radius > this.minRadius){
            this.radius -=1;
            this.color = normalColor;
        } else {
            this.radius = this.minRadius;
            this.color = normalColor;
        }
    }

    this.update = function () {
        if (this.x + this.radius > innerWidth || this.x - this.radius < 0){
            this.dx = -this.dx;
        }

        if (this.y + this.radius > innerHeight || this.y - this.radius < 0){
            this.dy = -this.dy;
        }

        this.x += this.dx;
        this.y += this.dy;

        this.interactivity();
        this.draw();
    }
}

var circleArray = [];
var colorArray = [
    '#FFB74D',
    '#FFA726',
    '#FF9800',
    '#FB8C00',
    '#F57C00'
];

function init() {
    circleArray = [];
    for(var i = 0 ; i < 1000; i++){
        var radius = 30;
        var x = Math.random() * (innerWidth - radius * 2) + radius;
        var y = Math.random() * (innerHeight - radius * 2) + radius;
        var dx = (Math.random() - 0.5) * 2;
        var dy = (Math.random() - 0.5) * 2;
        var maxRadius = 30;
        var minRadius = Math.floor(Math.random() * (7 - 3 + 1)) + 3;
        var colorRandomFromArray = colorArray[Math.floor(Math.random() * colorArray.length)];
        // var randomColor = '#'+(Math.random()*0xFFFFFF<<0).toString(16);  Random Colors

        var circle = new Circle(x, y, dx, dy, minRadius, colorRandomFromArray, maxRadius, minRadius);
        circleArray.push(circle);
    }
}

function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0 ,innerWidth, innerHeight);

    for(var i = 0 ; i < circleArray.length; i++){
        circleArray[i].update();
    }
}

animate();
init();


