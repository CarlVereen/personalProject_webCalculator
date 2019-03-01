const displayContent = document.querySelector('#num-display');
let calculatorNumbersAndFunctions = [0];

let concatedNumber = calculatorNumbersAndFunctions;
let calcStorageMemory = 0;
let buttonCount = 0;


displayContent.innerHTML = calculatorNumbersAndFunctions[0];

function changeCurrentDisplay (data) {
  displayContent.innerHTML = data;
}

function collectInformationForCalculations (informationToAdd, pairedInformation) {
  if(pairedInformation == undefined ){
    calculatorNumbersAndFunctions.push([informationToAdd]);
  }else if (pairedInformation != undefined){
    calculatorNumbersAndFunctions.push([informationToAdd, pairedInformation]);
  }
}

function callMemorySection() { // This sets memory sections in the calculatorNumbersAndFunctions Array.
  return calculatorNumbersAndFunctions.length-1;
}


function changeStringToNumberForCalculations (value) {
  if(value == 'storeNumbers') {
    concatedNumber = parseFloat(calculatorNumbersAndFunctions[callMemorySection()].join(''));
    return "yes";
  }else if (value == 'retrieveNumbers') {
    if(isNaN(calculatorNumbersAndFunctions[callMemorySection()][0])){
      return parseFloat(calculatorNumbersAndFunctions[callMemorySection()].slice(1).join(''));;
    }else {
      return parseFloat(calculatorNumbersAndFunctions[callMemorySection()].join(''));
    }
  }
  return parseFloat(value.join(''));
}

function changeToPercentage () {
  let numToChange = changeStringToNumberForCalculations('retrieveNumbers');
  numToChange /= 100;
  collectInformationForCalculations (numToChange);
  changeCurrentDisplay(calculatorNumbersAndFunctions[callMemorySection()]);
}

function changePositiveNegative () {
  let minusReg = '-';
  if (calculatorNumbersAndFunctions[callMemorySection('check')].indexOf('-') > -1) {
    calculatorNumbersAndFunctions[callMemorySection('check')].shift();
    displayContent.innerHTML = displayContent.innerHTML.replace('-','');
  } else {
    calculatorNumbersAndFunctions[callMemorySection('check')].unshift('-');
    displayContent.innerHTML = `-${displayContent.innerHTML}`;
  }
}

function addDecimal () {
  let periodReg = /^[-+]?[0-9]+\.[0-9]+$/;
  //console.log(periodReg.test(calculatorNumbersAndFunctions[callMemorySection()]));
  if (periodReg.test(calculatorNumbersAndFunctions[callMemorySection()]) || calculatorNumbersAndFunctions[callMemorySection()].indexOf('.') > -1) {
    console.log(`already has decimal point`);
  } else {
    calculatorNumbersAndFunctions[callMemorySection()].push('.');
    displayContent.innerHTML = `${displayContent.innerHTML}.`;
  }
}

function calculatorMemory (operation) {
  let calcMem = changeStringToNumberForCalculations(calculatorNumbersAndFunctions[callMemorySection()-1]);
  console.log(calcMem);
  if (operation == 'm-plus') {
    calcStorageMemory += calcMem;
  }else if (operation == 'm-minus') {
    calcStorageMemory -= calcMem;
  }
  collectInformationForCalculations (operation, calcStorageMemory);
  console.log(calculatorNumbersAndFunctions);
}

function callCalculatorMemory () {
    if(calculatorNumbersAndFunctions[callMemorySection()][0] == calculatorNumbersAndFunctions[callMemorySection()-1][0]){
      displayContent.innerHTML = 0;
      calcStorageMemory = 0;
    }else {
      displayContent.innerHTML = calcStorageMemory;
    }
    collectInformationForCalculations (calcStorageMemory);


}

function calculateSquareRoot () {
  let numberToSquare = changeStringToNumberForCalculations('retrieveNumbers');
  numberToSquare = Math.sqrt(numberToSquare);;
  collectInformationForCalculations (numberToSquare);
  changeCurrentDisplay(calculatorNumbersAndFunctions[callMemorySection()]);
}


function displayMathOperationCalledResult () {
  let concatedNumberOperator = changeStringToNumberForCalculations('retrieveNumbers');
  switch (calculatorNumbersAndFunctions[callMemorySection()][0]) {
    case 'plus':
      concatedNumber += concatedNumberOperator;
      break;
    case 'minus':
      concatedNumber -= concatedNumberOperator;
      break;
    case 'timesX':
      concatedNumber *= concatedNumberOperator;
      break;
    case 'divi':
      concatedNumber /= concatedNumberOperator;
      break;
    default:

  }
  collectInformationForCalculations (concatedNumber);
  changeCurrentDisplay(calculatorNumbersAndFunctions[callMemorySection()]);
}



function causeSomethingToHappen (num) {
  // first check if everything is fresh or empty
  console.log(isNaN(calculatorNumbersAndFunctions[callMemorySection()][0]));
  console.log(calculatorNumbersAndFunctions[callMemorySection()].length == 1);
  if(displayContent.innerHTML == '0' && calculatorNumbersAndFunctions.length < 2) {
    displayContent.innerHTML = num;
    calculatorNumbersAndFunctions.push([num]);
  // if no calculation has been initiated and there are numbers entered
  }else if (isNaN(calculatorNumbersAndFunctions[callMemorySection()][0]) && calculatorNumbersAndFunctions[callMemorySection()].length == 1){
    displayContent.innerHTML = num;
    calculatorNumbersAndFunctions[callMemorySection()].push(num);
  }else if (calculatorNumbersAndFunctions[callMemorySection()] != 0){
    displayContent.innerHTML += num;
    calculatorNumbersAndFunctions[callMemorySection()].push(num);
  }else if (calculatorNumbersAndFunctions[callMemorySection()].length == 1){
    displayContent.innerHTML = num;
    calculatorNumbersAndFunctions[callMemorySection()].push(num);
  }else {
    displayContent.innerHTML += num;
    calculatorNumbersAndFunctions.push(num);
  }
}

var theCalculator = document.querySelector("#calc-body");
theCalculator.addEventListener("click", doSomething, false);

function doSomething(e) {
  let currentCalcDisplayString = displayContent.innerHTML;
  let currentCalcDisplayNumber = parseFloat(displayContent.innerHTML);
  //console.log(currentCalcDisplayNumber);
    switch (e.target.id) {
      case "one":
      case "two":
      case "three":
      case "four":
      case "five":
      case "six":
      case "seven":
      case "eight":
      case "nine":
      case "zeroNum":
      console.log(calculatorNumbersAndFunctions);

        causeSomethingToHappen(parseInt(e.target.value));
        console.log(callMemorySection());
        break;
      case "divi":
      case "timesX":
      case "minus":
      case "plus":
      console.log(calculatorNumbersAndFunctions);

        changeStringToNumberForCalculations('storeNumbers');
        collectInformationForCalculations (e.target.id);
        //collectInformationForCalculations (changeStringToNumberForCalculations('retrieveNumbers'));
        console.log(callMemorySection());

        break;
      case "root":
        calculateSquareRoot ();
        break;
      case "period":
        addDecimal ();
        break;
      case "equal":
        displayMathOperationCalledResult();
        break;
      case "perc":
        changeToPercentage ();
        break;
      case "neg":
        changePositiveNegative ();
        break;
      case "mrc":
        collectInformationForCalculations (e.target.id);
        callCalculatorMemory ();
        break;
      case "m-plus":
      case "m-minus":
        collectInformationForCalculations (e.target.id);
        calculatorMemory (e.target.id);
        break;
      case "onc":
        displayContent.innerHTML = 0;
        calculatorNumbersAndFunctions = [0];
        break;
      default:
        console.log("Didn't work");
        break;
    }

}
