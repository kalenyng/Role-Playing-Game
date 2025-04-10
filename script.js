let xp = 0;
let health = 100;
let gold = 50;
let currentWeapon = 0;
let fighting;
let monsterHealth;
let inventory = ["stick"];

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
const weapons = [
  { name: 'stick', power: 5 },
  { name: 'dagger', power: 30 },
  { name: 'claw hammer', power: 50 },
  { name: 'sword', power: 100 }
];
const monsters = [
  {
    name: "One-Eyed Troll",
    level: 2,
    health: 15
  },
  {
    name: "Lava Golem",
    level: 8,
    health: 60
  },
  {
    name: "Dragon",
    level: 20,
    health: 300
  }
]
const locations = [
  {
    name: "town square",
    "button text": ["Go to store", "Go to cave", "Fight dragon"],
    "button functions": [goStore, goCave, fightDragon],
    text: "You are in the town square. You see a sign that says \"Store\".",
    image: "https://images.uesp.net/1/14/ON-place-Town_Square.jpg"
  },
  {
    name: "store",
    "button text": ["Buy 10 health (10 gold)", "Buy weapon (30 gold)", "Go to town square"],
    "button functions": [buyHealth, buyWeapon, goTown],
    text: "You enter the store.",
    image: "https://images.uesp.net/f/fc/ON-interior-Untamed_Elixirs.jpg"
  },
  {
    name: "cave",
    "button text": ["Fight One-Eyed Troll", "Fight Lava Golem", "Go to town square"],
    "button functions": [fightSlime, fightBeast, goTown],
    text: "You enter the cave. You see some monsters.",
    image: "https://images.uesp.net/6/62/ON-place-Pinepeak_Cavern.jpg"
  },
  {
    name: "fight slime",
    "button text": ["Attack", "Dodge", "Run"],
    "button functions": [attack, dodge, goTown],
    text: "You are fighting a One-eyed Troll.",
    image: "https://images.uesp.net/5/54/ON-creature-Troll.jpg"
  },
  {
    name: "kill monster",
    "button text": ["Go to town square", "Go to town square", "Go to town square"],
    "button functions": [goTown, goTown, easterEgg],
    text: 'The monster screams "Argh!" as it dies. You gain experience points and find gold.',
    image: "https://i.pinimg.com/736x/7a/d2/05/7ad20537a864b7a9151ddd8f4ec31275.jpg"
  },
  {
    name: "lose",
    "button text": ["REPLAY?", "REPLAY?", "REPLAY?"],
    "button functions": [restart, restart, restart],
    text: "You die. &#x2620;",
    image:"https://i0.wp.com/eso.mmo-fashion.com/wp-content/uploads/sites/2/2018/08/Gravestone-Clover-Engraving-1.jpg?resize=528%2C819&ssl=1"
  },
  { 
    name: "win", 
    "button text": ["REPLAY?", "REPLAY?", "REPLAY?"], 
    "button functions": [restart, restart, restart], 
    text: "You defeat the dragon! YOU WIN THE GAME! &#x1F389;",
    image:"https://static1.thegamerimages.com/wordpress/wp-content/uploads/2020/02/Skyrim-Alduin-Fight-Cropped.jpg"
  },
  {
    name: "easter egg",
    "button text": ["2", "8", "Go to town square?"],
    "button functions": [pickTwo, pickEight, goTown],
    text: "You find a secret game. Pick a number above. Ten numbers will be randomly chosen between 0 and 10. If the number you choose matches one of the random numbers, you win!",
    image: "https://static.wikia.nocookie.net/portalworldsgame/images/4/4c/Easter_Egg_Surprise.png"
  },
  {
    name: "home",
    "button text": ["Go to store", "Go to cave", "Fight dragon"],
    "button functions": [goStore, goCave, fightDragon],
    text: "Welcome to Dragon Repeller. You must defeat the dragon that is preventing people from leaving the town. You are in the town square. Where do you want to go? Use the buttons above.",
    image: "https://images.uesp.net/1/14/ON-place-Town_Square.jpg"
  },
  {
    name: "fight beast",
    "button text": ["Attack", "Dodge", "Run"],
    "button functions": [attack, dodge, goTown],
    text: "You are fighting a Lava Golem.",
    image: "https://images.uesp.net/e/e0/ON-creature-Fetcherfly_Hive_Golem.jpg"
  },
  {
    name: "fight dragon",
    "button text": ["Attack", "Dodge", "Run"],
    "button functions": [attack, dodge, goTown],
    text: "You are fighting the Dragon.",
    image: "https://images.uesp.net/3/3a/ON-creature-Dragon.jpg"
  },
];
button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightDragon;

window.addEventListener("load", () => {
  const imageUrls = locations.map(loc => loc.image);
  let loadedImages = 0;

  imageUrls.forEach(src => {
    const img = new Image();
    img.src = src;
    img.onload = checkAllImagesLoaded;
    img.onerror = checkAllImagesLoaded; // still proceed if an image fails
  });

  function checkAllImagesLoaded() {
    loadedImages++;
    if (loadedImages === imageUrls.length) {
      document.getElementById("preloader").style.display = "none";
      goHome(); // Start the game after preloading
    }
  }
});

function update(location) {
  monsterStats.style.display = "none";
  button1.innerText = location["button text"][0];
  button2.innerText = location["button text"][1];
  button3.innerText = location["button text"][2];
  button1.onclick = location["button functions"][0];
  button2.onclick = location["button functions"][1];
  button3.onclick = location["button functions"][2];
  text.innerHTML = location.text;
  const locationImage = document.getElementById("locationImage");
  locationImage.src = location.image;
}
function goHome(){
    update(locations[8])
}

function goTown() {
  update(locations[0]);
}

function goStore() {
  update(locations[1]);
}

function goCave() {
  update(locations[2]);
}

function buyHealth() {
  if (gold >= 10) {
    gold -= 10;
    health += 10;
    goldText.innerText = gold;
    healthText.innerText = health;
  } else {
    text.innerText = "You do not have enough gold to buy health.";
  }
}

function buyWeapon() {
  if (currentWeapon < weapons.length - 1) {
    if (gold >= 30) {
      gold -= 30;
      currentWeapon++;
      goldText.innerText = gold;
      let newWeapon = weapons[currentWeapon].name;
      text.innerText = "You now have a " + newWeapon + ".";
      inventory.push(newWeapon);
      text.innerText += " In your inventory you have: " + inventory;
    } else {
      text.innerText = "You do not have enough gold to buy a weapon.";
    }
  } else {
    text.innerText = "You already have the most powerful weapon!";
    button2.innerText = "Sell weapon for 15 gold";
    button2.onclick = sellWeapon;
  }
}

function sellWeapon() {
  if (inventory.length > 1) {
    gold += 15;
    goldText.innerText = gold;
    let currentWeapon = inventory.shift();
    text.innerText = "You sold a " + currentWeapon + ".";
    text.innerText += " In your inventory you have: " + inventory;
  } else {
    text.innerText = "Don't sell your only weapon!";
  }
}

function fightSlime() {
  fighting = 0;
  goFightSlime();
}

function fightBeast() {
  fighting = 1;
  goFightBeast();
}

function fightDragon() {
  fighting = 2;
  goFightDragon();
}

function goFightSlime() {
  update(locations[3]);
  monsterHealth = monsters[fighting].health;
  monsterStats.style.display = "block";
  monsterName.innerText = monsters[fighting].name;
  monsterHealthText.innerText = monsterHealth;
}
function goFightBeast() {
    update(locations[9]);
    monsterHealth = monsters[fighting].health;
    monsterStats.style.display = "block";
    monsterName.innerText = monsters[fighting].name;
    monsterHealthText.innerText = monsterHealth;
  }
function goFightDragon() {
    update(locations[10]);
    monsterHealth = monsters[fighting].health;
    monsterStats.style.display = "block";
    monsterName.innerText = monsters[fighting].name;
    monsterHealthText.innerText = monsterHealth;
  }

function attack() {
  text.innerText = "The " + monsters[fighting].name + " attacks.";
  text.innerText += " You attack it with your " + weapons[currentWeapon].name + ".";
  health -= getMonsterAttackValue(monsters[fighting].level);
  if (isMonsterHit()) {
    monsterHealth -= weapons[currentWeapon].power + Math.floor(Math.random() * xp) + 1;    
  } else {
    text.innerText += " You miss.";
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
    text.innerText += " Your " + inventory.pop() + " breaks.";
    currentWeapon--;
  }
}

function getMonsterAttackValue(level) {
  const hit = (level * 5) - (Math.floor(Math.random() * xp));
  console.log(hit);
  return hit > 0 ? hit : 0;
}

function isMonsterHit() {
  return Math.random() > .2 || health < 20;
}

function dodge() {
  text.innerText = "You dodge the attack from the " + monsters[fighting].name;
}

function defeatMonster() {
  gold += Math.floor(monsters[fighting].level * 6.7);
  xp += monsters[fighting].level;
  goldText.innerText = gold;
  xpText.innerText = xp;
  update(locations[4]);
}

function lose() {
  update(locations[5]);
}

function winGame() {
  update(locations[6]);
}

function restart() {
  xp = 0;
  health = 100;
  gold = 50;
  currentWeapon = 0;
  inventory = ["stick"];
  goldText.innerText = gold;
  healthText.innerText = health;
  xpText.innerText = xp;
  goTown();
}

function easterEgg() {
  update(locations[7]);
}

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
  text.innerText = "You picked " + guess + ". Here are the random numbers:\n";
  for (let i = 0; i < 10; i++) {
    text.innerText += numbers[i] + "\n";
  }
  if (numbers.includes(guess)) {
    text.innerText += "Right! You win 20 gold!";
    gold += 20;
    goldText.innerText = gold;
  } else {
    text.innerText += "Wrong! You lose 10 health!";
    health -= 10;
    healthText.innerText = health;
    if (health <= 0) {
      lose();
    }
  }
}
goHome()
