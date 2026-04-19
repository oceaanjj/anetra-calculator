let num1 = 0;
let percent = 0;
let operator = null;
let num2 = null;
let screen = document.getElementById("screen");


function keypad(number) {
  if (operator === null) {
    num1 = num1 * 10 + parseInt(number);
    screen.value = num1;
  }
  else {
    num2 = num2 * 10 + parseInt(number);
    screen.value = num1 + operator + num2;
  }
  
  if (number !== 0 && (num1 === 0 || num2 === 0)) {
    if (operator === null) {
      num1 = parseInt(number);
    }
    else {
      num2 = parseInt(number);
    }
    screen.value = num1 + operator + num2;
  }
}

function calcuSign(op) {
    if (operator === null) {
      operator = op;
      num2 = null;    
    }
    else {
      operator = op;
      num2 = null;
    }
    screen.value = num1 + operator;
  }

function specialSign(){
  if(percent == 0){
    num1 = num1 / 100;
  }
  screen.value = num1;
}

function calculate() {
    if (operator === '+') {
      num1 = num1 + num2;
    } 
    else if (operator === '-') {
      num1 = num1 - num2;
    } 
    else if (operator === '\u00D7') {
      num1 = num1 * num2;
    }
    else if (operator === '\u00F7') {
      num1 = num1 / num2;
    }
    else if(operator === '%'){
      num2 = 100;
      percent = num1 / num2;
      num1 = percent;
    }
    else if (operator === null && num2 === null){
      screen.value = "";
    }
    else{
      num2 = 10;
      num1 = num1 * 10;
    }
  
    screen.value = "= " + num1;
    operator = operator; 
    num2 = num2;
  }

function allClear() {
  num1 = 0;
  operator = null;
  num2 = null;
  screen.value = "";
}

function del() {
  if (operator === null) {
    num1 = Math.floor(num1 / 10);
    screen.value = num1;
  } else {
    num2 = Math.floor(num2 / 10);
    screen.value = num1 + operator + num2;
  }
}
