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
    let inpMokepon = document.getElementsByName('pet');
    let lblMokepon = document.getElementsByTagName('label')
    let chosenMokepon = mokeponIsChecked(inpMokepon, lblMokepon);
    let enemyChosenPet = lblMokepon[randNumb(0, inpMokepon.length-1)].innerHTML
    let actualPet = document.getElementById('actual-pet');
    let enemyPet = document.getElementById('enemy-pet');

    if (chosenMokepon) {
        actualPet.innerHTML = chosenMokepon;
        enemyPet.innerHTML = enemyChosenPet;

        alert(`Elegiste a ${chosenMokepon}`);
        alert(`El enemigo eligió ${enemyChosenPet}`);
    }else{
        alert('Elige algún mokepon');
    }
}


function attack(arrPlayerAttack ,attackType) {
    let pAtck = document.createElement('p');
    pAtck.innerHTML = `Tu mascota atacó con ${attackType.innerHTML}`;
    document.getElementById('messages').appendChild(pAtck);

    let pEnemyAtck = document.createElement('p');
    let randAttck = arrPlayerAttack[randNumb(0, arrPlayerAttack.length - 1)];
    pEnemyAtck.innerHTML = `El enemigo atacó con ${randAttck.innerHTML}`;
    let x = document.getElementById('messages');
    setTimeout(function(){x.appendChild(pEnemyAtck)}, 1000);
    // alert('attack ' + attackType);
}


function start() {
    let btnSelectPet = document.getElementById('select-pet-button');
    let arrPlayerAttack = document.getElementById('attacks').children;

    for (let i = 0; i < arrPlayerAttack.length; i++) {
        let playerAttack = arrPlayerAttack[i]
        playerAttack.addEventListener("click",
                        function(){attack(arrPlayerAttack, playerAttack)});

    }
    
    btnSelectPet.addEventListener("click", selectPlayerPet);
}


window.addEventListener('load', start);
