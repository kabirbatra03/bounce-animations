const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;
const numOfpartlces = 300;
let particles = [];

const mouse = {
  x: null,
  y: null,
};

window.addEventListener('mousemove', (event) => {
  mouse.x = event.x;
  mouse.y = event.y;
});

setInterval(() => {
  mouse.x = undefined;
  mouse.y = undefined;
}, 200);

class Particle {
  constructor(x, y, size, weight) {
    this.x = x;
    this.y = y;
    this.size = size;
    // this.color = color;
    this.weight = weight;
  }

  draw = () => {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = '#fff';
    ctx.fill();
  };

  update = () => {
    this.size -= 0.05;
    if (this.size < 0) {
      this.x = mouse.x + Math.random() * 20 - 10;
      this.y = mouse.y + Math.random() * 20 - 10;
      this.size = Math.random() * 10 + 5;
      this.weight = Math.random() * 2 - 0.5;
    }
    this.y += this.weight;
    this.weight += 0.2;

    if (this.y > canvas.height - this.size) {
      this.weight *= -1;
    }
  };
}

init = () => {
  particles = [];
  for (let i = 0; i < numOfpartlces; i++) {
    let x = Math.random() * canvas.width;
    let y = Math.random() * canvas.height;
    let size = Math.random() * 10 + 2;
    let weight = 1;
    // let color = '#fff';
    particles.push(new Particle(x, y, size, weight));
  }
};

animate = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < numOfpartlces; i++) {
    particles[i].update();
    particles[i].draw();
  }
  requestAnimationFrame(animate);
};

init();
animate();
