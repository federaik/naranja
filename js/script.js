let playerIdToEdit = null;

const getPlayers = () => {
  let fetchPromise = fetch("http://127.0.0.1:8081/players")  
  let responsePromise = fetchPromise.then((response) => {
    return response.json()
  })
  responsePromise.then((playersJson) => {
    listPlayers(playersJson)    
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
 ;
  // armar un objeto nuevo con la info del jugador para enviarle al BE
  let newObject = {firstName: inputName.value, lastName: inputLastName.value, posiciones: posiciones}; 
  console.log(newObject);  
  
  // llamar a fetch 
  let fetchPromise = fetch('http://localhost:8081/players', {method: 'POST', body: JSON.stringify(newObject), headers: { 'Content-Type': 'application/json' }})
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
    let newDiv = document.createElement("div");    
    let newSpan = document.createElement("span");
    newSpan.textContent = player.firstName + " " + player.lastName + " " + player.posiciones;    
    newSpan.setAttribute('style', 'color: rgb(153, 153, 144)');
    
    let newButton = document.createElement("button");
    newButton.textContent = 'View more';
    newSpan.appendChild(newButton);
    newButton.onclick = () => {
      let fetchPromise = fetch("http://localhost:8081/players/" + player.id)
      let responsePromise = fetchPromise.then((response) => {
        return response.json()
      })
      responsePromise.then((playerJson) => {
        showPlayerInfo(playerJson);
      })  
    }    
    let currentDiv = document.getElementById("playersList");
    currentDiv.appendChild(newDiv);    
    newDiv.appendChild(newSpan); 

    let deleteButton = document.createElement("button");
    deleteButton.textContent = 'Delete Player';
    newSpan.appendChild(deleteButton);
    deleteButton.onclick = () => {
      let fetchPromise = fetch("http://localhost:8081/players/" + player.id, {method: 'DELETE'})
      let responsePromise = fetchPromise.then((response) => {
        return response.json()
      })
      responsePromise.then((playerJson) => {
        getPlayers()        
      })  
    }

    let editPlayer = document.createElement('button');
    editPlayer.textContent = 'edit player';
    newSpan.appendChild(editPlayer);

    editPlayer.onclick = () => {      
    
      const nombre = document.getElementById('nombre');  
      const apellido = document.getElementById('apellido'); 
      const posicion = document.getElementById('posicion');     

      nombre.value = player.firstName;
      apellido.value = player.lastName;
      posicion.value = player.posiciones;    

      playerIdToEdit = player.id;            
    }    
  })  
}

const putPlayer = () => {

  const nombre = document.getElementById('nombre');  
  const apellido = document.getElementById('apellido'); 
  const posicion = document.getElementById('posicion');

  const playerObject = {firstName: nombre.value, lastName: apellido.value, posiciones: posicion.value.split(',')};
  console.log(playerObject)
  let fetchPromise = fetch('http://localhost:8081/players/' + playerIdToEdit, {method: 'PUT', body: JSON.stringify(playerObject), headers: { 'Content-Type': 'application/json' }});
  let responsePromise = fetchPromise.then((response) => {
    return response.json();
  })
  responsePromise.then((playerJson) => {
    getPlayers();    
  })           
}

const showPlayerInfo = (player) => {
  let divDataPlayer = document.getElementById('playerDetail')
  divDataPlayer.textContent = player.id + " " + player.firstName + " " + player.lastName + " " + player.posiciones;    
}

const clearForm = () => {
  document.getElementById('nombre').value = '';  
  document.getElementById('apellido').value = ''; 
  document.getElementById('posicion').value = '';
}


getPlayers() // traemos jugadores del BE


