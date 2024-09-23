
// Oyun dəyişənlərinin ilkin dəyərlərini təyin edirik

let xp = 0;
let health = 100;
let gold = 50;
let currentWeapon = 0;
let fighting;
let monsterHealth;
let inventory = ["çubuq"];

// HTML elementlərini seçirik
const button1 = document.querySelector('#button1');
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
const text = document.querySelector("#text");
const xpText = document.querySelector("#xpText");
const healthText = document.querySelector("#healthText");
const goldText = document.querySelector("#goldText");
const monsterStats = document.querySelector("#monsterStats");
const monsterName = document.querySelector("#monsterName");
const monsterHealthText = document.querySelector("#monsterHealth");


// Silahları təyin edirik
const weapons = [
  { name: 'çubuq', power: 5 },
  { name: 'xəncər', power: 30 },
  { name: 'caynaq çəkic', power: 50 },
  { name: 'qılınc', power: 100 }
];

// Monstrları təyin edirik
const monsters = [
  {
    name: "selik",
    level: 2,
    health: 15
  },
  {
    name: "dişli vəhşi",
    level: 8,
    health: 60
  },
  {
    name: "əjdaha",
    level: 20,
    health: 300
  }
]

// Oyun yerlərini və onlara aid düymə mətnlərini və funksiyaları təyin edirik
const locations = [
  {
    name: "şəhər meydanı",
    "button text": ["Mağazaya get", "Mağaraya get", "Əjdaha ilə döyüş"],
    "button functions": [goStore, goCave, fightDragon],
    text: "Siz şəhər meydanındasınız. \"Mağaza\" yazan bir lövhə görürsünüz."
  },
  {
    name: "mağaza",
    "button text": ["10 sağlamlıq al (10 qızıl)", "Silah al (30 qızıl)", "Şəhər meydanına get"],
    "button functions": [buyHealth, buyWeapon, goTown],
    text: "Siz mağazaya daxil olursunuz."
  },
  {
    name: "mağara",
    "button text": ["Seliklə döyüş", "Dişli vəhşi ilə döyüş", "Şəhər meydanına get"],
    "button functions": [fightSlime, fightBeast, goTown],
    text: "Siz mağaraya daxil olursunuz. Bəzi monstrlar görürsünüz."
  },
  {
    name: "döyüş",
    "button text": ["Hücum", "Yayın", "Qaç"],
    "button functions": [attack, dodge, goTown],
    text: "Siz bir monstrla döyüşürsünüz."
  },
  {
    name: "monstru öldür",
    "button text": ["Şəhər meydanına get", "Şəhər meydanına get", "Şəhər meydanına get"],
    "button functions": [goTown, goTown, easterEgg],
    text: 'Monstr "Arq!" deyə qışqırır və ölür. Siz təcrübə xalları qazanırsınız və qızıl tapırsınız.'
  },
  {
    name: "məğlubiyyət",
    "button text": ["YENİDƏN OYNA?", "YENİDƏN OYNA?", "YENİDƏN OYNA?"],
    "button functions": [restart, restart, restart],
    text: "Siz ölürsünüz. &#x2620;"
  },
  { 
    name: "qələbə", 
    "button text": ["YENİDƏN OYNA?", "YENİDƏN OYNA?", "YENİDƏN OYNA?"], 
    "button functions": [restart, restart, restart], 
    text: "Siz əjdahanı məğlub edirsiniz! SİZ OYUNU QAZANDINIZ! &#x1F389;" 
  },
  {
    name: "easter egg",
    "button text": ["2", "8", "Şəhər meydanına get?"],
    "button functions": [pickTwo, pickEight, goTown],
    text: "Siz gizli bir oyun tapırsınız. Yuxarıda bir nömrə seçin. 0-dan 10-a qədər on ədəd təsadüfi seçiləcək. Əgər seçdiyiniz nömrə təsadüfi nömrələrdən biri ilə uyğun gəlsə, siz qazanırsınız!"
  }
];


// Düymələrə ilkin funksiyaları təyin edirik
button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightDragon;


// Yeri yeniləyən funksiya
function update(location) {
  monsterStats.style.display = "none";
  button1.innerText = location["button text"][0];
  button2.innerText = location["button text"][1];
  button3.innerText = location["button text"][2];
  button1.onclick = location["button functions"][0];
  button2.onclick = location["button functions"][1];
  button3.onclick = location["button functions"][2];
  text.innerHTML = location.text;
}

// Şəhər meydanına getmək üçün funksiya
function goTown() {
  update(locations[0]);
}

// Mağazaya getmək üçün funksiya
function goStore() {
  update(locations[1]);
}

// Mağaraya getmək üçün funksiya
function goCave() {
  update(locations[2]);
}

// Sağlamlıq almaq üçün funksiya
function buyHealth() {
  if (gold >= 10) {
    gold -= 10;
    health += 10;
    goldText.innerText = gold;
    healthText.innerText = health;
  } else {
    text.innerText = "Sağlamlıq almaq üçün kifayət qədər qızılınız yoxdur.";
  }
}

// Silah almaq üçün funksiya
function buyWeapon() {
  if (currentWeapon < weapons.length - 1) {
    if (gold >= 30) {
      gold -= 30;
      currentWeapon++;
      goldText.innerText = gold;
      let newWeapon = weapons[currentWeapon].name;
      text.innerText = "İndi sizin " + newWeapon + " var.";
      inventory.push(newWeapon);
      text.innerText += " İnventarınızda bunlar var: " + inventory;
    } else {
      text.innerText = "Silah almaq üçün kifayət qədər qızılınız yoxdur.";
    }
  } else {
    text.innerText = "Artıq ən güclü silahınız var!";
    button2.innerText = "Silahı 15 qızıla sat";
    button2.onclick = sellWeapon;
  }
}


// Silah satmaq üçün funksiya
function sellWeapon() {
  if (inventory.length > 1) {
    gold += 15;
    goldText.innerText = gold;
    let currentWeapon = inventory.shift();
    text.innerText = "Siz " + currentWeapon + " satdınız.";
    text.innerText += " İnventarınızda bunlar var: " + inventory;
  } else {
    text.innerText = "Tək silahınızı satmayın!";
  }
}


// Müxtəlif monstrlarla döyüşə başlamaq üçün funksiyalar

function fightSlime() {
  fighting = 0;
  goFight();
}

function fightBeast() {
  fighting = 1;
  goFight();
}

function fightDragon() {
  fighting = 2;
  goFight();
}

// Döyüşə başlamaq üçün funksiya
function goFight() {
  update(locations[3]);
  monsterHealth = monsters[fighting].health;
  monsterStats.style.display = "block";
  monsterName.innerText = monsters[fighting].name;
  monsterHealthText.innerText = monsterHealth;
}

// Hücum etmək üçün funksiya
function attack() {
  text.innerText = monsters[fighting].name + " hücum edir.";
  text.innerText += " Siz ona " + weapons[currentWeapon].name + " ilə hücum edirsiniz.";
  health -= getMonsterAttackValue(monsters[fighting].level);
  if (isMonsterHit()) {
    monsterHealth -= weapons[currentWeapon].power + Math.floor(Math.random() * xp) + 1;    
  } else {
    text.innerText += " Siz yayındınız.";
  }
  healthText.innerText = health;
  monsterHealthText.innerText = monsterHealth;
  if (health <= 0) {
    lose();
  } else if (monsterHealth <= 0) {
    if (fighting === 2) {
      winGame();
    } else {
      defeatMonster();
    }
  }
  if (Math.random() <= .1 && inventory.length !== 1) {
    text.innerText += " Sizin " + inventory.pop() + " sındı.";
    currentWeapon--;
  }
}

// Monsterin hücum gücünü hesablamaq üçün funksiya
function getMonsterAttackValue(level) {
  const hit = (level * 5) - (Math.floor(Math.random() * xp));
  console.log(hit);
  return hit > 0 ? hit : 0;
}

// Monsterin hücumunun uğurlu olub-olmadığını yoxlamaq üçün funksiya
function isMonsterHit() {
  return Math.random() > .2 || health < 20;
}


// Hücumdan yayınmaq üçün funksiya
function dodge() {
  text.innerText = "Siz " + monsters[fighting].name + " hücumundan yayındınız";
}


// Monsteri məğlub etdikdə çağırılan funksiya
function defeatMonster() {
  gold += Math.floor(monsters[fighting].level * 6.7);
  xp += monsters[fighting].level;
  goldText.innerText = gold;
  xpText.innerText = xp;
  update(locations[4]);
}

// Oyunu uduzduqda çağırılan funksiya
function lose() {
  update(locations[5]);
}

// Oyunu qazandıqda çağırılan funksiya
function winGame() {
  update(locations[6]);
}


// Oyunu yenidən başlatmaq üçün funksiya
function restart() {
  xp = 0;
  health = 100;
  gold = 50;
  currentWeapon = 0;
  inventory = ["çubuq"];
  goldText.innerText = gold;
  healthText.innerText = health;
  xpText.innerText = xp;
  goTown();
}

// Easter egg funksiyası
function easterEgg() {
  update(locations[7]);
}


// Easter egg oyunu üçün funksiyalar
function pickTwo() {
  pick(2);
}

function pickEight() {
  pick(8);
}

function pick(guess) {
  const numbers = [];
  while (numbers.length < 10) {
    numbers.push(Math.floor(Math.random() * 11));
  }
  text.innerText = "Siz " + guess + " seçdiniz. Təsadüfi nömrələr bunlardır:\n";
  for (let i = 0; i < 10; i++) {
    text.innerText += numbers[i] + "\n";
  }
  if (numbers.includes(guess)) {
    text.innerText += "Düzdür! Siz 20 qızıl qazandınız!";
    gold += 20;
    goldText.innerText = gold;
  } else {
    text.innerText += "Səhv! Siz 10 sağlamlıq itirdiniz!";
    health -= 10;
    healthText.innerText = health;
    if (health <= 0) {
      lose();
    }
  }
}