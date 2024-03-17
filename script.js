// 'use strict';
let solveEquation = '0';
let previousArithematic = '';
let memoryBuffer = 0;

// On clicking a number
// document.querySelectorAll('.number').forEach(numberElement => {
//   numberElement.addEventListener('click', function () {
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
    solveEquation = String(solveEquation);
    solveEquation = Number(
      solveEquation.substring(0, solveEquation.length - 1)
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
    this.classList.add('active');
    memoryBuffer = 0;
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
    this.classList.add('active');
    memoryBuffer = evaluate();
    updateDisplay();
  });
document.querySelector('#memory-add').addEventListener('mouseup', function () {
  this.classList.remove('active'); // Remove 'active' class on mouseup
});
// m-
document
  .querySelector('#memory-sub')
  .addEventListener('mousedown', function () {
    this.classList.add('active');
    solveEquation = evaluate() - memoryBuffer;
    updateDisplay();
  });
document.querySelector('#memory-sub').addEventListener('mouseup', function () {
  this.classList.remove('active'); // Remove 'active' class on mouseup
});
// mr
document
  .querySelector('#memory-recall')
  .addEventListener('mousedown', function () {
    this.classList.add('active');
    solveEquation = memoryBuffer;
    updateDisplay();
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

// square the display output
document.querySelector('#square').addEventListener('mousedown', function () {
  this.classList.add('active');
  solveEquation = eval(evaluate() ** 2);
  updateDisplay();
});
document.querySelector('#square').addEventListener('mouseup', function () {
  this.classList.remove('active');
});

// cube the display output
document.querySelector('#cube').addEventListener('mousedown', function () {
  let finalValue = Number(evaluate());
  solveEquation = Math.pow(finalValue, 3); // eval(finalValue ** 3) or Math.pow(finalValue, 3); not working !!
  this.classList.add('active');
  updateDisplay();
});
document.querySelector('#cube').addEventListener('mouseup', function () {
  this.classList.remove('active');
});

// raise power to y
document
  .querySelector('#raiseToPowerY')
  .addEventListener('mousedown', async function () {
    this.classList.add('active');
    let finalValue = Number(evaluate());
    document.querySelector('#message-content').textContent = '‼️ Input y';
    solveEquation = 0;
    // Wait until solveEquation becomes non-zero
    await new Promise(resolve => {
      const checkNonZero = () => {
        if (solveEquation !== 0) {
          document.querySelector('#message-content').textContent = '';
          resolve();
        } else {
          setTimeout(checkNonZero, 100); // Check again after 100 milliseconds
        }
      };
      checkNonZero();
    });
    let power = Number(evaluate());
    console.log('final value : ' + finalValue + ' power: ' + power);
    solveEquation = Math.pow(finalValue, power);
    updateDisplay();
  });
document
  .querySelector('#raiseToPowerY')
  .addEventListener('mouseup', function () {
    this.classList.remove('active');
  });

// e raise to power x
document
  .querySelector('#eRaiseToPowerX')
  .addEventListener('mousedown', function () {
    this.classList.add('active');
    let finalValue = Number(evaluate());
    solveEquation = Math.pow(Math.E, finalValue); // eval(finalValue ** 3) or Math.pow(finalValue, 3); not working !!
    updateDisplay();
  });
document
  .querySelector('#eRaiseToPowerX')
  .addEventListener('mouseup', function () {
    this.classList.remove('active');
  });

// 10 raise to power x
document
  .querySelector('#tenRaiseToPowerX')
  .addEventListener('mousedown', function () {
    this.classList.add('active');
    let finalValue = Number(evaluate());
    solveEquation = Math.pow(10, finalValue); // eval(finalValue ** 3) or Math.pow(finalValue, 3); not working !!
    updateDisplay();
  });
document
  .querySelector('#tenRaiseToPowerX')
  .addEventListener('mouseup', function () {
    this.classList.remove('active');
  });

// reciprocal
document
  .querySelector('#reciprocal')
  .addEventListener('mousedown', function () {
    this.classList.add('active');
    let finalValue = Number(evaluate());
    solveEquation = 1 / finalValue; // eval(finalValue ** 3) or Math.pow(finalValue, 3); not working !!
    updateDisplay();
  });
document.querySelector('#reciprocal').addEventListener('mouseup', function () {
  this.classList.remove('active');
});

// squareroot the display output
document
  .querySelector('#squareRoot')
  .addEventListener('mousedown', function () {
    this.classList.add('active');
    solveEquation = Math.pow(evaluate(), 0.5);
    updateDisplay();
  });
document.querySelector('#squareRoot').addEventListener('mouseup', function () {
  this.classList.remove('active');
});

// cubeRoot the display output
document.querySelector('#cubeRoot').addEventListener('mousedown', function () {
  let finalValue = Number(evaluate());
  solveEquation = Math.pow(finalValue, 1 / 3); // eval(finalValue ** 3) or Math.pow(finalValue, 3); not working !!
  this.classList.add('active');
  updateDisplay();
});
document.querySelector('#cubeRoot').addEventListener('mouseup', function () {
  this.classList.remove('active');
});

// yth root of display output
document
  .querySelector('#ythRoot')
  .addEventListener('mousedown', async function () {
    this.classList.add('active');
    let finalValue = Number(evaluate());
    document.querySelector('#message-content').textContent = '‼️ Input y';
    solveEquation = 0;
    // Wait until solveEquation becomes non-zero
    await new Promise(resolve => {
      const checkNonZero = () => {
        if (solveEquation !== 0) {
          document.querySelector('#message-content').textContent = '';
          resolve();
        } else {
          setTimeout(checkNonZero, 100); // Check again after 100 milliseconds
        }
      };
      checkNonZero();
    });
    let power = Number(evaluate());
    solveEquation = Math.pow(finalValue, eval(1 / power));
    console.log('here solveEquation is of type :  ' + typeof solveEquation);
    updateDisplay();
  });
document.querySelector('#ythRoot').addEventListener('mouseup', function () {
  this.classList.remove('active');
});
// logorithm of display content
document.querySelector('#logorithm').addEventListener('mousedown', function () {
  this.classList.add('active');
  let finalValue = Number(evaluate());
  solveEquation = Math.log(finalValue);
  updateDisplay();
});
document.querySelector('#logorithm').addEventListener('mouseup', function () {
  this.classList.remove('active');
});

// logorithmBase10 of display content
document
  .querySelector('#logorithmBase10')
  .addEventListener('mousedown', function () {
    this.classList.add('active');
    let finalValue = Number(evaluate());
    solveEquation = Math.log(finalValue) / Math.log(10);
    updateDisplay();
  });
document
  .querySelector('#logorithmBase10')
  .addEventListener('mouseup', function () {
    this.classList.remove('active');
  });

function factorial(n) {
  if (n === 0 || n === 1) {
    return 1;
  } else {
    let result = 1;
    for (let i = 2; i <= n; i++) {
      result *= i;
    }
    return result;
  }
}
//factorial
document.querySelector('#factorial').addEventListener('mousedown', function () {
  this.classList.add('active');
  let finalValue = Number(evaluate());
  solveEquation = factorial(finalValue);
  updateDisplay();
});
document.querySelector('#factorial').addEventListener('mouseup', function () {
  this.classList.remove('active');
});

// trignometry of the display content
function convertAngle() {
  let angleInRadian;
  if (document.querySelector('#angle').textContent === 'Deg') {
    angleInRadian = evaluate() * (Math.PI / 180);
  }
  angleInRadian = evaluate();
  return angleInRadian;
}
//sin
document.querySelector('#sin').addEventListener('mousedown', function () {
  this.classList.add('active');
  let finalValue = convertAngle();
  solveEquation = Math.sin(finalValue);
  updateDisplay();
});
document.querySelector('#sin').addEventListener('mouseup', function () {
  this.classList.remove('active');
});

//cos
document.querySelector('#cos').addEventListener('mousedown', function () {
  this.classList.add('active');
  let finalValue = convertAngle();
  solveEquation = Math.cos(finalValue);
  updateDisplay();
});
document.querySelector('#cos').addEventListener('mouseup', function () {
  this.classList.remove('active');
});

//tan
document.querySelector('#tan').addEventListener('mousedown', function () {
  this.classList.add('active');
  let finalValue = convertAngle();
  solveEquation = Math.tan(finalValue);
  updateDisplay();
});
document.querySelector('#tan').addEventListener('mouseup', function () {
  this.classList.remove('active');
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

// change angle
document.querySelector('#angle').addEventListener('mousedown', function () {
  this.classList.add('active');
  if (document.querySelector('#angle').textContent == 'Rad') {
    document.querySelector('#angle').textContent = 'Deg';
  } else {
    document.querySelector('#angle').textContent = 'Rad';
  }
});
document.querySelector('#angle').addEventListener('mouseup', function () {
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

// random
document.querySelector('#random').addEventListener('mousedown', function () {
  this.classList.add('active');
  this.classList.add('active');
  solveEquation = Math.random();
  updateDisplay();
});
document.querySelector('#random').addEventListener('mouseup', function () {
  this.classList.remove('active');
});

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
  document.querySelector('#message-content').textContent = '';
  this.classList.remove('active');
});

// Logic of this calculator
// 1. lets start with basic + - * / and %
// if 1 number is pressed , it will be stored in 'solveEquation' variable and after that , if any of [numbers] [.] [arithematics] are pressed, that will be concatinated in solveEquation
// we will solve errors and bugs later.
