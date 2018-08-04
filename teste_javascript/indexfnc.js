/*function calc(x1, x2, operator) {

    //eval função nativa, para operações aritméticas
    return eval(`${x1} ${operator} ${x2}`);

}*/


/*função anônima
(function (x1, x2, operator) {

    //eval função nativa, para operações aritméticas
    return eval(`${x1} ${operator} ${x2}`);

})(3,2,'*');
*/

//arrowfunction
let calc = (x1, x2, operator) => {

    return eval(`${x1} ${operator} ${x2}`);

}


let resultado = calc(3, 3, '-');

console.log(resultado);