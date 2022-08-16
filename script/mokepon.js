let hpPlayer = 3;
let hpEnemy = 3;

function randNumb(min, max) {
    return Math.floor(Math.random() * (max-min + 1) + min)
}


function mokeponIsChecked(arrinput, arrlabel) {
    /* Returns the text related to a cheked input. 
    Receives an iterable as a parameter.*/
    for (let i = 0; i < arrinput.length; i++) {
        if(arrinput[i].checked) {
            return arrlabel.item(i).innerHTML;
        }
    }
}


function selectPlayerPet() {
    let sectSelectPet = document.getElementById('select-pet');
    let sectSelectAtck = document.getElementById('select-attack');
    let inpMokepon = document.getElementsByName('pet');
    let lblMokepon = document.getElementsByTagName('label')
    let chosenMokepon = mokeponIsChecked(inpMokepon, lblMokepon);
    let enemyChosenPet = lblMokepon[randNumb(0, inpMokepon.length-1)].innerHTML
    let actualPet = document.getElementById('actual-pet');
    let enemyPet = document.getElementById('enemy-pet');

    if (chosenMokepon) {
        sectSelectAtck.style.display = 'flex'
        actualPet.innerHTML = chosenMokepon;
        enemyPet.innerHTML = enemyChosenPet;        
        alert(`Elegiste a ${chosenMokepon}`);
        alert(`El enemigo eligió ${enemyChosenPet}`);
        sectSelectPet.style.display = 'none';
    }else{
        alert('Elige algún mokepon');
    }
}


function attack(arrPlayerAttack ,attackType) {
    function createMssg(mssg) {
        let divMssg = document.getElementById('messages');
        let pCreated = document.createElement('p');
        let pMssgLog = document.getElementById('message-log');
        
        for (let c = 0; c < divMssg.childElementCount; c++) {
            let child = divMssg.children[c];
            child.remove();       
        }

        pCreated.innerHTML = mssg;
        setTimeout(function() {pMssgLog.innerHTML += mssg + '\n'}, 0);
        setTimeout(function() {divMssg.appendChild(pCreated)}, 0);
    }

    let playerAttck = attackType.innerHTML;
    let playerAttckMssg = `Tu mascota atacó con ${playerAttck}`;
    createMssg(playerAttckMssg);

    let enemyAttck = arrPlayerAttack[randNumb(0, arrPlayerAttack.length - 1)].innerHTML;
    let enemyAttckMssg = `El enemigo atacó con ${enemyAttck}`;
    createMssg(enemyAttckMssg);

    let actualPetHp = document.getElementById('actual-pet-hp');
    let enemyPetHp = document.getElementById('enemy-pet-hp');
    
    let sectResrtartBtn = document.getElementById('restart');

    let enemyLostHp = 'El nemeigo pierde 1 de vida';
    
    if (playerAttck == enemyAttck) {
        createMssg('Empate');
    } else if(playerAttck == 'Fuego' && enemyAttck == 'Planta') {
        createMssg(enemyLostHp);
        hpEnemy--;
    } else if(playerAttck == 'Agua' && enemyAttck == 'Fuego') {
        createMssg(enemyLostHp);
        hpEnemy--;
    } else if(playerAttck == 'Planta' && enemyAttck == 'Agua') {
        createMssg(enemyLostHp);
        hpEnemy--;
    } else {
        createMssg('Perdiste 1 de Vida');
        hpPlayer--;
    }

    actualPetHp.innerHTML = hpPlayer;
    enemyPetHp.innerHTML = hpEnemy;

    if (hpPlayer <= 0 || hpEnemy <= 0){
        if (!hpPlayer) {
            createMssg('Perdiste Mamawebaso');
        } else if (!hpEnemy) {
            createMssg('GANASTE');
        }

        for (let j = 0; j < arrPlayerAttack.length; j++) {
            arrPlayerAttack[j].disabled = true;
        }
        setTimeout(function() {sectResrtartBtn.style.display = 'flex'}, 0);
    }
}

function restart() {
    location.reload();
}

function start() {
    let btnSelectPet = document.getElementById('select-pet-button');
    let arrPlayerAttack = document.getElementById('attacks').children;
    let btnRestart = document.getElementById('restart-button')

    for (let i = 0; i < arrPlayerAttack.length; i++) {
        let playerAttack = arrPlayerAttack[i];
        setTimeout(() => {
            playerAttack.addEventListener("click",
                            function(){attack(arrPlayerAttack, playerAttack)});
        }, 3000);
    }
    
    btnRestart.addEventListener('click', restart);
    btnSelectPet.addEventListener("click", selectPlayerPet);
}


window.addEventListener('load', start);
