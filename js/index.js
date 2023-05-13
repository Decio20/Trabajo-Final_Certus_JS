// Creancion de Variables Globales
let arrayCatalogo = new Array();//defrente array vacio
let numPage;

// Leer parametros URL
let parametrosURL = new URLSearchParams(location.search);

// Comprobar pagina
if (parseInt(parametrosURL.get("page")) == 1 || parametrosURL.get("page") == null) {
    numPage = 1;
} else {
    numPage = parametrosURL.get("page") == 1;
}

// Solicitar datos al servidor
fetch("productos.json").then(respuesta => respuesta.json()).then(objeto => {
    // quiero que array sea igual a objeto 
    arrayCatalogo = objeto;
    // funcion para cargar catalogo
    cargarCatalogo(numPage);
})

// Definir cargar catalogo
function cargarCatalogo(pagina) {
    // Referencia de catalogo
    let filaCatalogo = document.querySelector("#catalogo");
    // Crear elementos
    let inicio = (pagina - 1) * 8 ;// formula para encontrar el inicio
    let final;
    let tmbfinal = pagina * 8;
    // condicional
    if (arrayCatalogo.length < tmbfinal) {
        final = arrayCatalogo.length;
    } else {
        final = tmbfinal;
    }
    for (let index = inicio; index <= final; index++) {
        // Procesando valores producto
        let nombre = arrayCatalogo[index].name;
        let nomImage = arrayCatalogo[index].image;
        // Proceso precios
        let precio = arrayCatalogo[index].price;
        let oferta = arrayCatalogo[index].offer * 100;
        let precioFinal = precio -(precio * oferta / 100);
        // Creo Articulo
        let nuevoElemento = document.createElement("article");
        nuevoElemento.setAttribute("class", 'class="col-xs-12 col-sm-6 col-md-4 col-xl-3"');
        nuevoElemento.innerHTML =
            `
        <picture>
        <img class="img-fluid" src="image/productos/${nomImage}" alt="${nombre}">
        </picture>
        <h4>${nombre}</h4>
        <p>
        <span class="precioOriginal">S/ ${precio}</span>
        <span class="precioDescuento">-${oferta}%</span> <br>
        <span class="precioFinal">S/ ${precioFinal}</span>
        </p>
        <button onclick="addCarrito(event)" class="btn btn-light">
        <i class="bi bi-plus-square"></i> 
        Agregar Carrito 
        </button>
        `;
        // Añadir el nuevo elemento al catalogo
        filaCatalogo.append(nuevoElemento);
    }
}
function addCarrito(event) {
    const button = event.target;
    const article = button.closest('article');
    const nombre = article.querySelector('h4').innerText;
    const precio = article.querySelector('.precioFinal').innerText;
    const imagenSrc = article.querySelector('img').getAttribute('src');

    const nuevoElemento = document.createElement('div');
    nuevoElemento.innerHTML = `
      <p>${nombre}</p>
      <img src="${imagenSrc}" alt="${nombre}">
      <p>${precio}</p>
    `;

    const carritoProductos = document.getElementById('carritoProductos');
    carritoProductos.appendChild(nuevoElemento);

    const carritoModal = new bootstrap.Modal(document.getElementById('carritoModal'));
    carritoModal.show();
  }
