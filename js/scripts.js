//wrapping pokemonList inside pokemonRepository to avoid global state (IIFE)
let pokemonRepository = (function () {
//The Pokemon collection
let pokemonList = [];
let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
let modalContainer= document.querySelector('#modal-container');
//add a single pokemon to the pokemonList
   function add(pokemon) {
     //make sure the new pokemon has these properties
    if (
      typeof pokemon === "object" &&
      "name" in pokemon
    ) {
      pokemonList.push(pokemon);
    } else {
      console.log("pokemon is not correct");
    }
  }
  //return all pokemon from pokemonList
    function getAll() {
    return pokemonList;
  }
  function addListItem(pokemon) {
    //selecting the unordered list
    let pokemonList = document.querySelector(".pokemon-list");
      //creating bullet list
    let listpokemon = document.createElement("li");
    let button = document.createElement("button");
      //write the pokemon's name on the button
    button.innerText = pokemon.name;
    button.classList.add("button-class");
    //append the button on the bullet list
    listpokemon.appendChild(button);
    pokemonList.appendChild(listpokemon);
    button.addEventListener("click", function(event) {
      showDetails(pokemon);
    });
  }
  //load the list of Pokémon
  function loadList() {
    showLoadingImage();
    return fetch(apiUrl).then(function (response) {
      return response.json();// returns promise
    }).then(function (json) {
      hideLoadingImage();
      json.results.forEach(function (item) {
         //get pokemon's name and details url when resolved
        let pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        add(pokemon);
        console.log(pokemon);
      });
    }).catch(function (e) {
       hideLoadingImage();
      console.error(e);
    })
  }
//activating the loading image
    function showLoadingImage() {
        let loading = document.querySelector('#loading');
        window.addEventListener('load',function(){
            loading.style.visibility = 'visible';
        });
    }

    //turn the vibility of loading image back to hidden, add 0.5s before hidden
    function hideLoadingImage() {
        let loading = document.querySelector('#loading');
        setTimeout(function(){
            loading.style.visibility = 'hidden';
        }, 100);

    }

  function loadDetails(item) {
    showLoadingImage();
    let url = item.detailsUrl;
    return fetch(url).then(function (response) {
       hideLoadingImage();
      return response.json();
    }).then(function (details) {
      // Now we add the details to the item
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.types = details.types;
      item.weight = details.weight;
      item.ability = details.abilities;
    }).catch(function (e) {
        hideLoadingImage();
      console.error(e);
    });
  }

//showing the information of the selected pokemon on console log
function showDetails(item) {
    pokemonRepository.loadDetails(item).then(function () {
       showModal(pokemon);
    });
  }

  //showing modal
    function showModal(pokemon) {
        // let modalContainer= document.querySelector('#modal-container');

        //clear all existing modal content
        modalContainer.innerHTML = '';

        //creating the modal
        let modal = document.createElement('div');
        modal.classList.add('modal');

        //add the new modal content
        let closeButtonElement = document.createElement('button');
        closeButtonElement.classList.add('modal-close');
        closeButtonElement.innerText = 'Close';
        //close modal when 'Close' button is clicked
        closeButtonElement.addEventListener('click', hideModal);

        //assigned for Modal title
        let titleElement = document.createElement('h1');
        titleElement.innerText = pokemon.name;

        //assigned for Modal text
        let contentElement = document.createElement('p');
        let pokeHeight = pokemon.height / 10; //meters
        let pokeWeight = pokemon.weight / 10; //kg
        let pokeTypes = [];
        let pokeAbilities = [];
        
        Object.keys(pokemon.type).forEach(key => {//add pokemon type to pokeTypes
            pokeTypes.push(pokemon.type[key].type.name); 
        });

        Object.keys(pokemon.ability).forEach(key => {//add pokemon ability to pokeAbilities
            pokeAbilities.push(pokemon.ability[key].ability.name); 
        });

        //write the details of selected pokemon onto the modal
        contentElement.innerText = 'Height: ' + pokeHeight + ' m '+ '\r\n' 
                                    + 'Weight: ' + pokeWeight + ' kg '+ '\r\n' 
                                    + 'Types: ' + pokeTypes + '\r\n'
                                    + 'Abilities: ' + pokeAbilities;

        //adding pokemon front image
        let imageElement = document.createElement('img');
        imageElement.setAttribute('src', pokemon.imageUrl);
        imageElement.setAttribute('alt','Front view of' + pokemon.name);

        modal.appendChild(closeButtonElement);
        modal.appendChild(imageElement);
        modal.appendChild(titleElement);
        modal.appendChild(contentElement);
        modalContainer.appendChild(modal);

        //showing the modal
        modalContainer.classList.add('is-visible');
    }

    let dialogPromiseReject;

    //hiding modal
    function hideModal() {
        modalContainer.classList.remove('is-visible');

        if (dialogPromiseReject) {
            dialogPromiseReject();
            dialogPromiseReject = null;
        }
    }

    //hiding modal when 'Esc' button is pressed down
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modalContainer.classList. contains('is-visible')) {
            hideModal();
        } 
    });

    //hiding modal when modal container is clicked
    modalContainer.addEventListener('click', (e) => {
        let target = e.target;
        if (target === modalContainer) {
            hideModal();
        }
    });

  return {
    getAll: getAll,
    add: add,
    addListItem: addListItem,
     loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails,
    showLoadingImage: showLoadingImage,
    hideLoadingImage: hideLoadingImage,
    showModal: showModal,
    hideModal:hideModal 
  };
}
)();


//writing the content from pokemonRepository using forEach() function
  pokemonRepository.loadList().then(function () {
 pokemonRepository.getAll().forEach(function (pokemon) {
       pokemonRepository.addListItem(pokemon);
 });
});

