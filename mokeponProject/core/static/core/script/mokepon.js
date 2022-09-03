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
 
const sectionMap = document.getElementById('explore-map');
const map = document.getElementById('map');
let chosenMokepon, enemyChosenPet, playerAttack;
let playerId = 0;
let lienzo = map.getContext("2d"); 
let mokeponEnemys = []; 

let allAttacks = [];
const atckGolpeNormal = ({
    Name: 'Golpe Normal',
    id: 'golpe-normal',
    Type: 'Normal',
    Cooldown: 2,
    Damage: 3,
});
const atckPlacaje = ({
    Name: 'Placaje',
    id: 'placaje',
    Type: 'Normal',
    Cooldown: 2,
    Damage: 3,
});
const atckFuegoEterno = ({
    Name: 'Fuego Eterno',
    id: 'fuego-normal',
    Type: 'Fuego',
    Cooldown: 5,
    Damage: 4,
});
const atckSemillaDelEden = ({
    Name: 'Semilla Del Eden',
    id: 'semilla-del-eden',
    Type: 'Planta',
    Cooldown: 4,
    Damage: 4,
});
const atckDiluvioDivino = ({
    Name: 'Diluvio Divino',
    id: 'diluvio-divino',
    Type: 'Agua',
    Cooldown: 5,
    Damage: 4,
});
allAttacks.push(atckFuegoEterno, atckGolpeNormal, atckPlacaje, atckDiluvioDivino, atckSemillaDelEden)
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
    //console.log('enemyPet', enemyChosenPet.hp);
    //console.log('playaPet', chosenMokepon.hp);
    let atckName = argAtckBtn.innerHTML;

    let attackTimerP = document.getElementById(argAtckBtn.id);
    argAtckBtn.disabled = true;
    let numb = 3;
    do{
        setTimeout(add, (3 - numb)*1000, numb);
        numb--
    } while(numb >= 0)  
}

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
        (sectionMap.style.display == 'flex') && (
            requestAnimationFrame(update), chosenMokepon.update(keysPressed)
        );
        if (map.width > window.innerWidth - 96 || map.width < 780 && winArea != window.innerWidth * window.innerHeight) {
            map.width = window.innerWidth - 96;
            map.height = map.width * 585 / 780;
            winArea = window.innerHeight * window.innerWidth; 
            drawPet(chosenMokepon); 
        }

        if (xx !== chosenMokepon.x || yy !== chosenMokepon.y) {
            lienzo.clearRect(0, 0, map.width, map.height);
            //drawPet(enemyChosenPet);
            drawPet(chosenMokepon);
            //collision(enemyChosenPet);
            mokeponEnemys.forEach((enemon) => {
                drawPet(enemon);
                collision(enemon);
            });
            sendPosition(chosenMokepon.x, chosenMokepon.y);
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
        sectionMap.style.display = 'none';
        sectSelectAtck.style.display = 'flex';
        for (let i = 0; i < 3; i++) {
            let playerAttack = arrPlayerAttack[i];
            playerAttack.addEventListener("click", function(){
                //attack(i);
                timer(playerAttack);
                allAttacks.forEach((atk) => {
                    (atk.Name == playerAttack.innerHTML) && sendAttacks(atk);
                })
            }); 
        }

    }
}   


function selectPlayerPet() {
    arrMokepon.forEach((moke) => {
        if (moke.name == mokeponIsChecked()) {
            chosenMokepon = moke; 
        }        
    }); 
    enemyChosenPet = Object.assign({}, arrMokepon[randNumb(0, arrInpMokepon.length-1)]);

    if (chosenMokepon) {
        joinGame();
        chosenMokepon.arrAttack.forEach(atck => {
            let atckClass = atck.Type.toLowerCase();
            divAttack.innerHTML += `
            <button id="${atck.id}" class="${atckClass}" type="button">${atck.Name}</button>`;
        });

        actualPet.innerHTML = chosenMokepon.name;
        enemyPet.innerHTML = enemyChosenPet.name;
        sectSelectPet.style.display = 'none';
        sectionMap.style.display = 'flex';
        // 790, 580
        map.width = 780 ;
        map.height = 585; 
        enemyChosenPet.x = randNumb(0, map.width - enemyChosenPet.ancho); 
        enemyChosenPet.y = randNumb(0, map.height - enemyChosenPet.alto); 
        drawPet(chosenMokepon);
        moveMokepon(); 
    }else{
        alert('Elige algún mokepon');
    }
}
 
function attack(index, enemy) {
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
        } else if (enemy.hp <= 0) {
            setTimeout(createMssg, timming, 'GANASTE');
        }

        Object.values(arrPlayerAttack).forEach((atck) => {
            atck.disabled = true;
        }) 
        sectResrtartBtn.style.display = 'flex';
    } 
    let playerAtck = chosenMokepon.arrAttack[index];
    let enemyAtck = enemy.arrAttack[randNumb(0, 3 - 1)];
    actualPetHp.innerHTML = chosenMokepon.hp;
    enemyPetHp.innerHTML = enemy.hp;

    let playerAttckMssg = `Tu mascota atacó con ${playerAtck.Name}`;
    if (chosenMokepon.hp > 0 && enemy.hp > 0) {
        enemy.hp -= playerAtck.Damage;
        enemyPetHp.innerHTML = enemy.hp;
        let enemyLostHp = `El enemigo pierde ${playerAtck.Damage} de vida`;
        createMssg(playerAttckMssg, 'player');
        createMssg(enemyLostHp);
        (enemy.hp <= 0) ? youLose() : {}
    } 

    let enemyAtckMssg = `El enemigo atacó con ${enemyAtck.Name}`; 
    if (enemy.hp > 0 && chosenMokepon.hp > 0) {
        chosenMokepon.hp -= enemyAtck.Damage;
        actualPetHp.innerHTML = chosenMokepon.hp;
        createMssg(enemyAtckMssg, 'enemy');
        createMssg(`Perdes ${enemyAtck.Damage} de vida`);
        (chosenMokepon.hp <= 0 ) ? youLose() : {}
    }
}
 
function sendAttacks(attackInfo) { 
    fetch(`http://localhost:8000/mokepon/${playerId}/attack`, {
        method: 'POST',
        headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'X-CSRFToken': getCookie('csrftoken'),
        },
        body: JSON.stringify(attackInfo)
    }).then(function(res) {
            res.json()
            .then(function(data) {
                    //console.log('THEN ', data)
                    pPlayerMssg.innerHTML = `Atacaste con ${data.name}`
                })
        }) 
}

function joinGame() {
    fetch("http://localhost:8000/join", {
        method: "POST",
        headers: {
            'X-CSRFToken': getCookie('csrftoken'),
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(chosenMokepon)
    }).then(function(res) { 
        if (res.ok) {
            res.json()
            .then(function(puesta){ 
                playerId = puesta.id
                chosenMokepon.id = puesta.id
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

function sendPosition(posX, posY) {
    fetch(`http://localhost:8000/mokepon/${playerId}`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': getCookie('csrftoken'),
        },
        body: JSON.stringify({posX, posY})
    }).then(function(res) { 
        res.json()
        .then(function({enemys}) {
            mokeponEnemys = enemys.map((item) => {
                new_enemy = new Mokepon(
                    item.name, item.type, item.hp, '', item.id
                );
                if (new_enemy.name == 'Capipepo') {
                    (new_enemy.imageInMap.src = capiPic);
                    new_enemy.arrAttack = capipepo.arrAttack;
                }
                if (new_enemy.name == 'Hipodoge') {
                    new_enemy.imageInMap.src = hipoPic;
                    new_enemy.arrAttack = hipodoge.arrAttack;   
                }
                if (new_enemy.name == 'Ratigueya') {
                    new_enemy.imageInMap.src = ratiPic;
                    new_enemy.arrAttack = ratigueya.arrAttack;
                }
                new_enemy.x = item.posX;
                new_enemy.y = item.posY;
                return new_enemy
            })
        })
    })}

//
function start() { 
    arrMokepon.forEach((moke) => {
        let mokeId = moke.name.toLowerCase();
        divMokepon.innerHTML += `            
            <input type="radio" name="pet" id="${mokeId}">
            <label for="${mokeId}">${moke.name}</label>`
    })
    var eventSource = new EventSource(`http://localhost:8000/mokepon/${playerId}/attack`);
    eventSource.onopen = function() {
        console.log('Open Connection');
    }
    eventSource.onmessage = function(e) {
        all_data = JSON.parse(e.data);
        if (all_data.player_id != playerId) {
            pEnemyMssg.innerHTML = `El enemigo uso ${all_data.name}`;
        }
        console.log('data: ', e)
    }
    eventSource.onerror = function(e) {
        console.log(e);
    }
    // console.log('coission');
    btnRestart.addEventListener('click', function(){location.reload()});
    btnSelectPet.addEventListener("click", selectPlayerPet); 
} 

window.addEventListener('load', start);
