const displayContent = document.querySelector('#num-display');
const theCalculator = document.querySelector("#calc-body");
let recordButtonPressed = [];
let calculationNumber = ['num1', 'num2'];
let calculationOperation = ['oper1', 'oper2'];
let calcMemory = 0;
const numberKeyCodeArray = ['Digit0', 'Digit1', 'Digit2', 'Digit3', 'Digit4', 'Digit5', 'Digit6', 'Digit7', 'Digit8', 'Digit9' ];
const operationKeyCodeArray = ['+', '-', '*', '/', 'Enter', 'NumpadEnter']
theCalculator.addEventListener("click", buttonPressed, false);
const currentNumber = () => { return parseFloat(displayContent.innerHTML) };
const currentNumberString = () => { return displayContent.innerHTML };

document.addEventListener('keyup', function (event) {
  if (event.defaultPrevented) {
    return;
}
  let key = event.key || event.keyCode;

  if (operationKeyCodeArray.indexOf(key) > -1){
        whichCommandRequested(key);
        console.log(`it was an operation`);

  }else if ((key >=0 && key <= 9) || numberKeyCodeArray.indexOf(key) > -1) {
        console.log(`it was a number key`);
        keyboardWhatToDoWithNumber(key);
    }
  recordButtonPressed.push(key);
});




//what button has been pushed
function buttonPressed (button) {
  if (isNaN(button.target.value)){
    getValueOfClick(button);
  }else {
    screenWhatToDoWithNumber(button);
  }
  recordButtonPressed.push(button.target.value);
}

// number button pushed what do we want to do with it
function screenWhatToDoWithNumber(numberButton) {
  if(isNaN(parseInt(recordButtonPressed[recordButtonPressed.length-1])) && recordButtonPressed[recordButtonPressed.length-1] != '.' ){
    startNewNumber(numberButton.target.value);
  } else {
    addToCurrentNumber(numberButton.target.value);
  }
}

function keyboardWhatToDoWithNumber(numberButton) {
  if(isNaN(parseInt(recordButtonPressed[recordButtonPressed.length-1])) && recordButtonPressed[recordButtonPressed.length-1] != '.' ){
    startNewNumber(numberButton);
  } else {
    addToCurrentNumber(numberButton);
  }
}

// clear the display and start a new number with the number provided
function startNewNumber(number) {
  mutateDisplay(number);
}

//take current number as string and add new number on the right
function addToCurrentNumber(value){
  let numberString = currentNumberString();
  numberString += value;
  mutateDisplay(numberString);
}

function mutateDisplay(number){
  displayContent.innerHTML = number;
}

function getValueOfClick (buttonClicked) {
  whichCommandRequested(buttonClicked.target.value);
}

function getValueOfKey (keyPressed) {
  whichCommandRequested(keyPressed);
}

//check for result request, or start of calc request, or operation on current, or memory
function whichCommandRequested(commandButton){
  console.log(`this command was called ${commandButton}`);
  switch(commandButton) {
    case "/":
    case "*":
    case "-":
    case "+":
      if (calculationNumber[0] == 'num1') {
        console.log(`the addition command was called and there is no num1 ${calculationNumber[0]}`);
        calculationRequest('start', commandButton);
      }else if (calculationNumber[0] != 'num1' && calculationOperation[0] == 'oper1') {
        console.log(`the addition command was called and there is a num1 ${calculationNumber[0]}`);
        calculationRequest('chageOperator', commandButton);
      }else if (calculationNumber[0] != 'num1' && calculationOperation[0] != 'oper1' && calculationOperation[0] != commandButton) {
        console.log(`change operation requested`);
         calculationRequest('chageOperator', commandButton);
      }
      break;
    case 'Enter':
      //check for numbers and operator
      console.log(`Enter command called successfully`);
      if (calculationNumber[0] == 'num1' || calculationOperation[0] == 'oper1') {
        // do nothing
        console.log(`no numbers ${calculationNumber[0]} or operators ${calculationOperation[0]} `);
      } else if (calculationNumber[0] != 'num1' && calculationOperation[0] == 'oper1'){
        console.log(`has numbers ${calculationNumber[0]} but no operators ${calculationOperation[0]} `);
      }else if (calculationNumber[0] != 'num1' && calculationOperation[0] != 'oper1'){
        console.log(`has number and operator here is last button pressed ${recordButtonPressed[recordButtonPressed.length-1]}`);
        if(recordButtonPressed[recordButtonPressed.length-1] == 'Enter') {
          calculationRequest('performOperationWithStored');

        }else{
          console.log(`perform with current called`);
          calculationRequest('performOperationWithCurrent');
        }
      }
      //if they exist process calculation and display result
      break;
    case 'neg':
      currentNumberNegative();
      break;
    case 'root':
      currentNumberSquareRoot();
      break;
    case 'perc':
      currentNumberPercentage();
      break;
    case 'mrc':
      console.log(`This is what is on the record as being pressed ${recordButtonPressed[recordButtonPressed.length - 1]}`);
      if(recordButtonPressed[recordButtonPressed.length - 1] == 'mrc') {
        mutateCurrentCalcMemory('erase');
      }else {
        callCalcMemory();
      }
      break;
    case 'm-plus':
    case 'm-minus':
      mutateCurrentCalcMemory(commandButton);
      break;
    case "period":
      currentNumberFloat();
      break;
    case "onc":
      mutateDisplay(0);
      calculationRequest('clear', 'num1');
      break;
    default:
      //do nothing
      break;
  }
}

function calculationRequest (requestType, operationRequest){
  //let currentNumber = parseFloat(displayContent.innerHTML);
  if (requestType == 'start') {
    calculationNumber[0] = currentNumber();
    calculationOperation[0] = operationRequest;
    //console.log(`calculation request started with ${calculationNumber[0]} and operation ${calculationOperation[0]}`);
  }else if (requestType == 'chageOperator') {
    calculationOperation[0] = operationRequest;
  } else if (requestType == 'performOperationWithCurrent'){
    console.log(`here is what is in the equation ${calculationNumber} with ${calculationOperation}`);
    calculationNumber[1] = currentNumber();
    console.log(`here is what is in the equation ${calculationNumber} with ${calculationOperation}`);
    performCalculationRequest(calculationNumber[0], calculationOperation[0], calculationNumber[1]);
  }else if (requestType == 'clear') {
    calculationNumber[0] = operationRequest;
    //console.log(`this is what is at num1 ${calculationNumber[0]},
    //this is what is at num2 ${calculationNumber[1]} and this is the operator ${calculationOperation[0]}`);
    //calculationOperation[0] = 'oper1';
    //calculationNumber[1] = 'num2';
  }else if (requestType == 'performOperationWithStored'){
    performCalculationRequest(calculationNumber[0], calculationOperation[0], calculationNumber[1]);
  }

}

function performCalculationRequest (numberOne, operator, numberTwo) {
 // console.log(`this is the number ${numberOne} provided, this is the operator ${operator} and this is the other number ${numberTwo}`);
  let calc;
  switch (operator) {
    case '+':
      calc = numberOne + numberTwo;
      break;
    case '-':
      calc = numberOne - numberTwo;
      break;
    case '*':
      calc = numberOne * numberTwo;
      //console.log(`times was called and this is the answer ${calc}`);
      break;
    case '/':
      calc = numberOne / numberTwo;
      break;
  }
  calculationRequest('clear', calc);
  mutateDisplay(calc);

}

function currentNumberNegative () {
  let currentNumberString = displayContent.innerHTML;
  if(currentNumberString[0] == '-') {
    currentNumberString = currentNumberString.slice(1);
  }else{
    currentNumberString = '-' + currentNumberString;
  }
  mutateDisplay(currentNumberString);
  recordButtonPressed.push(currentNumberString);
}

function currentNumberSquareRoot () {
  mutateDisplay(Math.sqrt(currentNumber()));
}

function currentNumberPercentage () {
  mutateDisplay(currentNumber()/100);
}


function mutateCurrentCalcMemory(action){
  //let currentNumber = parseFloat(displayContent.innerHTML);
  if (action == 'm-plus'){
    calcMemory += currentNumber();
  }else if (action == 'm-minus') {
    calcMemory -= currentNumber();
  }else if (action == 'erase') {
    calcMemory = 0;
  }
  callCalcMemory();
}

function callCalcMemory(){
  mutateDisplay(calcMemory);
}

function currentNumberFloat(){
  let numberString = currentNumberString();
  if(numberString.indexOf('.') > -1) {
    //do nothing it already has a decimal
  }else{
    numberString += '.' ;
  }
  mutateDisplay(numberString);
  recordButtonPressed.push(numberString);
}
