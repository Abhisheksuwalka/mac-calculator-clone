// 'use strict';
let solveEquation = '0';
let previousArithematic = '';
let memoryBuffer = 0;

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

// percentage
let percentage = function () {
  final_result = evaluate();
  solveEquation = final_result / 100;
  solveEquation.toFixed(14).replace(/\.?0+$/, '');
  updateDisplay();
};
document
  .querySelector('#percentage')
  .addEventListener('mousedown', function () {
    this.classList.add('active');
    percentage();
  });
document.querySelector('#percentage').addEventListener('mouseup', function () {
  this.classList.remove('active'); // Remove 'active' class on mouseup
});

// memory buffer
// mc
document
  .querySelector('#memory-clear')
  .addEventListener('mousedown', function () {
    memoryBuffer = 0;
    this.classList.add('active');
  });
document
  .querySelector('#memory-clear')
  .addEventListener('mouseup', function () {
    this.classList.remove('active'); // Remove 'active' class on mouseup
  });

// m+
document
  .querySelector('#memory-add')
  .addEventListener('mousedown', function () {
    memoryBuffer = evaluate();
    updateDisplay();
    this.classList.add('active');
  });
document.querySelector('#memory-add').addEventListener('mouseup', function () {
  this.classList.remove('active'); // Remove 'active' class on mouseup
});
// m-
document
  .querySelector('#memory-sub')
  .addEventListener('mousedown', function () {
    solveEquation = evaluate() - memoryBuffer;
    updateDisplay();
    this.classList.add('active');
  });
document.querySelector('#memory-sub').addEventListener('mouseup', function () {
  this.classList.remove('active'); // Remove 'active' class on mouseup
});
// mr
document
  .querySelector('#memory-recall')
  .addEventListener('mousedown', function () {
    solveEquation = memoryBuffer;
    updateDisplay();
    this.classList.add('active');
  });
document
  .querySelector('#memory-recall')
  .addEventListener('mouseup', function () {
    this.classList.remove('active'); // Remove 'active' class on mouseup
  });

// numbers and others
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

// e
document
  .querySelector('#eularNumber')
  .addEventListener('mousedown', function () {
    this.classList.add('active');
    inputMore(Math.E);
  });
document.querySelector('#eularNumber').addEventListener('mouseup', function () {
  this.classList.remove('active');
});

// PI
document.querySelector('#pi').addEventListener('mousedown', function () {
  this.classList.add('active');
  inputMore(Math.PI);
});
document.querySelector('#eularNumber').addEventListener('mouseup', function () {
  this.classList.remove('active');
});

// logorithm

// KEYBOARD FUNCTIONALITY
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
        backSpace();
        break;
      case '%':
        percentage();
        break;
      case ' ':
        console.log(memoryBuffer);
        break;
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
    // Remove leading zeros from the current equation
    current_Equation = current_Equation.replace(/\b0+(\d+)/g, '$1');
    current_Equation = eval(current_Equation)
      .toFixed(14)
      .replace(/\.?0+$/, '');
    solveEquation = Number(current_Equation); // type is number
    updateDisplay();
  } catch (error) {
    // console.error('Syntax error:', error.message);
    document.querySelector('#message-content').textContent =
      '‼️ Invalid calculations';
  }
  return current_Equation;
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
