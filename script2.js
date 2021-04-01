class Calculator {
  constructor(currentOperandTextElement, previousOperandTextElement) {
    this.currentOperandTextElement = currentOperandTextElement
    this.previousOperandTextElement = previousOperandTextElement
    this.readyToErase = false
    this.clear()
  }

  clear() {
    this.currentOperand = ''
    this.previousOperand = ''
    this.operation = undefined
  }

  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1)
  }

  appendNumber(number) {
    if (number === "." && this.currentOperand.includes(".")) return
    if (this.readyToErase === true){
      this.currentOperand = ''
    }
    this.currentOperand = this.currentOperand.toString() + number.toString()
    this.readyToErase = false
  }

  chooseOperation(operation) {
    if (this.currentOperand === '' && operation === '-') {
      this.appendNumber('-')
      this.updateDisplay()
      return
    }
    if (this.currentOperand === '') return
    if (this.previousOperand !== '') {
      this.compute()
    }
    this.operation = operation
    this.previousOperand = this.currentOperand
    this.currentOperand = ''
    this.readyToErase = false
  }

  compute() {
    let computation
    const prev = parseFloat(this.previousOperand)
    const current = parseFloat(this.currentOperand)
    if (isNaN(prev) || isNaN(current)) return
    switch(this.operation) {
      case '+':
        computation = prev + current
        break
      case '-':
        computation = prev - current
        break
      case '*':
        computation = prev * current
        break
      case '/':
        computation = prev / current
        break
      default:
        return
    }
    this.currentOperand = computation
    this.operation = undefined
    this.previousOperand = ''
  }

  getDisplayNumber(number) {
    const stringNumber = number.toString()
    const integerDigits = parseFloat(stringNumber.split('.')[0])
    const decimalDigits = stringNumber.split('.')[1]
    let integerDisplay
    if (isNaN(integerDigits)) {
      integerDisplay = ''
    } else {
      integerDisplay = integerDigits.toLocaleString('en', {maximumFractionDigits: 0})
    }
    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`
    } else return integerDisplay
  }

  updateDisplay() {
    this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand)
    if (this.operation != null) {
      this.previousOperandTextElement.innerText = `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
    } else {
      this.previousOperandTextElement.innerText = this.getDisplayNumber(this.previousOperand)
    }
  }
}

function handleKey(event) {
  const numberKeys = ['.','0','1','2','3','4','5','6','7','8','9']
  const operatorKeys = ['+', '-', '/', '*']
  const enter = ['Enter', '=']
  const deleteIt = ['Backspace', 'Delete']
  if (numberKeys.includes(event.key)) {
    calculator.appendNumber(event.key)
    calculator.updateDisplay()
  } else if (operatorKeys.includes(event.key)) {
    calculator.chooseOperation(event.key)
    calculator.updateDisplay()
  } else if (enter.includes(event.key)) {
    calculator.compute()
    calculator.readyToErase = true
    calculator.updateDisplay()
  } else if (deleteIt.includes(event.key)) {
    calculator.delete()
    calculator.updateDisplay()
  } else return
}

const currentOperandTextElement = document.querySelector(".current-operand")
const previousOperandTextElement = document.querySelector('.previous-operand')
const numButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operator]')
const equalButton = document.querySelector('#enter')
const deleteButton = document.querySelector('#bckspc')
const allClear = document.querySelector('#ce')

const calculator = new Calculator(currentOperandTextElement ,previousOperandTextElement)

numButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.appendNumber(button.innerText)
    calculator.updateDisplay()
  })
})

operationButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.chooseOperation(button.innerText)
    calculator.updateDisplay()
  })
})

equalButton.addEventListener('click', () => {
  calculator.compute()
  calculator.readyToErase = true
  calculator.updateDisplay()
})

allClear.addEventListener('click', () => {
  calculator.clear()
  calculator.updateDisplay()
})

deleteButton.addEventListener('click', () => {
  calculator.delete()
  calculator.updateDisplay()
})

document.addEventListener('keydown', handleKey)