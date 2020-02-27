var canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext('2d');

var maxLimit = 40;
var minLimit = 5;

var colors = ['#ff2e63', '#08d9d6', '#EAEAEA', '#F4A8AD', '#FFE3E6', '#C0FCF7', '#5BBAB5', '#FF2E63']; // BG = #252A34
// var colors = ['#fff', '#e3f6f5', '#bae8e8', '#bbded6', '#8ac6d1', '#edf7fa', '#bbe1fa', '#e4f9ff']; // BG = #272343
// var colors = ['#801336', '#c72c41', '#ee4540', '#ff6464', '#ffb99a', '#851d41', '#db3056', '#ff6666']; // BG = #2D132C
// var colors = ['#916dd5', '#d89cf6', '#f0e3ff', '#e1ccec', '#be9fe1', '#4a47a3', '#a278b5', '#400082']; // BG = #3E206D

// EventListener

var mouse = {
    x: undefined,
    y: undefined
};

window.addEventListener('mousemove', (e) => {
    mouse.x = e.x;
    mouse.y = e.y;
});

function Circle(x, y, velocityX, velocityY, radius) {
    this.x = x;
    this.y = y;
    this.velocityX = velocityX;
    this.velocityY = velocityY;
    this.radius = radius;
    this.color = colors[Math.floor(Math.random() * colors.length)];

    this.draw = () => {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.fillStyle = this.color;
        c.fill();

        this.update();
    }

    this.update = () => {
        if (this.x + this.radius >= canvas.width || this.x - this.radius <= 0)
            this.velocityX = -this.velocityX;

        if (this.y + this.radius >= canvas.height || this.y - this.radius <= 0)
            this.velocityY = -this.velocityY;

        //!

        if (mouse.x - this.x < 100 && mouse.x - this.x > -100 && mouse.y - this.y < 100 && mouse.y - this.y > -100) {
            if (this.radius < maxLimit) {
                this.radius += 1;
            }
        } else if (this.radius > minLimit)
            this.radius -= 1;


        this.x += this.velocityX;
        this.y += this.velocityY;

    }
}

var arr = []

for (let i = 0; i < 1000; i++) {
    var radius = Math.random() * 1;
    var x = Math.random() * (canvas.width - radius * 2) + radius;
    var y = Math.random() * (canvas.height - radius * 2) + radius;
    var velocityX = (Math.random() - 0.5) * 5;
    var velocityY = (Math.random() - 0.5) * 5;

    arr.push(new Circle(x, y, velocityX, velocityY, radius))
}

animate = () => {
    requestAnimationFrame(animate);

    c.clearRect(0, 0, innerWidth, innerHeight);

    for (let i = 0; i < arr.length; i++) {
        arr[i].draw();
    }
}

animate();