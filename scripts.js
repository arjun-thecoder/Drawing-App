const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const colorPicker = document.getElementById('color');
const brushSize = document.getElementById('brush-size');
const clearButton = document.getElementById('clear');

// Set canvas dimensions
canvas.width = window.innerWidth * 0.8;
canvas.height = window.innerHeight * 0.6;

let drawing = false;

function startPosition(e) {
    drawing = true;
    draw(e);
}

function endPosition() {
    drawing = false;
    ctx.beginPath();
}

function draw(e) {
    if (!drawing) return;

    ctx.lineWidth = brushSize.value;
    ctx.lineCap = 'round';
    ctx.strokeStyle = colorPicker.value;

    ctx.lineTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
}

// Event listeners
canvas.addEventListener('mousedown', startPosition);
canvas.addEventListener('mouseup', endPosition);
canvas.addEventListener('mousemove', draw);
clearButton.addEventListener('click', () => ctx.clearRect(0, 0, canvas.width, canvas.height));

// Resize canvas when window size changes
window.addEventListener('resize', () => {
    const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    canvas.width = window.innerWidth * 0.8;
    canvas.height = window.innerHeight * 0.6;
    ctx.putImageData(imgData, 0, 0);
});
