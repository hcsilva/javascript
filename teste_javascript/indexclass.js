/*
//modelo ANTIGO
let celular = function () {

    this.cor = 'prata';

    this.ligar = function () {
        console.log('uma ligação')
        return 'ligando';
    }


}

let objeto = new celular();

console.log(objeto.ligar());

//console.log(objeto.cor);
*/

//modelo NOVO
class celular {

    constructor() {
        this.cor = 'prata';
    }

    ligar() {
        console.log('uma ligação')
        return 'ligando';
    }
}

let objeto = new celular();

console.log(objeto.ligar());