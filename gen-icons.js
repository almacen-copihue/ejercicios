const { createCanvas } = require('canvas');
const fs = require('fs');

function makeIcon(size) {
  const canvas = createCanvas(size, size);
  const ctx = canvas.getContext('2d');
  // fondo oscuro
  ctx.fillStyle = '#0d0d0f';
  ctx.fillRect(0, 0, size, size);
  // círculo acento
  ctx.fillStyle = '#c8f55a';
  ctx.beginPath();
  ctx.arc(size/2, size/2, size*0.42, 0, Math.PI*2);
  ctx.fill();
  // emoji
  ctx.font = `${size*0.45}px serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('💪', size/2, size/2 + size*0.03);
  return canvas.toBuffer('image/png');
}

fs.writeFileSync('icon-192.png', makeIcon(192));
fs.writeFileSync('icon-512.png', makeIcon(512));
console.log('Icons generated');
