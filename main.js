
//________________________________________________________________________
// DEJO ESTAS COMITAS ACA PORQUE NO SE COMO CARAJO HACERLAS EN EL TECLADO
//                          >     ``     <
//::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
'use strict'

const menu = [
  {
    id: 1,
    title: "Estanteria de pared",
    category: "estanteria",
    price: 15.99,
    img: "./images/item-1.jpg",
    desc: `Una estanteria para colgar cosas que se ven bien pero nunca vas a usar en tu vida`,
  },
  {
    id: 2,
    title: "Estanteria ostentosa para libros",
    category: "estanteria",
    price: 13.99,
    img: "./images/item-2.jpg",
    desc: `Una estanteria para guardar esos libros que tenes pero que nunca leiste y que solo estan ahi porque se ven bien`,
  },
  {
    id: 3,
    title: "Estanteria artistica",
    category: "estanteria",
    price: 6.99,
    img: "./images/item-3.jpg",
    desc: `Una estanteria para guardar cosas que nunca vas a usar porque se ve mejor vacia y asi se aprecia mas su belleza`,
  },
  {
    id: 4,
    title: "Estanteria tallada a mano",
    category: "estanteria",
    price: 20.99,
    img: "./images/item-4.jpg",
    desc: `Una estanteria tallada a mano donde se puede observar la calidad del trabajo superior de nuestros pequeños artesanos que dejaron sus manos es este proyecto`,
  },
  {
    id: 5,
    title: "Cajon para guardar calzoncillos",
    category: "cajon",
    price: 22.99,
    img: "./images/item-5.jpg",
    desc: `Un cajon lo suficientemente grande para guardar todos esos calzoncillos palometeados que tenes sucio...`,
  },
  {
    id: 6,
    title: "Vasito rustico para el cepillo de dientes",
    category: "utensillos",
    price: 18.99,
    img: "./images/item-6.jpg",
    desc: `Para guardar la pasta de dientes, el cepillo y todo lo demas que se te pueda ocurrir`,
  },
  {
    id: 7,
    title: "Perchero para guardar la gabardina",
    category: "perchero",
    price: 8.99,
    img: "./images/item-7.jpg",
    desc: `Un perchero para colocar el abrigo cuando llegas de casa en esos dias lluviosos o frios`,
  },
  {
    id: 8,
    title: "Mesa de trabajo",
    category: "mesas",
    price: 12.99,
    img: "./images/item-8.jpg",
    desc: `La mesa de trabajo de BrodArte para que puedas recrear las maravillas que hacemos en nuestro taller (por tiempo limitado)`,
  },
  {
    id: 9,
    title: "Estanteria para guardar revistas",
    category: "estanteria",
    price: 16.99,
    img: "./images/item-9.jpg",
    desc: `Una estanteria para guardar revistas...`,
  },
  {
    id: 10,
    title: "Perchero para abrigos rustico",
    category: "perchero",
    price: 16.99,
    img: "./images/item-10.jpg",
    desc: `Otro perchero solo que este se fija a la pared y esta pensado para los lugares con espacios reducidos`,
  },
  {
    id: 11,
    title: "Mesita para tomar te en el patio",
    category: "mesas",
    price: 16.99,
    img: "./images/item-11.jpg",
    desc: `Una mesita para tomar el te con les chiques en el patio, al aire libre`,
  },
  {
    id: 12,
    title: "Muñeco vudu del dios de la lluvia",
    category: "decoracion",
    price: 16.99,
    img: "./images/item-12.jpg",
    desc: `Pequeño muñeco vudu para decorar la morada con un toque pintoresco, llora sangre por las noches`,
  },
];

// Variables
const sectionCenter = document.querySelector('.section-center');
const container = document.querySelector('.btn-container');
const modalCenter = document.querySelector('.modal-center');

// Cargar items
window.addEventListener('DOMContentLoaded', ()=>{
  displayMenuItems(menu);
  displayMenuBtns();
  modalCenter.innerHTML = createModalWindows("#");
})


const modal = document.querySelector('.modal-contenedor');
const modalClose = document.querySelector('.btn-modal-close');

//Funcion para desplegar los items en la pagina----------------------------------
function displayMenuItems(menuItem){
let displayMenu = menuItem.map(function(item){
        return `<article class="single-item">
          <img class="img" src=${item.img} alt=${item.title} />
          <div class="item-info">
            <header class="item-header">
              <h4 class="btn-title">${item.title}</h4>
              <h4 class="price">$${item.price}</h4>
            </header>
            <p class="item-text">
              ${item.desc}
            </p>
          </div>
        </article>`;
    })
    displayMenu = displayMenu.join("");
    sectionCenter.innerHTML = displayMenu;

    //Variable de los titulos de los items para llamar la ventana modal
    const btnTitle = document.querySelectorAll('.btn-title');
    btnTitle.forEach(function(btn){
      btn.addEventListener('click',()=>{
        //Sacar el el atribotuo que refiere a donde esta la imagen
        const imgSrc = btn.parentElement.parentElement.parentElement.children[0].getAttribute("src");
        modalCenter.innerHTML = createModalWindows(imgSrc); //se crea la ventana modal dinamicamente con la referencia de la imagen
        const modal = document.querySelector('.modal-contenedor');
        const modalClose = document.querySelector('.btn-modal-close');
        modal.classList.add("show-modal-contenedor"); //Se muestra la ventana en pantalla
        //formas de cerrar la ventana modal
        modalClose.addEventListener('click',()=>{
            modal.classList.remove("show-modal-contenedor");
        })
        modal.addEventListener('click',(e)=>{
          if(e.target === modal){
            modal.classList.remove("show-modal-contenedor");
          }
        })
      })
    })
  }
  
//Funcion para desplegar los botones dinamicamente en la pagina------------------
function displayMenuBtns(){
  // Sacando las categorias del array de datos___________________________________
  const categories = menu.reduce(function(values,item){
    if(!values.includes(item.category)){
      values.push(item.category);
    }
    return values;
  },
  ['all']
  );
  
  // Agregando los botones de manera dinamica con las categorias unicas_________
  const categoryBtns = categories.map(function(category){
    return `<button class="filter-btn" type="button" data-id=${category}>
    ${category}
    </button>`
  }).join("");
  container.innerHTML = categoryBtns;
  
  // Seleccionando los botones, que se crearon en el paso anterior_____________
  const filterBtn = document.querySelectorAll('.filter-btn');
  
  // Haciendo que solo un boton quede seleccionado cuando se pulse y cambie de color (como me costo esto)
  container.addEventListener('click',function(e){
    const id = e.target.dataset.id;
    if(id){
      filterBtn.forEach(function(btn){
        btn.classList.remove("btn-active")
        e.target.classList.add("btn-active")
      })
    }
  })
  
  // Iterando sobre los botones para escuchar el click event___________________
  filterBtn.forEach(function(btn){
    btn.addEventListener('click', function(e){
      const category = e.currentTarget.dataset.id;
      const menuCategory = menu.filter(function(menuItem){ //Crea un array
        // Se filtran los resultados y se devuelven las categorias que matchean con la categoria del boton
        if (menuItem.category === category){
          return menuItem;
        }
      })
      if (category === "all"){ //Si la categoria all esta presente se muestran todos los items
        displayMenuItems(menu);
      } else { //Si no se muestra el array creado en el paso anterior "menuCategory"
        displayMenuItems(menuCategory);
      }
      // console.log(menuCategory); Se devuelve el array con las categorias del boton pulsado
    })
  })
}

//Funcion que crea la ventana modal de manera dinamica
function createModalWindows(img){
    return `<div class="modal-contenedor">
        <div class="modal-window">
          <header>
            <h4>Ventana Modal</h4>
          </header>
          <div class="main-modal">
            <img class="modal-img" src=${img} alt="modal windows img" />
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero
              provident recusandae repellat ad et doloremque ratione. Commodi
              minus asperiores vero.
            </p>
          </div>
          <div class="footer">
            <button class="btn-modal-close">Cerrar</button>
          </div>
        </div>
      </div>`;
}


//Funcionalidad pendiente------------------------------------------------------

// funcionalidades q me gustaria añadir
// // dejar un boton encendido (ECHO)----------------------------------------------------------
//Funcionalidad de la ventana Modal ---- Pendiente