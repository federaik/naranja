const ENDPOINT_BASE_PATH = 'http://localhost:8081'

let playerIdToEdit = null;

const getPlayers = () => {
  let fetchPromise = fetch(`${ENDPOINT_BASE_PATH}/players`)  
  let responsePromise = fetchPromise.then((response) => {
    return response.json()
  })
  responsePromise.then((playersJson) => {
    listPlayers(playersJson)    
  })  
}

const getPlayerById = (id) => {
  let fetchPromise = fetch(`${ENDPOINT_BASE_PATH}/players/${id}`)
  let responsePromise = fetchPromise.then((response) => {
    return response.json()
  })
  responsePromise.then((playerJson) => {
    showPlayerInfo(playerJson);
  })  
}

const putPlayer = () => {

  // Codigo de referencia. Borrar mas adelante
  // const nombre = document.getElementById('nombre');  
  // const apellido = document.getElementById('apellido'); 
  // const posicion = document.getElementById('posicion');
  const formControls = getFormControls()

  const playerObject = {
    firstName: formControls.nombre.value, 
    lastName: formControls.apellido.value,
    posiciones: formControls.posicion.value.split(',')
  };    
  const fetchPromise = fetch(`${ENDPOINT_BASE_PATH}/players/${playerIdToEdit}`, {method: 'PUT', body: JSON.stringify(playerObject), headers: { 'Content-Type': 'application/json' }});
  const responsePromise = fetchPromise.then((response) => {
    return response.json();
  })
  responsePromise.then((playerJson) => {
    getPlayers();    
  })           
}

const deletePlayer = (id) => {
  const fetchPromise = fetch(`${ENDPOINT_BASE_PATH}/players/${id}`, {method: 'DELETE'})
  const responsePromise = fetchPromise.then((response) => {
    return response.json()
  })
  responsePromise.then((playerJson) => {
    getPlayers()        
  }) 
}

const postPlayer = () => {
  // antes de hacer cualquier cosa, validar que los 3 campos esten llenos. Si no lo estan, mostrar un error de la forma que se te cante la verga
  const inputName = document.getElementById('nombre');
  const inputLastName = document.getElementById('apellido');
  const inputPosicion = document.getElementById('posicion');
  if (inputName.value === '' || inputLastName.value === '' || inputPosicion.value === '') {
    return alert('Campletar campos vacíos');     
  }  
  // obtener los datos del formulario
  // acordate de convertir el String de posiciones a un Array. (googlear)
  let posiciones = inputPosicion.value.split(',');
 
  // armar un objeto nuevo con la info del jugador para enviarle al BE
  let newObject = {firstName: inputName.value, lastName: inputLastName.value, posiciones: posiciones};    
  
  // llamar a fetch 
  let fetchPromise = fetch(`${ENDPOINT_BASE_PATH}/players/`, {method: 'POST', body: JSON.stringify(newObject), headers: { 'Content-Type': 'application/json' }})
  let responsePromise = fetchPromise.then((response) => {
    return response.json()    
  })
  responsePromise.then((playerJson) => {
    // cuando el BE finalmente devuelva un resultado, volver a listar los players mostrando el nuevo que agregaste
    getPlayers()
  })

  inputName.value = '';
  inputLastName.value = '';
  inputPosicion.value = '';
 
}

const listPlayers = (players) => { 

  document.getElementById('playersList').innerHTML = "";

  players.forEach((player) => {
    const newDiv = document.createElement("div");    
    const newSpan = document.createElement("span");   
    newSpan.textContent = `${player.firstName} ${player.lastName} ${player.posiciones}`
    newSpan.setAttribute('style', 'color: rgb(153, 153, 144)');
    
    const viewMoreButton = document.createElement("button");
    viewMoreButton.textContent = 'View more';
    newSpan.appendChild(viewMoreButton);
    viewMoreButton.onclick = () => {
      getPlayerById(player.id)
    }
    const currentDiv = document.getElementById("playersList");
    currentDiv.appendChild(newDiv);    
    newDiv.appendChild(newSpan); 

    const deleteButton = document.createElement("button");
    deleteButton.textContent = 'Delete Player';
    newSpan.appendChild(deleteButton);
    deleteButton.onclick = () => {
      deletePlayer(player.id)
    }

    const editPlayerButton = document.createElement('button');
    editPlayerButton.textContent = 'edit player';
    newSpan.appendChild(editPlayerButton);

    editPlayerButton.onclick = () => {      
      populateFormWithPlayer(player)            
    }    
  })  
}

const populateFormWithPlayer = (player) => {
  const formControls = getFormControls();

  formControls.nombre.value = player.firstName;
  formControls.apellido.value = player.lastName;
  formControls.posicion.value = player.posiciones;    

  playerIdToEdit = player.id;
}

const getFormControls = () => {
  const nombre = document.getElementById('nombre');  
  const apellido = document.getElementById('apellido'); 
  const posicion = document.getElementById('posicion');

  return {
    nombre: nombre,
    apellido: apellido,
    posicion: posicion
  };
}

const showPlayerInfo = (player) => {
  const divDataPlayer = document.getElementById('playerDetail')  
  divDataPlayer.textContent = `${player.id} ${player.firstName} ${player.lastName} ${player.posiciones}`    
}

const clearForm = () => {
  document.getElementById('nombre').value = '';  
  document.getElementById('apellido').value = ''; 
  document.getElementById('posicion').value = '';
}


getPlayers() // traemos jugadores del BE


