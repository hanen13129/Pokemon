let pokemonList = [
  {name:'Bulbasaur', height:7,types:['grass', 'poison']},
  {name:'Metagross', height:5,types:['Steel','Psychic']},
  {name:'Scizor', height:5,types:['Steel', 'Bug']}
];
for(let i =0; i<=pokemonList.length; i++){
  let pokemonName = pokemonList[i].name;
  let pokemonHeight = pokemonList[i].height;
  let pokemonTypes = pokemonList[i].types;
  if (pokemonHeight>=7){
   document.write( '« '+ pokemonName+' (Height :'+pokemonHeight + ' )' + "-Wow that's big !" +' ». </p>' );
  }
  else
   {
   document.write( '« '+ pokemonName+' (Height :'+pokemonHeight + ' ) ».</p>');
   }

}