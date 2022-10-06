//arrays 
let arrayBuzonMensajes = [];
let arrayComentarios = [];
let arrayZonas = [];
let cambioFormulario = "";
let nombreEspecie = 0;
let especieAnimal = 0;

let enums = {
    formComentario: "comentario",
    formZona: "zonas",
    formEspecie: "especie",
    formAnimales: "animales",
}
//formulario Mensaje
let formularioMensaj = document.getElementById('formulario');
formularioMensaj.addEventListener('submit', submitForm);

//boton buzon mensaje
let botonMensjes = document.getElementById('BuzonMensajes');
botonMensjes.addEventListener("click", imprimirMensajes)

//boton Crear Mensajes
let botonCrearMensaje = document.getElementById('CrearMensajes');
botonCrearMensaje.addEventListener('click', crearMensajes)

//boton Crear Zonas 
let botonCrearZonas = document.getElementById('crearZona');
botonCrearZonas.addEventListener('click', formularioZonas)

//funciones

function submitForm(e) {
    e.preventDefault;
    if (cambioFormulario === enums.formComentario) {
        let nombreMensaj = document.getElementById('inputNombreMenj').value;
        let contenidoMensaj = document.getElementById('inputContenidoMenj').value;
        //push array
        let comentarioNuevo = {
            nombre: nombreMensaj,
            contenido: contenidoMensaj,
        }
        arrayBuzonMensajes.push(comentarioNuevo)
        formularioMensaj.reset()
        guardarMensaje()
    }

    if (cambioFormulario === enums.formZona) {
        let nombreZona = document.getElementById('inputNombreMenj').value;
        let zonaAnimal = {
            nombreZona: nombreZona,
        }
        arrayZonas.push(zonaAnimal)
        formularioMensaj.reset()
        guardarZonas()
        imprimirZonas()

    }
    if (cambioFormulario === enums.formEspecie) {
        let nombreEspecie = document.getElementById('inputNombreMenj').value;
        agregarEspecie(nombreEspecie)
        formularioMensaj.reset()
    }
    if(cambioFormulario === enums.formAnimales){
        let nombreAnimal = document.getElementById('inputNombreMenj').value;
        agregarAnimales(nombreAnimal)
        formularioMensaj.reset()
    }

}
//comentarios
function guardarComentario() {
    localStorage.setItem("Comentarios", JSON.stringify(arrayComentarios))
}
function guardarMensaje() {
    localStorage.setItem("Mensajes", JSON.stringify(arrayBuzonMensajes))
}
function crearMensajes() {
    cambioFormulario = enums.formComentario
    let h1Formulario = document.getElementById('h1Formulario')
    let textAreaForm = document.getElementById('inputContenidoMenj');
    let labelElevar = document.getElementById('labelElevar')

    //cambios del formulario
    h1Formulario.textContent = "Agrega Tu Comentario"
    textAreaForm.style = "display: flex;"
    labelElevar.style = "display: flex;"

    let sectionMensajes = document.getElementById('sectionMensajes');
    sectionMensajes.style = "display: none"
    let sectionForm = document.getElementById('sectionForm')
    sectionForm.style = "display:flex;"
    //inputsFormMensajes
}
function imprimirMensajes() {
    let sectionForm = document.getElementById('sectionForm')
    sectionForm.style = "display:none;"
    arrayBuzonMensajes = JSON.parse(localStorage.getItem('Mensajes'))
    if (arrayBuzonMensajes === null) {
        arrayBuzonMensajes = [];
    }
    else {
        let sectionMensajes = document.getElementById('sectionMensajes');
        sectionMensajes.style = "display:flex;"
        sectionMensajes.innerHTML = ""
        arrayBuzonMensajes.forEach(element => {
            let divContainerMensaj = document.createElement('div');
            let h2Mensaj = document.createElement('h2');
            let textoMensaj = document.createElement('p');
            let botonMensaj = document.createElement('button')
            //insertar clases y ids
            divContainerMensaj.className = "text-bg-dark  divComentario"
            botonMensaj.className = "btn btn-outline-light"
            botonMensaj.setAttribute("id", "botonEliminarMensaj")
            botonMensaj.addEventListener('click', eliminarMensaje)
            //dar contenidos
            h2Mensaj.textContent = element.nombre
            textoMensaj.textContent = element.contenido
            botonMensaj.textContent = "Eliminar"
            //inserciones
            sectionMensajes.insertAdjacentElement("beforeend", divContainerMensaj);
            divContainerMensaj.insertAdjacentElement('beforeend', h2Mensaj)
            divContainerMensaj.insertAdjacentElement('beforeend', textoMensaj)
            divContainerMensaj.insertAdjacentElement('beforeend', botonMensaj)
        });

    }

}
function eliminarMensaje(e) {
    let identificador = e.target.parentNode.childNodes[0].textContent;
    e.target.parentNode.remove()
    let datosMensajes = JSON.parse(localStorage.getItem('Mensajes'))
    let newDatosMensajes = datosMensajes.filter(element => element.nombre !== identificador)
    localStorage.setItem("Mensajes", JSON.stringify(newDatosMensajes))

}
//zonas
function guardarZonas() {
    localStorage.setItem("Zonas", JSON.stringify(arrayZonas))
}
function imprimirZonas() {
    arrayZonas = JSON.parse(localStorage.getItem('Zonas'))
    if (arrayZonas === null) {
        arrayZonas = [];
    }
    else {
        let ulZonas = document.getElementById('ulZonas');
        ulZonas.innerHTML = ""
        arrayZonas.forEach(element => {
            let botonZona = document.createElement('button');
            let botonVerEspecies = document.createElement('button');
            botonVerEspecies.addEventListener('click', imprimirEspecies)
            let liZonas = document.createElement('li');
            //dar clases 

            botonVerEspecies.textContent = "Esp"
            botonVerEspecies.className = "btn btn-primary btonEspecie"
            botonZona.className = "btn btn-primary btonZona"
            botonZona.textContent = element.nombreZona
            botonZona.addEventListener("click", formEspecie)
            ulZonas.insertAdjacentElement("beforeend", liZonas)
            liZonas.insertAdjacentElement('beforeend', botonZona)
            liZonas.insertAdjacentElement('beforeend', botonVerEspecies)
        })
    }

}
function formularioZonas() {
    cambioFormulario = enums.formZona;
    let sectionMensajes = document.getElementById('sectionMensajes');
    sectionMensajes.style = "display:none;"
    let h1Formulario = document.getElementById('h1Formulario')
    let textAreaForm = document.getElementById('inputContenidoMenj');
    let labelElevar = document.getElementById('labelElevar')

    //cambios del formulario
    h1Formulario.textContent = "Agrega el nombre de la zona"
    textAreaForm.style = "display: none;"
    labelElevar.style = "display: none;"
    //aparecer form
    let sectionForm = document.getElementById('sectionForm')
    sectionForm.style = "display:flex;"
}
//especies
function formEspecie(e) {
    let sectionListEspecies = document.getElementById('sectionListEspecies')
    sectionListEspecies.style = "display:none;"
    nombreEspecie = e.target.textContent;
    cambioFormulario = enums.formEspecie;
    let sectionMensajes = document.getElementById('sectionMensajes');
    sectionMensajes.style = "display:none;"
    let h1Formulario = document.getElementById('h1Formulario')
    let textAreaForm = document.getElementById('inputContenidoMenj');
    let labelElevar = document.getElementById('labelElevar')

    //cambios del formulario
    h1Formulario.textContent = "Agrega el nombre de la Especie"
    textAreaForm.style = "display: none;"
    labelElevar.style = "display: none;"
    //aparecer form
    let sectionForm = document.getElementById('sectionForm')
    sectionForm.style = "display:flex;"

}
function agregarEspecie(especie) {
    arrayZonas = JSON.parse(localStorage.getItem('Zonas'))
    let arrayEspecies = [];
    let especieAnimal = {
        especieAnimal: especie,
    }

    arrayZonas.forEach(element => {
        if (element.nombreZona === nombreEspecie) {
            // element.especie = especieAnimal;
            if (element.especie === undefined) {
                element.especie = arrayEspecies;
                arrayEspecies.push(especieAnimal)
            }
            else {
                arrayEspecies = element.especie;
                arrayEspecies.push(especieAnimal)

            }
        }
        guardarZonas()
    })
}
function imprimirEspecies(e) {
    let sectionForm = document.getElementById('sectionForm')
    sectionForm.style = "display:none;"
    nombreEspecie = e.target.parentNode.childNodes[0].textContent;
    arrayZonas = JSON.parse(localStorage.getItem('Zonas'))
    let sectionListEspecies = document.getElementById('sectionListEspecies')
    sectionListEspecies.style = "display:grid"
    let ulEspecies = document.createElement('ul')
    ulEspecies.className = "dropdown-menu position-static d-grid gap-1 p-2 rounded-3 mx-0 shadow w-220px listEspecies"
    sectionListEspecies.innerHTML = ""
    arrayZonas.forEach(element => {
        if (element.nombreZona == nombreEspecie) {
            let especie = element.especie;
            especie.forEach(element => {
                let liEspecie = document.createElement('li')
                let buttonEspecie = document.createElement('button');
                let buttonAddAnimal = document.createElement('button');
                let buttonVerAnimales = document.createElement('button');
                //eventos
                buttonAddAnimal.addEventListener('click',formAnimal)    
                //dar contenido
                buttonAddAnimal.textContent = "+"
                buttonVerAnimales.textContent = ">"
                buttonEspecie.textContent = element.especieAnimal
                //dar clases
                buttonVerAnimales.className = "btn  btn-outline-primary botonVerAnimal";
                buttonAddAnimal.className = "btn botonAnimalAdd";
                buttonEspecie.className = "dropdown-item rounded-2";
                liEspecie.className = " rounded-2 liEspecie";
                //inserciones 
                sectionListEspecies.insertAdjacentElement('beforeend', ulEspecies);
                ulEspecies.insertAdjacentElement('beforeend', liEspecie);
                liEspecie.insertAdjacentElement('beforeend', buttonEspecie)
                liEspecie.insertAdjacentElement('beforeend',buttonAddAnimal)
                liEspecie.insertAdjacentElement('beforeend',buttonVerAnimales)
            
            })
        }
        else {

        }
    })
}
//animales
function formAnimal(e){
    cambioFormulario = enums.formAnimales;
    especieAnimal = e.target.parentNode.childNodes[0].textContent;
    let sectionMensajes = document.getElementById('sectionMensajes');
    sectionMensajes.style = "display:none;"
    let h1Formulario = document.getElementById('h1Formulario')
    let textAreaForm = document.getElementById('inputContenidoMenj');
    let labelElevar = document.getElementById('labelElevar')

    //cambios del formulario
    h1Formulario.textContent = "Agrega el nombre del Animal"
    textAreaForm.style = "display: none;"
    labelElevar.style = "display: none;"
    //aparecer form
    let sectionForm = document.getElementById('sectionForm')
    sectionForm.style = "display:flex;"
}
function agregarAnimales(nombreAnimal) {
    arrayZonas = JSON.parse(localStorage.getItem('Zonas'))
    let arrayAnimales = [];
    let animal = {
        animal: nombreAnimal,
    }
    arrayZonas.forEach(element => {
        if (element.nombreZona === nombreEspecie) {
            let arrayEspecies = element.especie;
            arrayEspecies.forEach(element => {
                if (element.especieAnimal === especieAnimal) {
                    if (element.animal === undefined){
                        element.animal = arrayAnimales;
                        arrayAnimales.push(animal)
                    }
                   else{
                    arrayAnimales = element.animal;
                    arrayAnimales.push(animal)
                   }
                }
                else {
                    console.log('no');
                }

            })
        }
    })
    guardarZonas()
}
document.addEventListener('DOMContentLoaded', imprimirZonas)