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
const divAttack = document.getElementById('attacks');
const arrPlayerAttack = document.getElementById('attacks').children;
const btnRestart = document.getElementById('restart-button')
const arrPetDescription = document.getElementsByClassName('pet-description');

let chosenMokepon, enemyChosenPet;

//
const atckGolpeNormal = ({
    Name: 'Golpe Normal',
    Type: 'Normal',
    Cooldown: 2
})

const atckPlacaje = ({
    Name: 'Placaje',
    Type: 'Normal',
    Cooldown: 2
})

const atckFuegoEterno = ({
    Name: 'Fuego Eterno',
    Type: 'Fuego',
    Cooldown: 5
})

const atckSemillaDelEden = ({
    Name: 'SemillaDelEden',
    Type: 'Planta',
    Cooldown: 4
})

const atckDiluvioDivino = ({
    Name: 'DiluvioDivino',
    Type: 'Agua',
    Cooldown: 5
})

//
class Mokepon {
    constructor(name, type, hp) {
        this.name = name;
        this.type = type;
        this.hp = hp;
        this.arrAttack = [];
    }
}

let arrMokepon = [];

let hipodoge = new Mokepon('Hipodoge', 'Agua', 5);
let capipepo = new Mokepon('Capipepo', 'Planta', 3);
let ratigueya = new Mokepon('Ratigueya', 'Fuego', 4);

arrMokepon.push(hipodoge, ratigueya, capipepo);
arrMokepon.forEach((moke)=>{
    moke.arrAttack.push(atckPlacaje, atckGolpeNormal);
    if (moke.type == 'Fuego') moke.arrAttack.push(atckFuegoEterno);
    (moke.type == 'Agua') ? moke.arrAttack.push(atckDiluvioDivino): {} ;
    (moke.type == 'Planta') && moke.arrAttack.push(atckSemillaDelEden);
})


//
function randNumb(min, max) {
    return Math.floor(Math.random() * (max-min + 1) + min)
}

//
function timer(argAtckBtn) {
    function add(val) {
        attackTimerP.innerHTML = val;
        if (attackTimerP.innerHTML == 0) {
            argAtckBtn.style.background = "#ffffff";
            attackTimerP.innerHTML = atckName;
            attackTimerP.disabled = false;
        }
    }
    
    
    let atckName = argAtckBtn.innerHTML;

    let attackTimerP = document.getElementById(argAtckBtn.id);
    argAtckBtn.disabled = true;
    let numb = 3;
    do{
        setTimeout(add, (3 - numb)*1000, numb);
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
        pCreated.style.display = 'none';
        divMssg.appendChild(pCreated);
        pMssgLog.innerHTML += mssg + '\n'
    }
    let timming = 1000;

    let playerAttck = attackType.innerHTML;
    let playerAttckMssg = `Tu mascota atacó con ${playerAttck}`;
//    createMssg(playerAttckMssg);
    setTimeout(createMssg, timming, playerAttckMssg);

    let enemyAttck = arrPlayerAttack[randNumb(0, arrPlayerAttack.length - 1)].innerHTML;
    let enemyAttckMssg = `El enemigo atacó con ${enemyAttck}`; 
    setTimeout(createMssg, timming, enemyAttckMssg);
//    createMssg(enemyAttckMssg); 

    let enemyLostHp = 'El nemeigo pierde 1 de vida';
    
    if (playerAttck == enemyAttck) {
        setTimeout(createMssg, timming, 'EMPATE');
//        createMssg('Empate');
    } else if(playerAttck == 'Fuego' && enemyAttck == 'Planta') {
        setTimeout(createMssg, timming, enemyLostHp);
//        createMssg(enemyLostHp);
        enemyChosenPet.hp--;
    } else if(playerAttck == 'Agua' && enemyAttck == 'Fuego') {
        setTimeout(createMssg, timming, enemyLostHp);
        enemyChosenPet.hp--;
    } else if(playerAttck == 'Planta' && enemyAttck == 'Agua') {
        setTimeout(createMssg, timming, enemyLostHp);
        enemyChosenPet.hp--;
    } else {
        setTimeout(createMssg, timming, 'Pierdes 1 de vida');
        chosenMokepon.hp--;
    }

    actualPetHp.innerHTML = chosenMokepon.hp;
    enemyPetHp.innerHTML = enemyChosenPet.hp;

    if (chosenMokepon.hp <= 0 || enemyChosenPet.hp <= 0){
        if (!chosenMokepon.hp) {
            setTimeout(createMssg, timming, 'Perdiste Mamawebaso');
//            createMssg('Perdiste Mamawebaso');
        } else if (!enemyChosenPet.hp) {
            createMssg('GANASTE');
        }

        Object.values(arrPlayerAttack).forEach((atck) => {
            atck.disabled = true;
        })
        sectSelectAtck.style.display = 'none';
        sectResrtartBtn.style.display = 'flex';
    }
}

//
function changeDefOver(arr) {
    arr.style.display = 'flex';
}

//
function start() {
    /*  <div class="pet-description" style="display: none">
        <p id="${mokeId}-name">Name: ${moke.name}</p>
        <p id="${mokeId}-type">Typr: ${moke.type}</p>
        <p id="${mokeId}-attack-set">Attacks: ${moke.arrAttack}</p>
      </div>*/
    arrMokepon.forEach((moke) => {
        let mokeId = moke.name.toLowerCase();
        divMokepon.innerHTML += `            
            <input type="radio" name="pet" id="${mokeId}">
            <label for="${mokeId}">${moke.name}</label>`
        
        moke.arrAttack.forEach( mokeAtck => {
            let mokeAtckId = mokeAtck.Type.toLowerCase();
            divAttack.innerHTML += `
            <button class="${mokeAtckId}" type="button">${mokeAtck.Name}</button> 
            `;
        });
        
    })
    

    for (let i = 0; i < arrPlayerAttack.length; i++) {
        let playerAttack = arrPlayerAttack[i];
        playerAttack.addEventListener("click", function(){
            attack(playerAttack);
            timer(playerAttack);
        });
    }

    btnRestart.addEventListener('click', function(){location.reload()});
    btnSelectPet.addEventListener("click", selectPlayerPet);
}


window.addEventListener('load', start);
