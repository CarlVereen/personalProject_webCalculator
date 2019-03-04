const displayContent = document.querySelector('#num-display');
const theCalculator = document.querySelector("#calc-body");
let recordButtonPressed = [];
let calculationNumber = ['num1', 'num2'];
let calculationOperation = ['oper1', 'oper2'];
let calcMemory = 0;
theCalculator.addEventListener("click", buttonPressed, false);

const currentNumber = () => { return parseFloat(displayContent.innerHTML) };
const currentNumberString = () => { return displayContent.innerHTML };

//what button has been pushed
function buttonPressed (button) {
  if (isNaN(button.target.value)){
    whichCommandRequested(button)
  }else {
    whatToDoWithNumber(button)
  }
  recordButtonPressed.push(button.target.value);
}

// number button pushed what do we want to do with it
function whatToDoWithNumber(numberButton) {
  if(isNaN(parseInt(recordButtonPressed[recordButtonPressed.length-1])) && recordButtonPressed[recordButtonPressed.length-1] != '.' ){
    startNewNumber(numberButton.target.value);
  } else {
    addToCurrentNumber(numberButton.target.value);
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

//check for result request, or start of calc request, or operation on current, or memory
function whichCommandRequested(commandButton){
  //let currentNumber = parseFloat(displayContent.innerHTML);
  console.log(`command check called with ${commandButton.target.id}`);
  switch(commandButton.target.id) {
    case "divi":
    case "timesX":
    case "minus":
    case "plus":
      if (calculationNumber[0] == 'num1') {
        console.log(`the addition command was called and there is no num1 ${calculationNumber[0]}`);
        calculationRequest('start', commandButton.target.id);
      }else if (calculationNumber[0] != 'num1' && calculationOperation[0] == 'oper1') {
        console.log(`the addition command was called and there is a num1 ${calculationNumber[0]}`);
        calculationRequest('chageOperator', commandButton.target.id);
      }else if (calculationNumber[0] != 'num1' && calculationOperation[0] != 'oper1' && calculationOperation[0] != commandButton.target.id) {
        console.log(`change operation requested`);
         calculationRequest('chageOperator', commandButton.target.id);
      }
      break;
    case 'equal':
      //check for numbers and operator
      if (calculationNumber[0] == 'num1' || calculationOperation[0] == 'oper1') {
        // do nothing
        console.log(`no numbers ${calculationNumber[0]} or operators ${calculationOperation[0]} `);
      } else if (calculationNumber[0] != 'num1' && calculationOperation[0] == 'oper1'){
        console.log(`has numbers ${calculationNumber[0]} but no operators ${calculationOperation[0]} `);
      }else if (calculationNumber[0] != 'num1' && calculationOperation[0] != 'oper1'){
        if(recordButtonPressed[recordButtonPressed.length-1] == 'equal') {
          calculationRequest('performOperationWithStored');

        }else{
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
      mutateCurrentCalcMemory(commandButton.target.id);
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
    calculationNumber[1] = currentNumber();
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
    case 'plus':
      calc = numberOne + numberTwo;
      break;
    case 'minus':
      calc = numberOne - numberTwo;
      break;
    case 'timesX':
      calc = numberOne * numberTwo;
      //console.log(`times was called and this is the answer ${calc}`);
      break;
    case 'divi':
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
