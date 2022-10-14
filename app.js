//arrays 
let arrayBuzonMensajes = [];
let arrayZonas = [];
let cambioFormulario = "";
let nombreZona = 0;
let nombreEspecie = 0;
let nombreAnimal = 0;
let nombreComent = 0;
let zonaValidadad = false;
//validar arrays
let enumValidar = {
    zonaValid: "false",
}
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
let botonEliminarData = document.getElementById('eliminarData');
botonEliminarData.addEventListener('click', eliminarData);
//funciones
function eliminarData() {
    arrayZonas = JSON.parse(localStorage.getItem('Zonas'))
    arrayZonas = []
    guardarZonas()
    location.reload()
}
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
        nombreComentario = nombreComentario.toLowerCase();
        contenidoComentario = contenidoComentario.toLowerCase();
        if (/^[ a-zA-ZñÑáéíóúÁÉÍÓÚ]+$/.test(nombreComentario) && /\S/.test(contenidoComentario) && nombreComentario.length >= 4 && contenidoComentario.length >= 4) {
            addComentario(nombreComentario, contenidoComentario)
            formularioMensaj.reset()
        }
        else {
            alert('!ERROR! revisa bien los campos a llenar')
        }
    }
    else if (cambioFormulario === enums.formZona) {
        let nombreZona = document.getElementById('inputNombreMenj').value;
        nombreZona = nombreZona.toLowerCase();
        if ((/^[ a-zA-ZñÑáéíóúÁÉÍÓÚ]+$/.test(nombreZona)) && nombreZona.length >= 4) {
            let id = newId()
            validarZona(nombreZona)
            if (zonaValidadad === false) {
                crearZonas(nombreZona, id)
                imprimirZonas()
                formularioMensaj.reset()
            }
            else {
                alert(`!ERROR! la zona ${nombreZona} ya existe`)
            }
        }
        else {
            alert('!ERROR! revisa bien los campos a llenar')
        }
    }
    else if (cambioFormulario === enums.formEspecie) {
        let nombreEspecie = document.getElementById('inputNombreMenj').value;
        nombreEspecie = nombreEspecie.toLowerCase();
        if ((/^[ a-zA-ZñÑáéíóúÁÉÍÓÚ]+$/.test(nombreEspecie)) && nombreEspecie.length >= 4) {
            validarEspecies(nombreEspecie)
            if (zonaValidadad === false) {
                agregarEspecies(nombreEspecie)
                formularioMensaj.reset()
            }
            else {
                alert(`!ERROR! la especie ${nombreEspecie} ya existe`)
            }
        }
        else {
            alert('!ERROR! revisa bien los campos a llenar')
        }
    }
    else if (cambioFormulario === enums.formAnimales) {
        let nombreAnimal = document.getElementById('inputNombreMenj').value;
        nombreAnimal = nombreAnimal.toLowerCase();
        if ((/^[ a-zA-ZñÑáéíóúÁÉÍÓÚ]+$/.test(nombreAnimal)) && nombreAnimal.length >= 4) {
            validarAnimales(nombreAnimal)
            if (zonaValidadad === false) {
                agregarAnimales(nombreAnimal)
                formularioMensaj.reset()
            }
            else {
                alert(`!ERROR! el nombre para el animal ${nombreAnimal} ya existe`);
            }
        }
        else {
            alert('!ERROR! revisa bien los campos a llenar')
        }
    }
    else if (cambioFormulario === enums.formRespuesta) {
        let nombreRespuesta = document.getElementById('inputNombreMenj').value;
        let contenidoRespuesta = document.getElementById('inputContenidoMenj').value;
        nombreRespuesta = nombreRespuesta.toLowerCase();
        contenidoRespuesta = contenidoRespuesta.toLowerCase();
        if (/^[ a-zA-ZñÑáéíóúÁÉÍÓÚ]+$/.test(nombreRespuesta) && /\S/.test(contenidoRespuesta) && nombreRespuesta.length >= 4 && contenidoRespuesta.length >= 4) {
            addRespuestaComent(nombreRespuesta, contenidoRespuesta)
            formularioMensaj.reset()
        }
        else {
            alert('!ERROR! revisa bien los campos a llenar')
        }
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
            botonVerEspecies.textContent = ">"
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
    let sectionBusqueda = document.getElementById('sectionBusqueda');
    sectionBusqueda.style = "display:none"
    cambioFormulario = enums.formZona;
    let sectionMensajes = document.getElementById('sectionMensajes');
    sectionMensajes.style = "display:none;"
    let sectionListEspecies = document.getElementById('sectionListEspecies')
    sectionListEspecies.style = "display:none"
    let sectionListAnimales = document.getElementById('sectionListAnimales')
    sectionListAnimales.style = "display:none"
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
    let sectionBusqueda = document.getElementById('sectionBusqueda');
    sectionBusqueda.style = "display:none"
    zonaValidadad = false;
    let sectionListEspecies = document.getElementById('sectionListEspecies')
    sectionListEspecies.style = "display:none;"
    let sectionListAnimales = document.getElementById('sectionListAnimales')
    sectionListAnimales.style = "display:none"
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
    let sectionBusqueda = document.getElementById('sectionBusqueda');
    sectionBusqueda.style = "display:none"
    let sectionComentario = document.getElementById('sectionMensajes');
    sectionComentario.style = "display:none;"
    let h3Title = document.createElement('h3');
    h3Title.className = "titulosAnimalesEspecies"
    h3Title.textContent = "Especies:"
    let sectionForm = document.getElementById('sectionForm')
    sectionForm.style = "display:none;"
    let sectionListAnimales = document.getElementById('sectionListAnimales')
    sectionListAnimales.style = "display:none"
    nombreZona = e.target.parentNode.childNodes[0].textContent;
    arrayZonas = JSON.parse(localStorage.getItem('Zonas'))
    //lamados id y creacion ul
    let sectionListEspecies = document.getElementById('sectionListEspecies')
    sectionListEspecies.style = "display:grid"
    sectionListEspecies.innerHTML = "";
    sectionListEspecies.insertAdjacentElement('afterbegin', h3Title)
    let ulEspecies = document.createElement('ul');
    ulEspecies.className = "dropdown-menu position-static d-grid gap-1 p-2 rounded-3 mx-0 shadow w-220px listEspecies"
    arrayZonas.forEach(element => {
        if (element.Zona === nombreZona) {
            if (element.especie === undefined) {
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
    })
}
//animales
function formAnimal(e) {
    zonaValidadad = false;
    cambioFormulario = enums.formAnimales;
    let sectionListAnimales = document.getElementById('sectionListAnimales')
    sectionListAnimales.style = "display:none"
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
            })
        }
    })
    guardarZonas()
}
function imprimirAnimales(e) {
    let sectionBusqueda = document.getElementById('sectionBusqueda');
    sectionBusqueda.style = "display:none"
    let h3Animales = document.createElement('h3');
    h3Animales.textContent = "Animales:"
    h3Animales.className = "titulosAnimalesEspecies"
    let sectionForm = document.getElementById('sectionForm')
    sectionForm.style = "display:none;"
    let sectionComentario = document.getElementById('sectionMensajes');
    sectionComentario.style = "display:none;"

    nombreEspecie = e.target.parentNode.childNodes[0].textContent;
    arrayZonas = JSON.parse(localStorage.getItem('Zonas'))
    //lamados id y creacion ul
    let sectionListAnimales = document.getElementById('sectionListAnimales')
    sectionListAnimales.style = "display:grid"
    sectionListAnimales.innerHTML = "";
    sectionListAnimales.insertAdjacentElement('afterbegin', h3Animales)
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
                })
            }
        }
    })
}
//comentarios
function addComentario(nombreComent, contenidoComent) {
    // hora y fecha
    const date = new Date();
    const [month, day, year] = [date.getMonth(), date.getDate(), date.getFullYear()];
    const [hour, minutes] = [date.getHours(), date.getMinutes()];
    
    let arrayComentarios = [];
    arrayZonas = JSON.parse(localStorage.getItem('Zonas'))
    arrayZonas.forEach(element => {
        if (element.Zona === nombreZona) {
            arrayEspecies = element.especie
            arrayEspecies.forEach(element => {
                if (element.especieName === nombreEspecie) {
                    if (element.animales === undefined) {
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
                                        hora: `fecha: ${month}-${day}-${year} hora: ${hour}:${minutes}`,
                                    }
                                    arrayComentarios.push(comentarioNew)
                                }
                                else {
                                    arrayComentarios = element.comentario;
                                    let comentarioNew = {
                                        nombreComentario: nombreComent,
                                        contenidoComentario: contenidoComent,
                                        hora: `fecha: ${month}-${day}-${year} hora: ${hour}:${minutes}`,
                                    }
                                    arrayComentarios.push(comentarioNew)
                                }
                            }
                        })
                    }

                }
            })

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
    let sectionBusqueda = document.getElementById('sectionBusqueda');
    sectionBusqueda.style = "display:none"
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
                    }
                    else {
                        let arrayAnimales = element.animales;
                        arrayAnimales.forEach(element => {
                            if (element.animalName === nombreAnimal) {
                                if (element.comentario === undefined) {
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
                                        let divRespuestas = document.createElement('div');
                                        let h3Respuestacoment = document.createElement('h3');
                                        let textHora = document.createElement('p');
                                        //insertar clases y ids
                                        divContainerMensaj.className = "text-bg-dark  divComentario"
                                        botonAddRespuesta.className = "btn btn-outline-light botonRespuesta";
                                        divBotones.className = "divBotonesComent"
                                        botonVerRespuesta.className = "btn  btn-outline-primary botonVerRespuestas"
                                        //eventos
                                        botonAddRespuesta.addEventListener('click', formRespuesta)
                                        botonVerRespuesta.addEventListener('click', (e) => {
                                            imprimirRespuestas(e, divRespuestas, divContainerMensaj, h3Respuestacoment)
                                        })
                                        //dar contenidos
                                        h2Mensaj.textContent = element.nombreComentario
                                        textoMensaj.textContent = element.contenidoComentario;
                                        botonAddRespuesta.textContent = "Responder"
                                        botonVerRespuesta.textContent = ">"
                                        textHora.textContent = element.hora
                                        //inserciones
                                        sectionComentario.insertAdjacentElement("beforeend", divContainerMensaj);
                                        divContainerMensaj.insertAdjacentElement('beforeend', h2Mensaj)
                                        divContainerMensaj.insertAdjacentElement('beforeend', textoMensaj)
                                        divContainerMensaj.insertAdjacentElement('beforeend', divBotones)
                                        divContainerMensaj.insertAdjacentElement('beforeend', textHora)
                                        divContainerMensaj.insertAdjacentElement('beforeend', h3Respuestacoment)

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
    let sectionForm = document.getElementById('sectionForm')
    sectionForm.style = "display:flex;"
}
function addRespuestaComent(nombre, contenido) {
    const date = new Date();
    const [month, day, year] = [date.getMonth(), date.getDate(), date.getFullYear()];
    const [hour, minutes] = [date.getHours(), date.getMinutes()];
    let now = new Date();
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
                                            hora: `fecha: ${month}-${day}-${year} hora: ${hour}:${minutes}`,
                                        }
                                        arrayRespuesta.push(respuestaNew)
                                    }
                                    else {
                                        arrayRespuesta = element.respuestas;
                                        let respuestaNew = {
                                            nombreRespuesta: nombre,
                                            contenidoRespuesta: contenido,
                                            hora: `fecha: ${month}-${day}-${year} hora: ${hour}:${minutes}`,
                                        }
                                        arrayRespuesta.push(respuestaNew)
                                    }
                                }
                            })
                        }
                    })
                }
            })
        }
    })
    guardarZonas()
}
function imprimirRespuestas(e, divRespContainer, divComent, h3Respuesta) {
    let sectionBusqueda = document.getElementById('sectionBusqueda');
    sectionBusqueda.style = "display:none"
    let sectionForm = document.getElementById('sectionForm')
    sectionForm.style = "display:none;"
    let nombreComentario = e.target.parentNode.parentNode.parentNode.childNodes[0].textContent;
    h3Respuesta.innerHTML = "";
    h3Respuesta.textContent = "Respuestas:"
    divRespContainer.innerHTML = ""
    arrayZonas = JSON.parse(localStorage.getItem('Zonas'))
    arrayZonas.forEach(element => {
        if (element.Zona === nombreZona) {
            arrayEspecies = element.especie
            arrayEspecies.forEach(element => {
                if (element.especieName === nombreEspecie) {
                    if (element.animales === undefined) {
                    }
                    else {
                        let arrayAnimales = element.animales;
                        arrayAnimales.forEach(element => {
                            let arrayComentarios = element.comentario
                            arrayComentarios.forEach(element => {
                                if (element.nombreComentario === nombreComentario) {
                                    if (element.respuestas === undefined) {
                                    }
                                    else {
                                        arrayRespuestas = element.respuestas;
                                        arrayRespuestas.forEach(element => {
                                            //crear
                                            let divRespuesta = document.createElement('div')
                                            let h2Respuesta = document.createElement('h2');
                                            let textContentResp = document.createElement('p');
                                            let textHora = document.createElement('p');
                                            //contenido
                                            h2Respuesta.textContent = element.nombreRespuesta
                                            textContentResp.textContent = element.contenidoRespuesta;
                                            //clases
                                            divRespContainer.className = "divRespuestaContainer"
                                            divRespuesta.className = "divRespuesta"
                                            textHora.textContent = `hora y fecha: ${element.hora}`
                                            //inserciones
                                            divComent.insertAdjacentElement('beforeend', divRespContainer);
                                            divRespContainer.insertAdjacentElement('beforeend', divRespuesta)
                                            divRespuesta.insertAdjacentElement('beforeend', h2Respuesta);
                                            divRespuesta.insertAdjacentElement('beforeend', textContentResp);
                                            divRespuesta.insertAdjacentElement('beforeend', textHora)
                                        })
                                    }
                                }
                            })
                        })
                    }
                }
            })
        }
    })
}
let validarArrays = [];
//funtion validar
function validarZona(nombreZona) {
    arrayZonas = JSON.parse(localStorage.getItem('Zonas'))
    if (arrayZonas === null) {
        arrayZonas = [];
    }
    else {
        arrayZonas.forEach(element => {
            validarArrays.push(element.Zona)
        })
        zonaValidadad = validarArrays.includes(nombreZona)
        console.log(zonaValidadad)
    }
}
function validarEspecies(nombreEspecie) {
    arrayZonas = JSON.parse(localStorage.getItem('Zonas'))
    arrayZonas.forEach(element => {
        let arrayEspecies = element.especie;
        if (arrayEspecies === undefined) {
            arrayEspecies = [];
        }
        else {
            arrayEspecies.forEach(element => {
                validarArrays.push(element.especieName)
            })
        }
    })
    zonaValidadad = validarArrays.includes(nombreEspecie)
    console.log(zonaValidadad)
}
function validarAnimales(nombreAnimal) {
    validarArrays = []
    arrayZonas = JSON.parse(localStorage.getItem('Zonas'));
    arrayZonas.forEach(element => {
        let arrayEspecies = element.especie;
        if (arrayEspecies === undefined) {
        } else {
            arrayEspecies.forEach(element => {
                if (element.animales === undefined) {
                }
                else {
                    let arrayAnimal = element.animales;
                    arrayAnimal.forEach(element => {
                        if (element.animalName === undefined) {
                        }
                        else {
                            validarArrays.push(element.animalName)
                        }
                    });
                }
            })
        }
    })
    zonaValidadad = validarArrays.includes(nombreAnimal)
    console.log(zonaValidadad)
}
// buscador
let arrayRecorridoBusq = [];
let errorValid = false;
let buscadorForm = document.getElementById('search')
buscadorForm.addEventListener('submit', (e) => {
    e.preventDefault()
    let datoBusqueda = document.getElementById('inputSearch').value;
    datoBusqueda = datoBusqueda.toLowerCase();
    if ((/^[ a-zA-ZñÑáéíóúÁÉÍÓÚ]+$/.test(datoBusqueda)) && datoBusqueda.length >= 4) {
        buscador(datoBusqueda)
        imprimirBusqueda(datoBusqueda)
        buscadorForm.reset()
    }
    else {
        alert('!ERROR! revisa bien los campos a llenar')
    }
})
function buscador(datoBusqueda) {
    arrayRecorridoBusq = [];
    //zonas
    let arrayZonas = JSON.parse(localStorage.getItem('Zonas'))
    arrayZonas.forEach(element => {
        if (element.Zona.includes(datoBusqueda)) {
            let recorrido = {
                zona: element.Zona,
            }
            arrayRecorridoBusq.push(recorrido);
            errorValid = true
        }
    })
    //especies
    arrayZonas.forEach(element => {
        let zona = element.Zona
        if (element.especie === undefined) {

        }
        else {
            let arrayEspecies = element.especie;
            arrayEspecies.forEach(element => {
                if (element.especieName.includes(datoBusqueda)) {
                    let recorrido = {
                        zona: zona,
                        especie: element.especieName,
                    }
                    arrayRecorridoBusq.push(recorrido);
                    errorValid = true
                }
            })
        }
    })
    //animales
    arrayZonas.forEach(element => {
        let zona = element.Zona
        if (element.especie === undefined) {

        }
        else {
            let arrayEspecies = element.especie;
            arrayEspecies.forEach(element => {
                if (element.animales === undefined) {

                }
                else {
                    let arrayAnimales = element.animales
                    let especie = element.especieName
                    arrayAnimales.forEach(element => {
                        if (element.animalName.includes(datoBusqueda)) {
                            let recorrido = {
                                zona: zona,
                                especie: especie,
                                animal: element.animalName,
                            }
                            arrayRecorridoBusq.push(recorrido);
                            errorValid = true
                        }
                    })
                }

            })
        }
    })
    //comentarios
    arrayZonas.forEach(element => {
        let zona = element.Zona
        if (element.especie === undefined) {

        }
        else {
            let arrayEspecies = element.especie;
            arrayEspecies.forEach(element => {
                if (element.animales === undefined) {

                }
                else {
                    let arrayAnimales = element.animales
                    let especie = element.especieName
                    arrayAnimales.forEach(element => {
                        if (element.comentario === undefined) {

                        }
                        else {
                            let animal = element.animalName
                            let arrayComentarios = element.comentario;
                            arrayComentarios.forEach(element => {
                                if (element.nombreComentario.includes(datoBusqueda) || element.contenidoComentario.includes(datoBusqueda)) {
                                    let recorrido = {
                                        zona: zona,
                                        especie: especie,
                                        animal: animal,
                                        nombreCome: element.nombreComentario,
                                        contenidoCome: element.contenidoComentario,
                                    }
                                    arrayRecorridoBusq.push(recorrido);
                                    errorValid = true
                                }
                            })
                        }
                    })
                }
            })
        }
    })
    //respuestas
    arrayZonas.forEach(element => {
        let zona = element.Zona
        if (element.especie === undefined) {

        }
        else {
            let arrayEspecies = element.especie;
            arrayEspecies.forEach(element => {
                if (element.animales === undefined) {

                }
                else {
                    let arrayAnimales = element.animales
                    let especie = element.especieName
                    arrayAnimales.forEach(element => {
                        if (element.comentario === undefined) {

                        }
                        else {
                            let animal = element.animalName
                            let arrayComentarios = element.comentario;
                            arrayComentarios.forEach(element => {

                                if (element.respuestas === undefined) {

                                }
                                else {
                                    let arrayRespuestas = element.respuestas;
                                    let nombreCome = element.nombreComentario;
                                    let contenidoCome = element.contenidoComentario;
                                    arrayRespuestas.forEach(element => {
                                        if (element.nombreRespuesta.includes(datoBusqueda) || element.contenidoRespuesta.includes(datoBusqueda)) {
                                            let recorrido = {
                                                zona: zona,
                                                especie: especie,
                                                animal: animal,
                                                nombreCome: nombreCome,
                                                contenidoCome: contenidoCome,
                                                nombreRespuesta: element.nombreRespuesta,
                                                contenidoRespuesta: element.contenidoRespuesta,
                                            }
                                            arrayRecorridoBusq.push(recorrido);
                                            errorValid = true
                                        }
                                    })
                                }
                            })
                        }
                    })
                }
            })
        }
    })
}
function imprimirBusqueda(datoBusqueda) {
    let sectionForm = document.getElementById('sectionForm')
    sectionForm.style = "display:none;"
    let sectionListAnimales = document.getElementById('sectionListAnimales')
    sectionListAnimales.style = "display:none"
    let sectionMensajes = document.getElementById('sectionMensajes');
    sectionMensajes.style = "display:none;"
    let sectionListEspecies = document.getElementById('sectionListEspecies')
    sectionListEspecies.style = "display:none"

    let sectionBusqueda = document.getElementById('sectionBusqueda');
    sectionBusqueda.style = "display:block"
    sectionBusqueda.innerHTML = ""
    arrayRecorridoBusq.forEach(element => {
        let nombreZona = document.createElement('p');
        let divZona = document.createElement('div')
        let divAnimal = document.createElement('div')
        let divEspecie = document.createElement('div')
        let divComentarios = document.createElement('div')
        let divRespuestas = document.createElement('div')

        let h2Zona = document.createElement('h2')
        let h2Especie = document.createElement('h2')
        let h2Animal = document.createElement('h2')
        let h2Comentario = document.createElement('h2')
        let h2Respuesta = document.createElement('h2')

        //nombres
        let nombreEspecie = document.createElement('p');
        let nombreAnimal = document.createElement('p');
        let contenidoComentario = document.createElement('p');
        let nombreComentario = document.createElement('p');
        let nombreRespuesta = document.createElement('p');
        let contenidoRespuesta = document.createElement('p');
        let divContainer = document.createElement('div')
        //clases contenedores
        divContainer.className = "lineaSeparadora"
        divZona.className = "zonaBusq"
        divEspecie.className = "especieBusq"
        divAnimal.className = "animalBusq"
        divComentarios.className = "comentarioBusq"
        divRespuestas.className = "respuestaBusq"
        //conteido 
        //h2
        h2Zona.textContent = "Zona"
        h2Especie.textContent = "Especie"
        h2Animal.textContent = "Animal"
        h2Comentario.textContent = "Comentario"
        h2Respuesta.textContent = "Respuesta"
        //
        nombreZona.textContent = element.zona
        nombreEspecie.textContent = element.especie
        nombreAnimal.textContent = element.animal
        contenidoComentario.textContent = element.contenidoCome
        nombreComentario.textContent = element.nombreCome;
        nombreRespuesta.textContent = element.nombreRespuesta
        contenidoRespuesta.textContent = element.contenidoRespuesta;
        //inserciones 
        sectionBusqueda.insertAdjacentElement('beforeend', divContainer)
        if (element.zona !== undefined) {
            divContainer.insertAdjacentElement('beforeend', divZona)
            divZona.insertAdjacentElement('beforeend', h2Zona)
            divZona.insertAdjacentElement('beforeend', nombreZona)
        }
        if (element.especie !== undefined) {
            divContainer.insertAdjacentElement('beforeend', divEspecie)
            divEspecie.insertAdjacentElement('beforeend', h2Especie)
            divEspecie.insertAdjacentElement('beforeend', nombreEspecie)
        }
        if (element.animal !== undefined) {
            divContainer.insertAdjacentElement('beforeend', divAnimal)
            divAnimal.insertAdjacentElement('beforeend', h2Animal)
            divAnimal.insertAdjacentElement('beforeend', nombreAnimal)
        }
        if (element.contenidoCome !== undefined || element.nombreCome) {
            divContainer.insertAdjacentElement('beforeend', divComentarios)
            divComentarios.insertAdjacentElement('beforeend', h2Comentario)
            divComentarios.insertAdjacentElement('beforeend', nombreComentario)
            divComentarios.insertAdjacentElement('beforeend', contenidoComentario)
        }
        if (element.nombreRespuesta !== undefined || element.contenidoRespuesta) {
            divContainer.insertAdjacentElement('beforeend', divRespuestas)
            divRespuestas.insertAdjacentElement('beforeend', h2Respuesta)
            divRespuestas.insertAdjacentElement('beforeend', nombreRespuesta)
            divRespuestas.insertAdjacentElement('beforeend', contenidoRespuesta)
        }
    })
    if (errorValid === false) {
        errorBusqueda(datoBusqueda)
    }

}
function errorBusqueda(dato) {
    debugger
    let sectionBusqueda = document.getElementById('sectionBusqueda');
    sectionBusqueda.innerHTML = "";
    sectionBusqueda.style = "display:block"
    let textoError = document.createElement('p')
    textoError.textContent = `!!ERROR!! no se encontro la palabra ${dato}`
    sectionBusqueda.insertAdjacentElement('beforeend', textoError)
}
document.addEventListener('DOMContentLoaded', imprimirZonas)                        