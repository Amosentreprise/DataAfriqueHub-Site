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


// const shareButton = document.getElementById('shareButton');

// if (navigator.share) {
//   shareButton.addEventListener('click', () => {
//     navigator.share({
//       title: 'Titre de l\'événement',
//       text: 'Description de l\'événement',
//       url: 'https://www.example.com/evenement-a-venir',
//     })
//       .then(() => console.log('Partage réussi'))
//       .catch((error) => console.error('Erreur lors du partage :', error));
//   });
// } else {
//   // Gérer le cas où l'API de partage n'est pas prise en charge
//   shareButton.style.display = 'none';
// }



