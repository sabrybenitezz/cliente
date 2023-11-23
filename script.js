// Crea una nueva solicitud de API con XMLHttpRequest
let apiRequest = new XMLHttpRequest();

// Obtiene los elementos del DOM por su ID y guarda las referencias en variables
const metodoMenu = document.getElementById('metodoMenu');
let metodoHTTP = "GET"; // Establece el método HTTP por defecto como "GET"

const rutaCampo = document.getElementById('rutaCampo');
const cuerpoCampo = document.getElementById('cuerpoCampo');
const sendButton = document.getElementById('send');
const areaRespuesta = document.getElementById('areaRespuesta');

let ruta = ""; // Variable para almacenar la ruta de la solicitud
let cuerpo = ""; // Variable para almacenar el cuerpo de la solicitud

// Evento que se activa al cambiar la opción en el menú desplegable del método HTTP
metodoMenu.addEventListener('change', ($event) => {
  // Actualiza el método HTTP seleccionado
  metodoHTTP = $event.target.value;
  console.log("metodoHTTP: " + metodoHTTP); // Muestra el método HTTP seleccionado en la consola
});

// Evento que se activa al hacer clic en el botón "Send"
sendButton.addEventListener('click', () => {
  // Obtiene el valor de la ruta ingresada en el campo correspondiente
  ruta = rutaCampo.value;
  console.log("ruta: " + ruta); // Muestra la ruta en la consola

  // Abre la solicitud con el método HTTP y la ruta especificados
  apiRequest.open(metodoHTTP, ruta);

  // Verifica el tipo de método HTTP y envía la solicitud con los datos adecuados
  if (metodoHTTP === "POST" || metodoHTTP === "PATCH") {
    // Obtiene el valor del cuerpo de la solicitud
    cuerpo = cuerpoCampo.value;
    // Establece el encabezado de tipo de contenido para JSON
    apiRequest.setRequestHeader('Content-Type', 'application/json');
    apiRequest.send(cuerpo); // Envía la solicitud con el cuerpo de la solicitud
  } else {
    apiRequest.send(); // Envía la solicitud sin cuerpo (para métodos que no requieren datos)
  }
});

// Evento que se activa cuando cambia el estado de la solicitud
apiRequest.onreadystatechange = () => {
  if (apiRequest.readyState === 4) {
    // Parsea la respuesta de la API a JSON y la muestra en el área de respuesta
    const response = JSON.parse(apiRequest.response);
    const responseStr = JSON.stringify(response, undefined, 4);
    console.log(response); // Muestra la respuesta en la consola
    areaRespuesta.innerHTML = responseStr; // Muestra la respuesta formateada en el área designada
  }
};