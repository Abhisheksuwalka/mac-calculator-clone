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
let cleanTheDisplay = function () {
  solveEquation = '0';
  updateDisplay();
};
document.querySelector('.clear').addEventListener('click', cleanTheDisplay);

// 2. plus minus change sign
let changeSign = function () {
  if (typeof solveEquation === 'number') {
    solveEquation *= -1;
    updateDisplay();
  } else if (typeof solveEquation === 'string') {
    solveEquation = '-1 * (' + solveEquation + ')';
    updateDisplay();
  }
};
document.querySelector('.change-sign').addEventListener('click', changeSign);

// 3. backspace functionality
let backSpace = function () {
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
};
document.querySelector('.backspace').addEventListener('click', backSpace);

// numbers
let inputMore = function (pressed_button) {
  if (typeof solveEquation !== 'string') solveEquation = String(solveEquation);
  solveEquation += pressed_button;
  updateDisplay();
};
document
  .querySelectorAll('.number, .arithematic, .bracket, .dot')
  .forEach(numberElement => {
    numberElement.addEventListener('mousedown', function () {
      inputMore(numberElement.textContent);
      numberElement.classList.add('active'); // Add 'active' class on mousedown
    });
    numberElement.addEventListener('mouseup', function () {
      numberElement.classList.remove('active'); // Remove 'active' class on mouseup
    });
  });

document
  .querySelector('#eularNumber')
  .addEventListener('mousedown', function () {
    this.classList.add('active');
    inputMore(Math.E);
  });
document.querySelector('#eularNumber').addEventListener('mouseup', function () {
  this.classList.remove('active');
});

document.addEventListener('keydown', function (event) {
  if (event.key === 'Enter' || event.key === '=') {
    evaluate();
  } else {
    // Check if the pressed key is a number between 0 to 9
    switch (event.key) {
      case 'e':
        inputMore(Math.E);
        break;
      case 'p':
        inputMore(Math.PI);
        break;
      case 'Backspace':
        break;
      case '%':
      case '0':
      case '1':
      case '2':
      case '3':
      case '4':
      case '5':
      case '6':
      case '7':
      case '8':
      case '9':
      case '.':
      case '+':
      case '-':
      case '*':
      case '/':
      case '(':
      case ')':
        inputMore(event.key);
        break;
      default:
        // Do nothing for other keys
        break;
    }
  }
});

let evaluate = function () {
  let current_Equation = document.querySelector('#display_content').textContent;
  try {
    let result = eval(current_Equation)
      .toFixed(14)
      .replace(/\.?0+$/, '');
    solveEquation = Number(result); // type is number
    updateDisplay();
  } catch (error) {
    // console.error('Syntax error:', error.message);
    document.querySelector('#message-content').textContent =
      '‼️ Invalid calculations';
  }
};
document.querySelector('#equalto').addEventListener('mousedown', function () {
  evaluate();
  this.classList.add('active'); // Add 'active' class on mousedown
});
document.querySelector('#equalto').addEventListener('mouseup', function () {
  this.classList.remove('active');
});

// Logic of this calculator
// 1. lets start with basic + - * / and %
// if 1 number is pressed , it will be stored in 'solveEquation' variable and after that , if any of [numbers] [.] [arithematics] are pressed, that will be concatinated in solveEquation
// we will solve errors and bugs later.
