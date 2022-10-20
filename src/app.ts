
//interfaces
interface Zonas {
  zona: string,
  id: number,
}
interface Especie {
  especie: string,
  idZona: number,
  idEspecie: number;
}
interface Animales {
  animal: string,
  idEspecie: number,
  idAnimal: number,
}
interface Comentario {
  nombre: string,
  contenido: string,
  idAnimal: number,
  idComentario: number,
}
interface Respuesta {
  nombre: string,
  contenido: string,
  idcomentario: number,
}
//ids
let idZona: number;
let idEspecie: number;
let idAnimal: number;
let idComentario: number;
//arrays
let arrayZonas: (Zonas)[] = [];
let arrayEspecies: (Especie)[] = [];
let arrayAnimales: (Animales)[] = [];
let arraycomentarios: (Comentario)[] = [];
let arrayRespuestas: (Respuesta)[] = [];
// variable validaciones
let validarForm: string = "";

//enums fomrs
let enums = {
  formZona: "zona",
  formEspecies: "especies",
  formAnimales: "animales",
  formComentario: "comentarios",
  formRespuestas: "respuestas"
}

//eventos de botones
let btnCrearZonas = document.getElementById('crearZona') as HTMLButtonElement;
btnCrearZonas.addEventListener('click', (e: Event) => {
  validarForm = enums.formZona;
  formZonas()
})

//formulario
let formulario = document.getElementById('formulario') as HTMLFormElement;
formulario.addEventListener('submit', (e: Event) => {
  e.preventDefault();
  if (validarForm === enums.formZona) {
    let inputNombre = document.getElementById('inputNombre') as HTMLInputElement;
    let valueNombre = inputNombre.value;
    crearZona(valueNombre)
    imprimirZona()
    formulario.reset()
  }
  else if (validarForm === enums.formEspecies) {
    let inputNombre = document.getElementById('inputNombre') as HTMLInputElement;
    let valueNombre = inputNombre.value;
    addEspecie(valueNombre)
    formulario.reset()
  }
  else if (validarForm === enums.formAnimales) {
    let inputNombre = document.getElementById('inputNombre') as HTMLInputElement;
    let valueNombre = inputNombre.value;
    addAnimales(valueNombre);
    formulario.reset()
  }
  else if (validarForm === enums.formComentario) {
    let inputNombre = document.getElementById('inputNombre') as HTMLInputElement;
    let inputTextComent = document.getElementById('inputContenidoMenj') as HTMLInputElement;
    let valueTextComent = inputTextComent.value;
    let valueNombre = inputNombre.value;
    addComentarios(valueNombre, valueTextComent)

  }
  else if (validarForm === enums.formRespuestas) {
    let inputNombre = document.getElementById('inputNombre') as HTMLInputElement;
    let inputTextComent = document.getElementById('inputContenidoMenj') as HTMLInputElement;
    let valueTextComent = inputTextComent.value;
    let valueNombre = inputNombre.value;
    addRespuesta(valueNombre, valueTextComent)
  }
  else {
    console.log('log');
  }
})

//funciones
function newIdZona() {
  let lastId = localStorage.getItem("IdZonas") || "-1";
  let newLasId = JSON.parse(lastId) + 1;
  localStorage.setItem("IdZonas", JSON.stringify(newLasId));
  return newLasId;
}
function newIdEspecies() {
  let lastId = localStorage.getItem("IdEspecies") || "-1";
  let newLasId = JSON.parse(lastId) + 1;
  localStorage.setItem("IdEspecies", JSON.stringify(newLasId));
  return newLasId;
}
function newIdAnimal() {
  let lastId = localStorage.getItem("IdAnimales") || "-1";
  let newLasId = JSON.parse(lastId) + 1;
  localStorage.setItem("IdAnimales", JSON.stringify(newLasId));
  return newLasId;
}
function newIdComentarios() {
  let lastId = localStorage.getItem("IdComentarios") || "-1";
  let newLasId = JSON.parse(lastId) + 1;
  localStorage.setItem("IdComentarios", JSON.stringify(newLasId));
  return newLasId;
}
function guardarZona() {
  localStorage.setItem("Zonas", JSON.stringify(arrayZonas));
}
function guardarEspecies() {
  localStorage.setItem("Especies", JSON.stringify(arrayEspecies));
}
function guardarAnimales() {
  localStorage.setItem("Animales", JSON.stringify(arrayAnimales));
}
function guardarComentarios() {
  localStorage.setItem("Comentarios", JSON.stringify(arraycomentarios));
}
function guardarRespuestas() {
  localStorage.setItem("Respuestas", JSON.stringify(arrayRespuestas));
}
//ZONAS
function formZonas() {
  let form = document.getElementById('sectionForm') as HTMLElement;
  form.className = "displayFlex sectionForm"
  let divTextAreaForm = document.getElementById('divTextAreaForm') as HTMLDivElement;
  divTextAreaForm.className = "displayNone"
  let sectionListEspecies = document.getElementById('sectionListEspecies') as HTMLElement;
  sectionListEspecies.className = "displayNone"
  let sectionListAnimales = document.getElementById('sectionListAnimales') as HTMLElement;
  sectionListAnimales.className = "displayNone"
  let sectionComentario = document.getElementById('sectionMensajes') as HTMLElement;
  sectionComentario.className = "displayNone"
}
function crearZona(nombre: string) {
  if (localStorage.getItem('Zonas')) {
    arrayZonas = JSON.parse(localStorage.getItem('Zonas') || '')
    let zona: Zonas = {
      zona: nombre,
      id: newIdZona(),
    }
    arrayZonas.push(zona)
    guardarZona()
  }
  else {
    let zona: Zonas = {
      zona: nombre,
      id: newIdZona(),
    }
    arrayZonas.push(zona)
    guardarZona()
  }
}
function imprimirZona() {
  if (localStorage.getItem('Zonas')) {
    arrayZonas = JSON.parse(localStorage.getItem('Zonas') || '')
    let ulZonas = document.getElementById('ulZonas') as HTMLElement;
    ulZonas.innerHTML = "";
    arrayZonas.forEach(element => {
      let botonZona = document.createElement('button') as HTMLButtonElement;
      let botonVerEspecies = document.createElement('button') as HTMLButtonElement;
      let liZonas = document.createElement('li') as HTMLLIElement;
      //eventos
      botonZona.addEventListener('click', (e) => {
        formEspecies(element.id, element.zona)
      })
      botonVerEspecies.addEventListener('click', (e) => {
        imprimirEspecies(element.id)
      })
      //contenido
      botonZona.textContent = element.zona
      //dar clases
      botonVerEspecies.textContent = ">"
      botonVerEspecies.className = "btn btn-primary btonEspecie"
      botonZona.className = "btn btn-primary btonZona"
      ulZonas.insertAdjacentElement("beforeend", liZonas)
      liZonas.insertAdjacentElement('beforeend', botonZona)
      liZonas.insertAdjacentElement('beforeend', botonVerEspecies)
    })
  }
}
//Especies
function formEspecies(id: number, nombreZona: string) {
  let sectionComentario = document.getElementById('sectionMensajes') as HTMLElement;
  sectionComentario.className = "displayNone"
  idZona = id;
  validarForm = enums.formEspecies;
  let form = document.getElementById('sectionForm') as HTMLElement;
  let titleform = document.getElementById('h1Formulario') as HTMLTitleElement;
  titleform.textContent = `Ingrese el nombre de la espcie para ${nombreZona}`
  form.className = "displayFlex sectionForm"
  let divTextAreaForm = document.getElementById('divTextAreaForm') as HTMLDivElement;
  divTextAreaForm.className = "displayNone"
}
function addEspecie(nombre: string) {
  if (localStorage.getItem('Especies')) {
    arrayEspecies = JSON.parse(localStorage.getItem('Especies') || '')
    let especies: Especie = {
      especie: nombre,
      idZona: idZona,
      idEspecie: newIdEspecies(),
    }
    arrayEspecies.push(especies)
    guardarEspecies()
  }
  else {
    let especies: Especie = {
      especie: nombre,
      idZona: idZona,
      idEspecie: newIdEspecies(),
    }
    arrayEspecies.push(especies)
    guardarEspecies()
  }
}
function imprimirEspecies(identificador: number) {

  let sectionComentario = document.getElementById('sectionMensajes') as HTMLElement;
  sectionComentario.className = "displayNone"
  let form = document.getElementById('sectionForm') as HTMLElement;
  form.className = "displayNone"
  if (localStorage.getItem('Especies')) {
    arrayEspecies = JSON.parse(localStorage.getItem('Especies') || '')
    let h3Title = document.createElement('h3') as HTMLElement;
    h3Title.className = "titulosAnimalesEspecies"
    h3Title.textContent = "Especies:"
    let sectionListEspecies = document.getElementById('sectionListEspecies') as HTMLElement;
    sectionListEspecies.className = "displayGrid sectionListEspecies"
    sectionListEspecies.innerHTML = "";
    sectionListEspecies.insertAdjacentElement('afterbegin', h3Title)
    let ulEspecies = document.createElement('ul') as HTMLUListElement;
    ulEspecies.className = "dropdown-menu position-static d-grid gap-1 p-2 rounded-3 mx-0 shadow w-220px listEspecies"
    ulEspecies.innerHTML = ""
    let especieSelecionadad = arrayEspecies.filter(element => element.idZona === identificador)
    especieSelecionadad.forEach(element => {
      let li = document.createElement('li');
      let buttonEspecie = document.createElement('button') as HTMLButtonElement;
      let buttonAddAnimal = document.createElement('button') as HTMLButtonElement;
      let buttonVerAnimales = document.createElement('button') as HTMLButtonElement;
      //eventos
      buttonAddAnimal.addEventListener('click', (e) => {
        formAnimales(element.idEspecie, element.especie)
      })
      buttonVerAnimales.addEventListener('click', (e) => {
        imprimirAnimales(element.idEspecie)
      })
      //contenido
      buttonEspecie.textContent = element.especie;
      buttonAddAnimal.textContent = "+"
      buttonVerAnimales.textContent = ">"

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
//animales
function formAnimales(id: number, nombre: string) {
  let sectionComentario = document.getElementById('sectionMensajes') as HTMLElement;
  sectionComentario.className = "displayNone"
  idEspecie = id;
  validarForm = enums.formAnimales;
  let form = document.getElementById('sectionForm') as HTMLElement;
  form.className = "displayFlex sectionForm"
  let titleform = document.getElementById('h1Formulario') as HTMLTitleElement;
  titleform.textContent = `Ingrese el nombre de la espcie para ${nombre}`
  let divTextAreaForm = document.getElementById('divTextAreaForm') as HTMLDivElement;
  divTextAreaForm.className = "displayNone"
}
function addAnimales(nombre: string) {
  if (localStorage.getItem('Animales')) {
    arrayAnimales = JSON.parse(localStorage.getItem('Animales') || '')
    let animal: Animales = {
      animal: nombre,
      idEspecie: idEspecie,
      idAnimal: newIdAnimal(),
    }
    arrayAnimales.push(animal)
    guardarAnimales()
  }
  else {
    let animal: Animales = {
      animal: nombre,
      idEspecie: idEspecie,
      idAnimal: newIdAnimal()
    }
    arrayAnimales.push(animal)
    guardarAnimales()
  }
}
function imprimirAnimales(identificador: number) {
  let sectionComentario = document.getElementById('sectionMensajes') as HTMLElement;
  sectionComentario.className = "displayNone"
  let h3Animales = document.createElement('h3') as HTMLElement;
  h3Animales.textContent = "Animales:"
  h3Animales.className = "titulosAnimalesEspecies"
  let sectionForm = document.getElementById('sectionForm') as HTMLElement;
  sectionForm.className = "displayNone"
  let sectionListAnimales = document.getElementById('sectionListAnimales') as HTMLElement;
  sectionListAnimales.className = "displaygrid listaAnimales"
  sectionListAnimales.innerHTML = "";
  sectionListAnimales.insertAdjacentElement('beforeend', h3Animales)
  let ulAnimales = document.createElement('ul') as HTMLUListElement;
  ulAnimales.className = "dropdown-menu position-static d-grid gap-1 p-2 rounded-3 mx-0 shadow w-220px listEspecies"
  ulAnimales.innerHTML = "";
  if (localStorage.getItem('Animales')) {
    arrayAnimales = JSON.parse(localStorage.getItem('Animales') || '')
    let animalesSelecioandos = arrayAnimales.filter(element => element.idEspecie === identificador)
    animalesSelecioandos.forEach(element => {
      let li = document.createElement('li') as HTMLLIElement;
      let buttonAnimal = document.createElement('button') as HTMLButtonElement;
      let buttonAddComentario = document.createElement('button') as HTMLButtonElement;
      let buttonverComentario = document.createElement('button') as HTMLButtonElement;
      //eventos
      buttonAnimal.textContent = element.animal;
      buttonAddComentario.addEventListener('click', (e: Event) => {
        formComentarios(element.animal, element.idAnimal)
      })
      buttonverComentario.addEventListener('click', (e: Event) => {
        imprimirComentarios(element.idAnimal)
      })
      //contenido
      buttonAddComentario.textContent = "+"
      buttonverComentario.textContent = ">"

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
// comentarios Animales
function formComentarios(nombre: string, idAnim: number) {
  let sectionComentario = document.getElementById('sectionMensajes') as HTMLElement;
  sectionComentario.className = "displayNone"
  idAnimal = idAnim;
  validarForm = enums.formComentario;
  let form = document.getElementById('sectionForm') as HTMLElement;
  form.className = "displayFlex sectionForm"
  let titleform = document.getElementById('h1Formulario') as HTMLTitleElement;
  titleform.textContent = `Agrega un comentario para ${nombre}`
  let divTextAreaForm = document.getElementById('divTextAreaForm') as HTMLDivElement;
  divTextAreaForm.className = "displayFlex form-floating mb-3"
}
function addComentarios(nombre: string, contenido: string) {
  if (localStorage.getItem('Comentarios')) {
    arraycomentarios = JSON.parse(localStorage.getItem('Comentarios') || '')
    let comentario: Comentario = {
      nombre: nombre,
      contenido: contenido,
      idAnimal: idAnimal,
      idComentario: newIdComentarios(),

    }
    arraycomentarios.push(comentario)
    guardarComentarios()
  }
  else {
    let comentario: Comentario = {
      nombre: nombre,
      contenido: contenido,
      idAnimal: idAnimal,
      idComentario: newIdComentarios(),
    }
    arraycomentarios.push(comentario)
    guardarComentarios()
  }
}
function imprimirComentarios(identificador: number) {
  let form = document.getElementById('sectionForm') as HTMLElement;
  form.className = "displayNone"
  let sectionComentario = document.getElementById('sectionMensajes') as HTMLElement;
  sectionComentario.className = "displayBlock"
  sectionComentario.innerHTML = ""
  if (localStorage.getItem('Animales')) {
    arraycomentarios = JSON.parse(localStorage.getItem('Comentarios') || '')
    let arraycomentariosfiltrados = arraycomentarios.filter(element => element.idAnimal === identificador)
    arraycomentariosfiltrados.forEach(element => {
      let divContainerMensaj = document.createElement('div');
      let nombreComent = document.createElement('h2');
      let contenidoComent = document.createElement('p');
      let botonAddRespuesta = document.createElement('button');
      let divBotoDrop = document.createElement("div");
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
      botonAddRespuesta.addEventListener('click', (e: Event) => {
        formRespuestas(element.nombre, element.idComentario)
      })
      botonVerRespuesta.addEventListener('click', (e: Event) => {
        imprimirRespuestas(element.idComentario, divRespuestas, divContainerMensaj, h3Respuestacoment);
      })
      //dar contenidos
      botonAddRespuesta.textContent = "Responder"
      botonVerRespuesta.textContent = ">"
      nombreComent.textContent = element.nombre;
      contenidoComent.textContent = element.contenido;
      //inserciones
      sectionComentario.insertAdjacentElement("beforeend", divContainerMensaj);
      divContainerMensaj.insertAdjacentElement('beforeend', nombreComent)
      divContainerMensaj.insertAdjacentElement('beforeend', contenidoComent)
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
// respuestas
function formRespuestas(nombre: string, idcoment: number) {
  validarForm = enums.formRespuestas;
  idComentario = idcoment;
  let form = document.getElementById('sectionForm') as HTMLElement;
  form.className = "displayFlex sectionForm"
  let titleform = document.getElementById('h1Formulario') as HTMLTitleElement;
  titleform.textContent = `Agrega un respuesta para ${nombre}`
  let divTextAreaForm = document.getElementById('divTextAreaForm') as HTMLDivElement;
  divTextAreaForm.className = "displayFlex form-floating mb-3"
}
function addRespuesta(nombre: string, contenido: string) {
  if (localStorage.getItem('Respuestas')) {
    arrayRespuestas = JSON.parse(localStorage.getItem('Respuestas') || '')
    let respuestas: Respuesta = {
      nombre: nombre,
      contenido: contenido,
      idcomentario: idComentario,
    }
    arrayRespuestas.push(respuestas)
    guardarRespuestas()
  }
  else {
    let respuesta: Respuesta = {
      nombre: nombre,
      contenido: contenido,
      idcomentario: idComentario,
    }
    arrayRespuestas.push(respuesta)
    guardarRespuestas()
  }
}
function imprimirRespuestas(identificador: number, divRespContainer: HTMLElement, divComent: HTMLElement, h3Respuesta: HTMLElement) {
  h3Respuesta.innerHTML = "";
  h3Respuesta.textContent = "Respuestas:"
  divRespContainer.innerHTML = ""
  if (localStorage.getItem('Respuestas')) {
    arrayRespuestas = JSON.parse(localStorage.getItem('Respuestas') || '');
    let arrayRespuestasFilt = arrayRespuestas.filter(element => element.idcomentario === identificador)
    arrayRespuestasFilt.forEach(element => {
      let divRespuesta = document.createElement('div')
      let nombreRespuesta = document.createElement('h2');
      let textContentResp = document.createElement('p');
      let textHora = document.createElement('p');
      //contenido
      nombreRespuesta.textContent = element.nombre;
      textContentResp.textContent = element.contenido
      //clases
      divRespContainer.className = "divRespuestaContainer"
      divRespuesta.className = "divRespuesta"

      //inserciones
      divComent.insertAdjacentElement('beforeend', divRespContainer);
      divRespContainer.insertAdjacentElement('beforeend', divRespuesta)
      divRespuesta.insertAdjacentElement('beforeend', nombreRespuesta);
      divRespuesta.insertAdjacentElement('beforeend', textContentResp);
      divRespuesta.insertAdjacentElement('beforeend', textHora)
    })
  }
}
//buscador
let buscadorForm = document.getElementById('search') as HTMLFormElement;
buscadorForm.addEventListener('submit', (e: Event) => {
  e.preventDefault()
  let datoBusqueda = document.getElementById('inputSearch') as HTMLInputElement;
  let valuedato = datoBusqueda.value;
  let dato = valuedato.toLowerCase();
  if ((/^[ a-zA-ZñÑáéíóúÁÉÍÓÚ]+$/.test(dato)) && dato.length >= 4) {
    search(dato)
    buscadorForm.reset()
  }
  else {
    alert('!ERROR! revisa bien los campos a llenar')
  }
})
function search(dato: string) {
  let sectionBusqueda = document.getElementById('sectionBusqueda') as HTMLElement;
  sectionBusqueda.className = "displayBlock"
  sectionBusqueda.innerHTML = ""
  if (localStorage.getItem('Zonas')) {
    arrayZonas = JSON.parse(localStorage.getItem('Zonas') || '');
    arrayZonas.forEach(element => {
      if (element.zona.includes(dato)) {
        let h2Zona = document.createElement('h2')
        let nombreZona = document.createElement('p');
        let divZona = document.createElement('div')
        //contenido
        h2Zona.textContent = "Zona"
        nombreZona.textContent = element.zona
        //clases
        divZona.className = "zonaBusq"
        sectionBusqueda.insertAdjacentElement('beforeend', divZona);
        divZona.insertAdjacentElement('beforeend', h2Zona)
        divZona.insertAdjacentElement('beforeend', nombreZona)
      }
    })
  }
  if (localStorage.getItem('Especies')) {
    arrayEspecies = JSON.parse(localStorage.getItem('Especies') || '');
    arrayEspecies.forEach(element => {
      if (element.especie.includes(dato)) {
        let h2Especie = document.createElement('h2')
        let nombreEspecie = document.createElement('p');
        let divEspecie = document.createElement('div')
        //contenido
        h2Especie.textContent = "Especie"
        nombreEspecie.textContent = element.especie
        //clases
        divEspecie.className = "zonaBusq"
        let idZona = element.idZona
        //traer id zona
        arrayZonas = JSON.parse(localStorage.getItem('Zonas') || '');
        let zonaSelecionada = arrayZonas.filter(element => element.id === idZona)
        zonaSelecionada.forEach(element => {
          let h2Zona = document.createElement('h2')
          let nombreZona = document.createElement('p');
          let divZona = document.createElement('div')
          //contenido
          h2Zona.textContent = "Zona"
          nombreZona.textContent = element.zona
          //clases
          divZona.className = "zonaBusq"
          sectionBusqueda.insertAdjacentElement('beforeend', divZona);
          divZona.insertAdjacentElement('beforeend', h2Zona)
          divZona.insertAdjacentElement('beforeend', nombreZona)
        })
        sectionBusqueda.insertAdjacentElement('beforeend', divEspecie);
        divEspecie.insertAdjacentElement('beforeend', h2Especie)
        divEspecie.insertAdjacentElement('beforeend', nombreEspecie)
      }
    })
  }

  if (localStorage.getItem('Animales')) {
    arrayAnimales = JSON.parse(localStorage.getItem('Animales') || '');
    arrayAnimales.forEach(element => {
      if (element.animal.includes(dato)) {
        let h2Animal = document.createElement('h2')
        let nombreAnimal = document.createElement('p');
        let divAnimal = document.createElement('div')
        //contenido
        h2Animal.textContent = "Zona"
        nombreAnimal.textContent = element.animal
        //clases
        divAnimal.className = "zonaBusq"

        //id especie
        let identificador = element.idAnimal;
        arrayEspecies = JSON.parse(localStorage.getItem('Especies') || '');
        let especieSelecionadad = arrayEspecies.filter(element => element.idEspecie === identificador)
        especieSelecionadad.forEach(element => {
          let h2Especie = document.createElement('h2')
          let nombreEspecie = document.createElement('p');
          let divEspecie = document.createElement('div')
          //contenido
          h2Especie.textContent = "Especie"
          nombreEspecie.textContent = element.especie
          let idZona = element.idZona
          //
          arrayZonas = JSON.parse(localStorage.getItem('Zonas') || '');
          let zonaSelecionada = arrayZonas.filter(element => element.id === idZona)
          zonaSelecionada.forEach(element => {
            let h2Zona = document.createElement('h2')
            let nombreZona = document.createElement('p');
            let divZona = document.createElement('div')
            //contenido
            h2Zona.textContent = "Zona"
            nombreZona.textContent = element.zona
            //clases
            divZona.className = "zonaBusq"
            sectionBusqueda.insertAdjacentElement('beforeend', divZona);
            divZona.insertAdjacentElement('beforeend', h2Zona)
            divZona.insertAdjacentElement('beforeend', nombreZona)
          })
          sectionBusqueda.insertAdjacentElement('beforeend', divEspecie);
          divEspecie.insertAdjacentElement('beforeend', h2Especie)
          divEspecie.insertAdjacentElement('beforeend', nombreEspecie)
        })
        sectionBusqueda.insertAdjacentElement('beforeend', divAnimal);
        divAnimal.insertAdjacentElement('beforeend', h2Animal)
        divAnimal.insertAdjacentElement('beforeend', nombreAnimal)
      }
    })
  }

  if (localStorage.getItem('Comentarios')){
    arraycomentarios = JSON.parse(localStorage.getItem('Comentarios') || '');
    arraycomentarios.forEach(element=>{
      if (element.nombre.includes(dato) && element.contenido.includes(dato)){
        let divComentarios = document.createElement('div')
        let contenidoComentario = document.createElement('p');
        let nombreComentario = document.createElement('p');
        contenidoComentario.textContent = element.contenido;
        nombreComentario.textContent = element.nombre;
        let idcomenta//////
        arrayAnimales = JSON.parse(localStorage.getItem('Animales') || '');
        let animalesSelecioandos = arrayAnimales.filter(element => element.idAnimal === idZona)
        arrayAnimales.forEach(element=>{

        })
      }
    })
  }

}
document.addEventListener('DOMContentLoaded', imprimirZona)

