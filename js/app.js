// Variables

const carrito = document.querySelector('#carrito');

const contenedorCarrito = document.querySelector('#lista-carrito tbody');

const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');

const listaCursos = document.querySelector('#lista-cursos');

let articulosCarrito = [];

cargaEventListeners();

function cargaEventListeners(){
    // Cuando agregas un curso presionado "Agregar al Carrito"
    listaCursos.addEventListener('click', agregarCurso);

    //Elimina cursos del carrito
    carrito.addEventListener('click', eliminarCurso);

    vaciarCarritoBtn.addEventListener('click', () =>{
        articulosCarrito = [];
        limpiarHTML();
    })
}; 



//Funciones

//Agregar curso al carrito
function agregarCurso(e){
    e.preventDefault();
   if(e.target.classList.contains('agregar-carrito')){
    const cursoSeleccionado = e.target.parentElement.parentElement;

    leerDatosCurso(cursoSeleccionado);

   }
   
}

//Eliminar curso del carrito
function eliminarCurso(e){
   
    if(e.target.classList.contains('borrar-curso')){
        const cursoId = e.target.getAttribute('data-id');

        //Elimuna del arreflo de articulosCarritos por el data-id
        articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId);

        console.log(articulosCarrito);

        carritoHTML(); // Iterar sobre el carrito

    }

}


//Lee el contenido del HTML al que e dimos click y extrae la informacion del curso

function leerDatosCurso(curso){
    

 // Crear un objeto con el curso actual
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }


    //Revisa si un elemento ya existe en el carrito
    const existe = articulosCarrito.some(curso => curso.id === infoCurso.id);

    if(existe){
        //Actualizamos la cantidad
        const cursos = articulosCarrito.map( curso => {
            if(curso.id === infoCurso.id){
                curso.cantidad++;
                return curso; //retorna el objeto actualizado
            }else{
                return curso;//retorma los objetos que no estan duplicados
            }

        });
        articulosCarrito = [...cursos];
    }else{
        //Agregamos el curso al carrito
        articulosCarrito = [...articulosCarrito, infoCurso];
    }
  


    //Agregar elementos al arreglo de carrito

   


    carritoHTML();
}


//Muestra el carrito de compras en el HTML

function carritoHTML(){


    //Limpiar el HTML
    limpiarHTML();




    //Recorre el carrito
    articulosCarrito.forEach(curso =>{

        const { imagen, titulo, precio, cantidad, id} = curso;
        const row = document.createElement('tr');
        row.innerHTML =`
        <td><img src="${imagen}" width="100"></td>
        <td> ${titulo}</td>
        <td>${precio}</td>
        <td>${cantidad}</td>
        <td> <a href="#" class="borrar-curso" data-id="${id}"> X </a></td>
        `;

        //Agrega el HTML del carrito en el tbody
        contenedorCarrito.appendChild(row);
    } )
}


//Eliminar los cursos del tbody

function limpiarHTML(){


    while(contenedorCarrito.firstChild){
        contenedorCarrito.removeChild(contenedorCarrito.firstChild)
    }
}