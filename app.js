//arrays 
let arrayBuzonMensajes = [];
let arrayComentarios = [];
let arrayZonas = [];
let cambioFormulario = "";
let nombreZona = 0;
let nombreEspecie = 0;

let enums = {
    formComentario: "comentario",
    formZona: "zonas",
    formEspecie: "especie",
    formAnimales: "animales",
}
// funtion crear id
function newId() {
    let lastId = localStorage.getItem("Id") || "-1";
    let newLasId = JSON.parse(lastId) + 1;
    localStorage.setItem("Id", JSON.stringify(newLasId));
    return newLasId;
}

//formulario Mensaje
let formularioMensaj = document.getElementById('formulario');
formularioMensaj.addEventListener('submit', submitForm);

//boton Crear Zonas 
let botonCrearZonas = document.getElementById('crearZona');
botonCrearZonas.addEventListener('click', formularioZonas)

//funciones
function crearZonas(nombreZona, id) {
    let zonaAnimal = {
        Zona: nombreZona,
        Id: id,

    }
    arrayZonas.push(zonaAnimal)
    guardarZonas()
}
function submitForm(e) {
    e.preventDefault();
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

    else if (cambioFormulario === enums.formZona) {
        let nombreZona = document.getElementById('inputNombreMenj').value;
        let id = newId()
        crearZonas(nombreZona, id)
        formularioMensaj.reset()
        guardarZonas()
        imprimirZonas()

    }
    else if (cambioFormulario === enums.formEspecie) {
        let nombreEspecie = document.getElementById('inputNombreMenj').value;
        agregarEspecies(nombreEspecie)
        formularioMensaj.reset()
    }
    else if (cambioFormulario === enums.formAnimales) {
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
function crearComentario() {
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
function imprimirComentario() {
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
            botonZona.addEventListener('click', formEspecie)
            let liZonas = document.createElement('li');
            //dar clases 
            botonVerEspecies.textContent = "Esp"
            botonVerEspecies.className = "btn btn-primary btonEspecie"
            botonZona.className = "btn btn-primary btonZona"
            botonZona.textContent = element.Zona
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
    cambioFormulario = enums.formEspecie;
    nombreZona = e.target.parentNode.childNodes[0].textContent;
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
function agregarEspecies(nombreEspecie) {
    let arrayEspecies = [];

    arrayZonas = JSON.parse(localStorage.getItem('Zonas'))
    arrayZonas.forEach(element => {

        if (element.Zona === nombreZona) {
            if (element.especie === undefined) {
                idZona = element.Id;
                element.especie = arrayEspecies;
                let especieNew = {
                    especieName: nombreEspecie,
                    id: element.Id,
                }
                arrayEspecies.push(especieNew)
            }
            else {
                arrayEspecies = element.especie;
                let especieNew = {
                    especieName: nombreEspecie,
                    id: element.Id,
                }
                arrayEspecies.push(especieNew)
            }
        }
        else {
            true
        }
    })
    guardarZonas()
}
function imprimirEspecies(e) {
    let sectionForm = document.getElementById('sectionForm')
    sectionForm.style = "display:none;"
    nombreZona = e.target.parentNode.childNodes[0].textContent;
    arrayZonas = JSON.parse(localStorage.getItem('Zonas'))
    //lamados id y creacion ul
    let sectionListEspecies = document.getElementById('sectionListEspecies')
    sectionListEspecies.style = "display:grid"
    sectionListEspecies.innerHTML = "";
    let ulEspecies = document.createElement('ul');
    ulEspecies.className = "dropdown-menu position-static d-grid gap-1 p-2 rounded-3 mx-0 shadow w-220px listEspecies"
    arrayZonas.forEach(element => {
        if (element.Zona === nombreZona) {
            if (element.especie === undefined) {
                true
            }
            else {
                let arrayEspecies = [];
                arrayEspecies = element.especie;
                arrayEspecies.forEach(element => {
                    let li = document.createElement('li');
                    let buttonEspecie = document.createElement('button');
                    let buttonAddAnimal = document.createElement('button');
                    let buttonVerAnimales = document.createElement('button');
                    //eventos
                    buttonAddAnimal.addEventListener('click', formAnimal)
                    buttonVerAnimales.addEventListener('click',imprimirAnimales)
                    //contenido
                    buttonAddAnimal.textContent = "+"
                    buttonVerAnimales.textContent = ">"
                    buttonEspecie.textContent = element.especieName
                    // clases
                    buttonVerAnimales.className = "btn  btn-outline-primary botonVerAnimal";
                    buttonAddAnimal.className = "btn botonAnimalAdd";
                    buttonEspecie.className = "dropdown-item rounded-2";
                    li.className = " rounded-2 liEspecie";
                    // inserciones
                    sectionListEspecies.insertAdjacentElement('beforeend', ulEspecies);
                    ulEspecies.insertAdjacentElement('beforeend', li);
                    li.insertAdjacentElement('beforeend', buttonEspecie)
                    li.insertAdjacentElement('beforeend', buttonAddAnimal)
                    li.insertAdjacentElement('beforeend', buttonVerAnimales)
                })
            }
        }
        else {
            true
        }
    })
}
//animales
function formAnimal(e) {
    cambioFormulario = enums.formAnimales;
    let sectionListEspecies = document.getElementById('sectionListEspecies')
    sectionListEspecies.style = "display:none;"
    nombreEspecie = e.target.parentNode.childNodes[0].textContent;
    let sectionMensajes = document.getElementById('sectionMensajes');
    sectionMensajes.style = "display:none;"
    let h1Formulario = document.getElementById('h1Formulario')
    let textAreaForm = document.getElementById('inputContenidoMenj');
    let labelElevar = document.getElementById('labelElevar')

    //cambios del formulario
    h1Formulario.textContent = "Agrega el nombre del animal"
    textAreaForm.style = "display: none;"
    labelElevar.style = "display: none;"
    //aparecer form
    let sectionForm = document.getElementById('sectionForm')
    sectionForm.style = "display:flex;"

}
function agregarAnimales(nombreAnimal) {
    let arrayEspecies = [];
    let arrayAnimales = [];

    arrayZonas = JSON.parse(localStorage.getItem('Zonas'))
    arrayZonas.forEach(element => {
        if (element.Zona === nombreZona) {
            arrayEspecies = element.especie
            arrayEspecies.forEach(element => {
                if (element.especieName === nombreEspecie) {
                
                    if (element.animales === undefined) {
                        element.animales = arrayAnimales;
                        let animalNew = {
                            animalName: nombreAnimal,

                        }
                        arrayAnimales.push(animalNew)
                        console.log('entro if');

                    }
                    else {
                        arrayAnimales = element.animales;
                        let animalNew = {
                            animalName: nombreAnimal,

                        }
                        arrayAnimales.push(animalNew)
                        console.log('entro else');
                    }

                }
                else {
                    true
                }
            })
        }
        else {
            true
        }
    })
    guardarZonas()
}
function imprimirAnimales(e){
    let sectionForm = document.getElementById('sectionForm')
    sectionForm.style = "display:none;"
    nombreEspecie = e.target.parentNode.childNodes[0].textContent;
    arrayZonas = JSON.parse(localStorage.getItem('Zonas'))
    //lamados id y creacion ul
    let sectionListAnimales = document.getElementById('sectionListAnimales')
    sectionListAnimales.style = "display:grid"
    sectionListAnimales.innerHTML = "";
    let ulAnimales = document.createElement('ul');
    ulAnimales.className = "dropdown-menu position-static d-grid gap-1 p-2 rounded-3 mx-0 shadow w-220px listEspecies"
    arrayZonas.forEach(element => {
        if (element.Zona === nombreZona) {
            if (element.especie === undefined) {
                true
            }
            else {
                let arrayEspecies = [];
                arrayEspecies = element.especie;
                arrayEspecies.forEach(element => {
                    if(element.especieName === nombreEspecie){
                        if(element.animales === undefined){
                            false
                        }
                        else{
                            let arrayEspecies = element.animales;
                            arrayEspecies.forEach(element=>{
                                let li = document.createElement('li');
                                let buttonAnimal = document.createElement('button');
                                let buttonAddComentario = document.createElement('button');
                                let buttonverComentario = document.createElement('button');
                                //eventos
                                buttonAddComentario.addEventListener('click', crearComentario)
                                buttonverComentario.addEventListener('click',imprimirComentario)
                                //contenido
                                buttonAddComentario.textContent = "+"
                                buttonverComentario.textContent = ">"
                                buttonAnimal.textContent = element.animalName
                                // clases
                                buttonverComentario.className = "btn  btn-outline-primary botonVerAnimal";
                                buttonAddComentario.className = "btn botonAnimalAdd";
                                buttonAnimal.className = "dropdown-item rounded-2";
                                li.className = " rounded-2 liEspecie";
                                // inserciones
                                sectionListAnimales.insertAdjacentElement('beforeend', ulAnimales);
                                ulAnimales.insertAdjacentElement('beforeend', li);
                                li.insertAdjacentElement('beforeend', buttonAnimal)
                                li.insertAdjacentElement('beforeend', buttonAddComentario)
                                li.insertAdjacentElement('beforeend', buttonverComentario)
                            })
                        }
                      
                       
                    }
                    else{
                       true
                    }
                })
            }
        }
        else {
            true
        }
    }) 
}
//comentarios
function addComentarios(){

}
document.addEventListener('DOMContentLoaded', imprimirZonas)