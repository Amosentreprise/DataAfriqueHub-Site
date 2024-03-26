const hanberger = document.getElementById("hamberger");
const menu = document.getElementById("menu")
const containner = document.getElementById("menu-container")







// const navBar = document.getElementById("nav-bar");

// // Sélectionnez la hauteur du header et du hero
// const headerHeight = document.querySelector("header").offsetHeight;
// const heroHeight = document.querySelector(".accueil-hero").offsetHeight;

// window.addEventListener("scroll", () => {
//     // Obtenez la position actuelle de défilement
//     const scrollPosition = window.scrollY;
  
//     // Vérifiez si la position de défilement est après le header et le hero
//     if (scrollPosition > headerHeight + heroHeight) {
//       // Si c'est le cas, ajoutez une classe pour fixer la barre de navigation
//       navBar.classList.add("fixedElment");
//       document.querySelector("header").classList.add("header")
      
//     } else {
//       // Sinon, retirez la classe fixe
//       navBar.classList.remove("fixedElment");
//       document.querySelector("header").classList.remove("header")
//     }
//   });

//gerer l'affichage de menu et bloquer le diffilement
hanberger.addEventListener(("click"), (e)=>{
    document.body.classList.add("disable-scroll");
   containner.classList.remove("hidden")
});

containner.addEventListener(("click"), ()=>{
     // Supprimez la classe pour activer à nouveau le scroll
  document.body.classList.remove("disable-scroll");
    containner.classList.add("hidden")
})
//Compter down 
document.addEventListener('DOMContentLoaded', () => {
  const valuedisplays = document.querySelectorAll(".num");
  let interval = 5000;

  valuedisplays.forEach((valuedisplay) => {
    let startValue = 0;
    let endValue = parseInt(valuedisplay.getAttribute("data-val"));
    let duration = Math.floor(interval / endValue);
    let compter = setInterval(() => {
      startValue += 1;
      valuedisplay.innerHTML = `<span class="bg-gradient-to-r from-red-600 to-orange-500 inline-block text-transparent bg-clip-text text-4xl ">+</span>${startValue}`;

      if (startValue == endValue) {
        clearInterval(compter);
      }
    }, duration);
  });
});

//copyright

const date = document.querySelector(".date");
date.innerHTML = `Copyright ${new Date().getFullYear()} Data Afrique Hub, Tous droits réservés`

//mode nuit/light
// const mode = document.getElementById("mode");
// const button = document.getElementById("buttonMode");
// button.addEventListener("click", ()=>{
//   let valueAtribute = mode.getAttribute("class");
  
//   valueAtribute == "bx bx-sun" ? mode.setAttribute("class", "bx bxs-moon" ) : mode.setAttribute("class", "bx bx-sun" ) 
 
   
// })


