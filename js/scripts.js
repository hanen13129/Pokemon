let pokemonRepository = (function () {

let pokemonList = [
  { name: 'Bulbasaur', height: 7, types: ['grass', 'poison'] },
  { name: 'Metagross', height: 5, types: ['Steel', 'Psychic'] },
  { name: 'Scizor', height: 5, types: ['Steel', 'Bug'] }
];
function getAll() {
    return pokemonList;
  }

  function add(item) {
    return pokemonList.push(item);
  }

  return {
    getAll: getAll,
    add: add,
  };
})();

pokemonRepository.getAll().forEach(function (pokemon) {
  let pokemonName = pokemon.name;
  let pokemonHeight = pokemon.height;

  if (pokemonHeight >= 7) {
    document.write(
      '<p>' +
        pokemonName +
        ' ' +
        '(Height: ' +
        pokemonHeight +
        ')' +
        " - Wow that's big!" +
        '</p>'
    );
    console.log(
      pokemonName +
        ' ' +
        '(Height: ' +
        pokemonHeight +
        ')' +
        " - Wow that's big!"
    );
  } else {
    document.write(
      '<p>' + pokemonName + ' ' + '(Height: ' + pokemonHeight + ')' + '</p>'
    );
    console.log(pokemonName + ' ' + '(Height: ' + pokemonHeight + ')');
  }
});
// for (let i = 0; i < pokemonList.length; i++) {
//   let pokemonName = pokemonList[i].name;
//   let pokemonHeight = pokemonList[i].height;
//   let pokemonTypes = pokemonList[i].types;
//   if (pokemonHeight >= 7) {
//     document.write('« ' + pokemonName + ' (Height :' + pokemonHeight + ' )' + "-Wow that's big !" + ' ». </p>');
//   }
//   else {
//     document.write('« ' + pokemonName + ' (Height :' + pokemonHeight + ' ) ».</p>');
//   }

// }


