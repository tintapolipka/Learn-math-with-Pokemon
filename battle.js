class BattleDialog {
  constructor(isOpen = true, pokeNr = 10) {
    this.node = nodeFns.createElement(["battle-dialog"], "dialog");
    this.node.open = isOpen;

    this.player = pokedexFns.findPokemonInPokedex(pokeNr);
    this.opponent = pokedexFns.findPokemonInPokedex(
      Math.floor(Math.random() * 424)
    );
    this.playersTurn = true;

    this.battleground = nodeFns.createElement(["battleground"]);
    this.attackContainer = new AttackContainer(this);
    this.battleInfo = new BattleInfo(this, this.player, this.opponent);
    this.playerPokemonContainer = this.playerImgCreator();
    this.opponentPokemonContainer = this.oppoentImgCreator();
    this.math = new BattleMath(this,this.player,this.opponent);
  
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
    document.getElementById("root").append(this.node);
  }
}

class AttackContainer {
  constructor(parentObj, attackType = "Normal") {
    this.node = nodeFns.createElement(["attack-container"]);
    this.attackType = attackType;
    this.parentObj = parentObj;
    this.allTypeFns = this.allTypeFnsSetter();
  }

  allTypeFnsSetter() {
    return {
      Normal: () => {
        const attacker = this.parentObj.playersTurn? this.parentObj.playerPokemonContainer : this.parentObj.opponentPokemonContainer;
        const defender = !this.parentObj.playersTurn? this.parentObj.playerPokemonContainer : this.parentObj.opponentPokemonContainer;
      
        attacker.classList.add(this.parentObj.playersTurn? "attacking-enemy" : "attacking-player");
        console.log(attacker.classList);
        defender.classList.add("hit");
        setTimeout(() => {
          attacker.classList.remove(this.parentObj.playersTurn? "attacking-enemy" : "attacking-player");
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
          if(!this.parentObj.playersTurn){this.node.classList.remove("reverse-attack")};
          while(this.node.firstChild){
            this.node.removeChild(this.node.firstChild)
          };
        }, 2000);
        
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
          if(!this.parentObj.playersTurn){this.node.classList.remove("reverse-attack")};
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
          if(!this.parentObj.playersTurn){this.node.classList.remove("reverse-attack")};
        }, 2000);
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
          if(!this.parentObj.playersTurn){this.node.classList.remove("reverse-attack")};
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
          if(!this.parentObj.playersTurn){this.node.classList.remove("reverse-attack")};
        }, 1500);
      },
      Fighting: () => {
        this.allTypeFns.Normal();
        
        const attack = nodeFns.createElement([],'div',nodeFns.createElement(["warrior-attack"],'div',nodeFns.createElement(["warrior-fist-img"],'div')),'attack');
        if(!this.parentObj.playersTurn){this.node.classList.add("reverse-attack")};
        this.node.append(attack);
        
        setTimeout(() => {
          if(!this.parentObj.playersTurn){this.node.classList.remove("reverse-attack")};
      
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
          console.log("ground attack removed")
        }, 1500);
      },
      Flying: () => {
        console.log(this);
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
          if(!this.parentObj.playersTurn){this.node.classList.remove("reverse-attack")};
        }, 2000);
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
          
          if(!this.parentObj.playersTurn){this.node.classList.remove("reverse-attack")};
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
          if(!this.parentObj.playersTurn){this.node.classList.remove("reverse-attack")};
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
        
        defender.classList.add('hit');
        setTimeout(() => {
          if(!this.parentObj.playersTurn){this.node.classList.remove("reverse-attack")};
          defender.classList.remove('hit');
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
          if(this.parentObj.playersTurn){this.node.classList.remove("reverse-attack")};
      
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
          if(this.parentObj.playersTurn){this.node.classList.remove("reverse-attack")};
      
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
          if(!this.parentObj.playersTurn){this.node.classList.remove("reverse-attack")};
        }, 1500);
      },
    };
  }

  render() {
    return this.node;
  }
}

class BattleInfo {
  constructor(parentObj, player, opponent) {
    this.parentObj = parentObj;
    this.player = new PlayerInfo(this, player,'player');
    this.opponent = new PlayerInfo(this, opponent,'opponent');

    this.node = nodeFns.createElement(["battle-info"]);
  }

  render() {
    this.node.append(this.player.render(), this.opponent.render());
    return this.node;
  }
}

class PlayerInfo {
  constructor(parentObj, pokemon,owner) {
    this.parentObj = parentObj;
    this.pokemon = pokemon;
    this.owner = owner;
    this.node = nodeFns.createElement(["player-pokemon-info"]);
  }

  render() {
    this.node.innerHTML = "";
    
    const name = nodeFns.createElement([], "h3", this.pokemon.name);

    const hp = nodeFns.createElement([], "p", `Hp: ${this.owner == 'player'? this.parentObj.parentObj.math.playerHP : this.parentObj.parentObj.math.opponentHP}%`);
    const types = this.pokemon.type.map((type) => {
      const buttonElement = nodeFns.createElement(
        ["attack-button"],
        "button",
        type
      );
      buttonElement.addEventListener('click',()=>{
        this.parentObj.parentObj.math.playerAttacks(type);
        this.parentObj.render();
        })
      buttonElement.style.backgroundColor = pokedexFns.types[type].color;
      
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
    
    this.playerEffectivities = this.mergeEffectivity(this.playerTypes)
    this.opponentEffectivities = this.mergeEffectivity(this.opponentTypes)
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
  
  attackEffectvity(){
    const defenderTypes = this.parentObj.playersTurn? this.opponentTypes : this.playerTypes;
    const attackerEffectivities = this.parentObj.playersTurn? this.playerEffectivities : this.opponentEffectivities;

    let effectivity = 1;
    defenderTypes.forEach(type => {
      if(effectivity && attackerEffectivities.unEffective.includes(type)){
        effectivity = 0;
      } else if (attackerEffectivities.weakAgainst.includes(type)){
        effectivity = effectivity/2;
      } else if (attackerEffectivities.superEffective.includes(type)){
        effectivity = effectivity*2;
      } 
    })
    return effectivity;
  }

  playerAttacks = (type)=>{
    this.opponentHP -= this.attackEffectvity(type)*10;
    console.log(this.opponentHP);
    this.parentObj.attackContainer.allTypeFns[type]();
  }
}