// De aca vas a sacar los endpoints para pegarle al Backend por si queres tener como referencia
// https://jsonplaceholder.typicode.com/


// OVERVIEW

/* 
  El fetch devuelve una Promise que debe ser resuelta en algun momento.
  Para resolver una Promise debemos usar el metodo .then() que ofrece el objeto Promise nativo de JS
  Guardamos la promise en una variable
*/
let fetchPromise = fetch('https://jsonplaceholder.typicode.com/posts')

/* 
  La variable internamente ahora tiene una Promise y vamos a resolverla.
  El metodo fetch devuelve una Promise que cuando sea resuelta con el .then(), vas a tener un objeto Response 
  el cual debe ser transforamdo en un json. Para eso usamos el metodo .json() que provee el objeto Promise nativo de JS.
  Luego ese json debe ser nuevamente devuelto: return response.json()
  Ese metodo .json() devuelte OTRA Promise que tambien DEBE SER RESUELTA
  Esa nueva promise la guardamos en una nueva variable
*/
let responsePromise = fetchPromise.then((response) => {
  return response.json()
})

// Finalmente resolvemos la promise que devolvio el response.json() y podemos obtener la info que le pedimos al backend
responsePromise.then((postsJson) => {
   console.log('Aca estan los posts', postsJson)
})



// Lista de endpoints para practicar
// method: GET

// traer comments: https://jsonplaceholder.typicode.com/comments
// traer albums: https://jsonplaceholder.typicode.com/albums
// traer fotos: https://jsonplaceholder.typicode.com/photos
// traer usuarios: https://jsonplaceholder.typicode.com/users

