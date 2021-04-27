let playerIdToEdit = null;

 const players = [

  { id: 1, firstName: "Facundo", lastName: "Ottalagano", posiciones: ["central", "volante", "delantero"] },

  { id: 2, firstName: "Federico", lastName: "Ottalagano", posiciones: ["volante", "delantero"] },

  { id: 3, firstName: "Rodrigo", lastName: "Alegre", posiciones: ["volante"] },  
]

const listPlayers = () => { 

  document.getElementById('playersList').innerHTML = "";

  players.forEach((player) => {
    let newDiv = document.createElement("div");
    let newInput = document.createElement("input");
    newInput.setAttribute('type', 'radio')
    newInput.setAttribute('value', player.id);
    newInput.setAttribute('name', 'playerId');
    let newSpan = document.createElement("span");
    newSpan.textContent = player.firstName + " " + player.lastName + " " + player.posiciones;    
    newSpan.setAttribute('style', 'color: rgb(153, 153, 144)');
    
    let currentDiv = document.getElementById("playersList");
    currentDiv.appendChild(newDiv);
    newDiv.appendChild(newInput);
    newDiv.appendChild(newSpan);
  })  
}

const addPlayer = () => {  
  let playerName = document.getElementById('nombre').value;  
  let playerLastName = document.getElementById('apellido').value;
  let playerPosition = document.getElementById('posicion').value;
  
  let playerId = players[players.length-1].id +1;   

  let newPlayer = {id: playerId, firstName: playerName, lastName: playerLastName, posiciones: playerPosition.split(",")};
  
  if (playerName.length > 0 && playerLastName.length > 0 && playerPosition.length > 0) {
    players.push(newPlayer);
  }
  

  listPlayers();
  document.getElementById("nombre").value = '';
  document.getElementById("apellido").value = '';
  document.getElementById("posicion").value = '';
}

const editPlayer = () => {
  // guardas datos del form en variables
  const nombreEditado = document.getElementById("nombre").value;
  const apellidoEditado = document.getElementById("apellido").value
  const posicionesEditadas = document.getElementById("posicion").value

  // buscas y guardas en una variable el objeto completo del jugador a editar
  const player = getPlayerData(playerIdToEdit);  
  
  // editas el objeto
  player.firstName = nombreEditado;
  player.lastName = apellidoEditado;
  player.posiciones = posicionesEditadas;
  
  // listas los jugadores de nuevo
  listPlayers();

  // limpiar form
  document.getElementById("nombre").value = '';
  document.getElementById("apellido").value = '';
  document.getElementById("posicion").value = '';
 
}


const deletePlayer = () => {  

  let radios = document.getElementsByName("playerId")
  radios.forEach((radio) => {
    if ( radio.checked ) {     
      id = parseInt(radio.value);        
    }
  }) 
  
  const idABorrar = id;
  const indexABorrar = players.findIndex((player) => {
  if (player.id === idABorrar){
    return true;    
  }
})  
  const confirmacion = confirm("Are you sure?");
  if (confirmacion === true) {
    players.splice(indexABorrar, 1);    
  }
  
  

  listPlayers(); 
}

const clearForm = () => {
  document.getElementById("nombre").value = '';
  document.getElementById("apellido").value = '';
  document.getElementById("posicion").value = '';
}

const updatePlayer = (id) => {

  let nombreEditado = document.getElementById("nombre").value;
  let apellidoEditado = document.getElementById("apellido").value
  let posicionesEditadas = document.getElementById("posicion").value
 
 players.forEach((player) => {
   if ( player.id === id ) {
     indiceJugador = player.firstName;
     player.firstName = nombreEditado;
     player.lastName = apellidoEditado;
     player.posiciones = posicionesEditadas;
   }   
 }) 
}
updatePlayer(playerIdToEdit);

const getPlayerData = (id) => {  
  let playerData = null; 
  players.forEach((player) => {
    if ( player.id === id ) {
      playerData = player;
    }
  })
  
  return playerData;
}

const editPlayerInForm = () => {
  let radios = document.getElementsByName("playerId");
  let id = null; // suele usarse para setear una variable inicial que no sabes su valor futuro. Dsp lo vemos mejor  

  radios.forEach((radio) => {
    if ( radio.checked ) {     
      id = parseInt(radio.value);        
    }
  })    
  
  const player = getPlayerData(id);

  playerIdToEdit = player.id;
  playerNameToEdit = player.firstName

  document.getElementById("nombre").value = player.firstName;
  document.getElementById("apellido").value = player.lastName;
  document.getElementById("posicion").value = player.posiciones;  
}

listPlayers();
