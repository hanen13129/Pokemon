let pokemonRepository = (function () {

let pokemonList = [];
let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

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
    addListItem: addListItem,
     loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails
  };
}
)();
pokemonRepository.loadList().then(function () {
 pokemonRepository.getAll().forEach(function (pokemon) {
       pokemonRepository.addListItem(pokemon);
 });
});

 function loadList() {
    return fetch(apiUrl).then(function (response) {
        return response.json();
      }).then(function (json) {
        json.results.forEach(function (item) {
          let pokemon = {
            name: item.name,
            detailsUrl: item.url,
          };
          add(pokemon);
        });
      }) .catch(function (e) {
        console.error(e);
      });
  }

  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url).then(function (response) {
        return response.json();
      }).then(function (details) {
        item.imageUrl = details.sprites.front_default;
        item.height = details.height;
        item.types = details.types;
      }).catch(function (e) {
        console.error(e);
      });
  };
