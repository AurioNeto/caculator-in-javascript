const visorJs = document.querySelector(".visor")
const visor = {
  text: "START TO CALCULATE",
  textArray: []
}
const calculating = {
  firstNumber: 0.0,
  secondNumber: 0.0,
  result: 0.0,
  operator: "",
  lastResult: null,
  switchedTo: "first"
}
visorJs.textContent = `${visor.text}`;

function visorShow() {
  visor.text = visor.textArray.join("")
  visorJs.textContent = `${visor.text}`;
}


class Button {
  constructor(id, type, value) {
    this.id = id;
    this.type = type;
    this.value = value;
    this.linkJs = document.querySelector(this.id);
    this.listen();
  };
  
  listen() {
    if(this.type === "numeric") {
      this.linkJs.addEventListener("click", this.numericClicked);
    } else if (this.type === "operator") {
      let value = this.value
      switch(value) {
        case "=":
          this.linkJs.addEventListener("click", this.equalClicked);
          break
        case "BACK":
          this.linkJs.addEventListener("click", this.backClicked);
          break
        case "CE":
          this.linkJs.addEventListener("click", this.clearClicked);
          break
        default:
          this.linkJs.addEventListener("click", this.operatorClicked);
      }
      
    } else {
      console.log("Insert a valid type")
    }
  };
}

class NumericButton extends Button {
  constructor(id, value) {
    super(id, "numeric", value);
  };

  numericClicked() {
    const addDot = this.value === "." && !visor.textArray.includes(".")
    const scapeDot = this.value === "." && visor.textArray.includes(".")
    if(addDot) {
      visor.textArray.push(this.value)
      visorShow();
    } else if(scapeDot) {
      return
    } else {
    visor.textArray.push(this.value)
    visorShow();
    };
  }
}

class OperatorButton extends Button {
  constructor(id, value) {
    super(id, "operator", value);
  };

  operatorClicked() {
    switch(calculating.switchedTo) {
      case "first":
        calculating.firstNumber = Number(visor.textArray.join(""))
        calculating.operator = `${this.value}`
        visor.textArray = [`${this.value}`]
        visorShow()
        visor.textArray = []
        calculating.switchedTo = "not-first"
        break
      case "not-first":
        calculating.secondNumber = Number(visor.textArray.join(""))
        calculating.result = calculator();
        calculating.lastResult = calculating.result
        calculating.operator = this.value
        calculating.firstNumber = calculating.result
        visor.textArray = [`${calculating.result} ${this.value}`]
        visorShow()
        visor.textArray = []
        break
      default:
        calculating.firstNumber = calculating.lastResult
        calculating.operator = this.value
        calculating.switchedTo = "not-first"
    }
  }

  equalClicked() {
    calculating.secondNumber = Number(visor.textArray.join(""))
    calculating.result = calculator();
    calculating.firstNumber = calculating.result
    calculating.lastResult = calculating.result
    calculating.switchedTo = "from-equal"
    visor.textArray = [`${calculating.result}`]
    visorShow()
    visor.textArray = []
  }

  backClicked() {
    visor.textArray.pop();
    visorShow()
  }

  clearClicked() {
    visor.textArray = ["START TO CALCULATE"]
    calculating.firstNumber = 0.0
    calculating.secondNumber = 0.0
    calculating.result = 0.0
    calculating.lastResult = null
    calculating.operator = ""
    calculating.switchedTo = "first"
    visorShow()
    visor.textArray = []
  }
}

function calculator() {
  let result 
  switch(calculating.operator) {
    case "+":
      result = calculating.firstNumber + calculating.secondNumber
      break
    case "-":
      result = calculating.firstNumber - calculating.secondNumber
      break
    case "/":
      result = calculating.firstNumber / calculating.secondNumber
      break
    case "*":
      result = calculating.firstNumber * calculating.secondNumber
      break
    default:
      console.log("how in hell you endup here?!")
  }
  
  return result
}

  

function pressedKey(e) {
  let event = e.key;
  switch(event){
    case "1":
      buttonOne.numericClicked()
      break
    case "2":
      buttonTwo.numericClicked()
      break
    case "3":
      buttonTrhee.numericClicked()
      break
    case "4":
      buttonFour.numericClicked()
      break
    case "5":
      buttonFive.numericClicked()
      break
    case "6":
      buttonSix.numericClicked()
      break
    case "7":
      buttonSeven.numericClicked()
      break
    case "8":
      buttonEight.numericClicked()
      break
    case "9":
      buttonNine.numericClicked()
      break
    case "0":
      buttonZero.numericClicked()
      break
    case ".":
      dotButton.numericClicked()
      break
    case "+":
      plusButton.operatorClicked()
      break
    case "=":
      equalButton.equalClicked()
      break
    case "Enter":
      equalButton.equalClicked()
      break
    case "-":
      minusButton.operatorClicked()
      break
    case "/":
      divButton.operatorClicked()
      break
    case "*":
      multButton.operatorClicked()
      break
    case "Backspace":
      backspaceButton.backClicked()
      break
    case "Delete":
      clearButton.clearClicked()
      break
    default:
      console.log("insert a valid number or operator")
  }
}

const buttonOne = new NumericButton("#one", 1)
const buttonTwo = new NumericButton("#two", 2)
const buttonTrhee = new NumericButton("#trhee", 3)
const buttonFour = new NumericButton("#four", 4)
const buttonFive = new NumericButton("#five", 5)
const buttonSix = new NumericButton("#six", 6)
const buttonSeven = new NumericButton("#seven", 7)
const buttonEight = new NumericButton("#eight", 8)
const buttonNine = new NumericButton("#nine", 9)
const buttonZero = new NumericButton("#zero", 0)
const dotButton = new NumericButton("#dot", ".")

const plusButton = new OperatorButton("#plus", "+")
const minusButton = new OperatorButton("#minus", "-")
const divButton = new OperatorButton("#div", "/")
const multButton = new OperatorButton("#mult", "*")
const equalButton = new OperatorButton("#enter", "=")
const backspaceButton = new OperatorButton("#bckspc", "BACK")
const clearButton = new OperatorButton("#ce", "CE")

document.addEventListener("keydown", pressedKey)

