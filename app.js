/*
Listado de tareas basico donde se guardan en la memoria del navegador Local Storage. 
Al actualiza la pagina, lo cargado en la lista no se borra. Queda alojado en la memoria y es devuelto con una funcion. 

1) Se toman los datos de un input, y se crea un elemento en el listado de tareas, junto con el elemento X que servirá para eliminar la tarea. Se realiza una validacion mediante el if para que no ingrese una cadena vacia. Se carga mendiante una funcion al Local Storage y se actualiza el formulario. 
2) Se realiza la funcion de borrar tarea.
3) Se Realiza la funcion de agregar al local storage, previamente enviando a un arreglo. 
4) Luego se realiza la funcion para mostrar todo lo cargado en el LocalStorage. 
5) Y luego se realiza la funcion para eliminar la tarea del LocalStorage.
*/

/*-------------------------------------------------------------------------------------*/
// Variables
const listaTareas = document.getElementById('lista-tareas');


/*-------------------------------------------------------------------------------------*/
// Event Listeners
eventListeners();
function eventListeners() {
     document.querySelector('#formulario').addEventListener('submit', agregarTarea);
     listaTareas.addEventListener('click', borrarTarea);
     document.addEventListener('DOMContentLoaded', localStorageListo);
}


/*-------------------------------------------------------------------------------------*/
// Funciones
// Añadir la tarea del input
function agregarTarea(e) {
     e.preventDefault();
     const tarea = document.getElementById('tarea').value;
     if(tarea !=""){
     const botonBorrar = document.createElement('a');
     botonBorrar.classList = 'borrar-tarea';
     botonBorrar.innerText = 'X';
     const li = document.createElement('li');
     li.innerText = tarea;
     li.appendChild(botonBorrar);
     listaTareas.appendChild(li);
     updateTareaLocalStorage(tarea);
     document.querySelector("#formulario").reset();
     } else {
          alert("Debe ingresar una Tarea")
     }
}
/*-------------------------------------------------------------------------------------*/
// Elimina la tarea del DOM
function borrarTarea(e) {
     e.preventDefault();
     if(e.target.className === 'borrar-tarea') {
          e.target.parentElement.remove();
          deleteTareaLocalStorage(e.target.parentElement.innerText);
     } 
}
/*-------------------------------------------------------------------------------------*/
// Agrega la tarea a local storage
function updateTareaLocalStorage(tarea) {
     let tareas;
     tareas = leerdatosdelLocalStorage();
     tareas.push(tarea);
     // Convertir de string a arreglo para local storage
     localStorage.setItem('tareas', JSON.stringify(tareas) );
}

// Mostrar datos de LocalStorage en la lista
function localStorageListo() {
     let tareas;
     tareas = leerdatosdelLocalStorage();
     tareas.forEach((tarea) => {
          // crear boton de eliminar
          const botonBorrar = document.createElement('a');
          botonBorrar.classList = 'borrar-tarea';
          botonBorrar.innerText = 'X';
          // Crear elemento y añadirle el contenido a la lista
          const li = document.createElement('li');
          li.innerText = tarea;
          // añade el botón de borrar a la tarea
          li.appendChild(botonBorrar);
          // añade el la tarea a la lista
          listaTareas.appendChild(li);
     });
}

// Comprobar que haya elementos en localstorage, retorna un arreglo
function leerdatosdelLocalStorage() {
     let tareas;
     // Revisamos los valoes de local storage
     (localStorage.getItem('tareas') === null) 
          ? tareas = [] 
          : tareas = JSON.parse(localStorage.getItem('tareas'));
     return tareas;
}

// Eliminar la tarea de Local Storage
function deleteTareaLocalStorage(tarea) {
     let tareas, tareaBorrar;
     // Elimina la X de la tarea
     tareaBorrar = tarea.substring(0, tarea.length - 1);
     tareas = leerdatosdelLocalStorage();
     tareas.forEach((tarea, index) => {
          if(tareaBorrar === tarea) {
               tareas.splice(index, 1);
          }
     }) ;
     localStorage.setItem('tareas', JSON.stringify(tareas) );
}

