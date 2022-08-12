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
        sectSelectAtck.style.display = 'block'
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
    function createMssg(mssg, tagId) {
        let divMssg = document.getElementById('log');
        // divMssg.innerHTML += mssg + '\n';
        tagId.innerHTML = mssg;
        // divMssg.appendChild(p);
    }

    function mssgDelay(mssg, who) {
        let playerMssg = document.getElementById('player-messages');
        let enemyMssg = document.getElementById('enemy-messages');
        let resultMssg = document.getElementById('result-messages');
        let finalMssg = document.getElementById('final-message');
        let timeDelay = 500;
        switch (who) {
            case 'player':
                setTimeout(function() {createMssg(mssg, playerMssg)}, timeDelay);
                break;
            case 'enemy':
                setTimeout(function() {createMssg(mssg, enemyMssg)}, timeDelay);
                break;
            case 'result':
                setTimeout(function() {createMssg(mssg, resultMssg)}, timeDelay);
                break;
            case 'final':
                setTimeout(function() {createMssg(mssg, finalMssg)}, timeDelay);
                break;
            default:
                break;
        }
    }

    let playerAttck = attackType.innerHTML;
    let playerAttckMssg = `Tu mascota atacó con ${playerAttck}`;
    // createMssg(playerAttckMssg);
    mssgDelay(playerAttckMssg, 'player');

    let enemyAttck = arrPlayerAttack[randNumb(0, arrPlayerAttack.length - 1)].innerHTML;
    let enemyAttckMssg = `El enemigo atacó con ${enemyAttck}`;
    mssgDelay(enemyAttckMssg, 'enemy');
    

    let actualPetHp = document.getElementById('actual-pet-hp');
    let enemyPetHp = document.getElementById('enemy-pet-hp');
    
    let sectResrtartBtn = document.getElementById('restart');

    let enemyLostHp = 'El nemeigo pierde 1 de vida';
    
    if (playerAttck == enemyAttck) {
        mssgDelay('Empate zzzzzz', 'result')
    } else if(playerAttck == 'Fuego' && enemyAttck == 'Planta') {
        mssgDelay(enemyLostHp, 'result');
        hpEnemy--;
    } else if(playerAttck == 'Agua' && enemyAttck == 'Fuego') {
        mssgDelay(enemyLostHp, 'result');
        hpEnemy--;
    } else if(playerAttck == 'Planta' && enemyAttck == 'Agua') {
        mssgDelay(enemyLostHp, 'result');
        hpEnemy--;
    } else {
        mssgDelay('Perdiste 1 de Vida', 'result');
        hpPlayer--;
    }

    actualPetHp.innerHTML = hpPlayer;
    enemyPetHp.innerHTML = hpEnemy;

    if (hpPlayer <= 0 || hpEnemy <= 0){
        if (!hpPlayer) {
            mssgDelay('Perdiste mamawebaso DEDICATE A OTRA COSA >:v', 'final');
        } else if (!hpEnemy) {
            mssgDelay('GANASTE gg ez pizi', 'final');
        }

        for (let j = 0; j < arrPlayerAttack.length; j++) {
            arrPlayerAttack[j].disabled = true;
        }
        sectResrtartBtn.style.display = 'block';
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
        let playerAttack = arrPlayerAttack[i]
        playerAttack.addEventListener("click",
                        function(){attack(arrPlayerAttack, playerAttack)});
    }
    
    btnRestart.addEventListener('click', restart);
    btnSelectPet.addEventListener("click", selectPlayerPet);
}


window.addEventListener('load', start);
