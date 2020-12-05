class Calculator { 
    constructor(previous, current) { 
        this.previousTextField = previous;
        this.currentTextField = current;
        this.clear()
    }

    clear() {
        this.previous = '';
        this.current = '';
        this.operation = undefined;
        this.updateDisplay();
    }

    delete() {
        this.current = this.current.slice(0, -1).toString()
        this.updateDisplay()
    }

    append(number) {
        if(this.current.includes('.') && number === '.')return
        this.current = this.currentTextField.innerText + number + "";
        this.updateDisplay()        
    }

    chooseOperation(operation) {
        if(this.current == '')return
        if(this.operation != undefined) {
            this.compute()
        }

        this.operation = operation
        this.previous = this.current
        this.current = ''
        this.updateDisplay()
    }

    compute() {
        if(this.current == '' || this.previous == '')return
        
        switch(this.operation){
            case '+':
                this.current = (this.current - 0) + (this.previous - 0)
                break;
            case '-':
                this.current = (this.previous - 0) - (this.current - 0) 
                break;
            case 'x':
                this.current = (this.previous - 0) * (this.current - 0) 
                break;
            case '÷':
                if(this.current == '0'){
                    alert(`Can't divide by 0`)
                    this.current = '';
                }else {
                    this.current = (this.previous - 0) / (this.current - 0) 
                }
                
                break;
            default:
                return
        }
        this.previous = '';
        this.operation = undefined;
        this.current = this.current + ''
        this.updateDisplay();
    }



    updateDisplay() {
        this.previousTextField.innerText = this.previous + "";
        this.currentTextField.innerText = this.current + "";
        if(this.operation != undefined){
            this.previousTextField.innerText += " " + this.operation;
        }
    }
}

// Selectors
const clearBtn = document.querySelector('[data-clear]')
const deleteBtn = document.querySelector('[data-delete]')
const previous = document.querySelector('[data-previous]')
const current = document.querySelector('[data-current]')
const equals = document.querySelector('[data-equals]')
const numbers = document.querySelectorAll('[data-number]');
const operations = document.querySelectorAll('[data-operation]');

const calculator = new Calculator(previous, current);

clearBtn.addEventListener('click', () => {
    calculator.clear()
})

numbers.forEach(number => {
    number.addEventListener('click', (e) => {
        calculator.append(e.target.innerText)
    })
})

operations.forEach(operation => {
    operation.addEventListener('click', (e) => {
        calculator.chooseOperation(e.target.innerText)
    })
})

equals.addEventListener('click', () => {
    calculator.compute()
})

deleteBtn.addEventListener('click', () => {
    calculator.delete()
})
