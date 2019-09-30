const $app = document.getElementById("app");
const $observe = document.getElementById("observe");
const API = 'https://rickandmortyapi.com/api/character/'; //"https://us-central1-escuelajs-api.cloudfunctions.net/characters";

window.addEventListener("beforeunload", () => {
  
  localStorage.clear();
});


//unobserver
//onunload localstorage clear
//async await en arrow function

const sinDatos = () => {
  let divSinDatos = document.createElement("div");

  let newItem = document.createElement("section");
  newItem.classList.add("Items");
  newItem.innerHTML = "Llegaste al final de los datos.";
  $app.appendChild(newItem);
  
  debugger;
  intersectionObserver.unobserve($observe);

};

const  getData = async (api) => {
  await fetch(api)
    .then(response => response.json())
    .then(response => {
      // console.log(response);
      const characters = response.results;
      let output = characters
        .map(character => {
          return `
      <article class="Card">
        <img src="${character.image}" />
      <h2>${character.name}<span>${character.gender}</span></h2>
      </article>
    `;
        })
        .join("");
      let newItem = document.createElement("section");
      newItem.classList.add("Items");
      newItem.innerHTML = output;
      $app.appendChild(newItem);

      // if (response.info.next)
      localStorage.setItem("next_fetch", response.info.next);
    })
    .catch(error => console.log(error));
}

const loadData = api => {
  getData(api);
};

const intersectionObserver = new IntersectionObserver(
  entries => {
    if (entries[0].isIntersecting) {
      let next_fetch_api = localStorage.getItem("next_fetch");
      if (next_fetch_api == "") {
        sinDatos();
        return;
      }

      let api = next_fetch_api || API;
      // let next = next_fetch_api;
      loadData(api);
    }
  },
  {
    rootMargin: "0px 0px 100% 0px"
  }
);

intersectionObserver.observe($observe);
