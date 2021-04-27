// crear una funcion que se encargue de llamar al BE para traer info
// crear una funcion que se encarge de listar en el DOM todos lo sitems recibidos del BE. Esta funcion va a recibir por parametro la info del BE
// http://127.0.0.1:8080/exercises/list-be-data.html

const getUsers = () => {
  let fetchPromise = fetch("https://jsonplaceholder.typicode.com/users")
  let responsePromise = fetchPromise.then((response) => {
    return response.json()
  })
  responsePromise.then((usersJson) => {   
    listData(usersJson)
  })
}

const listData = (users) => {  

  // document.getElementById('usersList').innerHTML = "";
  let newUl = document.createElement("ul");
  let currentDiv = document.getElementById("usersList");
  currentDiv.appendChild(newUl)

  users.forEach((user) => {  
        
    let newLi = document.createElement("li");
    newLi.textContent = user.name + " " + user.username + " " + user.email;        
    newUl.appendChild(newLi)
    
    
    // currentDiv.appendChild();
    // newDiv.appendChild(newUl);
    // newDiv.appendChild(newLi);
  }) 
}

getUsers();


