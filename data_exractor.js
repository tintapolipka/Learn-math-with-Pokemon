//https://bulbapedia.bulbagarden.net/wiki/List_of_Pok%C3%A9mon_by_National_Pok%C3%A9dex_number#Generation_I

const allPokeTableRows = document.querySelectorAll(
  'table[class="roundy"]  > tbody >tr[style="background:#FFF"]'
);

let allPokemonData = [];
//allPokeTableRows.forEach(callBack);

function listPokemonData(firstTrNr) {
  for (let i = firstTrNr; i < allPokeTableRows.length; i++) {
    callBack(allPokeTableRows[i]);
    if (allPokeTableRows[i].firstElementChild.rowSpan > 1) {
      i++;
    }
    console.log(i);
  }
}

function callBack(tablerow) {
  const nr = tablerow.firstElementChild ? tablerow.firstElementChild.innerText : '';
  const image = tablerow.children[1].firstElementChild.firstElementChild
    ? tablerow.children[1].firstElementChild.firstElementChild.src
    : null;
  const name = tablerow.children[1].firstElementChild &&
  tablerow.children[1].firstElementChild.firstElementChild
    ? tablerow.children[1].firstElementChild.firstElementChild.alt
    : null;
  let type;
  if (image && name) {
  if (tablerow.children[4]) {
    type = [tablerow.children[3].innerText, tablerow.children[4].innerText];
  } else {
    type = [tablerow.children[3].innerText];
  }
  console.log(nr, image, name, type);
  
    allPokemonData.push({ nr: nr, image: image, name: name, type: type });
  }
}

// Save first 19 (ezeket értem még csak el)
let pokeJSON = JSON.stringify(allPokemonData);
