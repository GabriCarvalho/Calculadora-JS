let valorTotal = 0;
let buffer = "0";
let operadorAnterior;

const screen = document.querySelector('.screen');

function botaoClic(value){
    if(isNaN(value)){
        handleSymbol(value);
    }else{
        handleNumber(value);
    }
    screen.innerText = buffer;
}

function handleSymbol(symbol){
    switch(symbol){
        case 'C':
            buffer = "0";
            valorTotal = 0;
            break;
        case '=':
            if(operadorAnterior === null){
                return;
            }
            flushOperation(parseInt(buffer));
            operadorAnterior = null;
            buffer = valorTotal;
            valorTotal= 0;
            break;
        case '←':
            if(buffer.length === 1){
                buffer = '0'; 
            }else{
                buffer = buffer.substring(0, buffer.length -1);
            }
            break;
        case '+':
        case '−':
        case '×':
        case '÷':
            handleMath(symbol);
            break;

    }
}

function handleMath(symbol){
    if(buffer === '0'){
        return;
    }

    const intBuffer = parseInt(buffer);

    if(valorTotal === 0){
        valorTotal = intBuffer;
    }else{
        flushOperation(intBuffer);
    }
    operadorAnterior = symbol;
    buffer = '0';
}

function flushOperation(intBuffer){
    if(operadorAnterior === '+'){
        valorTotal += intBuffer;
    }else if(operadorAnterior === '−'){
        valorTotal -= intBuffer;
    }else if(operadorAnterior === '×'){
        valorTotal *= intBuffer;
    }else if (operadorAnterior === '÷'){
        valorTotal /= intBuffer;
    }
}

function handleNumber(numberString){
    if(buffer === "0"){
        buffer = numberString;
    }else{
        buffer += numberString;
    }
}

function init(){
    document.querySelector('.calc-buttons').addEventListener('click', function(event){
        botaoClic(event.target.innerText);
    })
}

init();