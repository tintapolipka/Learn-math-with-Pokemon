//state variables:

let levelNr = wichLevel(getXp(),100);


// general functions
function id(id){
   return document.getElementById(id);
}

function genID(){
    return Math.floor(Math.random()*100000);
}

function listPokemon(pokedexNr){
    let toRender=
    `<table>
        <tbody>`;
   pokedexNr.map(entry=> {toRender+= `
                                    <tr>
                                    <td ><img src="${entry.image}"></td>
                                    <td>${entry.nr}</td>
                                    <td>${entry.name}</td>
                                    <td>${entry.type[0]}</td>
                                    <td>${entry.type[1]? entry.type[1]:''}</td>
                                    </tr>`})
    toRender+= `    
        </tbody>
    </table>`;
    console.log(toRender);
    id("collection").innerHTML=toRender;
}







// render Problems

function makeNumbers(maxNumber){
    let c = Math.floor(maxNumber/2) + Math.floor(Math.random()*maxNumber/2);
    let a = Math.floor(Math.random()*c);
    let b = c - a;
    return [a,b,c];
}

function callToRenders(maxNumber){
    let problem1Array = makeNumbers(maxNumber);
    let problem2Array = makeNumbers(maxNumber);
    let problem3Array = makeNumbers(maxNumber);
    let problem4Array = makeNumbers(maxNumber);
    let problem5Array = makeNumbers(maxNumber);
    let problem6Array = makeNumbers(maxNumber);

    let toRender = '<table>';

    //xbc
    toRender += toRenderAbx(problem1Array);
 
    toRender += toRenderXbc(problem2Array);
 
    toRender += toRenderAxc(problem3Array);
    
    toRender += toRenderAbxMinus(problem4Array);
   
    toRender += toRenderXbcMINUS(problem5Array);
   
    toRender += toRenderAxcMINUS(problem6Array);
  
    toRender += '</table><br><button onclick="location.reload()">Next >></button>';
    id('problems').innerHTML= toRender;
}

//addition
function toRenderXbc([a,b,c]){
    const id = genID();
    return `<tr>
            <td><input type="number" id="${id}xbcX"><td/>
            <td>+<td/>
            <td id="${id}xbcB">${b}<td/>
            <td>=<td/>
            <td id="${id}xbcC">${c}<td/>
            <td><button id="${id}btn" onclick="xbcCheck('${id}')"> ? </button><td/>
        </tr>`;
}

function toRenderAxc([a,b,c]){
    const id = genID();
    return `<tr>
                <td id="${id}axcA">${a}<td/>
                <td>+<td/>
                <td id="${id}axcB"><input type="number" id="${id}axcX"><td/>
                <td>=<td/>
                <td id="${id}axcC">${c}<td/>
                <td><button id="${id}btn" onclick="axcCheck('${id}')"> ? </button><td/>
            </tr>`;
}
    
function toRenderAbx([a,b,c]){
    const id = genID();
    return `<tr>
                <td id="${id}abxA">${a}<td/>
                <td>+<td/>
                <td id="${id}abxB">${b}<td/>
                <td>=<td/>
                <td id="${id}abxC"><input type="number" id="${id}abxX"><td/>
                <td><button id="${id}btn" onclick="abxCheck('${id}')"> ? </button><td/>
            </tr>`;
}


function xbcCheck(Nodeid){
    let x = id(Nodeid +'xbcX').value;
    let b = id(Nodeid+'xbcB').innerText;
    let c = id(Nodeid+'xbcC').innerText;

    if(+x+ +b == +c){
        success(Nodeid);
    } else {console.warn('Tévedés!')
}
}   

function axcCheck(Nodeid){
    let a = id(Nodeid+'axcA').innerText;
    let x = id(Nodeid+'axcX').value;
    let c = id(Nodeid+'axcC').innerText;

    if(+a + +x  == +c){
        console.log('Siker axc!');
        success(Nodeid);
    } else {console.warn('Tévedés!')
    }
}

function abxCheck(Nodeid){
    let x = id(Nodeid +'abxX').value;
    let b = id(Nodeid+'abxB').innerText;
    let a = id(Nodeid+'abxA').innerText;

    if(+a+ +b == +x){
        console.log('Siker abx!');
        success(Nodeid);
    } else {console.warn('Tévedés!')
    }

} 

//subtraction

function toRenderAbxMinus([a,b,c]){
    const id = genID();
    return `<tr>
                <td id="${id}abxA">${c}<td/>
                <td>-<td/>
                <td id="${id}abxB">${b}<td/>
                <td>=<td/>
                <td id="${id}abxC"><input type="number" id="${id}abxX"><td/>
                <td><button id="${id}btn" onclick="abxCheckMinus('${id}')"> ? </button><td/>
            </tr>`;
}

function toRenderXbcMINUS([a,b,c]){
    const id = genID();
    return `<tr>
            <td><input type="number" id="${id}xbcX"><td/>
            <td>-<td/>
            <td id="${id}xbcB">${b}<td/>
            <td>=<td/>
            <td id="${id}xbcC">${a}<td/>
            <td><button id="${id}btn" onclick="xbcCheckMinus('${id}')"> ? </button><td/>
        </tr>`;
}

function toRenderAxcMINUS([a,b,c]){
    const id = genID();
    return `<tr>
                <td id="${id}axcA">${c}<td/>
                <td>-<td/>
                <td id="${id}axcB"><input type="number" id="${id}axcX"><td/>
                <td>=<td/>
                <td id="${id}axcC">${a}<td/>
                <td><button id="${id}btn" onclick="axcCheckMinus('${id}')"> ? </button><td/>
            </tr>`;
}

function xbcCheckMinus(Nodeid){
    let x = id(Nodeid +'xbcX').value;
    let b = id(Nodeid+'xbcB').innerText;
    let c = id(Nodeid+'xbcC').innerText;

    if(+x - +b == +c){
        success(Nodeid);
    } else {console.warn('Tévedés!')
}
}   

function axcCheckMinus(Nodeid){
    let a = id(Nodeid+'axcA').innerText;
    let x = id(Nodeid+'axcX').value;
    let c = id(Nodeid+'axcC').innerText;

    if(+a - +x  == +c){
        console.log('Siker axc!');
        success(Nodeid);
    } else {console.warn('Tévedés!')
    }
}

function abxCheckMinus(Nodeid){
    let x = id(Nodeid +'abxX').value;
    let b = id(Nodeid+'abxB').innerText;
    let a = id(Nodeid+'abxA').innerText;

    if(+a - +b == +x){
        console.log('Siker abx!');
        success(Nodeid);
    } else {console.warn('Tévedés!')
    }

} 

function xpAtLevel(){
    let lvlNumber = wichLevel(getXp(),100);
    let toReturn;
    toReturn = 10 - Math.round(lvlNumber/80);
    toReturn = toReturn < 3 ? 3 : toReturn;
    return toReturn;
}

function success(Nodeid){
    console.log('Siker!');
        id(Nodeid+'btn').innerText = '✓';
        id(Nodeid+'btn').onclick = '';
        setXp(xpAtLevel());
        levelUp();
}

// score, xp

function getXp(){
    if(!localStorage['pokemonXp']){localStorage.setItem('pokemonXp', '0')};
    return JSON.parse(localStorage['pokemonXp']);
}

function setXp(bonus){
    let currentXp = getXp();
    let newXp = +currentXp + bonus;
    localStorage.setItem('pokemonXp', JSON.stringify(newXp));
    console.log('New xp: '+localStorage.pokemonXp);
}

function wichLevel(xp,base){
    return Math.floor(xp/base);
}

function levelUpModal(newEntryNr,xp,base){
    let entry = findPokemonInPokedex(newEntryNr);
    let rawImage = entry['image'];
    const imageUrl = rawImage.replace('70px-','250px-');
    const pokemonName = entry['name'];

    let template= `
    <div id="level-up-modal">
    <div id="new-pokemon">
      <img src="./img/new.svg" alt="New">
      <img src="${imageUrl}" alt="${pokemonName}">
      <img src="./img/Pokemon.svg" alt="pokemon">
      ${pokemonName}
  </div>
  NEW LEVEL:
    <span class="lvl-number">${wichLevel(xp,base)}</span>   
  </div>`;

  id("problems").innerHTML = template;
  setTimeout(()=>{whoSThatPokemonRender()},9000)
}

function levelUp(){
    let base = 100;
    let xp = getXp();
    let nextLvlXp = nextLevelXp(xp,base);

    function nextLevelXp(xp,base){
       return (xp - xp%base)+base;
    }

    // show xp bar    
    id('xp-bar-inner').style.height =`${xp%base}%`;
    if(wichLevel(xp,base)>levelNr){
        console.log('Szintlépés!');
        levelNr = wichLevel(xp,base);
        let newEntryNr = Math.ceil(Math.random()*351);
        print_lvlNr();
        createPokedex(newEntryNr);
        renderPokeDex();
        levelUpModal(newEntryNr,xp,base);
    };



};

function print_lvlNr(){
    id('lvl-number').innerHTML =`Level ${levelNr}`;
};

// PokeDex

function findPokemonInPokedex(Nr){
    let entry = false;
    let indexOfEntry = Nr;
    let pokedexEdition = pokedex1;
    if(Nr < 53){pokedexEdition = pokedex1;}
    else if(Nr >52 && Nr <= 128){pokedexEdition = pokedex2; indexOfEntry = Nr-52;}
    else if(Nr> 128 && Nr <352 ){pokedexEdition = pokedex3; indexOfEntry = Nr-128;}
    else {console.warn('More pokedex editions please!')};

    entry = pokedexEdition[indexOfEntry-1];
    return entry;
}

function createPokedex(Nr){
    if(!localStorage['pokedex']){localStorage.setItem('pokedex', JSON.stringify([]));};
    let entries = JSON.parse(localStorage['pokedex']);
    
    entries.push(Nr);
    entries.sort((a,b)=> a-b);
    localStorage.setItem('pokedex', JSON.stringify(entries));
}

function renderPokeDex(){
    let entries = JSON.parse(localStorage['pokedex']);
    let toRender='POKEDEX';

    entries.forEach(entry => {
        
    let currentEntry = findPokemonInPokedex(entry);
        let number = currentEntry['nr'];
        let imgUrl = currentEntry['image'];
        let name = currentEntry['name'];
    

    let cardTemplate = `<div class="card">
<div class="nr">${number}</div>
<img
  class="card-img"
  src="${imgUrl}"
  alt="${name}"
/>
<div class="name-container">${name}</div>
</div>`;

toRender += cardTemplate;
});

id("collection").innerHTML =toRender;
}

function whoSThatPokemonRender(){
    let toRender='';
    const entry = findPokemonInPokedex(Math.floor(Math.random()*127));
    let rawImage = entry['image'];
    const imageUrl = rawImage.replace('70px-','250px-');
    const pokemonName = entry['name'];

    let template = `
    <div id="whos-that-pokemon">
     
    <div ><img id="whos-that-pokemon-img" src="${imageUrl}"></div><input type="text" id="whos-that-pokemon-input" placeholder="?"><button id="confirm-that-pokemon" onclick="whoSThatPokemon('${pokemonName}')">?</button></div>`;
    toRender += template;
    id('problems').innerHTML = toRender;
};

function whoSThatPokemon(pokemonName){
 if(pokemonName.toLowerCase() == id('whos-that-pokemon-input').value.toLowerCase()){
    console.log('OKÉS!')
    setXp(30);
    
} else {console.log('BAKI!');
id('whos-that-pokemon-input').value = pokemonName;
id('whos-that-pokemon-input').style.backgroundColor ="red";
levelUp();
}
    id('whos-that-pokemon-img').style.filter = 'brightness(100%)';
    id('confirm-that-pokemon').innerText = 'NEXT >>'
    setTimeout(()=>{id('confirm-that-pokemon').onclick = location.reload();},5000 ) 
}

function firstRun(){
    if(!localStorage.pokemonXp || !localStorage.pokedex){
        console.log('Első indítás');
        id('problems').innerHTML = `<div><div><h1>Üdvözöllek leendő PoKéMon mester!</h1>Ebben a játékban matek példákat kell megoldanod a 20-as számkörben. A kérdőjelre kattintva kiderül, helyes-e a válaszod? Minden sikeres megoldás Xp-t ér. A zöld oszlop mutatja, hogy mennyi Xp kell a következő szintlépéshez. Minden szintlépéskor új pokemonnal gyarapszik a gyűjteményed! Vágj bele a kalandba most! <p>Szerezd meg hát mind!</p> <p>Ash</p> </div><button onclick="callToRenders(20)">Kezdjük!</button><div><img src="https://upload.wikimedia.org/wikipedia/en/e/e4/Ash_Ketchum_Journeys.png" alt="Ash welcomes you"></div></div>`;
        localStorage.setItem('pokemonXp', '0');
        localStorage.setItem('pokedex','[]');
    } else {console.log('Többedik indítás');
    callToRenders(20);            
}

renderPokeDex();
levelUp();
print_lvlNr();
}

// Render ALL
firstRun();
