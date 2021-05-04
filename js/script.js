const getPlayers = () => {
  let fetchPromise = fetch("http://127.0.0.1:8081/players")
  
  let responsePromise = fetchPromise.then((response) => {
    return response.json()
  })
  responsePromise.then((playersJson) => {
    listPlayers(playersJson)
  })  

}

const putPlayer = (player) => {
  
}

const postPlayer = () => {
  // antes de hacer cualquier cosa, validar que los 3 campos esten llenos. Si no lo estan, mostrar un error de la forma que se te cante la verga
  const inputName = document.getElementById('nombre');
  const inputLastName = document.getElementById('apellido');
  const inputPosicion = document.getElementById('posicion');
  if (inputName.value === '' || inputLastName.value === '' || inputPosicion.value === '') {
    return alert('Campo vacío');     
  }  
  // obtener los datos del formulario
  // acordate de convertir el String de posiciones a un Array. (googlear)
  let posiciones = inputPosicion.value.split(',');
  //console.log(arr);
  // armar un objeto nuevo con la info del jugador para enviarle al BE
  let newObject = {firstName: inputName.value, lastName: inputLastName.value, posiciones: posiciones}; 
  console.log(newObject);  
  
  // llamar a fetch (acordate de los parametros nuevos que vimos)
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

  
  // limpiar el formulario
  // manana juega boca
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
        //deletePlayer(playerJson);
        //newDiv.textContent = '';
      })  
    }
  })  
}

// const deletePlayer = () => { 
   
// }


const showPlayerInfo = (player) => {
  let divDataPlayer = document.getElementById('playerDetail')
  divDataPlayer.textContent = player.id + " " + player.firstName + " " + player.lastName + " " + player.posiciones;    
}


getPlayers() // traemos jugadores del BE


// Agregar nuevo boton DELETE para cada jugador
// El boton debe borrar al jugador en el evento onClick y debe refrescar la lista despues de borrar

//fetch('http://localhost:8081/players', {method: 'POST', body: JSON.stringify(player), headers: { 'Content-Type': 'application/json' }})