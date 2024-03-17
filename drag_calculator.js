let calculator = document.querySelector('.calculator');
let offsetX, offsetY;

calculator.addEventListener('mousedown', startDrag);

function startDrag(e) {
  e.preventDefault(); // Prevent default behavior to avoid text selection

  offsetX = e.clientX - calculator.getBoundingClientRect().left;
  offsetY = e.clientY - calculator.getBoundingClientRect().top;

  document.addEventListener('mousemove', drag);
  document.addEventListener('mouseup', stopDrag);
}

function drag(e) {
  let newX = e.clientX - offsetX;
  let newY = e.clientY - offsetY;

  // Calculate the boundaries of the draggable area
  let maxX = window.innerWidth - calculator.offsetWidth;
  let maxY = window.innerHeight - calculator.offsetHeight;

  // Clamp the new position to stay within the boundaries
  let clampedX = Math.max(0, Math.min(newX, maxX));
  let clampedY = Math.max(0, Math.min(newY, maxY));

  // Update the position of the calculator element
  calculator.style.left = clampedX + 'px';
  calculator.style.top = clampedY + 'px';
}

function stopDrag() {
  document.removeEventListener('mousemove', drag);
  document.removeEventListener('mouseup', stopDrag);
}
