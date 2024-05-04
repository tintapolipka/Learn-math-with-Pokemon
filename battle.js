

class BattleDialog {
  constructor(isOpen = true, pokemon,opponent,parentObj) {
    this.node = nodeFns.createElement(["battle-dialog"], "dialog");
    this.node.open = isOpen;
    this.parentObj = parentObj;

    this.player = pokemon;
    this.opponent = opponent;
    this.playersTurn = true;

    this.goTo = {};
    this.battleground = nodeFns.createElement(["battleground"]);
    this.attackContainer = new AttackContainer(this);
    this.battleInfo = new BattleInfo(this, this.player, this.opponent,this.parentObj.problemTypeSelect.maxNumber);
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
    
    this.node = nodeFns.createElement(["attack-container"]);
    
    this.allTypeFns = this.allTypeFnsSetter();
    this.attackQueve = [()=>{console.log('Go!')}];
    this.setIntervalId = setInterval(() => {
      this.attackQueveHandler(); 
      if(this.parentObj.math.isEnded){
        this.parentObj.math.endBattle();
      }
    }, 2001);

    
    parentObj.goTo.AttackContainer = this;
  }

  attackQueveHandler(){
    if(this.attackQueve.length){this.attackQueve.shift()()}
    console.log(this.attackQueve);
  }

  allTypeFnsSetter() {
    return {
      Normal: () => {
        const attacker = this.parentObj.playersTurn? this.parentObj.playerPokemonContainer : this.parentObj.opponentPokemonContainer;
        const defender = !this.parentObj.playersTurn? this.parentObj.playerPokemonContainer : this.parentObj.opponentPokemonContainer;
      
        attacker.classList.add(this.parentObj.playersTurn? "attacking-enemy" : "attacking-player");
        defender.classList.add("hit");
        setTimeout(() => {
          attacker.classList.remove("attacking-enemy")
          attacker.classList.remove("attacking-player");
          defender.classList.remove("hit");
          console.log("attack removed")
        }, 1000);
      
      },
      Fire: () => {
        function fireBlockCSS(coneNode) {
          const HTMLcollection = document.querySelectorAll('.fire-block');
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
          fireAttack.append(fireBlock);
        }
        const fireCone = nodeFns.createElement(["fire-cone"])
        fireAttack.append(fireCone);
        
        const attack = nodeFns.createElement([],'div',fireAttack,'attack');
        attack.append(fireAttack);
        
        if(!this.parentObj.playersTurn){this.node.classList.add("reverse-attack")};
        this.node.append(attack);
        setTimeout(() => {
          fireBlockCSS(fireCone);
        }, 1);

        const defender = !this.parentObj.playersTurn? this.parentObj.playerPokemonContainer : this.parentObj.opponentPokemonContainer;
      
        defender.classList.add("hit");
        //clearig function
        setTimeout(() => {
          defender.classList.remove("hit");
          this.node.classList.remove("reverse-attack");
          while(this.node.firstChild){
            this.node.removeChild(this.node.firstChild)
          };
        }, 1990);
        
      },
      Water: () => {
        const defender = !this.parentObj.playersTurn? this.parentObj.playerPokemonContainer : this.parentObj.opponentPokemonContainer;
        
        const waterSpout = nodeFns.createElement(["squirt-attack"]);
        const attack = nodeFns.createElement([],'div',nodeFns.createElement(["water-ball", "squirt"],'div'),'attack');
        attack.append(waterSpout);
        
        if(!this.parentObj.playersTurn){this.node.classList.add("reverse-attack")};
        this.node.append(attack);


        defender.classList.add("hit");

        setTimeout(() => {
          defender.classList.remove("hit");
          while(this.node.firstChild){
            this.node.removeChild(this.node.firstChild)
          };
          this.node.classList.remove("reverse-attack");
        }, 1000);
      },
      Electric: () => {
        const attacker = this.parentObj.playersTurn? this.parentObj.playerPokemonContainer : this.parentObj.opponentPokemonContainer;
        const defender = !this.parentObj.playersTurn? this.parentObj.playerPokemonContainer : this.parentObj.opponentPokemonContainer;
      
        const lightningBolt = nodeFns.createElement(["lightning-bolt"],'div','','lightning-bolt-1',);
        const attack = nodeFns.createElement([],'div',nodeFns.createElement(["lightning-attack"],'div',lightningBolt),'attack');
        this.node.append(attack);
        if(!this.parentObj.playersTurn){this.node.classList.add("reverse-attack")};

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
          defender.classList.remove("hit");
          while(this.node.firstChild){
            this.node.removeChild(this.node.firstChild)
          };
          this.node.classList.remove("reverse-attack");
        }, 1800);
      },
      Grass: () => {
        const defender = !this.parentObj.playersTurn? this.parentObj.playerPokemonContainer : this.parentObj.opponentPokemonContainer;
      
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
        
        this.node.append(attack);
        if(!this.parentObj.playersTurn){this.node.classList.add("reverse-attack")};

        defender.classList.add("hit");

        setTimeout(() => {
          defender.classList.remove("hit");
          while(this.node.firstChild){
            this.node.removeChild(this.node.firstChild)
          };
          this.node.classList.remove("reverse-attack");
        }, 1000);
      },
      Ice: () => {
        const defender = !this.parentObj.playersTurn? this.parentObj.playerPokemonContainer : this.parentObj.opponentPokemonContainer;
      
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
        
        this.node.append(attack);
        if(!this.parentObj.playersTurn){this.node.classList.add("reverse-attack")};

        defender.classList.add("hit");

        setTimeout(() => {
          defender.classList.remove("hit");
          while(this.node.firstChild){
            this.node.removeChild(this.node.firstChild)
          };
          this.node.classList.remove("reverse-attack");
        }, 1500);
      },
      Fighting: () => {
        this.allTypeFns.Normal();
        
        const attack = nodeFns.createElement([],'div',nodeFns.createElement(["warrior-attack"],'div',nodeFns.createElement(["warrior-fist-img"],'div')),'attack');
        if(!this.parentObj.playersTurn){this.node.classList.add("reverse-attack")};
        this.node.append(attack);
        
        setTimeout(() => {
          this.node.classList.remove("reverse-attack");
      
          while(this.node.firstChild){
            this.node.removeChild(this.node.firstChild)
          };
          console.log('warrior-attack  removed')
        }, 1000);
      },
      Poison: () => {
        console.log("POISON ATTACK");
      },
      Ground: () => {
        const attacker = this.parentObj.playersTurn? this.parentObj.playerPokemonContainer : this.parentObj.opponentPokemonContainer;
        const defender = !this.parentObj.playersTurn? this.parentObj.playerPokemonContainer : this.parentObj.opponentPokemonContainer;
      
        defender.classList.add("earthquake");
        attacker.classList.add("thwomp");
        setTimeout(() => {
          
          defender.classList.remove("earthquake");
          attacker.classList.remove("thwomp");
          this.node.classList.remove("reverse-attack");
          console.log("ground attack removed")
        }, 1500);
      },
      Flying: () => {
        const attacker = this.parentObj.playersTurn? this.parentObj.playerPokemonContainer : this.parentObj.opponentPokemonContainer;
        const defender = !this.parentObj.playersTurn? this.parentObj.playerPokemonContainer : this.parentObj.opponentPokemonContainer;
      
        attacker.classList.add(this.parentObj.playersTurn? "flying-pokemon-animation-player" : "flying-pokemon-animation-enemy");
        const windBlow = nodeFns.createElement(["wind-blow"]);
       
        attacker.append(windBlow);

        defender.classList.add("hit");
        setTimeout(() => {
          attacker.classList.remove("flying-pokemon-animation-player");
          attacker.classList.remove("flying-pokemon-animation-enemy");
          defender.classList.remove("hit");
          attacker.removeChild(windBlow);
          console.log("flying attack removed")
        }, 1710);
      
      },
      Psychic: () => {
        const attacker = this.parentObj.playersTurn? this.parentObj.playerPokemonContainer : this.parentObj.opponentPokemonContainer;
        const defender = !this.parentObj.playersTurn? this.parentObj.playerPokemonContainer : this.parentObj.opponentPokemonContainer;
      
        const psyBall = nodeFns.createElement(["psy-ball"]);
        psyBall.append(
          nodeFns.createElement(["psy-lightning"],'div','',"psy-lightning-1"),
          nodeFns.createElement(["psy-lightning"],'div','',"psy-lightning-2")
        );
        const attack = nodeFns.createElement([],'div',nodeFns.createElement(["psy-attack"],'div',psyBall),'attack');
        
        this.node.append(attack);
        if(!this.parentObj.playersTurn){this.node.classList.add("reverse-attack")};

        defender.classList.add("hit");

        setTimeout(() => {
      
          defender.classList.remove("hit");
          while(this.node.firstChild){
            this.node.removeChild(this.node.firstChild)
          };
          this.node.classList.remove("reverse-attack");
        }, 3000);
      },
      Bug: () => {
        const attacker = this.parentObj.playersTurn? this.parentObj.playerPokemonContainer : this.parentObj.opponentPokemonContainer;
        const defender = !this.parentObj.playersTurn? this.parentObj.playerPokemonContainer : this.parentObj.opponentPokemonContainer;
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

        if(!this.parentObj.playersTurn){this.node.classList.add("reverse-attack")};
		
        defender.append(savageSpitOut);
        defender.classList.add("hit");
        attacker.classList.add("spit");

        setTimeout(() => {
          defender.removeChild(savageSpitOut);

          defender.classList.remove("hit");
          attacker.classList.remove("spit");
          
          this.node.classList.remove("reverse-attack");
        }, 2000);
      },
      Rock: () => {
        const attacker = this.parentObj.playersTurn? this.parentObj.playerPokemonContainer : this.parentObj.opponentPokemonContainer;
        const defender = !this.parentObj.playersTurn? this.parentObj.playerPokemonContainer : this.parentObj.opponentPokemonContainer; 
        const attack = nodeFns.createElement([],'div',nodeFns.createElement(["rock-attack"],'div',nodeFns.createElement(["rock-img"])),'attack');
        if(!this.parentObj.playersTurn){this.node.classList.add("reverse-attack")};
        this.node.append(attack);
        defender.classList.add('hit');
        attacker.classList.add("thwomp");
        setTimeout(() => {
          this.node.classList.remove("reverse-attack");
          defender.classList.remove('hit');
          attacker.classList.remove("thwomp");
          while(this.node.firstChild){
            this.node.removeChild(this.node.firstChild)
          };
          console.log('warrior-attack  removed')
        }, 1000);
      },
      Ghost: () => {
        const attacker = this.parentObj.playersTurn? this.parentObj.playerPokemonContainer : this.parentObj.opponentPokemonContainer;
        const defender = !this.parentObj.playersTurn? this.parentObj.playerPokemonContainer : this.parentObj.opponentPokemonContainer;
        
        const ghostAttack = nodeFns.createElement(["ghost-attack"],'div');
        ghostAttack.style.backgroundImage = `url(${this.parentObj.playersTurn? this.parentObj.player.image : this.parentObj.opponent.image})`;
        const attack = nodeFns.createElement([],'div',ghostAttack,'attack');
        if(!this.parentObj.playersTurn){this.node.classList.add("reverse-attack")};
        this.node.append(attack);
        attacker.classList.add('get-invisible');
        defender.classList.add('hit');
        setTimeout(() => {
          this.node.classList.remove("reverse-attack");
          defender.classList.remove('hit');
          attacker.classList.remove('get-invisible');
          while(this.node.firstChild){
            this.node.removeChild(this.node.firstChild)
          };
          console.log('ghost-attack  removed')
        }, 1700);
      },
      Dragon: () => {
        this.allTypeFns.Normal();
        const attack = nodeFns.createElement([],'div',nodeFns.createElement(["dragon-claw"],'div'),'attack');
        if(this.parentObj.playersTurn){this.node.classList.add("reverse-attack")};
        this.node.append(attack);
        
        setTimeout(() => {
          this.node.classList.remove("reverse-attack");
      
          while(this.node.firstChild){
            this.node.removeChild(this.node.firstChild)
          };
          console.log('Dragon attack removed')
        }, 1000);
       
      },
      Dark: () => {
        this.allTypeFns.Ghost();
      },
      Steel: () => {
        this.allTypeFns.Normal();
        const attack = nodeFns.createElement([],'div',nodeFns.createElement(["metal-claw"],'div'),'attack');
        if(this.parentObj.playersTurn){this.node.classList.add("reverse-attack")};
        this.node.append(attack);
        
        setTimeout(() => {
          this.node.classList.remove("reverse-attack");
      
          while(this.node.firstChild){
            this.node.removeChild(this.node.firstChild)
          };
          console.log('Dragon attack removed')
        }, 1000);
       
      },
      Fairy: () => {
        const defender = !this.parentObj.playersTurn? this.parentObj.playerPokemonContainer : this.parentObj.opponentPokemonContainer;
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
        this.node.append(attack);
        if(!this.parentObj.playersTurn){this.node.classList.add("reverse-attack")};

        defender.classList.add("hit");

        setTimeout(() => {
          defender.classList.remove("hit");
          while(this.node.firstChild){
            this.node.removeChild(this.node.firstChild)
          };
          this.node.classList.remove("reverse-attack");
        }, 1500);
      },
    };
  }

  render() {
    return this.node;
  }
}

class BattleInfo {
  constructor(parentObj, player, opponent,maxNumber=30) {
    this.parentObj = parentObj;
    this.mainObject = parentObj;
    
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
        this.parentObj.render();

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
        type
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
    } else this.endBattle();
  }

  opponentAttacks(){
    const attackAfter = 15000;
    let timeOutId;
    const fnToQueue =()=>{
      timeOutId = setTimeout(() => {
        this.parentObj.playersTurn = false;
        const chosenAttack = this.opponentTypes[Math.floor(Math.random()*this.opponentTypes.length)]   
        this.playerHP -= this.attackEffectvity(chosenAttack)*10;
        this.parentObj.attackContainer.allTypeFns[chosenAttack]();
        
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
      levelUp();
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
  constructor(){
    this.mainObject = null;
    
    this.inputElement = this.createInput();
    this.node = nodeFns.createElement([]);
    this.confirmChoiceBtn = this.confirmChoiceBtnGenerator();
    this.typeSelectElement = this.typeSelectElementGenerator();
    this.entryNodeList = [];
    this.problemTypeSelect = new ProblemTypeSelect(this,true);
    
    this.pokemonList = pokedexFns.getOwnPokedexEntries();  
    this.filteredPokemonlist = [...this.pokemonList];
    this.opponent = pokedexFns.findPokemonInPokedex(
      Math.floor(Math.random() * 423)
    );
    this.chosenPokemon = null;
    this.battleEnded = false;
  }

  reset(){
    if(this.battleEnded){
      this.opponent = pokedexFns.findPokemonInPokedex(
        Math.floor(Math.random() * 423)
      );
      this.chosenPokemon = null;
      this.render();
    }
  }
  
  typeSelectElementGenerator(){
    const selectElement = nodeFns.createElement(["select-type-of-hero"],'select');
    selectElement.append(nodeFns.createElement([],'option','type'))
    Object.keys(pokedexFns.types).forEach(type=>{
      const option = nodeFns.createElement([],'option',type);
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
    const confirmBtn = nodeFns.createElement([],'button','OK');
    confirmBtn.addEventListener('click',()=>{
      if(this.chosenPokemon){
        this.mainObject = new BattleDialog(true,this.chosenPokemon,this.opponent,this)
        this.mainObject.append();
      } else {alert('Válassz egy pokemont!');}
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
    this.filteredPokemonlist = this.pokemonList.filter((entry) => regexp.test(entry.name));
    this.render();
  }
  foundByType(){
    this.filteredPokemonlist = this.pokemonList.filter(entry=>{
      return entry.type.includes(this.typeSelectElement.value)
    })
    this.render();
  }

  render(){
    while(this.node.firstChild){
      this.node.removeChild(this.node.firstChild)
    }

    
    const showOpponent = nodeFns.createElement([],'div',nodeFns.createElement([],'h2','Opponent:'));
      const opponentDiv = new PokemonsToChoose(this,this.opponent);
      showOpponent.append(opponentDiv.render());
    
    const searchBar = nodeFns.createElement(["search-for-hero"],'div',this.inputElement);
    const collection = nodeFns.createElement(["vertical-slide"]);

    this.filteredPokemonlist.forEach(entry =>{
      const newEntry = new PokemonsToChoose(this,entry);
      this.entryNodeList.push(newEntry);
      collection.append(newEntry.render())
    });

    
    this.node.append(
      this.problemTypeSelect.render(),
      showOpponent,
      searchBar,
      this.typeSelectElement,
      collection,
      this.confirmChoiceBtn);

    return this.node;
  }

  append(){
    document.getElementById('problems').innerHTML = '';
    document.getElementById('problems').append(this.render());
  }

}

class PokemonsToChoose{
  constructor(parentObj,pokedexEntry){
    this.pokedexEntry = pokedexEntry;
    this.parentObj = parentObj;

    this.isSelected = false;
    this.node = this.createCardElement()
  }
  createCardElement(){
    const cardElement = nodeFns.createElement(["card"])
    
    cardElement.addEventListener("click",()=>{
      this.parentObj.chosenPokemon = this.pokedexEntry;
      this.parentObj.removeIsSelectedFromAll();
      this.isSelected = !this.isSelected;
      this.render();
      console.log(this.pokedexEntry);
    })
    return cardElement;
  }

  render(){
    while(this.node.firstChild){
      this.node.removeChild(this.node.firstChild)
    }
    
    const typeElements = this.pokedexEntry.type.map(type =>{
      const divElement = nodeFns.createElement(["opponenet-type-div"],'div',type)
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
    this.node = isDiv? nodeFns.createElement([]) : nodeFns.createElement(["z-index-100"],'dialog');
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
    const multiplyOption = nodeFns.createElement([],'option','×/:');
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