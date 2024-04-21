class nodeFns {
  static createElement(classList = [], tag = "div", content, id = "") {
    const element = document.createElement(tag);
    if (id) {
      element.id = id;
    }
    classList.forEach((li) => {
      element.classList.add(li);
    });
    if (content) {
      element.append(content);
    }

    return element;
  }

  static img(src, alt, classList = [], id) {
    const img = nodeFns.createElement(classList, "img", null, id);
    img.src = src;
    img.alt = alt;
    return img;
  }
}

class xpFns {
  static wichLevel(xp, base) {
    return Math.floor(xp / base);
  }

  static getXp() {
    if (!localStorage["pokemonXp"]) {
      localStorage.setItem("pokemonXp", "0");
    }
    return JSON.parse(localStorage["pokemonXp"]);
  }

  static xpAtLevel() {
    let lvlNumber = this.wichLevel(this.getXp(), 100);
    let toReturn;
    toReturn = 10 - Math.round(lvlNumber / 80);
    toReturn = toReturn < 3 ? 3 : toReturn;
    return toReturn;
  }

  static success() {
    console.log("Siker!");

    this.setXp(this.xpAtLevel());
    levelUp(); // TODO beállítani a szintlépést!
  }

  static setXp(bonus) {
    let currentXp = this.getXp();
    let newXp = +currentXp + bonus;
    localStorage.setItem("pokemonXp", JSON.stringify(newXp));
    console.log("New xp: " + localStorage.pokemonXp);
  }
}

class pokedexFns {
  static findPokemonInPokedex(Nr) {
    let entry = false;
    let indexOfEntry = Nr;
    let pokedexEdition = pokedex1;
    if (Nr < 53) {
      pokedexEdition = pokedex1;
    } else if (Nr > 52 && Nr <= 128) {
      pokedexEdition = pokedex2;
      indexOfEntry = Nr - 52;
    } else if (Nr > 128 && Nr < 352) {
      pokedexEdition = pokedex3;
      indexOfEntry = Nr - 128;
    } else if (Nr > 352 && Nr < 425) {
      pokedexEdition = pokedex4;
      indexOfEntry = Nr - 352;
    } else {
      console.warn("More pokedex editions please!");
    }

    entry = pokedexEdition[indexOfEntry - 1];
    return entry;
  }

  static get types() {
    return {"Normal":{"superEffective":[],"weakAgainst":["Rock","Steel"],"unEffective":["Ghost"],"color":"#9FA19F"},"Fire":{"superEffective":["Grass","Ice","Bug","Steel"],"weakAgainst":["Fire","Water","Rock","Dragon"],"unEffective":[],"color":"red"},"Water":{"superEffective":["Fire","Ground","Rock"],"weakAgainst":["Water","Grass","Dragon"],"unEffective":[],"color":"#2980EF"},"Electric":{"superEffective":["Water","Flying"],"weakAgainst":["Electric","Grass","Dragon"],"unEffective":["Ground"],"color":"#FAC000"},"Grass":{"superEffective":["Water","Ground","Rock"],"weakAgainst":["Fire","Grass","Poison","Flying","Bug","Dragon","Steel"],"unEffective":[],"color":"green"},"Ice":{"superEffective":["Grass","Ground","Flying","Dragon"],"weakAgainst":["Fire","Water","Ice","Steel"],"unEffective":[],"color":"#3DCEF3"},"Fighting":{"superEffective":["Normal","Ice","Rock","Dark","Steel"],"weakAgainst":["Poison","Flying","Psychic","Bug","Fairy"],"unEffective":["Rock"]},"Poison":{"superEffective":["Grass","Fairy"],"weakAgainst":["Poison","Ground","Rock","Ghost","Steel"],"unEffective":["Steel"],"color":"purple"},"Ground":{"superEffective":["Fire","Electric","Poison","Rock","Steel"],"weakAgainst":["Grass","Bug"],"unEffective":["Flying"],"color":"#915121"},"Flying":{"superEffective":["Grass","Fighting","Bug"],"weakAgainst":["Electric","Rock","Steel"],"unEffective":[],"color":"#81B9EF"},"Psychic":{"superEffective":["Fighting","Poison"],"weakAgainst":["Psychic","Steel"],"unEffective":["Dark"],"color":"#EF4179"},"Bug":{"superEffective":["Grass","Psychic","Dark"],"weakAgainst":["Fire","Fighting","Flying","Poison","Ghost","Steel","Fairy"],"unEffective":[],"color":"#91A119"},"Rock":{"superEffective":["Fire","Ice","Flying","Bug"],"weakAgainst":["Fighting","Ground","Steel"],"unEffective":[]},"Ghost":{"superEffective":["Psychic","Ghost"],"weakAgainst":["Dark"],"unEffective":["Normal"]},"Dragon":{"superEffective":["Dragon"],"weakAgainst":["Steel"],"unEffective":["Fairy"]},"Dark":{"superEffective":["Psychic","Ghost"],"weakAgainst":["Fighting","Dark","Fairy"],"unEffective":[],"color":"#624D4E"},"Steel":{"superEffective":["Ice","Rock","Fairy"],"weakAgainst":["Fire","Water","Electric","Steel"],"unEffective":[],"color":"#60A1B8"},"Fairy":{"superEffective":["Fighting","Dragon","Dark"],"weakAgainst":["Fire","Poison","Steel"],"unEffective":[],"color":"#EF70EF"}};
  }
}

class PokeMath {
  constructor() {
    this.multiplyNumbersArray = [];
    this.levelNr = xpFns.wichLevel(xpFns.getXp(), 100);

    this.node = document.createElement("div");
  }

  wichLevel(xp, base) {
    return Math.floor(xp / base);
  }

  getXp() {
    if (!localStorage["pokemonXp"]) {
      localStorage.setItem("pokemonXp", "0");
    }
    return JSON.parse(localStorage["pokemonXp"]);
  }

  id(id) {
    //not used yet
    return document.getElementById(id);
  }

  render() {
    //not used yet
    this.node.classList = "body";

    //clear the node
    while (this.node.firstChild) {
      this.node.removeChild(this.node.firstChild);
    }

    // to test
    this.node.append("Bodyyyy");

    return this.node;
  }

  append() {
    //not used yet
  }
}

//state variables:

let levelNr = wichLevel(getXp(), 100);
let multiplyNumbersArray = [];

// general functions
function id(id) {
  return document.getElementById(id);
}

function genID() {
  return Math.floor(Math.random() * 100000);
}

// render Problems

//multiplication:
class SelectNumberBtn {
  constructor(index, mainObj) {
    this.index = index;
    this.mainObj = mainObj;
    this.node = document.createElement("button");
    this.clicked = this.mainObj.multiplyNumbersArray.includes(index);
  }
  get render() {
    this.node.innerText = this.index;
    this.node.classList = this.clicked ? "pokeball-coloring" : "";
    this.node.addEventListener("click", () => {
      this.clicked = !this.clicked;
      if (this.clicked) {
        if (!this.mainObj.multiplyNumbersArray.includes(this.index)) {
          this.mainObj.multiplyNumbersArray.push(this.index);

          this.render;
        }
      } else {
        this.node.classList = "";
        if (this.mainObj.multiplyNumbersArray.includes(this.index)) {
          const indexOfThisIndex = this.mainObj.multiplyNumbersArray.indexOf(
            this.index
          );
          this.mainObj.multiplyNumbersArray.splice(indexOfThisIndex, 1);
        }
      }
      sessionStorage["multiplyNumbersArray"] = JSON.stringify(
        this.mainObj.multiplyNumbersArray
      );
    });

    return this.node;
  }
}

class SelectNumbers {
  constructor(parentObj) {
    this.parentObj = parentObj;
    this.multiplyNumbersArray = this.parentObj.multiplyNumbersArray;
    this.numberButtonsList = this.createButtonsList();
    this.node = document.createElement("div");
  }

  createButtonsList() {
    const arrToReturn = [];
    for (let i = 1; i < 11; i++) {
      const newBtn = new SelectNumberBtn(i, this.parentObj);

      arrToReturn.push(newBtn);
    }

    return arrToReturn;
  }

  get render() {
    this.node.innerHTML = "";
    this.node.id = "number-select-to-multiply";
    this.numberButtonsList.forEach((btn) => {
      this.node.append(btn.render);
    });
    return this.node;
  }
  append() {
    document.getElementById("problems").innerHTML = "";
    document.getElementById("problems").append(this.render);
  }
}

class Multiplication {
  constructor(parentObj) {
    this.parentObj = parentObj;
    this.maxNumber = this.parentObj.multiplyNumbersArray.length
      ? this.parentObj.multiplyNumbersArray[
          Math.floor(Math.random() * this.parentObj.multiplyNumbersArray.length)
        ]
      : 2;
    console.log("this.maxNumber: ", this.maxNumber);

    this.node = document.createElement("table");

    this.a = Math.ceil(Math.random() * 10);
    this.b = this.maxNumber;
    this.c = this.a * this.b;

    this.inputElement = this.inputCreator();
    this.button = this.buttonCreator();
    this.isSolved = false;
  }

  inputCreator() {
    const inputElement = document.createElement("input");
    inputElement.type = "number";
    inputElement.max = 10 * this.maxNumber;
    inputElement.min = 1;

    return inputElement;
  }

  buttonCreator() {
    const btn = document.createElement("button");
    btn.innerText = "?";
    btn.addEventListener("click", () => {
      if (this.inputElement.value == this.c && !this.isSolved) {
        this.button.innerText = "✓";
        setXp(xpAtLevel());
        levelUp();
        this.isSolved = true;
      }
    });
    return btn;
  }

  get render() {
    const tableRow = document.createElement("tr");
    tableRow.innerHTML = `<td>${this.a}</td><td> × </td><td>${this.b}</td><td> = </td>`;
    const tableData = document.createElement("td");
    tableData.append(this.inputElement);
    tableRow.append(tableData);
    tableRow.append(this.button);

    this.node.append(tableRow);
    return this.node;
  }
  append() {
    document.getElementById("problems").append(this.render);
  }
}

class MultiplyProblems {
  constructor() {
    this.multiplyNumbersArray = sessionStorage["multiplyNumbersArray"]
      ? JSON.parse(sessionStorage["multiplyNumbersArray"])
      : multiplyNumbersArray;
    this.nextBtn = this.nextBtnCreator();
    this.problemList = this.createProblems();
    this.SelectNumbers = new SelectNumbers(this);
    this.node = document.createElement("div");
  }

  nextBtnCreator() {
    const btn = document.createElement("button");
    btn.id = "next-multiplycations";
    btn.innerText = "NEXT >>";
    btn.addEventListener("click", () => {
      if (!this.unsolvedProblemsSum) {
        console.warn("NEW PROBLEMS!");
        this.problemList = this.createProblems();
        this.render;
      }
    });
    return btn;
  }

  get unsolvedProblemsSum() {
    return this.problemList.filter((problemObj) => !problemObj.isSolved).length;
  }

  createProblems() {
    const list = [];
    for (let i = 0; i < 6; i++) {
      list.push(new Multiplication(this));
    }
    return list;
  }

  get render() {
    this.node.id = "multiply-problems";
    this.node.innerHTML = "";

    this.problemList.forEach((problem) => this.node.append(problem.render));
    this.node.append(this.nextBtn, this.SelectNumbers.render);

    return this.node;
  }

  append() {
    document.getElementById("problems").innerHTML = "";
    document.getElementById("problems").append(this.render);
  }
}

//addition or subtraction

class AdditionAndSubtractionProblems {
  constructor(maxNumber) {
    this.maxNumber = +maxNumber;

    this.problemList = this.problemListCreator();
    //nodes
    this.chooseMaxNumber = this.chooseMaxNumberCreator();
    this.node = document.createElement("table");
    this.nextBtn = this.nextBtnCreator();
  }

  nextBtnCreator() {
    const btnElement = document.createElement("button");
    btnElement.innerText = "Next >>";
    btnElement.addEventListener("click", (e) => {
      if (this.problemList.every((li) => li.isCorrect)) {
        console.log("mind jó");
      }

      console.log("Klikk");
    });
    return btnElement;
  }

  problemListCreator() {
    this.problemList = [];
    const list = [];
    for (let i = 0; i < 6; i++) {
      list.push(
        new AdditionProblem(
          this,
          this.maxNumber,
          this.makeNumbers(),
          this.randomProblemType()
        )
      );
    }
    return list;
  }

  randomProblemType() {
    const problemTypes = [
      "abx",
      "axc",
      "xbc",
      "cbxMinus",
      "cxaMinus",
      "xbaMinus",
    ];
    return problemTypes[Math.floor(Math.random() * problemTypes.length)];
  }

  chooseMaxNumberCreator() {
    const dialogeElement = document.createElement("dialog");
    dialogeElement.open = true;

    const pElement = document.createElement("p");
    pElement.innerText =
      "Mi legyen a legmagasabb szám, amivel számolni szeretnél?";

    const inputElement = document.createElement("input");
    inputElement.type = "number";
    inputElement.max = this.maxNumber ? this.maxNumber : 20;
    inputElement.min = 10;
    inputElement.value = inputElement.max;

    const btnElement = document.createElement("button");
    btnElement.innerText = "kiválaszt";
    const listener = (e) => {
      this.maxNumber = +e.target.parentElement.children[1].value;
      e.target.parentElement.open = false;
    };
    btnElement.addEventListener("click", listener);

    dialogeElement.append(pElement, inputElement, btnElement);
    return dialogeElement;
  }

  makeNumbers() {
    let c =
      Math.floor(this.maxNumber / 2) +
      Math.floor((Math.random() * this.maxNumber) / 2);
    let a = Math.floor(Math.random() * c);
    let b = c - a;
    return [a, b, c];
  }

  render() {
    //Remove All children 👶 of the node
    while (this.node.firstChild) {
      this.node.removeChild(this.node.firstChild);
    }

    this.node.id = "problems";
    this.node.classList = "problems";
    const tBodyElement = document.createElement("tbody");
    //to test
    this.node.append(tBodyElement, document.createElement("br"), this.nextBtn);
    tBodyElement.append(
      !this.maxNumber ? this.chooseMaxNumber : "",
      ...this.problemList.map((problemItem) => problemItem.render())
    );
    return this.node;
  }
}

class AdditionProblem {
  constructor(
    parentObj = {},
    maxNumber = 20,
    numberArr = [1, 2, 3],
    problemType = "abx"
  ) {
    this.parentObj = parentObj;
    this.problemType = problemType;
    this.a = /Minus/.test(problemType) ? numberArr[2] : numberArr[0];
    this.b = numberArr[1];
    this.c = /Minus/.test(problemType) ? numberArr[0] : numberArr[2];
    this.isCorrect = undefined;
    //nodes
    this.node = document.createElement("tr");
    this.inputElement = this.createInput(maxNumber);
  }

  createTd(text) {
    const tdElement = document.createElement("td");
    tdElement.append(text);
    return tdElement;
  }

  createInput(maxNumber) {
    const inputElement = document.createElement("input");
    inputElement.type = "number";
    inputElement.max = maxNumber;
    inputElement.min = 0;
    inputElement.placeholder = "?";
    return inputElement;
  }

  check = () => {
    switch (true) {
      case this.problemType == "abx":
        this.isCorrect = this.a + this.b == +this.inputElement.value;
        break;
      case this.problemType == "axc":
        this.isCorrect = this.a + +this.inputElement.value == this.c;
        break;
      case this.problemType == "xbc":
        this.isCorrect = +this.inputElement.value + this.b == this.c;
        break;
      case this.problemType == "cbxMinus":
        this.isCorrect = this.a - this.b == +this.inputElement.value;
        break;
      case this.problemType == "cxaMinus":
        this.isCorrect = this.a - +this.inputElement.value == this.c;
        break;
      case this.problemType == "xbaMinus":
        this.isCorrect = +this.inputElement.value - this.b == this.c;
        break;

      default:
        console.log("nem volt problemtype");
        this.isCorrect = false;
        break;
    }
    if (this.isCorrect) {
      xpFns.success();
    }
    this.render();
  };

  render() {
    while (this.node.firstElementChild) {
      this.node.removeChild(this.node.firstChild);
    }

    const btnElement = document.createElement("button");
    btnElement.innerText = this.isCorrect ? "✓" : "?";
    btnElement.addEventListener("click", this.check);

    this.node.append(
      this.createTd(
        this.isCorrect
          ? this.a
          : this.problemType == "xbc" || this.problemType == "xbaMinus"
          ? this.inputElement
          : this.a
      ),
      this.createTd(/Minus/.test(this.problemType) ? "-" : "+"),
      this.createTd(
        this.isCorrect
          ? this.b
          : this.problemType == "axc" || this.problemType == "cxaMinus"
          ? this.inputElement
          : this.b
      ),
      this.createTd("="),
      this.createTd(
        this.isCorrect
          ? this.c
          : this.problemType == "abx" || this.problemType == "cbxMinus"
          ? this.inputElement
          : this.c
      ),
      this.createTd(btnElement)
    );
    return this.node;
  }
}

function makeNumbers(maxNumber) {
  let c =
    Math.floor(maxNumber / 2) + Math.floor((Math.random() * maxNumber) / 2);
  let a = Math.floor(Math.random() * c);
  let b = c - a;
  return [a, b, c];
}

function callToRenders(maxNumber) {
  let problem1Array = makeNumbers(maxNumber);
  let problem2Array = makeNumbers(maxNumber);
  let problem3Array = makeNumbers(maxNumber);
  let problem4Array = makeNumbers(maxNumber);
  let problem5Array = makeNumbers(maxNumber);
  let problem6Array = makeNumbers(maxNumber);

  let toRender = "<table>";

  //xbc
  toRender += toRenderAbx(problem1Array);

  toRender += toRenderXbc(problem2Array);

  toRender += toRenderAxc(problem3Array);

  toRender += toRenderAbxMinus(problem4Array);

  toRender += toRenderXbcMINUS(problem5Array);

  toRender += toRenderAxcMINUS(problem6Array);

  toRender +=
    '</table><br><button onclick="location.reload()">Next >></button>';
  id("problems").innerHTML = toRender;
}

//addition
function toRenderXbc([a, b, c]) {
  const id = genID();
  return `<tr>
            <td><input type="number" id="${id}xbcX"></td>
            <td>+</td>
            <td id="${id}xbcB">${b}</td>
            <td>=</td>
            <td id="${id}xbcC">${c}</td>
            <td><button id="${id}btn" onclick="xbcCheck('${id}')"> ? </button></td>
        </tr>`;
}

function toRenderAxc([a, b, c]) {
  const id = genID();
  return `<tr>
                <td id="${id}axcA">${a}</td>
                <td>+</td>
                <td id="${id}axcB"><input type="number" id="${id}axcX"></td>
                <td>=</td>
                <td id="${id}axcC">${c}</td>
                <td><button id="${id}btn" onclick="axcCheck('${id}')"> ? </button></td>
            </tr>`;
}

function toRenderAbx([a, b, c]) {
  const id = genID();
  return `<tr>
                <td id="${id}abxA">${a}</td>
                <td>+</td>
                <td id="${id}abxB">${b}</td>
                <td>=</td>
                <td id="${id}abxC"><input type="number" id="${id}abxX"></td>
                <td><button id="${id}btn" onclick="abxCheck('${id}')"> ? </button></td>
            </tr>`;
}

function xbcCheck(Nodeid) {
  let x = id(Nodeid + "xbcX").value;
  let b = id(Nodeid + "xbcB").innerText;
  let c = id(Nodeid + "xbcC").innerText;

  if (+x + +b == +c) {
    success(Nodeid);
  } else {
    console.warn("Tévedés!");
  }
}

function axcCheck(Nodeid) {
  let a = id(Nodeid + "axcA").innerText;
  let x = id(Nodeid + "axcX").value;
  let c = id(Nodeid + "axcC").innerText;

  if (+a + +x == +c) {
    console.log("Siker axc!");
    success(Nodeid);
  } else {
    console.warn("Tévedés!");
  }
}

function abxCheck(Nodeid) {
  let x = id(Nodeid + "abxX").value;
  let b = id(Nodeid + "abxB").innerText;
  let a = id(Nodeid + "abxA").innerText;

  if (+a + +b == +x) {
    console.log("Siker abx!");
    success(Nodeid);
  } else {
    console.warn("Tévedés!");
  }
}

//subtraction

function toRenderAbxMinus([a, b, c]) {
  const id = genID();
  return `<tr>
                <td id="${id}abxA">${c}</td>
                <td>-</td>
                <td id="${id}abxB">${b}</td>
                <td>=</td>
                <td id="${id}abxC"><input type="number" id="${id}abxX"></td>
                <td><button id="${id}btn" onclick="abxCheckMinus('${id}')"> ? </button></td>
            </tr>`;
}

function toRenderXbcMINUS([a, b, c]) {
  const id = genID();
  return `<tr>
            <td><input type="number" id="${id}xbcX"></td>
            <td>-</td>
            <td id="${id}xbcB">${b}</td>
            <td>=</td>
            <td id="${id}xbcC">${a}</td>
            <td><button id="${id}btn" onclick="xbcCheckMinus('${id}')"> ? </button></td>
        </tr>`;
}

function toRenderAxcMINUS([a, b, c]) {
  const id = genID();
  return `<tr>
                <td id="${id}axcA">${c}</td>
                <td>-</td>
                <td id="${id}axcB"><input type="number" id="${id}axcX"></td>
                <td>=</td>
                <td id="${id}axcC">${a}</td>
                <td><button id="${id}btn" onclick="axcCheckMinus('${id}')"> ? </button></td>
            </tr>`;
}

function xbcCheckMinus(Nodeid) {
  let x = id(Nodeid + "xbcX").value;
  let b = id(Nodeid + "xbcB").innerText;
  let c = id(Nodeid + "xbcC").innerText;

  if (+x - +b == +c) {
    success(Nodeid);
  } else {
    console.warn("Tévedés!");
  }
}

function axcCheckMinus(Nodeid) {
  let a = id(Nodeid + "axcA").innerText;
  let x = id(Nodeid + "axcX").value;
  let c = id(Nodeid + "axcC").innerText;

  if (+a - +x == +c) {
    console.log("Siker axc!");
    success(Nodeid);
  } else {
    console.warn("Tévedés!");
  }
}

function abxCheckMinus(Nodeid) {
  let x = id(Nodeid + "abxX").value;
  let b = id(Nodeid + "abxB").innerText;
  let a = id(Nodeid + "abxA").innerText;

  if (+a - +b == +x) {
    console.log("Siker abx!");
    success(Nodeid);
  } else {
    console.warn("Tévedés!");
  }
}

function xpAtLevel() {
  let lvlNumber = wichLevel(getXp(), 100);
  let toReturn;
  toReturn = 10 - Math.round(lvlNumber / 80);
  toReturn = toReturn < 3 ? 3 : toReturn;
  return toReturn;
}

function success(Nodeid) {
  console.log("Siker!");
  id(Nodeid + "btn").innerText = "✓";
  id(Nodeid + "btn").onclick = "";
  setXp(xpAtLevel());
  levelUp();
}

// score, xp

function getXp() {
  if (!localStorage["pokemonXp"]) {
    localStorage.setItem("pokemonXp", "0");
  }
  return JSON.parse(localStorage["pokemonXp"]);
}

function setXp(bonus) {
  let currentXp = getXp();
  let newXp = +currentXp + bonus;
  localStorage.setItem("pokemonXp", JSON.stringify(newXp));
  console.log("New xp: " + localStorage.pokemonXp);
}

function wichLevel(xp, base) {
  return Math.floor(xp / base);
}

function levelUpModal(newEntryNr, xp, base) {
  let entry = findPokemonInPokedex(newEntryNr);
  let rawImage = entry["image"];
  const imageUrl = rawImage.replace("70px-", "250px-");
  const pokemonName = entry["name"];

  let template = `
    <div id="level-up-modal">
    <div id="new-pokemon">
      <img src="./img/new.svg" alt="New">
      <img src="${imageUrl}" onerror="this.onerror=null; this.src='${rawImage}'" alt="${pokemonName}">
      <img src="./img/Pokemon.svg" alt="pokemon">
      ${pokemonName}
  </div>
  NEW LEVEL:
    <span class="lvl-number">${wichLevel(xp, base)}</span>   
  </div>`;

  id("problems").innerHTML = template;
  setTimeout(() => {
    whoSThatPokemonRender();
  }, 9000);
}

function levelUp() {
  let base = 100;
  let xp = getXp();
  let nextLvlXp = nextLevelXp(xp, base);

  function nextLevelXp(xp, base) {
    return xp - (xp % base) + base;
  }

  // show xp bar
  id("xp-bar-inner").style.height = `${xp % base}%`;
  if (wichLevel(xp, base) > levelNr) {
    console.log("Szintlépés!");
    levelNr = wichLevel(xp, base);
    let newEntryNr = Math.ceil(Math.random() * 424);
    print_lvlNr();
    levelUpModal(createPokedex(newEntryNr), xp, base);
    renderPokeDex();
  }
}

function print_lvlNr() {
  id("lvl-number").innerHTML = `Level ${levelNr}`;
}

// PokeDex

function findPokemonInPokedex(Nr) {
  let entry = false;
  let indexOfEntry = Nr;
  let pokedexEdition = pokedex1;
  if (Nr < 53) {
    pokedexEdition = pokedex1;
  } else if (Nr > 52 && Nr <= 128) {
    pokedexEdition = pokedex2;
    indexOfEntry = Nr - 52;
  } else if (Nr > 128 && Nr < 352) {
    pokedexEdition = pokedex3;
    indexOfEntry = Nr - 128;
  } else if (Nr > 352 && Nr < 425) {
    pokedexEdition = pokedex4;
    indexOfEntry = Nr - 352;
  } else {
    console.warn("More pokedex editions please!");
  }

  entry = pokedexEdition[indexOfEntry - 1];
  return entry;
}

function createPokedex(Nr) {
  if (!localStorage["pokedex"]) {
    localStorage.setItem("pokedex", JSON.stringify([]));
  }
  let entries = JSON.parse(localStorage["pokedex"]);

  let newEntryNr = entries.includes(Nr) ? Nr + 1 : Nr;

  entries.push(newEntryNr);
  entries.sort((a, b) => a - b);
  localStorage.setItem("pokedex", JSON.stringify(entries));
  return newEntryNr;
}

function listFoundEntries(inputText) {
  const regexp = new RegExp(inputText, "i");
  let arrToReturn = allPokemonList.filter((entry) => regexp.test(entry.name));
  return arrToReturn;
}

let allPokemonList = [];
JSON.parse(localStorage.pokedex).forEach((nr) =>
  allPokemonList.push(findPokemonInPokedex(nr))
);

function renderPokeDex(isSearch = false) {
  let entries = isSearch
    ? listFoundEntries(id("Pokedex-search-index").value)
    : JSON.parse(localStorage["pokedex"]);

  let toRender =
    '<input type="text" onchange="renderPokeDex(true)" placeholder="🔍 name" id="Pokedex-search-index"><div class="card" onclick="renderPokeDex()"><h3>POKEDEX <span  class="book">📕</span></h3></div>';

  entries.forEach((entry) => {
    let currentEntry = isSearch ? entry : findPokemonInPokedex(entry);
    let number = currentEntry["nr"];
    let imgUrl = currentEntry["image"];
    let name = currentEntry["name"];

    let cardTemplate = `<div class="card">
  <div class="nr">${number}</div>
  <a href="https://bulbapedia.bulbagarden.net/wiki/${name}_(Pok%C3%A9mon)" target="_blank">
   <img
    class="card-img"
    src="${imgUrl}"
    alt="${name}"
   />
  </a>
  <div class="name-container">${name}</div>
  </div>`;

    toRender += cardTemplate;
  });
  id("collection").innerHTML = toRender;
}

function whoSThatPokemonRender() {
  let toRender = "";
  const entry = findPokemonInPokedex(Math.floor(Math.random() * 351));
  let rawImage = entry["image"];
  const imageUrl = rawImage.replace("70px-", "250px-");
  const pokemonName = entry["name"];

  let template = `
    <div id="whos-that-pokemon">
     
    <div ><img id="whos-that-pokemon-img" src="${imageUrl}" onerror="this.onerror=null; this.src='${rawImage}'"></div><input type="text" id="whos-that-pokemon-input" placeholder="Type my name!"><button id="confirm-that-pokemon" onclick="whoSThatPokemon('${pokemonName}')">?</button></div>`;
  toRender += template;
  id("problems").innerHTML = toRender;
}

function whoSThatPokemon(pokemonName) {
  if (
    pokemonName.toLowerCase() ==
    id("whos-that-pokemon-input").value.toLowerCase()
  ) {
    console.log("OKÉS!");
    setXp(30);
  } else {
    console.log("BAKI!");
    id("whos-that-pokemon-input").value = pokemonName;
    id("whos-that-pokemon-input").style.backgroundColor = "red";
  }
  levelUp();
  id("whos-that-pokemon-img").style.filter = "brightness(100%)";
  id("confirm-that-pokemon").innerText = "NEXT >>";
  id("confirm-that-pokemon").setAttribute("onclick", "");
  setTimeout(() => {
    id("confirm-that-pokemon").onclick = location.reload();
  }, 5000);
}

function firstRun() {
  if (!localStorage.pokemonXp || !localStorage.pokedex) {
    console.log("Első indítás");
    id(
      "problems"
    ).innerHTML = `<div><div><h1>Üdvözöllek leendő PoKéMon mester!</h1>Ebben a játékban matek példákat kell megoldanod a 20-as számkörben. A kérdőjelre kattintva kiderül, helyes-e a válaszod? Minden sikeres megoldás Xp-t ér. A zöld oszlop mutatja, hogy mennyi Xp kell a következő szintlépéshez. Minden szintlépéskor új pokemonnal gyarapszik a gyűjteményed! Vágj bele a kalandba most! <p>Szerezd meg hát mind!</p> <p>Ash</p> </div><button onclick="callToRenders(20)">Kezdjük!</button><div><img src="https://upload.wikimedia.org/wikipedia/en/e/e4/Ash_Ketchum_Journeys.png" alt="Ash welcomes you"></div></div>`;
    localStorage.setItem("pokemonXp", "0");
    localStorage.setItem("pokedex", "[]");
  } else {
    console.log("Többedik indítás");
    callToRenders(20);
  }

  renderPokeDex();
  levelUp();
  print_lvlNr();
}

// Render ALL
firstRun();
multiplyNumbersArray = [6, 7];
const mp = new MultiplyProblems();
mp.append();
