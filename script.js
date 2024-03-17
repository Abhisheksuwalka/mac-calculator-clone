// 'use strict';
let solveEquation = '0';
let previousArithematic = '';

// On clicking a number
// document.querySelectorAll('.number').forEach(numberElement => {
//   numberElement.addEventListener('click', function () {
//     console.log(numberElement.textContent);
//     numberElement.classList.toggle('active');
//   });
// });

function updateDisplay() {
  if (solveEquation === '0') {
    solveEquation = '';
  }
  document.querySelector('#display_content').textContent = solveEquation;
}

// 1. to clean the display
document.querySelector('.clear').addEventListener('click', function () {
  solveEquation = '0';
  updateDisplay();
});

// 2. plus minus change sign
document.querySelector('.change-sign').addEventListener('click', function () {
  if (typeof solveEquation === 'number') {
    solveEquation *= -1;
    updateDisplay();
  } else if (typeof solveEquation === 'string') {
    solveEquation = '-1 * (' + solveEquation + ')';
    updateDisplay();
  }
});

// 3. backspace functionality
document.querySelector('.backspace').addEventListener('click', function () {
  if (typeof solveEquation === 'number') {
    solveEquation = string(solveEquation);
    solveEquation = Number(
      solveEquation.substring(0, string(solveEquation).length - 1)
    ); // number changed to string for floating numbers
    updateDisplay();
  } else if (typeof solveEquation === 'string') {
    solveEquation = solveEquation.substring(0, solveEquation.length - 1);
    updateDisplay();
  }
});

document
  .querySelectorAll('.number, .arithematic, .bracket, .dot')
  .forEach(numberElement => {
    numberElement.addEventListener('mousedown', function () {
      let pressed_button = numberElement.textContent;
      solveEquation += pressed_button;
      updateDisplay();
      numberElement.classList.add('active'); // Add 'active' class on mousedown
    });
    numberElement.addEventListener('mouseup', function () {
      numberElement.classList.remove('active'); // Remove 'active' class on mouseup
    });
  });

// document.querySelector('#equalto').addEventListener('click', function () {
//   let result = eval(solveEquation);
//   solveEquation = result;
//   updateDisplay();
// });

// FINAL OUTPUT
document.querySelector('#equalto').addEventListener('mousedown', function () {
  try {
    let result = eval(solveEquation)
      .toFixed(14)
      .replace(/\.?0+$/, '');
    solveEquation = Number(result); // type is number
    updateDisplay();
    this.classList.add('active'); // Add 'active' class on mousedown
  } catch (error) {
    // console.error('Syntax error:', error.message);
    document.querySelector('#message-content').textContent =
      '‼️ Invalid calculations';
  }
});
document.querySelector('#equalto').addEventListener('mouseup', function () {
  this.classList.remove('active');
});

// Logic of this calculator
// 1. lets start with basic + - * / and %
// if 1 number is pressed , it will be stored in 'solveEquation' variable and after that , if any of [numbers] [.] [arithematics] are pressed, that will be concatinated in solveEquation
// we will solve errors and bugs later.
