class CalController {
    constructor() {

        //_(underline) diz que o atributo é privado
        this._operation = [];
        this._locale = 'pt-BR';
        this._displayCalcEl = document.querySelector('#display');
        this._dateCalcEl = document.querySelector('#data');
        this._timeCalcEl = document.querySelector('#hora');
        this._currentDate;
        this.initialized();
        this.iniButtonEvents();

    }

    initialized() {
        //função executada em um intervalo de tempo, milisegundos
        //arow Function

        this.setDisplayDateTime();

        setInterval(() => {
            this.setDisplayDateTime();

        }, 1000);



        //innerHTML, coloque uma informação lá dentro, no formato HTML
        // displayCalcEl.innerHTML="4567";
        //this._dateCalcEl.innerHTML = "01/01/2018";
        //this._timeCalcEl.innerHTML = "00:00";
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
        //para zera o array
        this._operation = [];

    }

    clearEntry() {
        //pop retira o último item adicionado no array
        this._operation.pop;

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


    addOperation(value) {

        console.log('A', isNaN(this.getLastOperation()));

        //isNaN (IS NOT A NUMBER), retorno true(STRING) or false(NUMBER)
        if (isNaN(this.getLastOperation())) {

            if (this.isOperator(value)) {
                this.setLastOperation(value);

            } else if (isNaN(value)) {
                console.log(value);

            } else {
                this._operation.push(value);
            }


        } else {
            let newValue = this.getLastOperation().toString() + value.toString();
            //push para inserir itens no array
            //this._operation.push(newValue);

            this.setLastOperation(parseInt(newValue));

        }


    }

    setError() {
        this.displayCalc = "Error";

    }

    execBtn(value) {

        switch (value) {
            case 'ac':
                this.clearAll();
                break;

            case 'ce':
                this.clearEntry();
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
                break;

            case 'ponto':
                this.addOperation('.')
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
        //all traz todos os elementos que ele encontrar na consulta, dentro do doc.
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
        this._displayCalcEl.innerHTML = value;
    }

    get currentDate() {
        return new Date();
    }

    set currentDate(value) {
        this._currentDate = value;
    }

}