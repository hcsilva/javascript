class CalController {
    //let declarações dentro do bloco {}
    //Var pode ser acessada em qualquer momento dentro do código

    constructor() {

        //setando os atributos
        //_(underline) diz que o atributo é privado

        this._audio = new Audio('click.mp3');//audio web api, não é nativo do java script
        this._audioOnOff = false;
        this._lastOperator = "";
        this._lastNumber = "";
        this._operation = [];
        this._locale = 'pt-BR';
        this._displayCalcEl = document.querySelector('#display');
        this._dateCalcEl = document.querySelector('#data');
        this._timeCalcEl = document.querySelector('#hora');
        this._currentDate;
        this.initialized();
        this.iniButtonEvents();
        this.initKeyboard();

    }

    pasteFromClipboard() {

        document.addEventListener('paste', e => {
            let text = e.clipboardData.getData('Text');

            this.displayCalc = parseFloat(text);

        });
    }


    copyToClipboard() {

        let input = document.createElement('input');

        input.value = this.displayCalc;
        //precisa selecionar o corpo do html, para poder ser feita a colagem
        document.body.appendChild(input);
        input.select();

        document.execCommand("Copy");

        // para a ctrl + c, não aparecer na tela do usuário
        input.remove();
    }

    initialized() {
        //função executada em um intervalo de tempo, milisegundos

        this.setDisplayDateTime();

        //arow Function
        setInterval(() => {
            this.setDisplayDateTime();

        }, 1000);

        this.setLastNumberToDisplay();
        this.pasteFromClipboard();

        //innerHTML, coloque uma informação lá dentro, no formato HTML
        //displayCalcEl.innerHTML="4567";
        //this._dateCalcEl.innerHTML = "01/01/2018";
        //this._timeCalcEl.innerHTML = "00:00";


        //evento de duplo clique no botão AC, para ativar o som
        document.querySelectorAll('.btn-ac').forEach(btn => {

            btn.addEventListener('dblclick', e => {
                this.toggleAudio();
            });
        });
    }

    //Método para ligar e desligar o audio
    toggleAudio() {

        this._audioOnOff = !this._audioOnOff;

    }

    playAudio() {

        if (this._audioOnOff) {

            //o audio precisa ser reiniciado a cada clique, para pode acompanha
            //os cliques mais rápidos
            this._audio.currentTime = 0;
            this._audio.play();
        }
    }

    initKeyboard() {
        document.addEventListener('keyup', e => {

            this.playAudio();

            switch (e.key) {
                case 'Escape':
                    this.clearAll();
                    break;

                case 'Backspace':
                    this.clearEntry();
                    break;

                case '+':
                case '-':
                case '*':
                case '/':
                case '%':

                    this.addOperation(e.key)
                    break;

                case 'Enter':
                case '=':
                    this.calc();
                    break;

                case '.':
                case ',':
                    this.addDot()
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
                    this.addOperation(parseInt(e.key));
                    break;

                case 'c':
                    if (e.ctrlKey) this.copyToClipboard();
                    break;
            }

        });
    }

    //criando um  método onde vão ser passados todos os possíveis eventos
    addEventListenerAll(element, events, fn) {

        //split é usado para transformar uma string em um array
        //o split tem um parâmetro de entrada, que vai dizer qual vai ser o separador
        events.split(' ').forEach(event => {

            element.addEventListener(event, fn, false);

        });


    }

    clearAll() {
        //para zerar o array
        this._operation = [];
        // this._lastNumber='';
        //this._lastOperator ='';

        //  this.setLastNumberToDisplay();
        this.displayCalc = 0

    }

    clearEntry() {
        //pop retira o último item adicionado no array
        this._operation.pop();

        this.setLastNumberToDisplay();

    }

    getLastOperation() {
        return this._operation[this._operation.length - 1];

    }

    setLastOperation(value) {
        this._operation[this._operation.length - 1] = value;
    }

    isOperator(value) {
        return (['+', '-', '*', '%', '/'].indexOf(value) > -1);

    }

    pushOperation(value) {

        this._operation.push(value);

        if (this._operation.length > 3) {

            this.calc();
        }
    }


    getResult() {

        //join, serve para juntar tudo, ele precisa de um parâmetro que vai ser o separador
        //nesse caso ele está juntando tudo dentro do array
        try {
            return eval(this._operation.join(""));
        } catch (e) {
            setTimeout(()=>{
                this.setError();
            },1);
        }
    }


    calc() {

        let last = '';

        this._lastOperator = this.getLastItem();

        if (this._operation.length < 3) {
            let firstItem = this._operation[0];
            this._operation = [firstItem, this._lastOperator, this._lastNumber];

        }


        if (this._operation.length > 3) {
            last = this._operation.pop();
            this._lastNumber = this.getResult();

        } else if (this._operation.length == 3) {

            this._lastNumber = this.getLastItem(false);

        }


        let result = this.getResult();

        if (last == '%') {

            result /= 100;
            this._operation = [result];

        } else {
            this._operation = [result];

            if (last) this._operation.push(last);
        }

        this.setLastNumberToDisplay();
    }


    getLastItem(isOperator = true) {
        let lastItem;

        for (let i = this._operation.length - 1; i >= 0; i--) {

            if (this.isOperator(this._operation[i]) == isOperator) {
                lastItem = this._operation[i];
                break;
            }
        }

        if (!lastItem) {
            lastItem = (isOperator) ? this._lastOperator : this._lastNumber;

        }

        return lastItem;

    }


    setLastNumberToDisplay() {
        let lastNumber = this.getLastItem(false);

        if (!lastNumber) lastNumber = 0;

        this.displayCalc = lastNumber;
    }


    addOperation(value) {
        //isNaN (IS NOT A NUMBER), retorno true(STRING) or false(NUMBER)
        if (isNaN(this.getLastOperation())) {

            if (this.isOperator(value)) {
                this.setLastOperation(value);

            } else {
                this.pushOperation(value);

                this.setLastNumberToDisplay();
            }

        } else {

            if (this.isOperator(value)) {

                this.pushOperation(value);

            } else {

                let newValue = this.getLastOperation().toString() + value.toString();
                //push para inserir itens no array
                //this._operation.push(newValue);

                this.setLastOperation(newValue);

                this.setLastNumberToDisplay();
            }
        }
    }

    setError() {
        this.displayCalc = "Error";
    }

    addDot() {
        let LastOperation = this.getLastOperation();

        if (typeof LastOperation === 'string' && LastOperation.split('').indexOf('.') > -1) return;

        if (this.isOperator(LastOperation) || !LastOperation) {
            this.pushOperation('0.');
        } else {
            this.setLastOperation(LastOperation.toString() + '.');
        }

        this.setLastNumberToDisplay();


    }



    execBtn(value) {

        this.playAudio();
        switch (value) {
            case 'ac':
                this.clearAll();
                break;

            case 'ce':
                this.clearEntry();
                console.log('entrou aqui')
                break;

            case 'soma':
                this.addOperation('+')
                break;

            case 'subtracao':
                this.addOperation('-')
                break;

            case 'divisao':
                this.addOperation('/')
                break;

            case 'multiplicacao':
                this.addOperation('*')
                break;

            case 'porcento':
                this.addOperation('%')
                break;

            case 'igual':
                this.calc();
                break;

            case 'ponto':
                this.addDot()
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
                this.addOperation(parseInt(value));
                break;


            default:
                this.setError(parseInt(value));
                break;


        }

    }



    iniButtonEvents() {
        //querySelectorAll traz todos os elementos que ele encontrar na consulta, dentro do doc.
        let buttons = document.querySelectorAll("#buttons > g, #parts > g");

        buttons.forEach((btn, index) => {

            //click(clique do mouse), drag(clicar e arrastar)
            this.addEventListenerAll(btn, 'click drag', e => {
                let textBtn = btn.className.baseVal.replace("btn-", "");
                this.execBtn(textBtn);
            });


            this.addEventListenerAll(btn, "mouseover mouseup mousedown", e => {
                btn.style.cursor = "pointer";

            });



        });


    }

    setDisplayDateTime() {
        this.displayDate = this.currentDate.toLocaleDateString(this._locale, {
            day: "2-digit",
            month: "long",
            year: "numeric"
        });
        this.displayTime = this.currentDate.toLocaleTimeString(this._locale);

    }


    get displayTime() {
        return this._timeCalcEl.innerHTML;
    }

    set displayTime(value) {
        this._timeCalcEl.innerHTML = value;
    }

    get displayDate() {
        return this._dateCalcEl.innerHTML;
    }

    set displayDate(value) {
        this._dateCalcEl.innerHTML = value;
    }


    get displayCalc() {
        return this._displayCalcEl.innerHTML;
    }

    set displayCalc(value) {
                
        if (value.toString().length > 10){
            this.setError();
            return false;
        }

        this._displayCalcEl.innerHTML = value;
    }

    get currentDate() {
        return new Date();
    }

    set currentDate(value) {
        this._currentDate = value;
    }

}