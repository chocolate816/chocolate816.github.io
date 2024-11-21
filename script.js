let depth = 0
let inLobby = true
let layers = ["g", "g", "g", "g", "g"]
const layer = document.getElementsByClassName("layerprint")[0]  
let money = 5
let timesMined = 0
let costToEnter = 5
const allButtons = document.getElementsByName('save')
let matMsgs = [
  ["You find some scrap metal and some rough crystals in the ground.", 16, 50],
  ["You find some bronze ore and some pieces of iron ore.", 20, 30],
  ["You find some fossils buried in the stone.", 26, 25],
  ["Wow! A common chest full of money!!!", 100, 5],
]
const toolData = [
  [80, 0, 'vest', 'Lifevest', 3, 80, 'you wear your lifevest to stay on top of the water. You wait until the water level goes down and sign a sign of relief. You accidentally drop the lifevest.'],
  [80, 0, 'hook', 'Grappling hook', 3, 80, 'Right before it is too late, you pull out your trusty grappling hook and grab a rock to pull yourself to safety. The hook ended up breaking.'],
  [80, 0, 'mask', 'Gas mask', 3, 80, 'Before you go to sleep and never wake up, you put on a gas mask hooked on to an oxygen tank and wait out the gas. Unfortunatly, your gas mask ran out of gas.'],
  [500, 0, 'suit', 'Heat suit', 8, 500, 'Before you are consumed by fire, you equip your trusty heat suit and endure the scalding tempratures. Unfortunatly, the suit is too scalded to be used again.']
]
const getMon = document.getElementsByClassName('money')[0]
const lobby = document.getElementsByClassName("lobby")
const mining = document.getElementsByClassName("in-mine")
const allDisasterData = [
  ["d", 'FLOOD!!', 'Water starts flooding into your mine. You will drown soon.', 0, 30, 'lifevest', 
 "useTool('vest')"],
  ["c", 'CAVE IN!!', 'The floor of your mine suddenly collapses. You will be crushed by rocks soon.', 0, 30, 'grappling hook', "useTool('hook')"],
  ["l", 'GAS LEAK!!', 'A strange gas starts clouding up your vision and your lungs. You will be suffocated to death soon.', 0, 30, 'gas mask', "useTool('mask')"],
  ["Lava", 'LAVA FLOOD!!', 'You start to feel hot, another swing opens up a molten layer of lava gushing out of the ground. You will melt soon.', 50, 10, 'heat suit', "useTool('suit')"]
]
getMon.innerText = `$${money}`

function buy(type) {
  const upgradeButtons = document.getElementsByClassName('upgrade') 
	const reference = toolData.findIndex(data => data[2] === type)
	if (type == undefined) {
  for (let i = 0; i < toolData.length; i++) {
	   toolData[i][0] = Math.round((toolData[i][1] * toolData[i][4]) ** 2.5) + toolData[i][5]
		 upgradeButtons[i].innerText = `${toolData[i][3]} $${toolData[i][0]} (${toolData[i][1]})`
	}
  } else {
	   if (money >= toolData[reference][0]) {
     money -= toolData[reference][0]
     toolData[reference][1] += 1
     toolData[reference][0] = Math.round((toolData[reference][1] * toolData[reference][4]) ** 2.5) + toolData[reference][5]
     upgradeButtons[reference].innerText = `${toolData[reference][3]} $${toolData[reference][0]} (${toolData[reference][1]})`
		 getMon.innerText = `$${money}`
    }
  }
}

function advRanOfArray(array) {
  let totalChance = array.reduce((sum, msg) => sum + msg[2], 0)
  let randomNum = Math.random() * totalChance
  let currentSum = 0
  let pickedMsg = null
  for (let i = 0; i < array.length; i++) {
    currentSum += array[i][2]
    if (randomNum <= currentSum) {
      pickedMsg = array[i]
      break
    }
  }
  if (!array) {
    pickedMsg = array.reduce(
      (max, msg) => (msg[2] > max[2] ? msg : max),
      array[0],
    )
  }
  return pickedMsg
}
function RandomOfArray(array) {
  return Math.floor(Math.random() * array.length)
}

function ChanceOfDisaster(layer) {
  let chance = allDisasterData.reduce((sum, msg) => sum + msg[4], 0)
  let randomAcc = Math.random() * chance
  let current = 0
  let pickedScen = null
  let possibleOut = allDisasterData
  .filter(i => i[3] <= layer) 
  .map(i => i[0]); 
  console.log(possibleOut)
  if (Math.floor(Math.random() * 100) <= Math.floor((layer / 3) + 5)) {
    for (let i = 0; i < allDisasterData.length; i++) {
      current += allDisasterData[i][4]
      if (randomAcc <= current) {
        pickedScen = possibleOut[i]
        break
        }
      }
    } else {
      pickedScen = "g"
    }
  return pickedScen
}

function useTool(tool) {
  const minemsg = document.getElementsByClassName("mine-msg")[0]
	const reference = toolData.findIndex(data => data[2] === tool)
  layer.innerText = 'Layer ' + depth
	minemsg.innerText = toolData[reference][6]
	toolData[reference][1] -= 1
  allButtons[0].style.display = 'inline'
  allButtons[1].style.display = 'inline'
  allButtons[2].style.display = 'none'
  allButtons[3].style.display = 'none'    
 return
  }

function checkNewMat(layer) {
  if (layer >= 200) {
    matMsgs = [
      ['You uncover a shimmering fragment of spirit glass, a translucent crystal that seems to emit a soft, whispering hum.',1300 ,26],
      ["Your pickaxe strikes a vibrant dragon’s heart crystal, pulsing with faint warmth as though it holds an inner fire.",1600 ,20],
      ["A stroke of luck reveals a massive phoenix opal, swirling with reds, oranges, and yellows that almost seem to flicker like flames.",1750 ,18],
      ["The rock crumbles to expose a polished mirrorstone, a highly reflective gem said to reveal glimpses of other realms when looked into.",1900 ,15],
      ["You uncover a radiant fragment of celestial aurora, a crystal glowing in soft green and purple hues reminiscent of the northern lights.",2222 ,10],
      ["You carefully extract a void diamond, an impossibly black gem that absorbs all light around it, giving it an eerie, mysterious allure.",2500 ,6],
      ["The ground gives way to a shard of crystallized magicite, faintly glowing with raw, unrefined magical energy.",2800 ,4],
      ["At long last, you unearth the legendary starstone, a mineral that glows with flecks of starlight, rumored to have fallen from the heavens.",5000 ,1]
    ]
    return
  } else if (layer >= 150) {
    matMsgs = [
      ['A heavy swing reveals a thick streak of palladium, a valuable metal often found in the deepest layers.', 800, 25],
      ['Your pickaxe uncovers a glittering deposit of electrum, a natural alloy of gold and silver.', 850, 20],
      ['You carefully pull out a slab of rainbow fluorite, with bands of vibrant purples, blues, and greens.', 850, 20],
      ['A large, violet-blue spinel crystal emerges from the rock, a rarity that sparkles with hidden depths.', 900, 15],
      ['You reveal a pocket of flawless black opals, swirling with shades of deep green and electric blue.', 1000, 10],
      ['Your pickaxe strikes an unusual mineral—celestial beryl, rumored to form only under extreme conditions.', 1222, 8],
      ['A bright light errupts out of a small crack. You investigate and find a hunk of painite. The rarest gem on earth...', 2222, 2]
    ]
    return
  } else if (layer >= 100) {
    matMsgs = [
      ['You carefully extract a flawless topaz, golden and gleaming like sunlight.', 480, 30],
      ['The ground opens up to reveal a collection of aquamarines, their light blue color almost transparent.', 550, 25],
      ['You uncover a rare green tourmaline crystal, long and unblemished, with a deep forest hue.', 600, 15],
      ['You carefully pry loose a massive emerald, it could probably buy 6 bread!', 630, 15],
      ['A dark presence surounds you as you pull out a dark red stone with streaks of pulsating blood red.', 666, 10],
      ['Your pickaxe strikes a small cache of fire opals, each one glowing with fiery orange and red hues.', 776, 3],
      ['You find a mystical golden chest with a full spectrum of different coloured diamonds. JACKPOT!!!', 998, 2]
    ]
    return
  } else if (layer >= 60) {
    matMsgs = [
      ['Your pickaxe hits a solid patch of titanium. This rare metal will definitely fetch a high price!', 200, 35],
      ['The ground around you trembles as you pull up a slab of solid obsidian lined with streaks of gold.', 250, 25],
      ['You find a small cavern filled with chunks of amethyst, glittering like a hidden treasure trove.', 224, 20],
      ['You carefully extract an ancient fossilized relic, embedded in a matrix of rare minerals.', 300, 10],
      ['Deep in the rock, you uncover a flawless diamond shimmering in its crystal bed. YES!!', 350, 7],
      ['Amongst the dark bedrock, you hit something wooden. An epic chest filled to the brim with gold and gems!', 550, 3]
    ]
    return
  } else if (layer >= 25) {
    matMsgs = [
      ['You find some gold and silver nuggets in the ground. Sweet!', 60, 50],
      ['A shine from the cavern wall catches your attention. A ruby!', 84, 20],
      ['A shine from the cavern wall catches your attention. An emerald!', 90, 20],
      ['A swing from your pickaxe reveals a small pocket of water loaded with crystals!', 120, 7],
      ["A chest! A rare chest! I'm RICHHH!!!!", 300, 3]
    ]
  } else {
    return
  }
}

function surrender() {
  const everything = document.getElementsByClassName('game')
  const gameOverText = document.getElementsByClassName('game-over')
  for (let i = 0; i < everything.length; i++) {
    everything[i].style.visibility = 'hidden'
  }
  for (let i = 0; i < gameOverText.length; i++) {
    gameOverText[i].style.display = 'block'
  }
  gameOverText[1].innerText = `Congratulations! You reached layer ${depth} with $${money}!!`
}

function warning() {
  var warnIndex = layers.findIndex(i => i !== 'g')
  var warningType = layers[warnIndex]
  if (warnIndex > 0 && warnIndex < 4 && Math.random() >= 0.5) {
     return [true, warningType]
  } else {
    return false
  }
}

function badScen(type) {
  const disMsg = document.getElementsByClassName('mine-msg')[0]
  const referenceArray = allDisasterData.findIndex(disaster => disaster[0] === type)
  layer.innerText = allDisasterData[referenceArray][1]
  disMsg.innerText = allDisasterData[referenceArray][2]
  allButtons[0].style.display = 'none'
  allButtons[1].style.display = 'none'
  allButtons[2].style.display = 'inline'
  allButtons[3].style.display = 'inline'
  allButtons[2].innerText = `use ${allDisasterData[referenceArray][5]} (${toolData[referenceArray][1]})`
  allButtons[2].setAttribute("onclick", allDisasterData[referenceArray][6])
  if (toolData[referenceArray][1] < 1) {
       allButtons[2].setAttribute("disabled", "true")
  } else {
       allButtons[2].removeAttribute("disabled")
  }
}

function nextLayer(type) {
  depth++
  layers.shift()
  layers.push(ChanceOfDisaster(depth))
  checkNewMat(depth)
  var listOfMsgs = [
    "You mined through another layer.",
    "You drilled deeper into the ground.",
    "You picked away at the ground until you uncovered a new layer of stone.",
    "You created another extention of your mine.",
    "The Endtimes Near!",
    "That hole is Huge!",
    "You slam your pickaxe at the ground.",
  ]
  let mineMsg = document.getElementsByClassName('mine-msg')[0]
  let coloredText = document.getElementsByClassName('warning')[0]
  coloredText.innerText = ''
  var warnings = warning()
  if (type === 'g') {
      layer.innerText = "Layer " + depth
      let usedMsg = advRanOfArray(matMsgs)
      let ranMon = Math.floor(Math.random() * (usedMsg[1] / 2 + 1)) + usedMsg[1] / 2
      money += ranMon
      mineMsg.innerText = `${listOfMsgs[RandomOfArray(listOfMsgs)]} ${usedMsg[0]} (+$${ranMon})`
      if (Array.isArray(warnings) && warnings[0]) {
    if (warnings[1] === "d") {
      coloredText.innerText = "You hear a distant sound of rushing water, growing louder with each passing moment...";
    } else if (warnings[1] === "l") {
      coloredText.innerText = "A strange, acrid scent begins to fill the air, making your lungs feel heavy...";
    } else if (warnings[1] === "c") {
      coloredText.innerText = "The ground trembles slightly beneath you, as if something deep within the earth is shifting...";
    } else if (warning[1] === "Lava") {
      coloredText.innerText = "The temprature starts to rise and a faint bubbling sound fills the air."
    } else {
      coloredText.innerText = ''
    }
  }
      getMon.innerText = `$${money}`
      allButtons[0].style.display = 'inline'
      allButtons[1].style.display = 'inline'
      allButtons[2].style.display = 'none'
      allButtons[3].style.display = 'none'
  } else {
    badScen(type)
  }
  console.log(layers)
}

function startmining() {
  if (money >= costToEnter) {
    money -= costToEnter
    getMon.innerText = `$${money}`
  } else {
    return
  }
  timesMined += 1
  inLobby = false
  // Set opacity for "lobby" to 0
  if (lobby) {
    for (let i = 0; i < lobby.length; i++) {
      lobby[i].style.visibility = 'hidden'
    }
  }
  // Set opacity for "mining" to 1
  if (mining) {
    for (let i = 0; i < mining.length; i++) {
      mining[i].style.visibility = 'visible'
    }
  }
  layer.innerText = "Layer " + depth
  nextLayer(layers[1])
}

function stopmining() {
  inLobby = true
  buy()
  costToEnter = Math.floor((timesMined * 5) ** 1.80)
  const minebutton = document.getElementsByClassName('mine-button')[0]
  const title = document.getElementsByClassName("title")[0]
  minebutton.innerText = `Mine Down $${costToEnter}`
  // Set opacity for "lobby" to 0
  if (lobby) {
    for (let i = 0; i < lobby.length; i++) {
      lobby[i].style.visibility = "visible"
    }
  }
  // Set opacity for "mining" to 1
  if (mining) {
    for (let i = 0; i < mining.length; i++) {
      mining[i].style.visibility = "hidden"
    }
  }
  title.style.display = "block"
}
