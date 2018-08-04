class CalController {
    constructor() {

        //_(underline) diz que o atributo é privado
        this._locale = 'pt-BR';
        this._displayCalcEl = document.querySelector('#display');
        this._dateCalcEl = document.querySelector('#data');
        this._timeCalcEl = document.querySelector('#hora');
        this._currentDate;
        this.initialized();
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

    setDisplayDateTime(){
        this.displayDate = this.currentDate.toLocaleDateString(this._locale,{
            day:"2-digit",
            month:"long",
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