const container = document.getElementById('container');
const sizeBtn = document.getElementById('sizeBtn');

const MAX_SIZE = 100;
const CANVAS_SIZE = 960; 

createGrid(16);


sizeBtn.addEventListener('click', () => {
  let newSize = getGridSizeFromUser();
  if (newSize !== null) {
    createGrid(newSize);
  }
});


function getGridSizeFromUser() {
  while (true) {
    const input = prompt(`Enter number of squares per side (1–${MAX_SIZE}):`);
    if (input === null) return null; 

    const value = parseInt(input);
    if (!Number.isNaN(value) && value > 0 && value <= MAX_SIZE) {
      return value;
    }

    alert(`Please enter a valid number between 1 and ${MAX_SIZE}.`);
  }
}


function createGrid(size) {
 
  container.innerHTML = '';

  const squareSize = CANVAS_SIZE / size; 

  for (let i = 0; i < size * size; i++) {
    const square = document.createElement('div');
    square.classList.add('square');

   
    square.style.width = `${squareSize}px`;
    square.style.height = `${squareSize}px`;

    
    square.addEventListener('mouseover', handleHover);

    container.appendChild(square);
  }
}


function handleHover(e) {
  const square = e.target;

 
  if (!square.dataset.r) {
    const r = random255();
    const g = random255();
    const b = random255();

    square.dataset.r = r;
    square.dataset.g = g;
    square.dataset.b = b;
    square.dataset.opacity = '0.1';
  } else {
    
    let opacity = parseFloat(square.dataset.opacity);
    if (opacity < 1) {
      opacity = Math.min(opacity + 0.1, 1);
      square.dataset.opacity = opacity.toString();
    }
  }

  const r = square.dataset.r;
  const g = square.dataset.g;
  const b = square.dataset.b;
  const opacity = square.dataset.opacity;

  square.style.backgroundColor = `rgba(${r}, ${g}, ${b}, ${opacity})`;
}

function random255() {
  return Math.floor(Math.random() * 256);
}
