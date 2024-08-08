

class BattleDialog {
  constructor(isOpen = true, pokemon,opponent,parentObj,rootObj) {
    this.node = nodeFns.createElement(["battle-dialog"], "dialog");
    this.node.open = isOpen;
    this.parentObj = parentObj;
    this.rootObj = rootObj;

    this.player = pokemon;
    this.opponent = opponent;
    this.playersTurn = true;

    this.animationInProgrress = null;

    this.goTo = {};
    this.battleground = nodeFns.createElement(["battleground"]);
    this.attackContainer = new AttackContainer(this);
    this.battleInfo = new BattleInfo(this, this.player, this.opponent,this.parentObj.problemTypeSelect.maxNumber,this.rootObj);
    this.playerPokemonContainer = this.playerImgCreator();
    this.opponentPokemonContainer = this.oppoentImgCreator();
    this.math = new BattleMath(this,this.player,this.opponent);
    this.mainObject = this;
    
  }

  

  close(){
    this.node.open = false;
  }

  playerImgCreator(){
    const playerPokemonImg = nodeFns.img(
      this.player.image,
      `player's pokemon: ${this.player.name}`,
      ["hundred-percent-w-and-h"]
    );
    const playerPokemonContainer = nodeFns.createElement(
      ["players", "pokemon"],
      "div",
      playerPokemonImg
    );
    return playerPokemonContainer;
  }

  oppoentImgCreator(){
    const opponentPokemonImg = nodeFns.img(
      this.opponent.image,
      `opponent's pokemon: ${this.opponent.name}`,
      ["hundred-percent-w-and-h"]
    );
    const opponentPokemonContainer = nodeFns.createElement(
      ["opponents", "pokemon"],
      "div",
      opponentPokemonImg
    );
    return opponentPokemonContainer;
  }

  render() {
    while (this.node.firstChild) {
      console.log("has first child");
      this.node.removeChild(this.node.firstChild);
    }
    
    const cloud = nodeFns.createElement(["cloud"]);
    
    this.battleground.append(
      cloud,
      this.battleInfo.render(),
      this.playerPokemonContainer,
      this.opponentPokemonContainer,
      this.attackContainer.render()
    );

    this.node.append(this.battleground);
    return this.node;
  }

  append() {
    document.getElementById("root").append(this.render());
  }
}



class AttackContainer {
  constructor(parentObj) {
    this.parentObj = parentObj;
    this.mainObject = parentObj;
    
  //Kell-e az alábbi?
    this.opponentAttackNode = nodeFns.createElement(["attack-container", "opponent-attack-container","reverse-attack"]);
    this.playerAttackNode = nodeFns.createElement(["attack-container"]);   
  //Kell-e a fölébbi?  
    this.node = nodeFns.createElement(["attack-container"],'div',this.playerAttackNode);
    this.node.append(this.opponentAttackNode);

    this.allTypeFns = this.allTypeFnsSetter();
    this.attackQueve = [()=>{console.log('Go!')}];
    this.setIntervalId = setInterval(() => {
      this.attackQueveHandler(); 
      if(this.parentObj.math.isEnded){
        this.parentObj.math.endBattle();
      }
    }, 500);
    this.attackDuration = 2000;
    
    parentObj.goTo.AttackContainer = this;
  }

  attackQueveHandler(){
    if(this.attackQueve.length && !this.mainObject.animationInProgrress){this.attackQueve.shift()()}
    console.log(this.attackQueve);
  }

  presetAttack(playersTurn){
    const node = playersTurn? this.playerAttackNode : this.opponentAttackNode;
    this.mainObject.animationInProgrress = true;
    const attacker = playersTurn? this.parentObj.playerPokemonContainer : this.parentObj.opponentPokemonContainer;
    const defender = !playersTurn? this.parentObj.playerPokemonContainer : this.parentObj.opponentPokemonContainer;
      return {node,attacker,defender};
      }
  
  clearAttack(node,attacker,defender,duration = this.attackDuration){
    setTimeout(() => {
      if(defender){defender.classList.remove("hit");}
      while(node && node.firstChild){
        node.removeChild(node.firstChild)
      };
      this.mainObject.animationInProgrress = false;
      console.log("this.mainObject.animationInProgrress: ",this.mainObject.animationInProgrress);
    }, duration);
  }

  allTypeFnsSetter() {
    return {
      Normal: (playersTurn = true) => {
        const {attacker,defender} = this.presetAttack(playersTurn);

        attacker.classList.add(playersTurn? "attacking-enemy" : "attacking-player");
        defender.classList.add("hit");
        setTimeout(() => {
          attacker.classList.remove("attacking-enemy")
          attacker.classList.remove("attacking-player");
          defender.classList.remove("hit");
          console.log("attack removed")
          this.mainObject.animationInProgrress = false;
        console.log("this.mainObject.animationInProgrress: ",this.mainObject.animationInProgrress);
        }, 1000);
      
      },
      Fire: (playersTurn = true) => {
        const {node,attacker,defender} = this.presetAttack(playersTurn);

        const fireBlockArray = [];

        function fireBlockCSS(coneNode) {
          const HTMLcollection = fireBlockArray;
          const oneLeapSize = Math.floor(70/HTMLcollection.length);
          HTMLcollection.forEach((block, index) => {
            
            block.style.height = `${(index + 1)*oneLeapSize}px`;
            
            setTimeout(() => {
              coneNode.style.height = `${(index + 1)*oneLeapSize}px`;
              block.style.width = `${85 / HTMLcollection.length}%`;
              block.style.visibility = 'visible';
              block.style.animationName = "fire-block-animation";
              block.style.animationDuration = '1s';
              
              setTimeout(() => { block.style.visibility = 'hidden'; }, 900)
            }, (index + 1) * Math.floor(1000/HTMLcollection.length))
          })
        }
        
        const fireAttack = nodeFns.createElement(["fire-attack"]);
        for(let i = 0; i<Math.floor(this.node.clientWidth/40);i++){
          const fireBlock = nodeFns.createElement(["fire-block"]);
          fireBlockArray.push(fireBlock)
          fireAttack.append(fireBlock);
        }
        const fireCone = nodeFns.createElement(["fire-cone"])
        fireAttack.append(fireCone);
        
        const attack = nodeFns.createElement([],'div',fireAttack,'attack');
        attack.append(fireAttack);
        
        node.append(attack);
        setTimeout(() => {
          fireBlockCSS(fireCone);
        }, 1);

        defender.classList.add("hit");
        //clearig function
        this.clearAttack(node,attacker,defender);
        
      },
      Water: (playersTurn = true) => {
        const {node,attacker,defender} = this.presetAttack(playersTurn);
        
        const waterSpout = nodeFns.createElement(["squirt-attack"]);
        const attack = nodeFns.createElement([],'div',nodeFns.createElement(["water-ball", "squirt"],'div'),'attack');
        attack.append(waterSpout);
        node.append(attack);

        defender.classList.add("hit");

        this.clearAttack(node,attacker,defender);
      },
      Electric: (playersTurn = true) => {
        const {node,attacker,defender} = this.presetAttack(playersTurn);
      
        const lightningBolt = nodeFns.createElement(["lightning-bolt"],'div','','lightning-bolt-1',);
        const attack = nodeFns.createElement([],'div',nodeFns.createElement(["lightning-attack"],'div',lightningBolt),'attack');
        node.append(attack);
        
        const lightning1 = nodeFns.createElement(["psy-lightning"],'div','',"psy-lightning-1");
        const lightning2 = nodeFns.createElement(["psy-lightning"],'div','',"psy-lightning-2");
        attacker.append(
          lightning1,
          lightning2
        );
        setTimeout(() => {
          defender.append(
            lightning1,
          lightning2
          );
        }, 1000);

        defender.classList.add("hit");

        setTimeout(() => {
          defender.removeChild(lightning1);
          defender.removeChild(lightning2);
                }, 1800);
        this.clearAttack(node,attacker,defender,1800);
      },
      Grass: (playersTurn = true) => {
        const {node,attacker,defender} = this.presetAttack(playersTurn);
      
        const leafAttack = nodeFns.createElement(["leaf-attack"]);
        let e = 3;
        for(let i=0; i<9;i++){
          let className = "leaf"; 
          if(Math.random()>0.8 && e >0){
            className = "energy";
            e--;
          }
          leafAttack.append(nodeFns.createElement([className]));
        }
        const attack = nodeFns.createElement([],'div',leafAttack,'attack');
        node.append(attack);

        defender.classList.add("hit");

        this.clearAttack(node,attacker,defender);
      },
     //TODO innen beletenni

      Ice: (playersTurn = true) => {
        const {node,attacker,defender} = this.presetAttack(playersTurn);

        const leafAttack = nodeFns.createElement(["leaf-attack"]);
        let e = 4;
        for(let i=0; i<9;i++){
          let className = "ice-shard"; 
          if(Math.random()>0.5 && e >0){
            className = "snowflake";
            e--;
          }
          leafAttack.append(nodeFns.createElement([className]));
        }

        const attack = nodeFns.createElement([],'div',leafAttack,'attack');
        
        node.append(attack);

        defender.classList.add("hit");
        this.clearAttack(node,attacker,defender);
      },

      Fighting: (playersTurn = true) => {
        const {node,attacker,defender} = this.presetAttack(playersTurn);
        this.allTypeFns.Normal(playersTurn);
        
        const attack = nodeFns.createElement([],'div',nodeFns.createElement(["warrior-attack"],'div',nodeFns.createElement(["warrior-fist-img"],'div')),'attack');
        node.append(attack);
        this.clearAttack(node,attacker,defender);
      },
      Poison: (playersTurn = true) => {
        const {node,attacker,defender} = this.presetAttack(playersTurn);
        
        const attack = nodeFns.createElement(["poison-attack"],'div');
          attack.append(nodeFns.createElement(["poison-cloud", "base-cloud"]))
        for (let c = 1; c <= 9; c++) {
            attack.append(nodeFns.createElement([`poison-cloud`, `could${c}`]));
          }
          attack.append(nodeFns.createElement(["poison-skull"],'div','☠'));
          
          defender.append(attack);
          defender.classList.add('hit');
          attacker.classList.add('spit');
          
        setTimeout(() => {
          attacker.classList.remove('spit');
          defender.removeChild(attack);
        }, this.attackDuration);
        this.clearAttack(node,attacker,defender);
      },
      Ground: (playersTurn = true) => {
        const {node,attacker,defender} = this.presetAttack(playersTurn);
      
        defender.classList.add("earthquake");
        attacker.classList.add("thwomp");
        setTimeout(() => {
          defender.classList.remove("earthquake");
          attacker.classList.remove("thwomp");
        }, this.attackDuration);
        this.clearAttack(node,attacker,defender);
      },
      Flying: (playersTurn = true) => {
        const {node,attacker,defender} = this.presetAttack(playersTurn);
      
        attacker.classList.add(playersTurn? "flying-pokemon-animation-player" : "flying-pokemon-animation-enemy");
        const windBlow = nodeFns.createElement(["wind-blow"]);
        attacker.append(windBlow);

        defender.classList.add("hit");
        setTimeout(() => {
          attacker.classList.remove("flying-pokemon-animation-player");
          attacker.classList.remove("flying-pokemon-animation-enemy");
          attacker.removeChild(windBlow);
        }, this.attackDuration);
        this.clearAttack(node,attacker,defender);
      },
      Psychic: (playersTurn = true) => {
        const {node,attacker,defender} = this.presetAttack(playersTurn);
        
        const psyBall = nodeFns.createElement(["psy-ball"]);
        psyBall.append(
          nodeFns.createElement(["psy-lightning"],'div','',"psy-lightning-1"),
          nodeFns.createElement(["psy-lightning"],'div','',"psy-lightning-2")
        );
        const attack = nodeFns.createElement([],'div',nodeFns.createElement(["psy-attack"],'div',psyBall),'attack');
        
        node.append(attack);

        defender.classList.add("hit");

        this.clearAttack(node,attacker,defender);
      },
      Bug: (playersTurn = true) => {
        const {node,attacker,defender} = this.presetAttack(playersTurn);
        const savageSpitOut = nodeFns.createElement(["savage-spin-out"]);
        
        const silkList = [];
        for(let i =0;i<7;i++){
          const silkNode = nodeFns.createElement(["silk-line"]);
          if(i==2||i==4){silkNode.style.width = '95%'}
          else if(i==0||i==6){silkNode.style.width = '55%'}
          else if(i==1||i==5){silkNode.style.width = '80%'};
          savageSpitOut.append(silkNode);
          silkList.push(silkNode);
        }
        
        silkList.forEach((div,index)=>{
        setTimeout(() => {
        div.style.height = `${100/silkList.length}%`;  
        }, 80*(index+1));
        setTimeout(() => {
          div.style.visibility = `hidden`;  
          }, 800+(80*(index+1)));
        })
        
        defender.append(savageSpitOut);
        defender.classList.add("hit");
        attacker.classList.add("spit");

        setTimeout(() => {
          defender.removeChild(savageSpitOut);
          attacker.classList.remove("spit");  
        }, this.attackDuration);
        this.clearAttack(node,attacker,defender);
      },
      Rock: (playersTurn = true) => {
        const {node,attacker,defender} = this.presetAttack(playersTurn);
        const attack = nodeFns.createElement([],'div',nodeFns.createElement(["rock-attack"],'div',nodeFns.createElement(["rock-img"])),'attack');
        
        node.append(attack);
        defender.classList.add('hit');
        attacker.classList.add("thwomp");
        setTimeout(() => {
        
          attacker.classList.remove("thwomp");
        }, this.attackDuration);
        this.clearAttack(node,attacker,defender);
      },
      Ghost: (playersTurn = true) => {
        const {node,attacker,defender} = this.presetAttack(playersTurn);
        
        const ghostAttack = nodeFns.createElement(["ghost-attack"],'div');
        ghostAttack.style.backgroundImage = `url(${playersTurn? this.parentObj.player.image : this.parentObj.opponent.image})`;
        const attack = nodeFns.createElement([],'div',ghostAttack,'attack');
        
        node.append(attack);
        attacker.classList.add('get-invisible');
        defender.classList.add('hit');
        setTimeout(() => {
          attacker.classList.remove('get-invisible');
        }, this.attackDuration);
        this.clearAttack(node,attacker,defender);
      },
      Dragon: (playersTurn = true) => {
        const node = !playersTurn? this.playerAttackNode : this.opponentAttackNode;
         
        this.allTypeFns.Normal(playersTurn);
        const attack = nodeFns.createElement([],'div',nodeFns.createElement(["dragon-claw"],'div'),'attack');
        
        node.append(attack);
        this.clearAttack(node);
      },
      Dark: (playersTurn = true) => {
        this.allTypeFns.Ghost(playersTurn);
      },
      Steel: (playersTurn = true) => {
        const node = !playersTurn? this.playerAttackNode : this.opponentAttackNode;
         
        this.allTypeFns.Normal(playersTurn);
        const attack = nodeFns.createElement([],'div',nodeFns.createElement(["metal-claw"],'div'),'attack');
        
        node.append(attack);
        this.clearAttack(node);
      },
      Fairy: (playersTurn = true) => {
        const {node,attacker,defender} = this.presetAttack(playersTurn);
        const fairyAttack = nodeFns.createElement(["fairy-attack"]);
          const fairyGlitterList = []; 
        for(let i=0; i<15;i++){
          let className = "fairy-glitter"; 
          if(i == 0||i == 3||i == 12){
            className = "energy";
          }
            const glitterNode = nodeFns.createElement([className]);
            fairyGlitterList.push(glitterNode); 
          fairyAttack.append(glitterNode);
        }

        fairyGlitterList.forEach(
        div => {
        const delay = `${Math.floor(Math.random() * 800)}ms`;
        div.style.animationDelay = delay;
        console.log(delay)
        });

        const attack = nodeFns.createElement([],'div',fairyAttack,'attack');
        node.append(attack);
        attacker.classList.add("spit");

        setTimeout(() => {
          attacker.classList.remove("spit");  
        }, this.attackDuration);

        defender.classList.add("hit");
        this.clearAttack(node,attacker,defender);
      },
    };
  }

  render() {
    return this.node;
  }
}


class BattleInfo {
  constructor(parentObj, player, opponent,maxNumber=30,rootObj) {
    this.parentObj = parentObj;
    this.mainObject = parentObj;
    this.rootObj = rootObj
    
    this.maxNumber = maxNumber;
    this.multiplyNumbersArray = sessionStorage.multiplyNumbersArray? JSON.parse(sessionStorage.multiplyNumbersArray) : multiplyNumbersArray;
    this.player = new PlayerInfo(this, player,'player',parentObj);
    this.opponent = new PlayerInfo(this, opponent,'opponent',parentObj);
    this.Problem = this.promblemGenerator();
    
    this.readyToAttack = false;

    this.GameOverModal = new GameOverModal(this);

    this.node = nodeFns.createElement(["battle-info"]);
    this.parentObj.goTo.BattleInfo = this;
  }


  promblemGenerator(){
    if(this.mainObject.goTo.BattleMath && this.mainObject.goTo.BattleMath.isEnded){
      return this.GameOverModal
    };
    if(this.mainObject.parentObj.problemTypeSelect.selectedProblemType == '+/-'){
      
    
      return new AdditionProblem(
        this,
        this.maxNumber,
        AdditionAndSubtractionProblems.makeNumbers(this.maxNumber),
        AdditionAndSubtractionProblems.randomProblemType(),
        false,
      );
    } else if (this.mainObject.parentObj.problemTypeSelect.selectedProblemType == '×/:'){
      return new Multiplication(this)

    }
  }

  render() {
    while(this.node.firstChild){
      this.node.removeChild(this.node.firstChild)
    }
    
    const problemElement = nodeFns.createElement(["player-pokemon-info","problem-element"]);
    const listenerFn =()=>{
      if(this.Problem.check && this.Problem.check()){ 
        console.warn("Jó")
        this.mainObject.goTo.BattleMath.gainedXP += 10;
        this.mainObject.goTo.BattleMath.playerAttacks(this.mainObject.goTo.PlayerInfo.chosenType);
        this.Problem = this.promblemGenerator();
        //this.parentObj.render();
        this.render();
      } else {
        console.warn("Nemjó")
        if(this.Problem.inputElement){this.Problem.inputElement.style.backgroundColor = '#ff5656'}
      }
    }
    if(this.Problem.inputElement){
    this.Problem.inputElement.addEventListener(
      'keydown', (event) => {
        if (event.code !== 'Enter'){return;
        } else {listenerFn();}
      })
    
    setTimeout(() => {
      this.Problem.inputElement.focus()
    }, 20);  
    this.Problem.btnElement.addEventListener('click',listenerFn);
    }

    problemElement.append(this.Problem.render());
    
    this.node.append(this.player.render(),problemElement, this.opponent.render());
    return this.node;
  }

}

class PlayerInfo {
  constructor(parentObj, pokemon,owner,mainObject) {
    this.parentObj = parentObj;
    this.mainObject = mainObject;
    this.pokemon = pokemon;
    this.chosenType = pokemon.type[0];
    this.owner = owner;
    this.node = nodeFns.createElement(["player-pokemon-info"]);
    
    if(this.owner == "player"){
      this.mainObject.goTo.PlayerInfo = this; 
    } else {
      this.mainObject.goTo.OpponentInfo = this;
    }
    
  }

  render() {
    this.node.innerHTML = ""; // TODO!
    
    const name = nodeFns.createElement([], "h3", this.pokemon.name);

    const hp = nodeFns.createElement([], "p", `Hp: ${this.owner == 'player'? this.parentObj.parentObj.math.playerHP : this.parentObj.parentObj.math.opponentHP}%`);
    const types = this.pokemon.type.map((type) => {
      let elementType = this.owner == 'player'? "button" : "div";
      let elementClassList = this.owner == 'player'? ["attack-button"] : ["opponenet-type-div"];
      const buttonElement = nodeFns.createElement(
        elementClassList,
        elementType,
        `${pokedexFns.types[type].uniChar} ${type}`
      );
  
      buttonElement.addEventListener('click',()=>{
        this.chosenType = type;
        this.render();
        })
      buttonElement.style.backgroundColor = pokedexFns.types[type].color;
      if(this.owner == 'player' && this.mainObject.goTo.PlayerInfo.chosenType == type){
        buttonElement.classList.add("attack-button-activated");
      }
      
      return buttonElement;
    });

    this.node.append(name, hp, ...types);
    return this.node;
  }
}

class BattleMath{
  constructor(parentObj,player,opponent){
    this.parentObj = parentObj;
    this.playerTypes = player.type; // ["Bug","Poison"]
    this.opponentTypes = opponent.type; // ["Bug","Poison"]
  
    this.playerHP = 100;
    this.opponentHP = 100;
    this.gainedXP = 0;

    this.mainObject = parentObj;
    this.playerEffectivities =  this.effectivityLister(this.playerTypes); //this.mergeEffectivity(this.playerTypes)
    this.opponentEffectivities = this.effectivityLister(this.opponentTypes);  // this.mergeEffectivity(this.opponentTypes);
  
    this.parentObj.goTo.BattleMath = this;
    this.opponentAttacks();
  }

  mergeEffectivity(getTypes){
    const mergedObj = {superEffective:[], weakAgainst:[],unEffective:[]};
    function sameTypeMerger(type,effectivityLvl){
      pokedexFns.types[type][effectivityLvl].forEach(seffeciveType =>{
        if(!mergedObj[effectivityLvl].includes(seffeciveType)){
          mergedObj[effectivityLvl].push(seffeciveType);
        }
      }); 
    }
    getTypes.forEach((type)=>{
      Object.keys(mergedObj).forEach(effectivityLvl => sameTypeMerger(type,effectivityLvl))
    });
    return mergedObj;
  }
  
  get isEnded(){
    console.log("Hulla csekk!")
    return this.opponentHP<=0 || this.playerHP<=0;
  } 

  effectivityLister(roleTypes){
    // ["Bug","Poison"]
    const effectivityObj = roleTypes.reduce((accu,type)=>{
      accu[type] = pokedexFns.types[type];
      accu[type].superEffective = accu[type].superEffective? accu[type].superEffective : []; 
      accu[type].weakAgainst = accu[type].weakAgainst? accu[type].weakAgainst : [];
      accu[type].unEffective = accu[type].unEffective? accu[type].unEffective : [];

      return accu;
    },{})
    console.log(effectivityObj);
    return effectivityObj;
    
  }

  attackEffectvity(getType){
    const defenderTypes = this.parentObj.playersTurn? this.opponentTypes : this.playerTypes;
    const attackerEffectivities = this.parentObj.playersTurn? this.playerEffectivities[getType] : this.opponentEffectivities[getType];
    console.log('attackerEffectivities:',attackerEffectivities)

    let effectivity = 1;
    defenderTypes.forEach(type => {
      if(effectivity && attackerEffectivities.unEffective && attackerEffectivities.unEffective.includes(type)){
        effectivity = 0;
      } else if (attackerEffectivities.weakAgainst && attackerEffectivities.weakAgainst.includes(type)){
        effectivity = effectivity/2;
      } else if (attackerEffectivities.superEffective && attackerEffectivities.superEffective.includes(type)){
        effectivity = effectivity*2;
      } 
    })
    return effectivity;
  }

  playerAttacks = (type)=>{
    const fnToQueue = ()=>{
      this.parentObj.playersTurn = true;
      this.parentObj.attackContainer.allTypeFns[type]();
      this.opponentHP -= this.attackEffectvity(type)*10;  
      this.parentObj.battleInfo.player.render();
      this.parentObj.battleInfo.opponent.render();
      if(this.isEnded){
        this.parentObj.battleInfo.Problem = this.parentObj.battleInfo.promblemGenerator();
        this.parentObj.battleInfo.render();
      }
    };
    
    if(!this.isEnded){
      this.parentObj.attackContainer.attackQueve.push(fnToQueue);
    } else {this.endBattle(); clearTimeout(timeOutId);}
  }

  opponentAttacks(){
    const attackAfter = 15000;
    let timeOutId;
    const fnToQueue =()=>{
      timeOutId = setTimeout(() => {
        if(this.isEnded){return;}
        this.parentObj.playersTurn = false;
        const chosenAttack = this.opponentTypes[Math.floor(Math.random()*this.opponentTypes.length)]   
        this.playerHP -= this.attackEffectvity(chosenAttack)*10;
        this.parentObj.attackContainer.allTypeFns[chosenAttack](false);
        
        this.parentObj.battleInfo.player.render();
        this.parentObj.battleInfo.opponent.render();
        if(!this.isEnded){  
          this.parentObj.attackContainer.attackQueve.push(fnToQueue);             
        } else { 
            this.parentObj.battleInfo.Problem = this.parentObj.battleInfo.promblemGenerator();
            this.parentObj.battleInfo.render();
          this.endBattle();clearTimeout(timeOutId);};   
        setTimeout(() => {
          this.parentObj.playersTurn = true;
          this.parentObj.battleInfo.player.render();
          this.parentObj.battleInfo.opponent.render();  
        }, 1990);
      }, attackAfter);
    }
    if(!this.isEnded){  
      this.parentObj.attackContainer.attackQueve.push(fnToQueue);             
    } else this.endBattle();
 
    
  }

  endBattle(){

    console.error(`Game Over! ${this.playerHP>0? '\n You Win!': '\n Opponent wins!'}`)
    
    clearInterval(this.mainObject.goTo.AttackContainer.setIntervalId);
   
    this.mainObject.goTo.AttackContainer.attackQueve = [];
  }

}

class GameOverModal{
  constructor(parentObj){
    this.mainObject = parentObj.mainObject;
    this.pokeName = this.mainObject.player.name;
    this.pokeImg = this.mainObject.player.image.replace("70px-", "180px-");
    this.smallImg = this.mainObject.player.image;
    this.node = nodeFns.createElement(["level-up-modal","new-pokemon"]);
    this.closeBtn = this.closeBtnGenerator();
  
    this.mainObject.goTo.GameOverModal = this;
  }
  
  closeBtnGenerator(){
    const btn = nodeFns.createElement([],'button','OK','close-you-win-lose-modal');
    btn.addEventListener("click",()=>{
  
      
      xpFns.setXp(this.mainObject.goTo.BattleMath.gainedXP);
      console.log("bónusz: ",this.mainObject.goTo.BattleMath.gainedXP)
      this.mainObject.parentObj.battleEnded = true;
      this.mainObject.parentObj.reset();
      this.mainObject.close();
      this.mainObject.parentObj.rootObj? this.mainObject.parentObj.rootObj.levelUp() : levelUp();
      //BattleDialog bezárása
    })
    return btn;
  }

  render(){
    while (this.node.firstChild) {
      this.node.removeChild(this.node.firstChild);
    }
    
    const newPokemon = nodeFns.createElement(["new-pokemon",]);
    const youImg = document.createElement('img');
      youImg.src = './img/you.svg';
      youImg.alt = 'You';
      youImg.classList.add('you-win-lose');
    const pokeImg = document.createElement('img');
      pokeImg.classList.add('game-over-img');
      if(this.mainObject.goTo.BattleMath.playerHP<=0){
        pokeImg.classList.add('upside-down');
      }
      pokeImg.src = this.pokeImg;
     
      pokeImg.setAttribute('onerror',`this.onerror=null; this.src='${this.smallImg}'`)

    const winImg = document.createElement('img');
      winImg.src = this.mainObject.goTo.BattleMath.playerHP<1? './img/loose.svg': './img/win.svg';
      winImg.alt = 'Win';
      winImg.classList.add('game-over-img');
      winImg.classList.add('you-win-lose');

      newPokemon.append(
        
        youImg,
        pokeImg,
        winImg,
      );
      this.node.append(newPokemon,
      this.closeBtn,
      `+${this.mainObject.goTo.BattleMath.gainedXP} xp`,);
    return this.node;
  }  
}

class ChooseYourHero{
  constructor(rootObj){
    
    this.rootObj = rootObj? rootObj : null;
    this.mainObject = null;
    
    this.inputElement = this.createInput();
    this.node = nodeFns.createElement(["vs-battle-menu"]);
    this.confirmChoiceBtn = this.confirmChoiceBtnGenerator();
    this.typeSelectElement = this.typeSelectElementGenerator();
    this.entryNodeList = [];
    this.problemTypeSelect = new ProblemTypeSelect(this,true);
    
    //this.pokemonList = pokedexFns.getOwnPokedexEntries();  
    //TODO kicserélni a this.pokemonListet pokedexFns.getOwnPokedexEntries();  -re
    this.filteredPokemonlist = [...pokedexFns.getOwnPokedexEntries()];
    this.opponent = pokedexFns.findPokemonInPokedex(
      Math.floor(Math.random() * 423)
    );
    this.chosenPokemon = null;
    this.battleEnded = false;
  
    if(this.rootObj && this.rootObj.goTo){
      this.rootObj.goTo.ChooseYourHero = this;
    }
  }

  reset = () =>{
    if(this.battleEnded){
      this.opponent = pokedexFns.findPokemonInPokedex(
        Math.floor(Math.random() * 423)
      );
      this.filteredPokemonlist = [...pokedexFns.getOwnPokedexEntries()];
      this.chosenPokemon = null;
      this.typeSelectElement.value = "all";
      this.render();
    }
  }
  
  typeSelectElementGenerator(){
    const selectElement = nodeFns.createElement(["select-type-of-hero"],'select');
    const allOption = nodeFns.createElement([],'option','all type');
      allOption.value = "all";
    selectElement.append(allOption);
    Object.keys(pokedexFns.types).forEach(type=>{
      const option = new PokemonTypeComponent(type,'option').render()
      option.value = type;
      option.style.backgroundColor = pokedexFns.types[type].color;
      selectElement.append(option);

    })
    selectElement.addEventListener("change",()=>{
      this.foundByType()
    })
    return selectElement;
  }

  confirmChoiceBtnGenerator(){
    const confirmBtn = nodeFns.createElement([],'button','START','start-vs-battle');
    confirmBtn.addEventListener('click',()=>{
      if(this.chosenPokemon){
        this.mainObject = new BattleDialog(true,this.chosenPokemon,this.opponent,this,this.rootObj)
        this.mainObject.append();
      } else if(!localStorage.pokedex && !localStorage.pokedex.length){
        alert('Játssz a többi játékmódall, hogy szerezz saját pokemont!')
      } 
      else {alert('Válassz egy pokemont!');}
    })
    return confirmBtn;
  }

  removeIsSelectedFromAll(){
    this.entryNodeList.forEach(obj=>{
      obj.isSelected = false;
      obj.render();
    })
  }

  createInput(){
    const inputElement = document.createElement('input');
    inputElement.type="text"; 
    inputElement.placeholder="🔍 name"; 
    inputElement.id="search-for-hero";

    inputElement.addEventListener('change',(event)=>{
      this.listFoundEntries(event.target.value);
    })
  
    return inputElement;
  }

  listFoundEntries(inputText) {
    const regexp = new RegExp(inputText, "i");
    this.filteredPokemonlist = pokedexFns.getOwnPokedexEntries().filter((entry) => regexp.test(entry.name));
    this.render();
  }
  foundByType(){
    this.filteredPokemonlist = this.typeSelectElement.value == "all"? 
    pokedexFns.getOwnPokedexEntries()
    : pokedexFns.getOwnPokedexEntries().filter(entry=>{
      return entry.type.includes(this.typeSelectElement.value)
    });
    this.render();
  }

  render(){
    while(this.node.firstChild){
      this.node.removeChild(this.node.firstChild)
    }

    const opponentH2 = nodeFns.createElement([],'h2','Opponent:');
    const showOpponent = nodeFns.createElement(["vs-opponent-div"],'div');
      const opponentDiv = new PokemonsToChoose(this,this.opponent,false);
      
      const infoDiv = new OpponentInfoComponent(this.opponent).render();
      
      showOpponent.append(
        opponentDiv.render(),
        infoDiv);
    
    const searchBar = nodeFns.createElement(["search-for-hero"],'div',this.inputElement);
    searchBar.append(this.typeSelectElement,this.confirmChoiceBtn);
    const collection = nodeFns.createElement(["vertical-slide"]);

    this.filteredPokemonlist.forEach(entry =>{
      const newEntry = new PokemonsToChoose(this,entry);
      this.entryNodeList.push(newEntry);
      collection.append(newEntry.render())
    });

    if(!pokedexFns.getOwnPokedexEntries().length){
      collection.append('Nincs még saját pokémonod! Játsz a többi játékmódban, hogy gyarapítsd a gyűjteményed.')
    } else if(!this.filteredPokemonlist.length){
      collection.append('Nem található a keresésnek megfelelő saját pokémon, amivel csatázhatnál az ellenféllel. Változtass s keresési feltételeken!')
    }; 

    
    this.node.append(
      opponentH2,
      this.problemTypeSelect.render(),
      showOpponent,
      searchBar,
      collection,
      );

    return this.node;
  }

  append(){
    document.getElementById('problems').innerHTML = '';
    document.getElementById('problems').append(this.render());
  }

}

class PokemonsToChoose{
  constructor(parentObj,pokedexEntry,selectable = true){
    this.pokedexEntry = pokedexEntry;
    this.parentObj = parentObj;
    this.selectable = selectable;
    this.isSelected = false;
    this.node = this.createCardElement()
  }
  createCardElement(){
    const cardElement = nodeFns.createElement(["card"])
    
    if(this.selectable){
    cardElement.addEventListener("click",()=>{
      this.parentObj.chosenPokemon = this.pokedexEntry;
      this.parentObj.removeIsSelectedFromAll();
      this.isSelected = !this.isSelected;
      this.render();
      console.log(this.pokedexEntry);
    })}
    return cardElement;
  }

  render(){
    while(this.node.firstChild){
      this.node.removeChild(this.node.firstChild)
    }
    
    const typeElements = this.pokedexEntry.type.map(type =>{
      const divElement = new PokemonTypeComponent(type).render() //nodeFns.createElement(["opponenet-type-div"],'div',`${pokedexFns.types[type]["uniChar"]} ${type}`)
      divElement.style.backgroundColor = pokedexFns.types[type].color;
      return divElement;
    })

    if(this.isSelected){this.node.classList.add("active-hero")
    } else{this.node.classList.remove("active-hero")};

    this.node.append(
      this.pokedexEntry.name,
      nodeFns.img(this.pokedexEntry.image,this.pokedexEntry.name,["card-img"]),
      ...typeElements
    );
    return this.node;
  }
}

class ProblemTypeSelect{
  constructor(parentObj,isOpen = false, getSpecificType='both', isDiv = false){
    this.parentObj = parentObj;
    
    this.specificType = getSpecificType;
    this.isDiv = isDiv;

    this.isOpen = isOpen;

    this.maxNumber = sessionStorage.maxNumber? +sessionStorage.maxNumber: 30;
    this.selectedProblemType = '+/-';
    
    this.multiplyNumbersArray = sessionStorage["multiplyNumbersArray"]
      ? JSON.parse(sessionStorage["multiplyNumbersArray"])
      : multiplyNumbersArray;
    this.multiplySelect = new SelectNumbers(this);

    this.problemTypeSelectElement = this.problemTypeSelectElementGenerator()
    this.maxNumberSelectElement = this.maxNumberSelectGenerator();
    this.okBtn = this.okBtnCreator(); 
    this.node = isDiv? nodeFns.createElement([]) : nodeFns.createElement(["z-index-100","problem-type-choose-dialog"],'dialog');
  }

  okBtnCreator(){
    const okButton = nodeFns.createElement(['float-right'],'button',"OK","close-problem-type-elect-dialog");
    okButton.addEventListener('click',()=>{
      
      this.isOpen = false;
      this.render();
    })

    return okButton;
  }

  problemTypeSelectElementGenerator = ()=>{
    const selectElement = document.createElement('select');
    selectElement.id = 'problem-type-select-element';
    const additionOption = nodeFns.createElement([],'option','+/-');
      additionOption.value = '+/-';
      additionOption.selected = this.selectedProblemType == additionOption.value;
    const multiplyOption = nodeFns.createElement([],'option','×/:');
      multiplyOption.value = '×/:';
      multiplyOption.selected = this.selectedProblemType == multiplyOption.value;
    selectElement.append(additionOption,multiplyOption);

    selectElement.addEventListener('change',()=>{
      this.selectedProblemType = selectElement.value;
      this.render()
    });

    return selectElement;
  }

  maxNumberSelectGenerator(){
    const inputElement = document.createElement('input');
    inputElement.type="number"; 
    inputElement.value= sessionStorage.maxNumber? +sessionStorage.maxNumber: 29;
    inputElement.max=99;
    inputElement.min=10;
    inputElement.id="search-for-battle-maxNumber";
    inputElement.addEventListener('change',()=>{
      
      this.maxNumber = +inputElement.value;
      sessionStorage.maxNumber = this.maxNumber;
      console.log(this.maxNumber)
    })
    return inputElement;
  }

  render(){
    while (this.node.firstChild) {
      this.node.removeChild(this.node.firstChild)
    }

    if(!this.isDiv){ this.node.open = this.isOpen;}
    
    if(this.specificType == 'both'){
      
      this.node.append(
        nodeFns.createElement([],'h4','Csata közbeni példák legyenek:'),
        this.problemTypeSelectElement,
        this.selectedProblemType == '+/-'? nodeFns.createElement([],'p','Mi lehet a legnagyobb szám?') : nodeFns.createElement([],'p',"Melyik szorzótáblák legyenek?"),
        this.selectedProblemType == '+/-'? this.maxNumberSelectElement : this.multiplySelect.render,
        this.okBtn,
      )
  } else if(this.specificType == '+/-'){
      this.node.append(
        nodeFns.createElement([],'p','Mi lehet a legnagyobb szám?'),
        this.maxNumberSelectElement,
        this.okBtn,
      ) 
  } else {
    
    this.node.append(
      nodeFns.createElement([],'p',"Melyik szorzótáblák legyenek?"),
      this.multiplySelect.render,
      this.okBtn,
    );
  };

    return this.node;
  }

  append(){
    document.getElementById('root').append(this.render());
  }
}

class PokemonTypeComponent{
  constructor(type,HTMLelement = 'div',isShortened = false){
    this.type = type;
    this.isShortened = isShortened;
    this.node = nodeFns.createElement(["opponenet-type-div"],HTMLelement,`${pokedexFns.types[type].uniChar} ${type}`)
  }

  render(){
    this.node.style.backgroundColor = pokedexFns.types[this.type].color;
    this.node.title = this.type;
    if(this.isShortened){this.node.innerText = pokedexFns.types[this.type].uniChar? pokedexFns.types[this.type].uniChar : 'N';}
    if(this.type == "Poison" || this.type == "Ground" || this.type == "Grass" || this.type == "Ghost" || this.type == "Dark"){
      this.node.style.color = "white";
    }
    return this.node;
  }
}

class OpponentInfoComponent{
  constructor(opponentEntry){
    this.entry = opponentEntry;
    this.node = nodeFns.createElement(["display-grid"]);
  }
  render(){
    this.entry.type.forEach(type =>{
    const containerDiv =  nodeFns.createElement(["opponent-info-container"]);
    containerDiv.style.display = "none";
    const superDivElement = nodeFns.createElement(["pokemon-type-info-container"]);
    const weakDivElement = nodeFns.createElement(["pokemon-type-info-container"]);
    const superSpanElement = nodeFns.createElement([],'span',"Super effective against (200% dmg): ");
    const unEffectiveDivElement = nodeFns.createElement(["pokemon-type-info-container"]);
    const unEffectiveSpanElement = nodeFns.createElement([],'span',"Uneffective against (0% dmg):");
    const weakSpanElement = nodeFns.createElement([],'span',"Weak against (50% dmg):");
    
    function listTypes(type,node,effectivity = "superEffective"){
      if(!pokedexFns.types[type][effectivity] || pokedexFns.types[type][effectivity].length == 0){
        node.append('none')
        return;
      }
      pokedexFns.types[type][effectivity].forEach(superType=>{
        const typeDiv = new PokemonTypeComponent(superType,'div',true);
        node.append(typeDiv.render())
      })
    
    }

    listTypes(type,superDivElement,"superEffective");
    listTypes(type,weakDivElement,"weakAgainst");
    listTypes(type,unEffectiveDivElement,"unEffective");

    const headerElement = new PokemonTypeComponent(type).render();
    const downOpenElement = nodeFns.createElement(['float-right','hover-color-white','cursor-pointer'],'span',"(?)");
     
    const downOpenElementEventListener =(event)=>{
      event.stopImmediatePropagation();
      console.log(event.target.parentElement)  

      containerDiv.style.display =  containerDiv.style.display == "none" ? "block" : "none";
      downOpenElement.innerText = downOpenElement.innerText == "(?)" ? ' ^ ' : "(?)";
    }
   
    headerElement.addEventListener('click',downOpenElementEventListener);
    //headerElement.addEventListener('mouseleave',downOpenElementEventListener);

    headerElement.append(downOpenElement);

    containerDiv.append(
      superSpanElement,
      superDivElement,
      weakSpanElement,
      weakDivElement,
      unEffectiveSpanElement,
      unEffectiveDivElement,
    );
    this.node.append(headerElement,containerDiv);
    })
    
    return this.node;
  }
}