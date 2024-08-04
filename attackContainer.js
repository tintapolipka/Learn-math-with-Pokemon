class AttackContainer {
    constructor(parentObj) {
      this.parentObj = parentObj;
      this.mainObject = parentObj;
      
      this.node = nodeFns.createElement(["attack-container"]);
      //Kell-e az alábbi?
      //this.opponentAttackNode = nodeFns.createElement(["attack-container", "opponent-attack-container"]);
      
      this.allTypeFns = this.allTypeFnsSetter();
      this.attackQueve = [()=>{console.log('Go!')}];
      this.setIntervalId = setInterval(() => {
        this.attackQueveHandler(); 
        if(this.parentObj.math.isEnded){
          this.parentObj.math.endBattle();
        }
      }, 500);
  
      
      parentObj.goTo.AttackContainer = this;
    }
  
    attackQueveHandler(){
      if(this.attackQueve.length && !this.mainObject.animationInProgrress){this.attackQueve.shift()()}
      console.log(this.attackQueve);
    }
  
    allTypeFnsSetter() {
      return {
        Normal: (playersTurn = true) => {
          this.mainObject.animationInProgrress = true;
          console.log("this.mainObject.animationInProgrress: ",this.mainObject.animationInProgrress);
          
          const attacker = playersTurn? this.parentObj.playerPokemonContainer : this.parentObj.opponentPokemonContainer;
          const defender = !playersTurn? this.parentObj.playerPokemonContainer : this.parentObj.opponentPokemonContainer;
        
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
          this.mainObject.animationInProgrress = true;
          console.log("this.mainObject.animationInProgrress: ",this.mainObject.animationInProgrress);
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
          
          if(!playersTurn){this.node.classList.add("reverse-attack")};
          this.node.append(attack);
          setTimeout(() => {
            fireBlockCSS(fireCone);
          }, 1);
  
          const defender = !playersTurn? this.parentObj.playerPokemonContainer : this.parentObj.opponentPokemonContainer;
        
          defender.classList.add("hit");
          //clearig function
          setTimeout(() => {
            defender.classList.remove("hit");
            this.node.classList.remove("reverse-attack");
            while(this.node.firstChild){
              this.node.removeChild(this.node.firstChild)
            };
            this.mainObject.animationInProgrress = false;
            console.log("this.mainObject.animationInProgrress: ",this.mainObject.animationInProgrress);
          }, 1990);
          
        },
        Water: (playersTurn = true) => {
          this.mainObject.animationInProgrress = true;
          console.log("this.mainObject.animationInProgrress: ",this.mainObject.animationInProgrress);
          const defender = !playersTurn? this.parentObj.playerPokemonContainer : this.parentObj.opponentPokemonContainer;
          
          const waterSpout = nodeFns.createElement(["squirt-attack"]);
          const attack = nodeFns.createElement([],'div',nodeFns.createElement(["water-ball", "squirt"],'div'),'attack');
          attack.append(waterSpout);
          
          if(!playersTurn){this.node.classList.add("reverse-attack")};
          this.node.append(attack);
  
  
          defender.classList.add("hit");
  
          setTimeout(() => {
            defender.classList.remove("hit");
            while(this.node.firstChild){
              this.node.removeChild(this.node.firstChild)
            };
            this.node.classList.remove("reverse-attack");
            this.mainObject.animationInProgrress = false;
          console.log("this.mainObject.animationInProgrress: ",this.mainObject.animationInProgrress);
          }, 1000);
        },
        Electric: (playersTurn = true) => {
          this.mainObject.animationInProgrress = true;
          console.log("this.mainObject.animationInProgrress: ",this.mainObject.animationInProgrress);
          const attacker = playersTurn? this.parentObj.playerPokemonContainer : this.parentObj.opponentPokemonContainer;
          const defender = !playersTurn? this.parentObj.playerPokemonContainer : this.parentObj.opponentPokemonContainer;
        
          const lightningBolt = nodeFns.createElement(["lightning-bolt"],'div','','lightning-bolt-1',);
          const attack = nodeFns.createElement([],'div',nodeFns.createElement(["lightning-attack"],'div',lightningBolt),'attack');
          this.node.append(attack);
          if(!playersTurn){this.node.classList.add("reverse-attack")};
  
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
            this.mainObject.animationInProgrress = false;
          console.log("this.mainObject.animationInProgrress: ",this.mainObject.animationInProgrress);
          }, 1800);
        },
        Grass: (playersTurn = true) => {
          this.mainObject.animationInProgrress = true;
          console.log("this.mainObject.animationInProgrress: ",this.mainObject.animationInProgrress);
          const defender = !playersTurn? this.parentObj.playerPokemonContainer : this.parentObj.opponentPokemonContainer;
        
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
          if(!playersTurn){this.node.classList.add("reverse-attack")};
  
          defender.classList.add("hit");
  
          setTimeout(() => {
            defender.classList.remove("hit");
            while(this.node.firstChild){
              this.node.removeChild(this.node.firstChild)
            };
            this.node.classList.remove("reverse-attack");
            this.mainObject.animationInProgrress = false;
          console.log("this.mainObject.animationInProgrress: ",this.mainObject.animationInProgrress);
          }, 1000);
        },
        Ice: (playersTurn = true) => {
          this.mainObject.animationInProgrress = true;
          console.log("this.mainObject.animationInProgrress: ",this.mainObject.animationInProgrress);
          const defender = !playersTurn? this.parentObj.playerPokemonContainer : this.parentObj.opponentPokemonContainer;
        
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
          if(!playersTurn){this.node.classList.add("reverse-attack")};
  
          defender.classList.add("hit");
  
          setTimeout(() => {
            defender.classList.remove("hit");
            while(this.node.firstChild){
              this.node.removeChild(this.node.firstChild)
            };
            this.node.classList.remove("reverse-attack");
            this.mainObject.animationInProgrress = false;
          console.log("this.mainObject.animationInProgrress: ",this.mainObject.animationInProgrress);
          }, 1500);
        },
        Fighting: (playersTurn = true) => {
          this.mainObject.animationInProgrress = true;
          console.log("this.mainObject.animationInProgrress: ",this.mainObject.animationInProgrress);
          this.allTypeFns.Normal(playersTurn);
          
          const attack = nodeFns.createElement([],'div',nodeFns.createElement(["warrior-attack"],'div',nodeFns.createElement(["warrior-fist-img"],'div')),'attack');
          if(!playersTurn){this.node.classList.add("reverse-attack")};
          this.node.append(attack);
          
          setTimeout(() => {
            this.node.classList.remove("reverse-attack");
        
            while(this.node.firstChild){
              this.node.removeChild(this.node.firstChild)
            };
            console.log('warrior-attack  removed')
            this.mainObject.animationInProgrress = false;
          console.log("this.mainObject.animationInProgrress: ",this.mainObject.animationInProgrress);
          }, 1000);
        },
        Poison: (playersTurn = true) => {
          console.log("POISON ATTACK");
        },
        Ground: (playersTurn = true) => {
          this.mainObject.animationInProgrress = true;
          console.log("this.mainObject.animationInProgrress: ",this.mainObject.animationInProgrress);
          const attacker = playersTurn? this.parentObj.playerPokemonContainer : this.parentObj.opponentPokemonContainer;
          const defender = !playersTurn? this.parentObj.playerPokemonContainer : this.parentObj.opponentPokemonContainer;
        
          defender.classList.add("earthquake");
          attacker.classList.add("thwomp");
          setTimeout(() => {
            
            defender.classList.remove("earthquake");
            attacker.classList.remove("thwomp");
            this.node.classList.remove("reverse-attack");
            console.log("ground attack removed")
            this.mainObject.animationInProgrress = false;
          console.log("this.mainObject.animationInProgrress: ",this.mainObject.animationInProgrress);
          }, 1500);
        },
        Flying: (playersTurn = true) => {
          this.mainObject.animationInProgrress = true;
          console.log("this.mainObject.animationInProgrress: ",this.mainObject.animationInProgrress);
          const attacker = playersTurn? this.parentObj.playerPokemonContainer : this.parentObj.opponentPokemonContainer;
          const defender = !playersTurn? this.parentObj.playerPokemonContainer : this.parentObj.opponentPokemonContainer;
        
          attacker.classList.add(playersTurn? "flying-pokemon-animation-player" : "flying-pokemon-animation-enemy");
          const windBlow = nodeFns.createElement(["wind-blow"]);
         
          attacker.append(windBlow);
  
          defender.classList.add("hit");
          setTimeout(() => {
            attacker.classList.remove("flying-pokemon-animation-player");
            attacker.classList.remove("flying-pokemon-animation-enemy");
            defender.classList.remove("hit");
            attacker.removeChild(windBlow);
            console.log("flying attack removed")
            this.mainObject.animationInProgrress = false;
          console.log("this.mainObject.animationInProgrress: ",this.mainObject.animationInProgrress);
          }, 1710);
        
        },
        Psychic: (playersTurn = true) => {
          this.mainObject.animationInProgrress = true;
          console.log("this.mainObject.animationInProgrress: ",this.mainObject.animationInProgrress);
          const attacker = playersTurn? this.parentObj.playerPokemonContainer : this.parentObj.opponentPokemonContainer;
          const defender = !playersTurn? this.parentObj.playerPokemonContainer : this.parentObj.opponentPokemonContainer;
        
          const psyBall = nodeFns.createElement(["psy-ball"]);
          psyBall.append(
            nodeFns.createElement(["psy-lightning"],'div','',"psy-lightning-1"),
            nodeFns.createElement(["psy-lightning"],'div','',"psy-lightning-2")
          );
          const attack = nodeFns.createElement([],'div',nodeFns.createElement(["psy-attack"],'div',psyBall),'attack');
          
          this.node.append(attack);
          if(!playersTurn){this.node.classList.add("reverse-attack")};
  
          defender.classList.add("hit");
  
          setTimeout(() => {
        
            defender.classList.remove("hit");
            while(this.node.firstChild){
              this.node.removeChild(this.node.firstChild)
            };
            this.node.classList.remove("reverse-attack");
            this.mainObject.animationInProgrress = false;
          console.log("this.mainObject.animationInProgrress: ",this.mainObject.animationInProgrress);
          }, 3000);
        },
        Bug: (playersTurn = true) => {
          this.mainObject.animationInProgrress = true;
          console.log("this.mainObject.animationInProgrress: ",this.mainObject.animationInProgrress);
          const attacker = playersTurn? this.parentObj.playerPokemonContainer : this.parentObj.opponentPokemonContainer;
          const defender = !playersTurn? this.parentObj.playerPokemonContainer : this.parentObj.opponentPokemonContainer;
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
  
          if(!playersTurn){this.node.classList.add("reverse-attack")};
          
          defender.append(savageSpitOut);
          defender.classList.add("hit");
          attacker.classList.add("spit");
  
          setTimeout(() => {
            defender.removeChild(savageSpitOut);
  
            defender.classList.remove("hit");
            attacker.classList.remove("spit");
            
            this.node.classList.remove("reverse-attack");
            this.mainObject.animationInProgrress = false;
          console.log("this.mainObject.animationInProgrress: ",this.mainObject.animationInProgrress);
          }, 2000);
        },
        Rock: (playersTurn = true) => {
          this.mainObject.animationInProgrress = true;
          console.log("this.mainObject.animationInProgrress: ",this.mainObject.animationInProgrress);
          const attacker = playersTurn? this.parentObj.playerPokemonContainer : this.parentObj.opponentPokemonContainer;
          const defender = !playersTurn? this.parentObj.playerPokemonContainer : this.parentObj.opponentPokemonContainer; 
          const attack = nodeFns.createElement([],'div',nodeFns.createElement(["rock-attack"],'div',nodeFns.createElement(["rock-img"])),'attack');
          if(!playersTurn){this.node.classList.add("reverse-attack")};
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
            console.log('rock-attack  removed')
            this.mainObject.animationInProgrress = false;
          console.log("this.mainObject.animationInProgrress: ",this.mainObject.animationInProgrress);
          }, 1500);
        },
        Ghost: (playersTurn = true) => {
          this.mainObject.animationInProgrress = true;
          console.log("this.mainObject.animationInProgrress: ",this.mainObject.animationInProgrress);
          const attacker = playersTurn? this.parentObj.playerPokemonContainer : this.parentObj.opponentPokemonContainer;
          const defender = !playersTurn? this.parentObj.playerPokemonContainer : this.parentObj.opponentPokemonContainer;
          
          const ghostAttack = nodeFns.createElement(["ghost-attack"],'div');
          ghostAttack.style.backgroundImage = `url(${playersTurn? this.parentObj.player.image : this.parentObj.opponent.image})`;
          const attack = nodeFns.createElement([],'div',ghostAttack,'attack');
          if(!playersTurn){this.node.classList.add("reverse-attack")};
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
            this.mainObject.animationInProgrress = false;
          console.log("this.mainObject.animationInProgrress: ",this.mainObject.animationInProgrress);
          }, 1700);
        },
        Dragon: (playersTurn = true) => {
          this.mainObject.animationInProgrress = true;
          console.log("this.mainObject.animationInProgrress: ",this.mainObject.animationInProgrress);
          this.allTypeFns.Normal(playersTurn);
          const attack = nodeFns.createElement([],'div',nodeFns.createElement(["dragon-claw"],'div'),'attack');
          if(playersTurn){this.node.classList.add("reverse-attack")};
          this.node.append(attack);
          
          setTimeout(() => {
            this.node.classList.remove("reverse-attack");
        
            while(this.node.firstChild){
              this.node.removeChild(this.node.firstChild)
            };
            console.log('Dragon attack removed')
            this.mainObject.animationInProgrress = false;
          console.log("this.mainObject.animationInProgrress: ",this.mainObject.animationInProgrress);
          }, 1000);
         
        },
        Dark: (playersTurn = true) => {
          this.allTypeFns.Ghost(playersTurn);
        },
        Steel: (playersTurn = true) => {
          this.mainObject.animationInProgrress = true;
          console.log("this.mainObject.animationInProgrress: ",this.mainObject.animationInProgrress);
          this.allTypeFns.Normal(playersTurn);
          const attack = nodeFns.createElement([],'div',nodeFns.createElement(["metal-claw"],'div'),'attack');
          if(playersTurn){this.node.classList.add("reverse-attack")};
          this.node.append(attack);
          
          setTimeout(() => {
            this.node.classList.remove("reverse-attack");
        
            while(this.node.firstChild){
              this.node.removeChild(this.node.firstChild)
            };
            console.log('Dragon attack removed')
            this.mainObject.animationInProgrress = false;
          console.log("this.mainObject.animationInProgrress: ",this.mainObject.animationInProgrress);
          }, 1000);
         
        },
        Fairy: (playersTurn = true) => {
          this.mainObject.animationInProgrress = true;
          console.log("this.mainObject.animationInProgrress: ",this.mainObject.animationInProgrress);
          const defender = !playersTurn? this.parentObj.playerPokemonContainer : this.parentObj.opponentPokemonContainer;
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
          if(!playersTurn){this.node.classList.add("reverse-attack")};
  
          defender.classList.add("hit");
  
          setTimeout(() => {
            defender.classList.remove("hit");
            while(this.node.firstChild){
              this.node.removeChild(this.node.firstChild)
            };
            this.node.classList.remove("reverse-attack");
            this.mainObject.animationInProgrress = false;
          console.log("this.mainObject.animationInProgrress: ",this.mainObject.animationInProgrress);
          }, 1500);
        },
      };
    }
  
    render() {
      return this.node;
    }
  }
  