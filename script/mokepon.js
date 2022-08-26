const divMokepon = document.getElementById('mokepon-div');
const arrInpMokepon = document.getElementsByName('pet');
const lblMokepon = document.getElementsByTagName('label')
const sectSelectPet = document.getElementById('select-pet');
const sectSelectAtck = document.getElementById('select-attack');
const actualPet = document.getElementById('actual-pet');
const enemyPet = document.getElementById('enemy-pet');
const pMssgLog = document.getElementById('message-log');
const divMssg = document.getElementById('messages');
const pPlayerMssg = document.getElementById('player-mssg');
const pEnemyMssg = document.getElementById('enemy-mssg');
const pFinalMssg = document.getElementById('final-mssg');
const actualPetHp = document.getElementById('actual-pet-hp');
const enemyPetHp = document.getElementById('enemy-pet-hp');
const sectResrtartBtn = document.getElementById('restart');
const btnSelectPet = document.getElementById('select-pet-button');
const divAttack = document.getElementById('attacks');
const arrPlayerAttack = document.getElementById('attacks').children;
const btnRestart = document.getElementById('restart-button')
const arrPetDescription = document.getElementsByClassName('pet-description');

const keysPressed = new Set();
const preventedKeys = new Set([
    "ArrowUp",
    "ArrowDown",
    "ArrowLeft",
    "ArrowRight",
])

const imageCapipepoSrc = "../resources/mokepons_mokepon_capipepo_attack.png";
const imageRatigueyaSrc = "../resources/mokepons_mokepon_ratigueya_attack.png";
const imageHipodogeSrc = "../resources/mokepons_mokepon_hipodoge_attack.png";

const sectionMap = document.getElementById('explore-map');
const map = document.getElementById('map');
let chosenMokepon, enemyChosenPet;
let lienzo = map.getContext("2d");

//


const atckGolpeNormal = ({
    Name: 'Golpe Normal',
    id: 'golpe-normal',
    Type: 'Normal',
    Cooldown: 2,
    Damage: 3,
})

const atckPlacaje = ({
    Name: 'Placaje',
    id: 'placaje',
    Type: 'Normal',
    Cooldown: 2,
    Damage: 3,
})

const atckFuegoEterno = ({
    Name: 'Fuego Eterno',
    id: 'fuego-normal',
    Type: 'Fuego',
    Cooldown: 5,
    Damage: 4,
})

const atckSemillaDelEden = ({
    Name: 'Semilla Del Eden',
    id: 'semilla-del-eden',
    Type: 'Planta',
    Cooldown: 4,
    Damage: 4,
})

const atckDiluvioDivino = ({
    Name: 'Diluvio Divino',
    id: 'diluvio-divino',
    Type: 'Agua',
    Cooldown: 5,
    Damage: 4,
})

//
class Mokepon {
    constructor(name, type, hp, photo) {
        this.name = name;
        this.type = type;
        this.hp = hp;
        this.arrAttack = [];
        this.photo = photo;
        this.speed = 2;
        this.x = 20;
        this.y = 30;
        this.ancho = 150;
        this.alto = 150;
        this.imageInMap = new Image();
        this.imageInMap.src = photo;

        this.actions = {
            ArrowLeft() { this.x -= this.speed; },
            ArrowRight() { this.x += this.speed; },
            ArrowUp() { this.y -= this.speed; },
            ArrowDown() { this.y += this.speed; }
            }
    }

    update(keysPressed) {
        Object.entries(this.actions).forEach(([key, action]) =>
            keysPressed.has(key) && action.call(this)
        );
    }
}

let arrMokepon = [];

let hipodoge = new Mokepon('Hipodoge', 'Agua', 15, imageHipodogeSrc);
let capipepo = new Mokepon('Capipepo', 'Planta', 15, imageCapipepoSrc);
let ratigueya = new Mokepon('Ratigueya', 'Fuego', 15, imageRatigueyaSrc);

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
        if (attackTimerP.innerHTML == 0 && enemyChosenPet.hp > 0 && chosenMokepon.hp > 0) {
            argAtckBtn.style.background = "#ffffff";
            attackTimerP.innerHTML = atckName;
            attackTimerP.disabled = false;
        }
    }  
    console.log('enemyPet', enemyChosenPet.hp);
    console.log('playaPet', chosenMokepon.hp);
    let atckName = argAtckBtn.innerHTML;

    let attackTimerP = document.getElementById(argAtckBtn.id);
    argAtckBtn.disabled = true;
    let numb = 3;
    do{
        setTimeout(add, (3 - numb)*1000, numb);
        numb--
    } while(numb >= 0)  
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

function drawPet() {
    lienzo.clearRect(0, 0, map.width, map.height);
    lienzo.drawImage(
        chosenMokepon.imageInMap,
        parseInt(chosenMokepon.x) + 0.5,
        parseInt(chosenMokepon.y) + 0.5,
        chosenMokepon.ancho,
        chosenMokepon.alto,
    )
    //lienzo.patternQuality = 'best';
    //lienzo.antialias = 'default';
    //lienzo.filter = 'default'
    //lienzo.imageSmoothingEnabled = false;
}

function moveMokepon() {
    document.addEventListener("keydown", e => {
      if (preventedKeys.has(e.code)) {
        e.preventDefault();
      }      
      keysPressed.add(e.code);
        map.width = sectionMap.offsetWidth - 95;
        map.height = sectionMap.offsetHeight - 90;
    });
    document.addEventListener("keyup", e => {
      keysPressed.delete(e.code);
    });

    (function update() {
        requestAnimationFrame(update);
        chosenMokepon.update(keysPressed);
        drawPet();
    })();
    drawPet()

}

function selectPlayerPet() {
    arrMokepon.forEach((moke) => {
        if (moke.name == mokeponIsChecked()) {
            chosenMokepon = moke;
        }        
    });
    enemyChosenPet = Object.assign({}, arrMokepon[randNumb(0, arrInpMokepon.length-1)]);

    if (chosenMokepon) {
        chosenMokepon.arrAttack.forEach(atck => {
            let atckClass = atck.Type.toLowerCase();
            divAttack.innerHTML += `
            <button id="${atck.id}" class="${atckClass}" type="button">${atck.Name}</button>`;
        });

        for (let i = 0; i < arrPlayerAttack.length; i++) {
            let playerAttack = arrPlayerAttack[i];
            playerAttack.addEventListener("click", function(){
                attack(i);
                timer(playerAttack);
            });
        }
        actualPet.innerHTML = chosenMokepon.name;
        enemyPet.innerHTML = enemyChosenPet.name;
        sectSelectPet.style.display = 'none';
        sectionMap.style.display = 'flex';

        drawPet();
        moveMokepon();

        //sectSelectAtck.style.display = 'flex'
    }else{
        alert('Elige algún mokepon');
    }
}

function attack(index) {
    function createMssg(mssg, forWho) {

        switch (forWho) {
            case "player":
                pPlayerMssg.innerHTML = mssg;
                break;
            case "enemy":
                pEnemyMssg.innerHTML = mssg;
            default:
                pFinalMssg.innerHTML = mssg;
                break;
        }
        pMssgLog.innerHTML += mssg + '\n'
    } 

    function youLose() {
        if (chosenMokepon.hp <= 0) {
            setTimeout(createMssg, timming, 'Perdiste Mamawebaso'); 
        } else if (enemyChosenPet.hp <= 0) {
            setTimeout(createMssg, timming, 'GANASTE');
        }

        Object.values(arrPlayerAttack).forEach((atck) => {
            atck.disabled = true;
        }) 
        sectResrtartBtn.style.display = 'flex';
    }

    let timming =0;
    let playerAtck = chosenMokepon.arrAttack[index];
    let enemyAtck = enemyChosenPet.arrAttack[randNumb(0, 3 - 1)];
    actualPetHp.innerHTML = chosenMokepon.hp;
    enemyPetHp.innerHTML = enemyChosenPet.hp;

    let playerAttckMssg = `Tu mascota atacó con ${playerAtck.Name}`;
    if (chosenMokepon.hp > 0 && enemyChosenPet.hp > 0) {
        enemyChosenPet.hp -= playerAtck.Damage;
        enemyPetHp.innerHTML = enemyChosenPet.hp;
        let enemyLostHp = `El enemigo pierde ${playerAtck.Damage} de vida`;
        createMssg(playerAttckMssg, 'player');
        createMssg(enemyLostHp);
        (enemyChosenPet.hp <= 0) ? youLose() : {}
    } 

    let enemyAtckMssg = `El enemigo atacó con ${enemyAtck.Name}`; 
    if (enemyChosenPet.hp > 0 && chosenMokepon.hp > 0) {
        chosenMokepon.hp -= enemyAtck.Damage;
        actualPetHp.innerHTML = chosenMokepon.hp;
        createMssg(enemyAtckMssg, 'enemy');
        createMssg(`Perdes ${enemyAtck.Damage} de vida`);
        (chosenMokepon.hp <= 0 ) ? youLose() : {}
    }
}
 
//
function start() { 
    arrMokepon.forEach((moke) => {
        let mokeId = moke.name.toLowerCase();
        divMokepon.innerHTML += `            
            <input type="radio" name="pet" id="${mokeId}">
            <label for="${mokeId}">${moke.name}</label>`})

    btnRestart.addEventListener('click', function(){location.reload()});
    btnSelectPet.addEventListener("click", selectPlayerPet);
} 

window.addEventListener('load', start);
