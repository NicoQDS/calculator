let firstNum = null;
let secondNum = null;
let currentOperator = null;

// Arithmetic operation functions
function addNumbers(a, b) {
  return parseFloat(a) + parseFloat(b);
}

function subtractNumbers(a, b) {
  return parseFloat(a) - parseFloat(b);
}

function multiplyNumbers(a, b) {
  return parseFloat(a) * parseFloat(b);
}

function divideNumbers(a, b) {
  if (parseFloat(b) === 0) {
    return 'Error';
  }
  return parseFloat(a) / parseFloat(b);
}

// Get reference to the display
const display = document.querySelector('.calculator-display');

// Get all divs with id starting with "grid-cell-"
const allGridCells = document.querySelectorAll('[id^="grid-cell-"]');

// Add click listeners to number button divs (those with ids ending in digits)
allGridCells.forEach(cell => {
  const id = cell.id;
  // Check if the id ends with a number (digit)
  const lastChar = id.slice(-1);
  if (/\d/.test(lastChar)) {
    cell.addEventListener('click', () => {
      // Append the number to the display
      display.textContent += lastChar;
    });
  }
});

// Operator button handlers
// Map of grid-cell ids to their actual operator values
const operatorMap = {
  'grid-cell-+': '+',
  'grid-cell--': '-',
  'grid-cell-/': '/',
  'grid-cell-x': '*'
};

// Map of grid-cell ids to their display symbols
const operatorDisplay = {
  'grid-cell-+': '+',
  'grid-cell--': '-',
  'grid-cell-/': '/',
  'grid-cell-x': 'x'
};

// Add click listeners to operator buttons
Object.entries(operatorMap).forEach(([id, operator]) => {
  const button = document.getElementById(id);
  if (button) {
    button.addEventListener('click', () => {
      // Store in currentOperator (removing any existing value)
      currentOperator = operator;
      
      // Check if firstNum is null
      if (firstNum === null) {
        // Store the display value in firstNum
        firstNum = display.textContent;
        console.log(firstNum); // Log firstNum to console
      }
      
      // Add operator symbol and space to display
      display.textContent += ` ${operatorDisplay[id]} `;
      console.log(currentOperator); // Log currentOperator to console
    });
  }
});

// DEL button handler
const delButton = document.getElementById('grid-cell-DEL');
if (delButton) {
  delButton.addEventListener('click', () => {
    // Clear all variables
    firstNum = null;
    secondNum = null;
    currentOperator = null;
    // Clear display
    display.textContent = '';
  });
}

// Equals button handler
const equalsButton = document.getElementById('grid-cell-=');
if (equalsButton) {
  equalsButton.addEventListener('click', () => {
    if (firstNum == null) {
      // Do nothing if firstNum is null (no operation to perform)
      return;
    } else {
      // Extract digits after operator from display
      const displayText = display.textContent;
      
      // List of operators to search for
      const operators = [' + ', ' - ', ' / ', ' x '];
      
      // Find which operator is in the display and get text after it
      for (const op of operators) {
        const index = displayText.indexOf(op);
        if (index !== -1) {
          // Get text after operator (skip the operator itself and its spaces)
          const afterOperator = displayText.substring(index + op.length).trim();
          // Store in secondNum
          secondNum = afterOperator;
          let result;
          switch (currentOperator) {
            case '+':
              result = addNumbers(firstNum, secondNum);
              break;
            case '-':
              result = subtractNumbers(firstNum, secondNum);
              break;
            case '*':
              result = multiplyNumbers(firstNum, secondNum);
              break;
            case '/':
              result = divideNumbers(firstNum, secondNum);
              break;
            default:
              result = '';
          }
          console.log('firstNum:', firstNum); // Log for debugging
          console.log('secondNum:', secondNum); // Log for debugging
          console.log('currentOperator:', currentOperator); // Log for debugging
          display.textContent = String(result);
          firstNum = null;
          return;
        }
      }
    }
  });
}

