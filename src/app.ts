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
  id: number,
}
//ids
let idZona: number;
let idEspecie: number;
//arrays
let arrayZonas: (Zonas)[] = [];
let arrayEspecies: (Especie)[] = [];
let arrayAnimales: (Animales)[] = [];

// variable validaciones
let validarForm: string = "";

//enums fomrs
let enums = {
  formZona: "zona",
  formEspecies: "especies",
  formAnimales: "animales",
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
function guardarZona() {
  localStorage.setItem("Zonas", JSON.stringify(arrayZonas));
}
function guardarEspecies() {
  localStorage.setItem("Especies", JSON.stringify(arrayEspecies));
}
function guardarAnimales() {
  localStorage.setItem("Animales", JSON.stringify(arrayAnimales));
}

//ZONAS
function formZonas() {
  let form = document.getElementById('sectionForm') as HTMLElement;
  form.className = "displayFlex sectionForm"
  let divTextAreaForm = document.getElementById('divTextAreaForm') as HTMLDivElement;
  divTextAreaForm.className = "displayNone"
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
        formAnimales(element.idZona, element.especie)
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
  idEspecie = id;
  validarForm = enums.formAnimales;
  let form = document.getElementById('sectionForm') as HTMLElement;
  let titleform = document.getElementById('h1Formulario') as HTMLTitleElement;
  titleform.textContent = `Ingrese el nombre de la espcie para ${nombre}`
  form.className = "displayFlex sectionForm"
  let divTextAreaForm = document.getElementById('divTextAreaForm') as HTMLDivElement;
  divTextAreaForm.className = "displayNone"
}
function addAnimales(nombre: string) {
  if (localStorage.getItem('Especies')) {
    arrayAnimales = JSON.parse(localStorage.getItem('Animales') || '')
    let animal: Animales = {
      animal: nombre,
      id: idEspecie,
    }
    arrayAnimales.push(animal)
    guardarAnimales()
  }
  else {
    let animal: Animales = {
      animal: nombre,
      id: idEspecie,
    }
    arrayAnimales.push(animal)
    guardarAnimales()
  }
}

document.addEventListener('DOMContentLoaded', imprimirZona)

