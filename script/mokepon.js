const divMokepon = document.getElementById('mokepon-div');
const arrInpMokepon = document.getElementsByName('pet');
const lblMokepon = document.getElementsByTagName('label')
const sectSelectPet = document.getElementById('select-pet');
const sectSelectAtck = document.getElementById('select-attack');
const actualPet = document.getElementById('actual-pet');
const enemyPet = document.getElementById('enemy-pet');
const pMssgLog = document.getElementById('message-log');
const divMssg = document.getElementById('messages');
const actualPetHp = document.getElementById('actual-pet-hp');
const enemyPetHp = document.getElementById('enemy-pet-hp');
const sectResrtartBtn = document.getElementById('restart');
const btnSelectPet = document.getElementById('select-pet-button');
const arrPlayerAttack = document.getElementById('attacks').children;
const btnRestart = document.getElementById('restart-button')
const attackTimerP = document.getElementById('timer');

let chosenMokepon, enemyChosenPet;

//
class Mokepon {
    constructor(name, hp, arrAttack) {
        this.name = name;
        this.hp = hp;
        this.arrAttack = arrAttack;
    }
}

let arrMokepon = [];

let hipodoge = new Mokepon('Hipodoge', 5, []);
let capipepo = new Mokepon('Capipepo', 3, []);
let ratigueya = new Mokepon('Ratigueya', 4, []);

arrMokepon.push(hipodoge, ratigueya, capipepo);



//
function randNumb(min, max) {
    return Math.floor(Math.random() * (max-min + 1) + min)
}

//
function timer(arg1, arg2) {
    function add(val) {
        attackTimerP.innerHTML = val;
        if (attackTimerP.innerHTML == 0) {
            arg2.style.background = "#ffffff";    
        }
    }
    arg2.style.background = "#112f58";
    let numb = 5;
    do{
        setTimeout(add, (5 - numb)*1000, numb);
        numb--
    } while(numb >= 0) 
    return numb
}
//
function mokeponIsChecked() {
    // Returns the text related to a cheked input. 
    for (let i = 0; i < arrInpMokepon.length; i++) {
        if(arrInpMokepon[i].checked) {
            return lblMokepon.item(i).innerHTML;
        }
    }
}


function selectPlayerPet() {
    arrMokepon.forEach((moke) => {
        if (moke.name == mokeponIsChecked()) {
            chosenMokepon = moke;
        }        
    });
    enemyChosenPet = arrMokepon[randNumb(0, arrInpMokepon.length-1)];

    if (chosenMokepon) {
        sectSelectAtck.style.display = 'flex'
        actualPet.innerHTML = chosenMokepon.name;
        enemyPet.innerHTML = enemyChosenPet.name;        
        actualPetHp.innerHTML = chosenMokepon.hp;
        enemyPetHp.innerHTML = enemyChosenPet.hp;
        alert(`Elegiste a ${chosenMokepon.name}`);
        alert(`El enemigo eligió ${enemyChosenPet.name}`);
        sectSelectPet.style.display = 'none';
    }else{
        alert('Elige algún mokepon');
    }
}

function attack(attackType) {
    function createMssg(mssg){
        let pCreated = document.createElement('p');

        for (let c = 0; c < divMssg.childElementCount; c++) {
            let child = divMssg.children[c];
            child.remove();
        }

        pCreated.innerHTML = mssg;
        divMssg.appendChild(pCreated)
        pMssgLog.innerHTML += mssg + '\n'
    }

    let playerAttck = attackType.innerHTML;
    let playerAttckMssg = `Tu mascota atacó con ${playerAttck}`;
    createMssg(playerAttckMssg);

    let enemyAttck = arrPlayerAttack[randNumb(0, arrPlayerAttack.length - 1)].innerHTML;
    let enemyAttckMssg = `El enemigo atacó con ${enemyAttck}`; 
    createMssg(enemyAttckMssg); 

    let enemyLostHp = 'El nemeigo pierde 1 de vida';
    
    if (playerAttck == enemyAttck) {
        createMssg('Empate');
    } else if(playerAttck == 'Fuego' && enemyAttck == 'Planta') {
        createMssg(enemyLostHp);
        enemyChosenPet.hp--;
    } else if(playerAttck == 'Agua' && enemyAttck == 'Fuego') {
        createMssg(enemyLostHp);
        enemyChosenPet.hp--;
    } else if(playerAttck == 'Planta' && enemyAttck == 'Agua') {
        createMssg(enemyLostHp);
        enemyChosenPet.hp--;
    } else {
        createMssg('Perdiste 1 de Vida');
        chosenMokepon.hp--;
    }

    actualPetHp.innerHTML = chosenMokepon.hp;
    enemyPetHp.innerHTML = enemyChosenPet.hp;

    if (chosenMokepon.hp <= 0 || enemyChosenPet.hp <= 0){
        if (!chosenMokepon.hp) {
            createMssg('Perdiste Mamawebaso');
        } else if (!enemyChosenPet.hp) {
            createMssg('GANASTE');
        }

        Object.values(arrPlayerAttack).forEach((atck) => {
            atck.disabled = true;
        })

        sectResrtartBtn.style.display = 'flex';
    }
}

//
function start() {
    arrMokepon.forEach((moke) => {
        let mokeId = moke.name.toLowerCase();
        divMokepon.innerHTML += `            
            <input type="radio" name="pet" id="${mokeId}">
            <label for="${mokeId}">${moke.name}</label>`
    })
    for (let i = 0; i < arrPlayerAttack.length; i++) {
        let playerAttack = arrPlayerAttack[i];
        playerAttack.addEventListener("click", function(){
            attack(playerAttack);
            timer(attackTimerP, playerAttack);
        });
    }    
    btnRestart.addEventListener('click', function(){location.reload()});
    btnSelectPet.addEventListener("click", selectPlayerPet);
}


window.addEventListener('load', start);
