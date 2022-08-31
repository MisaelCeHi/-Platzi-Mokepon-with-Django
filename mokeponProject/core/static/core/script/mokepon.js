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

const imageCapipepoSrc = capiPic;
const imageRatigueyaSrc = ratiPic;
const imageHipodogeSrc = hipoPic;

//const imageCapipepoSrc = '../images/mokepons_mokepon_capipepo_attack.png';
//const imageRatigueyaSrc = '../images/mokepons_mokepon_ratigueya_attack.png';
//const imageHipodogeSrc = '../images/mokepons_mokepon_hipodoge_attack.png';

const sectionMap = document.getElementById('explore-map');
const map = document.getElementById('map');
let chosenMokepon, enemyChosenPet;
let playerId = 0;
let lienzo = map.getContext("2d");
let moko; 
let mokeponEnemys = [];
let counter = 0;
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
    constructor(name, type, hp, photo, id=null) {
        this.id = id;
        this.name = name;
        this.type = type;
        this.hp = hp;
        this.arrAttack = [];
        this.photo = photo;
        this.speed = 2;
        this.x = 20;
        this.y = 30;
        this.ancho = 80;
        this.alto = 80;
        this.imageInMap = new Image();
        this.imageInMap.src = photo;

        this.actions = {
            ArrowLeft() { this.x -= this.speed; },
            ArrowRight() { this.x += this.speed; },
            ArrowUp() { this.y -= this.speed; },
            ArrowDown() { this.y += this.speed; }
            }
    }
    render() {
        //this.x.style.left = 
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

function drawPet(mokeInMap) {
    lienzo.drawImage(
        mokeInMap.imageInMap,
        parseInt(mokeInMap.x),
        parseInt(mokeInMap.y),
        mokeInMap.ancho,
        mokeInMap.alto,
    ) 
}

function moveMokepon() {
    let winBase, winHeight;
    winBase = window.innerWidth;
    winHeight = window.innerHeight;
    let winArea = winBase * winHeight;

    document.addEventListener("keydown", e => {
      if (preventedKeys.has(e.code)) {
        e.preventDefault();
      }      
      keysPressed.add(e.code); 
    });
    document.addEventListener("keyup", e => {
      keysPressed.delete(e.code);
    });

    (function update() { 
        let xx = chosenMokepon.x ;
        let yy = chosenMokepon.y;
        //requestAnimationFrame(update);
        (!counter) && (requestAnimationFrame(update), chosenMokepon.update(keysPressed));
        if (map.width > window.innerWidth - 96 || map.width < 780 && winArea != window.innerWidth * window.innerHeight) {
            map.width = window.innerWidth - 96;
            map.height = map.width * 585 / 780;
            winArea = window.innerHeight * window.innerWidth;
            drawPet(enemyChosenPet);
            drawPet(chosenMokepon);
            //console.log(map.width, map.height);
        }

        if (xx !== chosenMokepon.x || yy !== chosenMokepon.y) {
            lienzo.clearRect(0, 0, map.width, map.height);
            drawPet(enemyChosenPet);
            drawPet(chosenMokepon);
            collision(enemyChosenPet);
            mokeponEnemys.forEach((enemon) => {
                drawPet(enemon.mokepon);
                collision(enemon.mokepon);
            });
            //sendPosition(chosenMokepon.x, chosenMokepon.y);
        }
    })(); 
}

function collision(whitEnemy) {
    let topPet = chosenMokepon.y;
    let bottomPet = chosenMokepon.y + chosenMokepon.alto;
    let leftPet = chosenMokepon.x
    let rightPet = chosenMokepon.x + chosenMokepon.ancho;

    if (topPet > whitEnemy.y + enemyChosenPet.alto ||
        bottomPet < whitEnemy.y ||
        leftPet > whitEnemy.x + whitEnemy.ancho ||
        rightPet < whitEnemy.x) return
    else {
        counter++
        sectionMap.style.display = 'none';
        sectSelectAtck.style.display = 'flex';
        console.log('coission', chosenMokepon.actions, keysPressed, counter);
    }
}   


function selectPlayerPet() {
    arrMokepon.forEach((moke) => {
        if (moke.name == mokeponIsChecked()) {
            chosenMokepon = moke;
            //chosenMokepon = Object.create(moke);
        }        
    });
    chosenMokepon.id = playerId
    //console.log(playerId, chosenMokepon)
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
                //sendAttacks(playerAttack.innerHTML);
            });
        }
        actualPet.innerHTML = chosenMokepon.name;
        enemyPet.innerHTML = enemyChosenPet.name;
        sectSelectPet.style.display = 'none';
        sectionMap.style.display = 'flex';
        // 790, 580
        map.width = 780 ;
        map.height = 585; 

        joinGame();
        //selectedMoke(chosenMokepon);

        enemyChosenPet.x = randNumb(0, map.width - enemyChosenPet.ancho);
        enemyChosenPet.y = randNumb(0, map.height - enemyChosenPet.alto);
        drawPet(enemyChosenPet);
        drawPet(chosenMokepon);
        //sendPosition(chosenMokepon.x, chosenMokepon.y)
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

function sendAttacks(atck) {
    fetch(`http://localhost:8000/mokepon/${playerId}/attacks`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': getCookie('csrftoken'),
        },
        body: JSON.stringify({attackck: atck,
            mokepon: chosenMokepon.name, 
            hp:chosenMokepon.hp})
    })
    .then(function(res) {
        (res.ok) && (
            res.text()
            .then(function(puesta){
                    console.log(puesta);
            })
        )    
    })
    
}

function joinGame() {
    fetch("http://localhost:8000/join", {
        method: "POST",
        headers: {
            'X-CSRFToken': getCookie('csrftoken'),
            'X-Requested-With': 'XMLHttpRequest'
        },
        body: JSON.stringify(chosenMokepon)
    })
    .then(function(res) {
        // console.log(res)
        if (res.ok) {
            res.text()
                .then(function(respuesta) {
                    console.log(respuesta);
                    //playerId = respuesta;
                })
        }
    }) 
}

function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
        
function selectedMoke(moke) {
    var csrftoken = getCookie('csrftoken');
    fetch(`http://localhost:8000/mokepon/${playerId}`, {
        method: "POST",
        body: moke.name,
        headers:{
            'Content-Type': 'application/json',
            'X-CSRFToken': csrftoken,
            //"X-Requested-With": "XMLHttpRequest"
        }
    })
}

function sendPosition(posX, posY) {
    fetch(`http://localhost:8000/mokepon/${playerId}/position`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': getCookie('csrftoken'),
        },
        body: [posX, posY]
    })
    .then(function(res) {
    if (res.ok) {
        res.json()
        .then(function({enemys}) {
            console.log(enemys);
            let finder1, finder2, finder;
            enemys.forEach(enemy => {
                console.log(enemy.name)
                if (enemy.name == 'Capipepo') {
                    finder = mokeponEnemys.findIndex((enemigo) => enemigo['owner'] === enemy.owner_id);
                    let mkkpnCapi = new Mokepon('Capipepo', 'Planta', 15, imageCapipepoSrc, enemy.owner_id);
                    mkkpnCapi.id = enemy.owner_id;
                    mkkpnCapi.x = enemy.x;
                    mkkpnCapi.y = enemy.y;
                    if (finder !== -1) {
                        mokeponEnemys.splice(finder, 1, {
                        mokepon: mkkpnCapi,
                        owner: enemy.owner_id
                        })
                    } else {
                        mokeponEnemys.push({
                        mokepon: mkkpnCapi,
                        owner: enemy.owner_id
                        })
                    }
                    console.log('Capipepo enemigo')
                    //drawPet(mkkpnCapi)
                }
                else if (enemy.name == 'Hipodoge'){
                    finder1 = mokeponEnemys.findIndex((enemigo) => enemigo['owner'] === enemy.owner_id);
                    let mkkpnHipo = new Mokepon('Hipodoge', 'Agua', 14, imageHipodogeSrc, enemy.owner_id);
                    mkkpnHipo.id = enemy.owner_id;
                    mkkpnHipo.x = enemy.x;
                    mkkpnHipo.y = enemy.y;
                    if (finder1 !== -1) {
                        mokeponEnemys.splice(finder1, 1, {
                        mokepon: mkkpnHipo,
                        owner: enemy.owner_id
                        })
                    } else {
                        mokeponEnemys.push({
                        mokepon: mkkpnHipo,
                        owner: enemy.owner_id
                        })
                    }
                    console.log('Hipodoge enemigo')
                    //drawPet(mkkpnHipo)
                }
                else if (enemy.name == 'Ratigueya'){
                    finder2 = mokeponEnemys.findIndex((enemigo) => enemigo['owner'] === enemy.owner_id);
                    let mkkpnRati = new Mokepon('Ratigueya', 'Fuego', 16, imageRatigueyaSrc, enemy.owner_id);
                    mkkpnRati.id = enemy.owner_id;
                    mkkpnRati.x = enemy.x;
                    mkkpnRati.y = enemy.y;
                    if (finder2 !== -1) {
                        mokeponEnemys.splice(finder2, 1, {
                        mokepon: mkkpnRati,
                        owner: enemy.owner_id
                        })
                    } else {
                        mokeponEnemys.push({
                        mokepon: mkkpnRati,
                        owner: enemy.owner_id
                        })
                    }
                    console.log('Ratigueya enemigo')
                    //drawPet(mkkpnRati)
                }
            })}) 
        }
    })}

//
function start() { 
    arrMokepon.forEach((moke) => {
        let mokeId = moke.name.toLowerCase();
        divMokepon.innerHTML += `            
            <input type="radio" name="pet" id="${mokeId}">
            <label for="${mokeId}">${moke.name}</label>`})

    btnRestart.addEventListener('click', function(){location.reload()});
    btnSelectPet.addEventListener("click", selectPlayerPet);
    //joinGame()
} 

window.addEventListener('load', start);
