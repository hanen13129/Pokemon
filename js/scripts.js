let pokemonRepository = (function () {

let pokemonList = [
  { name: 'Bulbasaur', height: 0.7, types: ['grass', 'poison'] },
  { name: 'Charizard', height: 1.7, types: ['fire', 'flying'] },
  { name: 'Squirtle', height: 1, types: ['water'] }
];

// adds button for each pokemon from the API

    function addListItem(pokemon) {
        let ul = document.querySelector('.pokemon-list');
        let liItem = document.createElement('li');

        let button = document.createElement('button');
        button.innerText = pokemon.name;
        button.classList.add('button-class');

        liItem.appendChild(button);
        ul.appendChild(liItem);

        button.addEventListener('click', function () {
            showDetails(pokemon)
        })
    }
   function showDetails(pokemon) {
        console.log(pokemon);
    }
   
function getAll() {
    return pokemonList;
  }

  function add(pokemon) {
    return pokemonList.push(pokemon);
  }

  return {
    getAll: getAll,
    add: add,
    addListItem: addListItem
  };
}
)();
 pokemonRepository.getAll().forEach(function (pokemon) {
       pokemonRepository.addListItem(pokemon);
 });

// pokemonRepository.getAll().forEach(function (pokemon) {
//   let pokemonName = pokemon.name;
//   let pokemonHeight = pokemon.height;

//   if (pokemonHeight >= 7) {
//     document.write(
//       '<p>' +
//         pokemonName +
//         ' ' +
//         '(Height: ' +
//         pokemonHeight +
//         ')' +
//         " - Wow that's big!" +
//         '</p>'
//     );
//     console.log(
//       pokemonName +
//         ' ' +
//         '(Height: ' +
//         pokemonHeight +
//         ')' +
//         " - Wow that's big!"
//     );
//   } else {
//     document.write(
//       '<p>' + pokemonName + ' ' + '(Height: ' + pokemonHeight + ')' + '</p>'
//     );
//     console.log(pokemonName + ' ' + '(Height: ' + pokemonHeight + ')');
//   }
// });
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






