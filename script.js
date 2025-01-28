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
  }

  static setXp(bonus) {
    let currentXp = this.getXp();
    let newXp = +currentXp + bonus;
    localStorage.setItem("pokemonXp", JSON.stringify(newXp));
    document.getElementById("xp-bar-inner").style.height = `${newXp % 100}%`;
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
      return 0;
    }

    entry = pokedexEdition[indexOfEntry - 1];
    return entry;
  }

  static createPokedex(Nr) {
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

  static getOwnPokedexEntries(){
    if(!localStorage.pokedex || typeof(JSON.parse(localStorage.pokedex)) != 'object'){
      console.warn('Nem létezik a pokedex a localstorage-ban, vagy hibás az adattípus!');
      return;
    }
    const allPokemonList = [];
    JSON.parse(localStorage.pokedex).forEach((nr) =>
    allPokemonList.push(this.findPokemonInPokedex(nr)));
    return allPokemonList;
  }

  static get types() {
    //return {"Normal":{"superEffective":[],"weakAgainst":["Rock","Steel"],"unEffective":["Ghost"],"color":"#9FA19F"},"Fire":{"superEffective":["Grass","Ice","Bug","Steel"],"weakAgainst":["Fire","Water","Rock","Dragon"],"unEffective":[],"color":"red"},"Water":{"superEffective":["Fire","Ground","Rock"],"weakAgainst":["Water","Grass","Dragon"],"unEffective":[],"color":"#2980EF"},"Electric":{"superEffective":["Water","Flying"],"weakAgainst":["Electric","Grass","Dragon"],"unEffective":["Ground"],"color":"#FAC000"},"Grass":{"superEffective":["Water","Ground","Rock"],"weakAgainst":["Fire","Grass","Poison","Flying","Bug","Dragon","Steel"],"unEffective":[],"color":"green"},"Ice":{"superEffective":["Grass","Ground","Flying","Dragon"],"weakAgainst":["Fire","Water","Ice","Steel"],"unEffective":[],"color":"#3DCEF3"},"Fighting":{"color":"orange","superEffective":["Normal","Ice","Rock","Dark","Steel"],"weakAgainst":["Poison","Flying","Psychic","Bug","Fairy"],"unEffective":["Rock"]},"Poison":{"superEffective":["Grass","Fairy"],"weakAgainst":["Poison","Ground","Rock","Ghost","Steel"],"unEffective":["Steel"],"color":"purple"},"Ground":{"superEffective":["Fire","Electric","Poison","Rock","Steel"],"weakAgainst":["Grass","Bug"],"unEffective":["Flying"],"color":"#915121"},"Flying":{"superEffective":["Grass","Fighting","Bug"],"weakAgainst":["Electric","Rock","Steel"],"unEffective":[],"color":"#81B9EF"},"Psychic":{"superEffective":["Fighting","Poison"],"weakAgainst":["Psychic","Steel"],"unEffective":["Dark"],"color":"#EF4179"},"Bug":{"superEffective":["Grass","Psychic","Dark"],"weakAgainst":["Fire","Fighting","Flying","Poison","Ghost","Steel","Fairy"],"unEffective":[],"color":"#91A119"},"Rock":{"color":"#AFA981", "superEffective":["Fire","Ice","Flying","Bug"],"weakAgainst":["Fighting","Ground","Steel"],"unEffective":[]},"Ghost":{"color":"#704170", "superEffective":["Psychic","Ghost"],"weakAgainst":["Dark"],"unEffective":["Normal"]},"Dragon":{"color":"#5060E1", "superEffective":["Dragon"],"weakAgainst":["Steel"],"unEffective":["Fairy"]},"Dark":{"superEffective":["Psychic","Ghost"],"weakAgainst":["Fighting","Dark","Fairy"],"unEffective":[],"color":"#624D4E"},"Steel":{"superEffective":["Ice","Rock","Fairy"],"weakAgainst":["Fire","Water","Electric","Steel"],"unEffective":[],"color":"#60A1B8"},"Fairy":{"superEffective":["Fighting","Dragon","Dark"],"weakAgainst":["Fire","Poison","Steel"],"unEffective":[],"color":"#EF70EF"}};
  
    return {"Normal":{"superEffective":[],"weakAgainst":["Rock","Steel"],"unEffective":["Ghost"],"color":"#9FA19F","uniChar":""},"Fire":{"superEffective":["Grass","Ice","Bug","Steel"],"weakAgainst":["Fire","Water","Rock","Dragon"],"unEffective":[],"color":"red","uniChar":"🔥"},"Water":{"superEffective":["Fire","Ground","Rock"],"weakAgainst":["Water","Grass","Dragon"],"unEffective":[],"color":"#2980EF","uniChar":"🌊"},"Electric":{"superEffective":["Water","Flying"],"weakAgainst":["Electric","Grass","Dragon"],"unEffective":["Ground"],"color":"#FAC000","uniChar":"⚡"},"Grass":{"superEffective":["Water","Ground","Rock"],"weakAgainst":["Fire","Grass","Poison","Flying","Bug","Dragon","Steel"],"unEffective":[],"color":"green","uniChar":"🍃"},"Ice":{"superEffective":["Grass","Ground","Flying","Dragon"],"weakAgainst":["Fire","Water","Ice","Steel"],"unEffective":[],"color":"#3DCEF3","uniChar":"❄"},"Fighting":{"color":"orange","superEffective":["Normal","Ice","Rock","Dark","Steel"],"weakAgainst":["Poison","Flying","Psychic","Bug","Fairy"],"unEffective":["Rock"],"uniChar":"✊"},"Poison":{"superEffective":["Grass","Fairy"],"weakAgainst":["Poison","Ground","Rock","Ghost","Steel"],"unEffective":["Steel"],"color":"#9b019b","uniChar":"☠"},"Ground":{"superEffective":["Fire","Electric","Poison","Rock","Steel"],"weakAgainst":["Grass","Bug"],"unEffective":["Flying"],"color":"#915121","uniChar":"🟤"},"Flying":{"superEffective":["Grass","Fighting","Bug"],"weakAgainst":["Electric","Rock","Steel"],"unEffective":[],"color":"#81B9EF","uniChar":"🐦"},"Psychic":{"superEffective":["Fighting","Poison"],"weakAgainst":["Psychic","Steel"],"unEffective":["Dark"],"color":"#EF4179","uniChar":"🧠"},"Bug":{"superEffective":["Grass","Psychic","Dark"],"weakAgainst":["Fire","Fighting","Flying","Poison","Ghost","Steel","Fairy"],"unEffective":[],"color":"#91A119","uniChar":"🐛"},"Rock":{"color":"#AFA981","superEffective":["Fire","Ice","Flying","Bug"],"weakAgainst":["Fighting","Ground","Steel"],"unEffective":[],"uniChar":"🌑"},"Ghost":{"color":"#704170","superEffective":["Psychic","Ghost"],"weakAgainst":["Dark"],"unEffective":["Normal"],"uniChar":"👻"},"Dragon":{"color":"#5060E1","superEffective":["Dragon"],"weakAgainst":["Steel"],"unEffective":["Fairy"],"uniChar":"🐉"},"Dark":{"superEffective":["Psychic","Ghost"],"weakAgainst":["Fighting","Dark","Fairy"],"unEffective":[],"color":"#624D4E","uniChar":"⚫"},"Steel":{"superEffective":["Ice","Rock","Fairy"],"weakAgainst":["Fire","Water","Electric","Steel"],"unEffective":[],"color":"#60A1B8","uniChar":"⚔"},"Fairy":{"superEffective":["Fighting","Dragon","Dark"],"weakAgainst":["Fire","Poison","Steel"],"unEffective":[],"color":"#EF70EF","uniChar":"🧚"}};
  }
}

class WhoSThatPokemon{
  constructor(rootObj){
    this.rootObj = rootObj;
    
    this.entry = pokedexFns.findPokemonInPokedex(Math.floor(Math.random() * 351));
    this.entryIndex = Number(this.entry.nr.replace('#',''));
    this.smallImg = this.entry["image"];
    this.bigImg = this.smallImg.replace("70px-", "250px-");
    this.node = nodeFns.createElement([],'div','',"whos-that-pokemon");
    this.whosThatPokeImg = nodeFns.createElement([],'img','',"whos-that-pokemon-img");
    this.isSolved = false;
    this.options = this.optionsCreator();
    this.nextBtn = this.nextBtnCreator();
  
  if(this.rootObj && this.rootObj.goTo){}
  this.rootObj.goTo.WhoSThatPokemon = this;
  }

  nextBtnCreator(){
    const nextBtn = nodeFns.createElement(["next-button","float-right"],'button',"NEXT >>");
    nextBtn.style.marginBottom = '-2rem';
    nextBtn.addEventListener('click',this.rootObj.lvlUpModalNextBtnListener)

    return nextBtn;
  };

  optionsCreator(){
    let optionsArray = [];
    if(this.entryIndex == 1){
      optionsArray = [1,2,3,4];
    } else if(this.entryIndex == 351){
      optionsArray = [348,349,350,351];
    } else {
    for(let i = this.entryIndex -1; i <= this.entryIndex+2; i++){
      optionsArray.push(i);
    }};
    return optionsArray.map(nr=>pokedexFns.findPokemonInPokedex(nr).name).sort();
  }

  render(){
  while (this.node.firstChild) {
    this.node.removeChild(this.node.firstChild);
  }
  const containerDiv = nodeFns.createElement();
    this.whosThatPokeImg.src = this.bigImg;
    this.whosThatPokeImg.alt = "Who's that Pokemon?";
    this.whosThatPokeImg.setAttribute('onerror',`this.onerror=null; this.src='${this.smallImg}'`); 

  const anwersDiv = nodeFns.createElement(["whos-that-answers-div"]);
  this.options.forEach(answer=>{
    const answerElement = nodeFns.createElement(["whos-that-answer"],'div',answer,answer);
    answerElement.addEventListener('click',this.check);
    anwersDiv.append(answerElement);
    if(this.isSolved && answer != this.entry.name){
      answerElement.style.opacity = '.4';
    }
  })
  containerDiv.append(this.whosThatPokeImg);

  this.node.append(
    containerDiv,
    anwersDiv,
    this.isSolved? this.nextBtn : '',
    
  );
  return this.node;
}

check = (event) =>{
  if(this.isSolved){return} 
  this.isSolved = true;
   this.whosThatPokeImg.style.filter = "brightness(100%)";
  if(event.target.id == this.entry.name){
    console.log("Helyes válasz a "+ event.target.id)
    //xpFns.setXp(30); -> átrakva a setTimeout-ba
    this.rootObj? this.rootObj.levelUp() : levelUp();
  } 
  setTimeout(()=>{
    if(event.target.id == this.entry.name){ xpFns.setXp(30);}
    this.render()
  },1000)
}

append =()=>{
  document.getElementById('problems').innerHTML = "";
  console.log(this)
  document.getElementById('problems').append(this.render());
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
    this.maxNumber = this.parentObj.multiplyNumbersArray && this.parentObj.multiplyNumbersArray.length
      ? this.parentObj.multiplyNumbersArray[
          Math.floor(Math.random() * this.parentObj.multiplyNumbersArray.length)
        ]
      : 2;
    
    this.node = document.createElement("table");
    this.id = Math.floor(Math.random()*100000);

    this.a = Math.ceil(Math.random() * 10);
    this.b = this.maxNumber;
    this.c = this.a * this.b;

    this.inputElement = this.inputCreator();
    this.button = this.buttonCreator();
    this.btnElement = this.button;
    this.isSolved = false;
    this.isAnswered = false;
  }

  inputCreator() {
    const inputElement = document.createElement("input");
    inputElement.type = "number";
    inputElement.max = 10 * this.maxNumber;
    inputElement.min = 1;
    inputElement.addEventListener(
      'keydown', (event) => {
        if (event.code !== 'Enter'){return;
        } else {this.check();}
      })

    return inputElement;
  }

  check = () => {
    let isCorrect = this.inputElement.value == this.c;
    
    if (isCorrect && !this.isSolved) {
      this.button.innerText = "✓";
      xpFns.setXp(xpAtLevel());
      this.parentObj.rootObj.levelUp(); 
      //r.levelUp(); // TODO kikeresni a megfelelő elérési utat!
      this.isSolved = true; 
      this.render();
    } else if(this.isAnswered && !isCorrect){
      this.inputElement.style.backgroundColor = "red";
    };
    this.isAnswered = true;

    return isCorrect;
  }

  buttonCreator() {
    const btn = document.createElement("button");
    btn.innerText = "?";
    btn.addEventListener("click", this.check);
    return btn;
  }

  
 render() {
    while (this.node.firstChild) {
      this.node.removeChild(this.node.firstChild);
    }

    this.node.id = this.id;
    const tableRow = document.createElement("tr");
    tableRow.innerHTML = `<td>${this.a}</td><td> × </td><td>${this.b}</td><td> = </td>`;
    const tableData = document.createElement("td");
    tableData.append(!this.isSolved? this.inputElement : this.c);
    tableRow.append(tableData);
    tableRow.append(this.button);

    this.node.append(tableRow);
    return this.node;
  }

  append() {
    document.getElementById("problems").append(this.render());
  }
}

class MultiplyProblems {
  constructor(rootObj) {
    this.rootObj = rootObj
    this.multiplyNumbersArray = sessionStorage["multiplyNumbersArray"]
      ? JSON.parse(sessionStorage["multiplyNumbersArray"])
      : multiplyNumbersArray;
    this.nextBtn = this.nextBtnCreator();
    this.problemList = this.createProblems();
    this.SelectNumbers = new SelectNumbers(this);
    this.node = document.createElement("div");
  
    if(this.rootObj && this.rootObj.goTo){
      this.rootObj.goTo.MultiplyProblems = this;
    }
  }

  nextBtnCreator() {
    const btn = document.createElement("button");
    btn.id = "next-multiplycations";
    btn.innerText = "NEXT >>";
    btn.addEventListener("click", () => {
      if (this.unsolvedProblemsSum) {
        this.problemList.forEach(problem=>problem.check());
        this.render;
      } else {
        this.problemList = this.createProblems();
        this.render;
      }
    });
    return btn;
  }

  get unsolvedProblemsSum() {
    return this.problemList.filter((problemObj) => {
      //problemObj.check();
      return !problemObj.isSolved}).length;
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

    this.problemList.forEach((problem) => this.node.append(problem.render()));
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
  constructor(rootObj,maxNumber = 0) {
    this.rootObj = rootObj;
    this.maxNumber = maxNumber && typeof(maxNumber) != "object" ? +maxNumber:
      sessionStorage.maxNumber? +sessionStorage.maxNumber:
      0 
    ;

    this.problemList = this.problemListCreator();
    //nodes
    this.chooseMaxNumber = this.chooseMaxNumberCreator();
    this.node = document.createElement("table");
    this.nextBtn = this.nextBtnCreator();
    this.selectMaxNumberInput = !this.maxNumber? new ProblemTypeSelect(this,true,'+/-'): null;
    if(this.rootObj && this.rootObj.goTo){
      this.rootObj.goTo.AdditionAndSubtractionProblems = this;
    }
  }

  reset(){
    this.problemList = this.problemListCreator();
    this.chooseMaxNumber = this.chooseMaxNumberCreator();
    this.render();
  }

  nextBtnCreator() {
    const btnElement = document.createElement("button");
    btnElement.innerText = "Next >>";
    btnElement.addEventListener("click", (e) => {
      if (this.problemList.every((li) => {li.check(); return li.isCorrect;})) {
        console.log("mind jó");
        this.reset();
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
          this.makePrivateNumbers(),
          AdditionAndSubtractionProblems.randomProblemType()
        )
      );
    }
    return list;
  }

  static randomProblemType() {
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
    const dialogeElement = nodeFns.createElement(["choose-maxNumber-dialog"],'dialog')
    dialogeElement.open = true;

    const pElement = document.createElement("div");
    pElement.innerText =
      "Mi legyen a legmagasabb szám, amivel számolni szeretnél?";

    const inputElement = document.createElement("input");
    inputElement.type = "number";
    inputElement.max = 99;
    inputElement.min = 10;
    inputElement.value = 30;

    const btnElement = nodeFns.createElement(["float-right"],"button","kiválaszt");
    
    const listener = (e) => {
      this.maxNumber = +e.target.parentElement.children[1].value;
      e.target.parentElement.open = false;
      sessionStorage.setItem('maxNumber',this.maxNumber)
      this.problemList = this.problemListCreator();
      this.render();
    };

    btnElement.addEventListener("click", listener);

    dialogeElement.append(pElement, inputElement, btnElement);
    return dialogeElement;
  }

  makePrivateNumbers(){
    let c =
      Math.floor(this.maxNumber / 2) +
      Math.floor((Math.random() * this.maxNumber) / 2);
    let a = Math.floor(Math.random() * c);
    let b = c - a;
    
    return [a, b, c];
  }
  
  static makeNumbers(maximum = 0) {
    let maxNumber = maximum;
    if(!maximum){maxNumber = this.maxNumber}
    
    let c =
      Math.floor(maxNumber / 2) +
      Math.floor((Math.random() * maxNumber) / 2);
    let a = Math.floor(Math.random() * c);
    let b = c - a;
    console.log('itt')
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
    
    // if(this.selectMaxNumberInput){
    // tBodyElement.append(this.selectMaxNumberInput.render());
    // }
    
    this.node.append(tBodyElement, document.createElement("br"), this.nextBtn);
    tBodyElement.append(
      !this.maxNumber ? this.chooseMaxNumber : "",
      ...this.problemList.map((problemItem) => problemItem.render())
    );
    return this.node;
  }


    append() {
      document.getElementById("problems").innerHTML = "";
      document.getElementById("problems").append(this.render());
    }
  

}

class AdditionProblem {
  constructor(
    parentObj = {},
    maxNumber = 20,
    numberArr = [1, 2, 3],
    problemType = "abx",
    canGainXP = true,
  ) {
    this.parentObj = parentObj;
    this.problemType = problemType;
    this.a = /Minus/.test(problemType) ? numberArr[2] : numberArr[0];
    this.b = numberArr[1];
    this.c = /Minus/.test(problemType) ? numberArr[0] : numberArr[2];
    this.isCorrect = undefined;
    this.canGainXP = canGainXP;
    this.isAnswered = false;
    //nodes
    this.node = document.createElement("tr");
    this.inputElement = this.createInput(maxNumber);
    this.btnElement = document.createElement("button");

    this.mainObject = this.parentObj.mainObject;
    if(this.mainObject && this.mainObject.goTo){this.mainObject.goTo.Problem = this;};
  
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

    inputElement.addEventListener(
      'keydown', (event) => {
        if (event.code !== 'Enter'){return;
        } else {this.check();}
      })

    return inputElement;
  }

  check = () => {
    if(this.isCorrect){return this.isCorrect;};
    this.isAnswered = true;
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
      if(this.canGainXP){
       
        xpFns.success();
        this.parentObj.rootObj.levelUp();
      }
    }
  
    this.render();
    return this.isCorrect;
  };

  render() {
    console.warn("AdditionProblem rendered")
    while (this.node.firstElementChild) {
      this.node.removeChild(this.node.firstChild);
    }

    if(this.isAnswered && !this.isCorrect){
      this.inputElement.style.backgroundColor = "red";
    }
    
    this.btnElement.innerText = this.isCorrect ? "✓" : "?";
    this.btnElement.addEventListener("click", this.check);

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
      this.createTd(this.btnElement)
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
JSON.parse(localStorage.pokedex? localStorage.pokedex : "[]").forEach((nr) =>
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
class RenderPokeDex{
  constructor(){
    this.allEntriesToShow = pokedexFns.getOwnPokedexEntries();
    this.inputNode = this.createInput();
    this.searchBtn = this.searchBtnCreator();
    this.node = document.getElementById('collection');
  }

  searchBtnCreator(){
    const btn = nodeFns.createElement([],'button','🔍','Pokedex-search-btn');
    btn.addEventListener('click',()=>listFoundEntries(this.inputNode.value));
    return btn;
  }

  createInput(){
    const inputElement = document.createElement('input');
    inputElement.type="text"; 
    inputElement.placeholder="🔍 name"; 
    inputElement.id="Pokedex-search-index";
    inputElement.addEventListener('change',(event)=>{
      this.listFoundEntries(event.target.value);
    })
    return inputElement;
  }

  listFoundEntries(inputText) {
    const regexp = new RegExp(inputText, "i");
    this.allEntriesToShow = pokedexFns.getOwnPokedexEntries().filter((entry) => regexp.test(entry.name));
    this.render();
  }
  refresh(){
    this.allEntriesToShow = pokedexFns.getOwnPokedexEntries();
    this.render();
  }

  render(){
    while (this.node.firstChild) {
      this.node.removeChild(this.node.firstChild);
    } 

    const pokedexIconDiv = nodeFns.createElement(["card","justify-center"],'div',nodeFns.createElement(["pokedex-svg"]));  
    pokedexIconDiv.addEventListener('click',()=>{
      this.allEntriesToShow = pokedexFns.getOwnPokedexEntries();
      this.render();
    })
    
    const allCardsOfEntries = this.allEntriesToShow.map(entry=>{
      const currentEntry = new PokeDexCard(entry);
      return currentEntry.render();
    })
    const searchDiv = nodeFns.createElement(["search-pokedex-div"]);
      searchDiv.append(
        this.inputNode,
        this.searchBtn,
      );

    this.node.append(
      pokedexIconDiv,
      searchDiv,

      ...allCardsOfEntries
    );

    return this.node;
  }

}

class PokeDexCard{
  constructor(entry){
    this.entry = entry;
    this.node = nodeFns.createElement(["card"]);
  }
  render(){
    
    const typesString = this.entry.type.reduce((accu,actu)=>{
      return accu + pokedexFns.types[actu].uniChar;
  },'');

    const numberDiv = nodeFns.createElement(['nr'],'div',this.entry.nr);
    const imageLink = nodeFns.createElement( [],'a',nodeFns.img(this.entry.image,this.entry.name,["card-img"]));
    imageLink.href = `https://bulbapedia.bulbagarden.net/wiki/${this.entry.name}_(Pok%C3%A9mon)`;
    imageLink.target="_blank";
    
   
    const nameContainerDiv = nodeFns.createElement(["name-container"],'div',this.entry.name)

    this.node.append(
      numberDiv, typesString,
      imageLink,
      nameContainerDiv,
    )
    return this.node;
  }
}

class StarterPokemonSelect{
  constructor(parentObj){
    this.parentObj = parentObj;
    this.entryNodeList = [
      new PokemonsToChoose(this,pokedex1[0]),
      new PokemonsToChoose(this,pokedex1[3]),
      new PokemonsToChoose(this,pokedex1[6]),
    ];
    this.chooseStarterBtn = this.createStarterBtn();
    
    this.node = this.createSelectPokemonDialog();
  }

  removeIsSelectedFromAll(){
    this.entryNodeList.forEach(obj=>{
      obj.isSelected = false;
      obj.render();
    })
  }

  createStarterBtn(){
    const btn = nodeFns.createElement([],'button',"Ezt kérem!");
    btn.addEventListener('click', 
    ()=>{  
      const selected = this.entryNodeList.filter(entryNode=>entryNode.isSelected)[0];
      console.log("Helló :",this);
      if(selected){
        localStorage.setItem('pokedex',`[${+selected.pokedexEntry.nr.replaceAll(/\W/g,'')}]`)
       
        this.parentObj.ChooseYourHero.battleEnded = true;
       
        this.parentObj.ChooseYourHero.reset();
        this.parentObj.RenderPokeDex.refresh();
        this.parentObj.render();
      } else {alert('Jelöld meg az egyik pokémont a fentiek közül, és próbáld újra!');} 
    })

    return btn;
  }  

  createSelectPokemonDialog(){
    const starterPokemonDialog = nodeFns.createElement(
      ['choose-maxNumber-dialog'],
      'dialog',
      '',
      "choose-starter-pokemon",
    );    
  return starterPokemonDialog;
  }

  render(){
  while (this.node.firstChild) {
    console.log(`deleting ${this.node.firstChild}`);
    this.node.removeChild(this.node.firstChild);
  }
    this.node.append(
      nodeFns.createElement([],'h3','Válassz kezdő pokémont!'),
      ...this.entryNodeList.map(obj=>obj.render()),
      this.chooseStarterBtn,
    );

    return this.node;
  }

  append(){
    document.getElementById("problems").append(this.render());
  }
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
 
    id(
      "problems"
    ).innerHTML = `<div><div><h1>Üdvözöllek leendő PoKéMon mester!</h1>Ebben a játékban matek példákat kell megoldanod a 20-as számkörben. A kérdőjelre kattintva kiderül, helyes-e a válaszod? Minden sikeres megoldás Xp-t ér. A zöld oszlop mutatja, hogy mennyi Xp kell a következő szintlépéshez. Minden szintlépéskor új pokemonnal gyarapszik a gyűjteményed! Vágj bele a kalandba most! <p>Szerezd meg hát mind!</p> <p>Ash</p> </div><button onclick="callToRenders(20)">Kezdjük!</button><div><img src="https://upload.wikimedia.org/wikipedia/en/e/e4/Ash_Ketchum_Journeys.png" alt="Ash welcomes you"></div></div>`;
    localStorage.setItem("pokemonXp", "0");
    localStorage.setItem("pokedex", "[]");
 
  renderPokeDex();
  levelUp();
  print_lvlNr();
}

class Root{
  constructor(){
    this.firstStart = this.firstRun();
    
    this.goTo = {};
    this.rootObj = this;
    this.levelNr = localStorage.pokemonXp? xpFns.wichLevel(+localStorage.pokemonXp,100) : 1; 

    this.Menu = new Menu(this)
    this.ChooseYourHero = new ChooseYourHero(this);
    this.MultiplyProblems = new MultiplyProblems(this);
    this.AdditionAndSubtractionProblems = new AdditionAndSubtractionProblems(this,0);
    this.RenderPokeDex = new RenderPokeDex();
    this.lvlUpModalNextBtn = this.lvlUpModalNextBtnCreator();
    
    this.toDoLIst = [];
  
  }

  firstRun() {
    if (!localStorage.pokemonXp || !Boolean(+localStorage.pokemonXp) || !localStorage.pokedex || localStorage.pokedex =="[]") {
      console.log("Első indítás");
  
      //setting local data
      localStorage.setItem("pokemonXp", "1");
      localStorage.setItem("pokedex", "[]");      
      
      //clearing "problems" div
      const problemsNode =  document.getElementById("problems");
      problemsNode.innerHTML = '';
      
      //creating welcome div
      const firstRunDiv = nodeFns.createElement();
      const welcomeH1 = nodeFns.createElement([],'h1','Üdvözöllek leendő PoKéMon mester!');
      const gottaCatchP = nodeFns.createElement([],'p','Szerezd meg hát mind!');
      const ashP = nodeFns.createElement([],'p','Ash');
      const letsStartBtn = nodeFns.createElement(["float-right"],'button','Kezdjük');
      letsStartBtn.addEventListener('click',()=>{
        
        if(localStorage.pokedex == '[]')
          {const selectStarterPokemon = new StarterPokemonSelect(this);
            selectStarterPokemon.node.open = true;
            problemsNode.append(selectStarterPokemon.render());
          }
        //this.render();
      });
      
      const welcomeTxtDiv = nodeFns.createElement(["welcome-text-container"]);
      welcomeTxtDiv.append(
        welcomeH1,
        'Ebben a játékban matek példákat kell megoldanod a egy általad kiválasztott számkörben. A kérdőjelre kattintva kiderül, helyes-e a válaszod? Minden sikeres megoldás Xp-t ér. A zöld oszlop mutatja, hogy mennyi Xp kell a következő szintlépéshez. Minden szintlépéskor új pokemonnal gyarapszik a gyűjteményed! Vágj bele a kalandba most!',
        gottaCatchP,
        ashP,
        letsStartBtn,
      )

      const ashImgElement = nodeFns.img("https://upload.wikimedia.org/wikipedia/en/e/e4/Ash_Ketchum_Journeys.png","Ash welcomes you!");
      const ashImgDiv = nodeFns.createElement([],'div',ashImgElement);

      firstRunDiv.append(
        welcomeTxtDiv,
        ashImgDiv,
      )
      //appending welcome div
      problemsNode.append(firstRunDiv);      

      return true;
    
    } else {
      xpFns.setXp(0);
      console.log("Többedik indítás OOP alapon");
      return false;
    }
  }

  lvlUpModalNextBtnCreator(){
    const btnElement = nodeFns.createElement([],'button','NEXT>>');
    btnElement.addEventListener('click',()=>{
      if(this.toDoLIst.length){
        const firstToDo = this.toDoLIst.shift();
        firstToDo();
      } else {
        this.render();
      }
    })

    return btnElement;
  }
  lvlUpModalNextBtnListener =()=>{
    if(this.toDoLIst.length){
      const firstToDo = this.toDoLIst.shift();
      firstToDo();
    } else {
      this.render();
    }
  }

  levelUpModalCreator(argArr){
    const [newPokemon,getLevelNr] = argArr;
    let entry = findPokemonInPokedex(newPokemon);
    let rawImage = entry["image"];
    const imageUrl = rawImage.replace("70px-", "250px-");
    const pokemonName = entry["name"];

    const innerDivElement = nodeFns.createElement([],'div','','new-pokemon');
    const pokemonImg = nodeFns.img(imageUrl,pokemonName);
      pokemonImg.setAttribute('onerror',`this.onerror=null; this.src='${rawImage}'`)
    
    innerDivElement.append(
      nodeFns.img("./img/new.svg","New"),
      pokemonImg,
      nodeFns.img("./img/Pokemon.svg","Pokemon"),
      pokemonName,
    )

    const element = nodeFns.createElement([],'div',innerDivElement,'level-up-modal');
    element.append(
      "NEW LEVEL:",
      nodeFns.createElement(["lvl-number"],'span',getLevelNr),
      this.lvlUpModalNextBtn,
    )
    
    document.getElementById('problems').innerHTML = '';
    document.getElementById('problems').append(element);
  }

  levelUp(){
    const isToDoLIstEmpty = !Boolean(this.toDoLIst.length)
    let lvlUpThisManyTimes = 0;
    while (localStorage.pokemonXp && this.levelNr != xpFns.wichLevel(+localStorage.pokemonXp,100) && this.levelNr<10000) {
      console.log("Még kell szintet lépni! " +  this.levelNr);
      const newPokemon = Math.ceil(Math.random() * 424);
      pokedexFns.createPokedex(newPokemon);

      this.toDoLIst.push(this.levelUpModalCreator.bind(this,[newPokemon,this.levelNr]));
      const whosThatPokemon = new WhoSThatPokemon(this);
      this.toDoLIst.push(whosThatPokemon.append);
      
      this.levelNr++;
      lvlUpThisManyTimes++;
    }
    if(this.toDoLIst.length && lvlUpThisManyTimes && isToDoLIstEmpty){
      this.toDoLIst.shift()();
    }
    this.RenderPokeDex.refresh();
  }

  render(){
    this.Menu.append();
    
    switch (true) {
      case this.firstStart == true:
        this.firstStart = false;
      break;
      case this.goTo.Menu.selected == '+/-':
      this.AdditionAndSubtractionProblems.append();
        break;
    case this.goTo.Menu.selected == '×/:':
    this.MultiplyProblems.append();
          break;
    case this.goTo.Menu.selected == 'VS':
    this.ChooseYourHero.append();
        break;
      default:
        console.log('Szar van a palacsintában!')
        break;
    } 
    
    this.RenderPokeDex.render();
  }
}

class Menu{
  constructor(rootObj){
    this.rootObj = rootObj;
    this.selected = 'VS';

    this.addOrSubstrBtn = this.buttonGenerator('+/-');
    this.MultiplyBtn = this.buttonGenerator('×/:');
    this.vsBtn = this.buttonGenerator('VS');
    this.pokedexBtn = this.pokedexBtnCreator();
    this.node = nodeFns.createElement([],'div','','choose-game-type');

    if(this.rootObj && this.rootObj.goTo){
      this.rootObj.goTo.Menu = this;
    }
  }

  pokedexBtnCreator(){
    const pokeBtn = nodeFns.createElement(["pokedex-svg"],'div',' ')
    pokeBtn.addEventListener('click',()=>{console.log('show pokedex')})
    return pokeBtn;
  }

  buttonGenerator(text){
   const btn = nodeFns.createElement(["lvl-number","game-type"],'div',text);
   
   const eventListener =()=>{
    this.selected = text;
    this.rootObj.render(); 
   }
   
   btn.addEventListener('click',eventListener); 
   return btn;
  }

  render(){
    console.log('menu rendered')
    while (this.node.firstChild) {
      this.node.removeChild(this.node.firstChild);
    }  
    const lvlNumberSpan = nodeFns.createElement(["game-type"],'span',`level ${xpFns.wichLevel(localStorage.pokemonXp? localStorage.pokemonXp:0,100)}`,'lvl-number');  

    this.node.append(
      lvlNumberSpan,
      this.addOrSubstrBtn,
      this.MultiplyBtn,
      this.vsBtn,
      this.pokedexBtn,
    )
    return this.node;
  }

  append(){
    const pokeballDecoration = document.getElementById('pokeball-decoration');
    while (pokeballDecoration.firstChild) {
      pokeballDecoration.removeChild(pokeballDecoration.firstChild);
    }  
    pokeballDecoration.append(this.render());
  }
}

// Render ALL
//firstRun();
multiplyNumbersArray = [6, 7];

// const mp = new MultiplyProblems();
// mp.append();
const r = new Root(); r.render()