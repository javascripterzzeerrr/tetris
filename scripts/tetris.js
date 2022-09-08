// Buttons
const btn = document.querySelector('.btnStart');
const fields = document.querySelectorAll('.tetris__col');

btn.addEventListener('click', gameLogicCycle1);

// Struct data
let gamesFields = [
    [0,0,1,1,0,0,0,0,0,0],
    [0,0,1,1,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,1,1,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
];

let lengthGameFieldsRow = gamesFields.length;
let lengthGameFieldsCols = gamesFields[0].length;

// Game's constant variable
let isGameContinue = false;

function gameLogicCycle1() {
    let indexStorage = {};
    for (let i = 0; i < lengthGameFieldsRow; i++) {
        for (let j = 0; j < lengthGameFieldsCols; j++) {
            if (gamesFields[i][j] === 1) {
                if ("1" in indexStorage === false) {
                    indexStorage["1"] = []; // массив для хранения индексов
                }
                indexStorage["1"].push([i,j]);
            }
        }
    }

    for (let key in indexStorage) {
        // перебираем индексы с самого последнего, чтобы они друг друга не закрывали
        for (let k = indexStorage[key].length - 1; k >= 0; k--) {
            console.log('arr:', indexStorage[key][k]);
            let I = indexStorage[key][k][0];
            let J = indexStorage[key][k][1];
            console.log('I J', I,J);
            if (I === 0) {
                index = J;
                fields[index].style.background = 'red';
                setTimeout(dropShape(I,J,index), 1000/2);
            } else if (I === 1) {
                index = J + lengthGameFieldsCols;
                fields[index].style.background = 'red';
                setTimeout(dropShape(I,J,index), 1000/2);
            } else if (I >= 2) {
                index = I * lengthGameFieldsCols + J;
                fields[index].style.background = 'red';
                setTimeout(dropShape(I,J,index), 1000/2);
            }
        }
    }
}

function dropShape(i,j,index) {
    let gameId = setInterval(() => {
        console.log(`Элемент с индексами ${i} ${j} двигается вниз`);
        if (gamesFields[i+1][j] === 1) {
            clearInterval(gameId);
            console.log('i+1',gamesFields);
        } else {
            fields[index].style.background = 'white';
            gamesFields[i][j] = 0; // обнуляем элементы фигуры в структуре
            gamesFields[i+1][j] = 1; // смещаем элемент фигуры в нашей структуре
            // нужно сместить фигуру на строку ниже
            index += lengthGameFieldsCols;
            fields[index].style.background = 'red';
            if (index + lengthGameFieldsCols >= fields.length) {
                clearInterval(gameId);
                console.log(gamesFields);
            } 
        }
        i++;
    }, 1000 / 2);
}

// function gameLogicCycle() {
//     for (let i = 0; i < lengthGameFieldsRow; i++) {
//         for (let j = 0; j < lengthGameFieldsCols; j++) {
//             let index = -1;
//             if (gamesFields[i][j] === 1) {
//                 console.log('entry 1');
//                 if (i === 0) {
//                     index = j;
//                     fields[index].style.background = 'red';
//                     setTimeout(dropShape(i,j,index), 1000/2);
//                 } else if (i === 1) {
//                     index = j + lengthGameFieldsCols;
//                     fields[index].style.background = 'red';
//                     setTimeout(dropShape(i,j,index), 1000/2);
//                 } else if (i >= 2) {
//                     index = (i) * lengthGameFieldsCols + j;
//                     fields[index].style.background = 'red';
//                     setTimeout(dropShape(i,j,index), 1000/2);
//                     console.log('index', index);
//                     console.log('fields[index]', fields[index]);
//                 }
//             }
//         }
//     }
// }