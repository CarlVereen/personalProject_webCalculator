const displayContent = document.querySelector('#num-display');
// const buttonOne = document.querySelector("#one");
// const buttonTwo = document.querySelector("#two");
// const buttonThree = document.querySelector("#three");
// const buttonFour = document.querySelector("#four");
// const buttonFive = document.querySelector("#five");
// const buttonSix = document.querySelector("#six");
// const buttonSeven = document.querySelector("#seven");
// const buttonEight = document.querySelector("#eight");
// const buttonNine = document.querySelector("#nine");
// const buttonZero = document.querySelector("#zeroNum");
// const buttonPeriod = document.querySelector("#period");
// const buttonPosNeg = document.querySelector("#neg");
// const buttonRoot = document.querySelector("#root");
// const buttonPercent = document.querySelector("#perc");
// const buttonDivide = document.querySelector("#divi");
// const buttonMemoryRecallClear = document.querySelector("#mrc");
// const buttonMemoryPlus = document.querySelector("#m-plus");
// const buttonMemoryMinus = document.querySelector("#m-minus");
// const buttonMultiply = document.querySelector("#timesX");
// const buttonMinus = document.querySelector("#minus");
// const buttonPlus = document.querySelector("#plus");
// const buttonEqual = document.querySelector("#equal");
// const buttonOnClear = document.querySelector("#onc");
// const button = document.querySelectorAll('.calc-program');
let numericValueOfDisplay = [0];
let concatedNumber = numericValueOfDisplay;
let concatedNumberOperator;
let functionOperator;
let newMemorySection;


displayContent.innerHTML = numericValueOfDisplay[0];

function changeCurrentDisplay (data) {
  displayContent.innerHTML = data;
}

function mathOperationCalled (buttonPressed) {
  console.log(numericValueOfDisplay[callMemorySection()]);
  if(buttonPressed == 'equal'){
    displayMathOperationCalledResult();
  }else if (buttonPressed == 'perc') {
    concatedNumber = parseFloat(numericValueOfDisplay[callMemorySection()].join(''));
    concatedNumber /= 100;
    numericValueOfDisplay.push([concatedNumber]);
    changeCurrentDisplay(numericValueOfDisplay[numericValueOfDisplay.length-1]);
  }else if (buttonPressed == 'neg') {
    let minusReg = '-';
    if (numericValueOfDisplay[callMemorySection('check')].indexOf('-') > -1) {
      numericValueOfDisplay[callMemorySection('check')].shift();
      displayContent.innerHTML = displayContent.innerHTML.replace('-','');
    } else {
      numericValueOfDisplay[callMemorySection('check')].unshift('-');
      displayContent.innerHTML = `-${currentCalcDisplayString}`;
    }
  }else if (buttonPressed == 'root') {
    concatedNumber = parseFloat(numericValueOfDisplay[callMemorySection()].join(''));
    concatedNumber = Math.sqrt(concatedNumber);;
    numericValueOfDisplay.push([concatedNumber]);
    changeCurrentDisplay(numericValueOfDisplay[numericValueOfDisplay.length-1]);
  }else {
    concatedNumber = parseFloat(numericValueOfDisplay[callMemorySection()].join(''));
    console.log(`this is the stored number at concatedNumber ${concatedNumber}`);
    functionOperator = buttonPressed;
    numericValueOfDisplay.push([0]);
  }

  console.log(`this is the current memory section ${callMemorySection()}`);
  console.log(`This is what is stored at the current memory section ${numericValueOfDisplay[callMemorySection()]}`);
  console.log(`this is the number array ${numericValueOfDisplay}`);
}

function internalMathOperationCalled (buttonPressed){
  console.log('internalMathOperationCalled');
  let cNum = numericValueOfDisplay[callMemorySection()][numericValueOfDisplay[callMemorySection()].length-1];
  console.log(cNum);
  if(functionOperator == 'perc'){
    cNum /= 100;
  }
  console.log(cNum);
  return cNum;
}

function displayMathOperationCalledResult () {
  concatedNumberOperator = parseFloat(numericValueOfDisplay[callMemorySection()].join(''));
  if(functionOperator == 'plus'){
    concatedNumber += concatedNumberOperator;
  }else if (functionOperator == 'minus'){
    concatedNumber -= concatedNumberOperator;
  }else if (functionOperator == 'timesX'){
    concatedNumber *= concatedNumberOperator;
  }else if (functionOperator == 'divi'){
    concatedNumber /= concatedNumberOperator;
  }else if (functionOperator == 'perc'){
    concatedNumber = internalMathOperationCalled();
  }
  numericValueOfDisplay.push([concatedNumber]);
  console.log(`this is the current array ${numericValueOfDisplay[callMemorySection()]}`);
  changeCurrentDisplay(numericValueOfDisplay[numericValueOfDisplay.length-1]);
  console.log(`this is what is on the display ${numericValueOfDisplay[callMemorySection()][numericValueOfDisplay[callMemorySection()].length-1]}`);
}


function callMemorySection() { // This sets memory sections in the numericValueOfDisplay Array.
  return numericValueOfDisplay.length-1;
}

function causeSomethingToHappen (num) {
  // first check if everything is fresh or empty
  if(displayContent.innerHTML == '0' && numericValueOfDisplay.length < 2) {
    displayContent.innerHTML = num;
    numericValueOfDisplay.push([num]);
    console.log(`we have started a calculation at memory section  ${callMemorySection()} with display showing ${displayContent.innerHTML} and numeric value array value of ${numericValueOfDisplay} and length of ${numericValueOfDisplay.length} `);
  }else if (numericValueOfDisplay[callMemorySection()] != 0){
    displayContent.innerHTML += num;
    numericValueOfDisplay[callMemorySection()].push(num);
    console.log(`there is content in the display and numericValue the display now shows ${displayContent.innerHTML} and additional values were stored in a second level array ${numericValueOfDisplay}`);
    console.log(numericValueOfDisplay[numericValueOfDisplay.length-1]);
  }else if (numericValueOfDisplay[callMemorySection()].length == 1){
    displayContent.innerHTML = num;
    numericValueOfDisplay[callMemorySection('check')].push(num);
    console.log(`the current value array is ${numericValueOfDisplay[callMemorySection()]} and is ready for addition with ${concatedNumber} `);
  }else {
    displayContent.innerHTML += num;
    numericValueOfDisplay.push(num);
    console.log(`the else statement was called`);
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
      case "zero":
        let num = parseInt(e.target.value);
        causeSomethingToHappen(num);
        break;
      case "divi":
        mathOperationCalled(e.target.id);
        break;
      case "timesX":
        mathOperationCalled(e.target.id);
        break;
      case "minus":
        mathOperationCalled(e.target.id);
        break;
      case "plus":
        mathOperationCalled(e.target.id);
        break;
      case "equal":
        mathOperationCalled(e.target.id);
        break;
      case "neg":
        mathOperationCalled(e.target.id);
        //console.log(`This should change the number to negative or positive and reflect this change on the display`);
        break;
      case "root":
        mathOperationCalled(e.target.id);
        console.log(`This should return the square root of what is currently in the display`);
        break;
      case "perc":
        mathOperationCalled(e.target.id);
        //displayMathOperationCalledResult();
        //console.log(`This should return the display as a percent (divide it by 100)`);
        break;
      case "mrc":
        console.log(`This should first show the value of what is in memeory and on a second press clear the memory`);
        break;
      case "m-plus":
        console.log(`This should add the display to memory and then display current memeory`);
        break;
      case "m-minus":
        console.log(`This should subtract the display to memory and then display current memeory`);
        break;
      case "onc":
        displayContent.innerHTML = 0;
        numericValueOfDisplay = [0];
        console.log(`This should clear the display and turn on the calculator`);
        break;
      case "period":
        console.log(`This should add a period to the display changing the number to a float`);
        break;
      default:
        console.log("Didn't work");
        break;
    }
    // if (e.target !== e.currentTarget) {
    //     var clickedItem = e.target.id;
    //     console.log("Hello " + clickedItem);
    // }
    // e.stopPropagation();
}
