//arrays 
let arrayBuzonMensajes = [];
let arrayZonas = [];
let cambioFormulario = "";
let nombreZona = 0;
let nombreEspecie = 0;
let nombreAnimal = 0;
let nombreComent = 0;
let enums = {
    formComentario: "comentario",
    formZona: "zonas",
    formEspecie: "especie",
    formAnimales: "animales",
    formRespuesta: "respuesta"
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
        let nombreComentario = document.getElementById('inputNombreMenj').value;
        let contenidoComentario = document.getElementById('inputContenidoMenj').value;
        formularioMensaj.reset()
        addComentario(nombreComentario, contenidoComentario)

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
    else if (cambioFormulario === enums.formRespuesta) {
        let nombreComentario = document.getElementById('inputNombreMenj').value;
        let contenidoComentario = document.getElementById('inputContenidoMenj').value;
        addRespuestaComent(nombreComentario, contenidoComentario)
        formularioMensaj.reset()

    }


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
                    buttonVerAnimales.addEventListener('click', imprimirAnimales)
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


                    }
                    else {
                        arrayAnimales = element.animales;
                        let animalNew = {
                            animalName: nombreAnimal,

                        }
                        arrayAnimales.push(animalNew)

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
function imprimirAnimales(e) {
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
                    if (element.especieName === nombreEspecie) {
                        if (element.animales === undefined) {
                            false
                        }
                        else {
                            let arrayEspecies = element.animales;
                            arrayEspecies.forEach(element => {
                                let li = document.createElement('li');
                                let buttonAnimal = document.createElement('button');
                                let buttonAddComentario = document.createElement('button');
                                let buttonverComentario = document.createElement('button');
                                //eventos
                                buttonAddComentario.addEventListener('click', formComentarios)
                                buttonverComentario.addEventListener('click', imprimirComentario)
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
                    else {
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
function addComentario(nombreComent, contenidoComent) {
    let arrayComentarios = [];
    arrayZonas = JSON.parse(localStorage.getItem('Zonas'))
    arrayZonas.forEach(element => {
        if (element.Zona === nombreZona) {
            arrayEspecies = element.especie
            arrayEspecies.forEach(element => {
                if (element.especieName === nombreEspecie) {
                    if (element.animales === undefined) {
                        false
                    }
                    else {
                        let arrayAnimales = element.animales;
                        arrayAnimales.forEach(element => {
                            if (element.animalName === nombreAnimal) {
                                if (element.comentario === undefined) {
                                    element.comentario = arrayComentarios;
                                    let comentarioNew = {
                                        nombreComentario: nombreComent,
                                        contenidoComentario: contenidoComent,
                                    }
                                    arrayComentarios.push(comentarioNew)
                                }
                                else {
                                    arrayComentarios = element.comentario;
                                    let comentarioNew = {
                                        nombreComentario: nombreComent,
                                        contenidoComentario: contenidoComent,
                                    }
                                    arrayComentarios.push(comentarioNew)
                                }
                            }
                            else {
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
        else {
            true
        }
    })
    guardarZonas()
}
function formComentarios(e) {
    cambioFormulario = enums.formComentario
    nombreAnimal = e.target.parentNode.childNodes[0].textContent;
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
function imprimirComentario(e) {
    nombreAnimal = e.target.parentNode.childNodes[0].textContent;
    let sectionForm = document.getElementById('sectionForm')
    sectionForm.style = "display:none;"
    arrayZonas = JSON.parse(localStorage.getItem('Zonas'))
    let sectionComentario = document.getElementById('sectionMensajes');
    sectionComentario.style = "display:flex;"
    sectionComentario.innerHTML = ""
    arrayZonas.forEach(element => {
        if (element.Zona === nombreZona) {
            arrayEspecies = element.especie
            arrayEspecies.forEach(element => {
                if (element.especieName === nombreEspecie) {
                    if (element.animales === undefined) {
                        false
                    }
                    else {
                        let arrayAnimales = element.animales;
                        arrayAnimales.forEach(element => {
                            if (element.animalName === nombreAnimal) {
                                if (element.comentario === undefined) {
                                    true
                                }
                                else {
                                    arrayComentarios = element.comentario;
                                    arrayComentarios.forEach(element => {
                                        let divContainerMensaj = document.createElement('div');
                                        let h2Mensaj = document.createElement('h2');
                                        let textoMensaj = document.createElement('p');
                                        let botonEliminarComentario = document.createElement('button')
                                        let botonAddRespuesta = document.createElement('button')
                                        let divBotoDrop = document.createElement("div")
                                        let divBotones = document.createElement('div');
                                        let botonVerRespuesta = document.createElement('button');
                                   
                                        //insertar clases y ids
                                     
                                     
                                        divContainerMensaj.className = "text-bg-dark  divComentario"
                                        botonEliminarComentario.className = "btn btn-outline-light"
                                        botonAddRespuesta.className = "btn btn-outline-light botonRespuesta";
                                        divBotones.className = "divBotonesComent"
                                        botonVerRespuesta.className = "btn  btn-outline-primary botonVerRespuestas"
                                        //eventos
                                        botonEliminarComentario.addEventListener('click', eliminarComentario)
                                        botonAddRespuesta.addEventListener('click', formRespuesta)
                                        botonVerRespuesta.addEventListener('click', verRespuestas)
                                        //dar contenidos
                                        h2Mensaj.textContent = element.nombreComentario
                                        textoMensaj.textContent = element.contenidoComentario;
                                        botonEliminarComentario.textContent = "Eliminar"
                                        botonAddRespuesta.textContent = "Responder"
                                        botonVerRespuesta.textContent = ">"

                                        //inserciones
                                        sectionComentario.insertAdjacentElement("beforeend", divContainerMensaj);
                                        divContainerMensaj.insertAdjacentElement('beforeend', h2Mensaj)
                                        divContainerMensaj.insertAdjacentElement('beforeend', textoMensaj)
                                        divContainerMensaj.insertAdjacentElement('beforeend', divBotones)
                                        divBotones.insertAdjacentElement('beforeend', botonEliminarComentario)
                                        divBotones.insertAdjacentElement('beforeend', botonAddRespuesta)
                                        divBotones.insertAdjacentElement('beforeend', botonVerRespuesta)
                                        divBotones.insertAdjacentElement('beforeend', divBotoDrop)
                                        divBotoDrop.insertAdjacentElement('beforeend', botonAddRespuesta)
                                        divBotoDrop.insertAdjacentElement('beforeend', botonVerRespuesta)

                                    })
                                }
                            }

                        })
                    }

                }
            })

        }
    })
}
function eliminarComentario(e) {
    let identificador = e.target.parentNode.childNodes[0].textContent;
    e.target.parentNode.remove()
    let datosMensajes = JSON.parse(localStorage.getItem('Mensajes'))
    let newDatosMensajes = datosMensajes.filter(element => element.nombre !== identificador)
    localStorage.setItem("Mensajes", JSON.stringify(newDatosMensajes))
}
//respuestas
function formRespuesta(e) {
    nombreComent = e.target.parentNode.parentNode.parentNode.childNodes[0].textContent;
    cambioFormulario = enums.formRespuesta;
    let h1Formulario = document.getElementById('h1Formulario')
    let textAreaForm = document.getElementById('inputContenidoMenj');
    let labelElevar = document.getElementById('labelElevar')
    //cambios del formulario
    h1Formulario.textContent = "Agrega Tu respuesta"
    textAreaForm.style = "display: flex;"
    labelElevar.style = "display: flex;"
    let sectionMensajes = document.getElementById('sectionMensajes');
    sectionMensajes.style = "display: none"
    let sectionForm = document.getElementById('sectionForm')
    sectionForm.style = "display:flex;"
}
function addRespuestaComent(nombre, contenido) {
    arrayZonas = JSON.parse(localStorage.getItem('Zonas'))
    let arrayRespuesta = [];
    arrayZonas.forEach(element => {
        if (element.Zona === nombreZona) {
            arrayEspecies = element.especie
            arrayEspecies.forEach(element => {
                if (element.especieName === nombreEspecie) {
                    let arrayAnimales = element.animales;
                    arrayAnimales.forEach(element => {
                        if (element.animalName === nombreAnimal) {
                            let arrayComentarios = element.comentario
                            arrayComentarios.forEach(element => {
                                if (element.nombreComentario === nombreComent) {
                                    if (element.respuestas === undefined) {
                                        element.respuestas = arrayRespuesta;
                                        let respuestaNew = {
                                            nombreRespuesta: nombre,
                                            contenidoRespuesta: contenido,
                                        }
                                        arrayRespuesta.push(respuestaNew)
                                    }
                                    else {
                                        arrayRespuesta = element.respuestas;
                                        let respuestaNew = {
                                            nombreRespuesta: nombre,
                                            contenidoRespuesta: contenido,
                                        }
                                        arrayRespuesta.push(respuestaNew)
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
function verRespuestas(e) {

}
function imprimirRespuestas() {

}
document.addEventListener('DOMContentLoaded', imprimirZonas)