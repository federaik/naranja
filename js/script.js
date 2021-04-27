const getPlayers = () => {
  let fetchPromise = fetch("http://127.0.0.1:3000/players")
  
  let responsePromise = fetchPromise.then((response) => {
    return response.json()
  })
  responsePromise.then((playersJson) => {
    listPlayers(playersJson)
  })  

}

const listPlayers = (players) => { 

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


getPlayers() // traemos jugadores del BE
