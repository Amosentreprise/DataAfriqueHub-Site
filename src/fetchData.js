//la fonction pour recuperer les images
const getImageUrl = (imageRef) => {
  // Supprimer le préfixe "image-" et remplacer le dernier tiret par un point
  const imageId = imageRef.replace(/^image-/, "").replace(/-(?!.*-)/, ".");
  console.log(`https://cdn.sanity.io/images/otqb5lj1/production/${imageId}`);
  // Construire l'URL de l'image
  return `https://cdn.sanity.io/images/otqb5lj1/production/${imageId}`;
};

const formatDate = (eventDateTime) => {
  const formattedDate = eventDateTime.toLocaleString("fr-FR", {
    weekday: "long", // Nom complet du jour de la semaine (ex: "lundi")
    year: "numeric", // Année (ex: "2023")
    month: "long", // Nom complet du mois (ex: "avril")
    day: "numeric", // Jour du mois (ex: "17")
  });

  // Obtenir l'heure au format 24 heures
  const hour = eventDateTime.getHours();
  const minute = eventDateTime.getMinutes();
  const formattedTime = `${hour < 10 ? "0" + hour : hour}h${
    minute < 10 ? "0" + minute : minute
  }`;

  // Obtenir le fuseau horaire
  const timeZone = "GMT"; // Vous pouvez changer cela selon vos besoins

  // Afficher la date et l'heure formatées
  const formattedDateTime = `Le ${formattedDate} à ${formattedTime} ${timeZone}`;

  return formattedDateTime;
};
window.addEventListener("load", () => {
  document.getElementById("upcoming").innerHTML = `
           <div class="flex justify-center items-center h-full w-full mt-12 text-4xl md:text-2xl text-red-500 font-poppins animate-pulse">Chargement en cours...</div>
  `;
  let PROJECT_ID = "otqb5lj1";
  let DATASET = "production";

  let QUERY = encodeURIComponent('*[_type == "event"]');

  // Compose the URL for your project's endpoint and add the query
  let URL = `https://${PROJECT_ID}.api.sanity.io/v2021-10-21/data/query/${DATASET}?query=${QUERY}`;
  // Récupération des données depuis Sanity
  fetch(URL)
    .then((response) => response.json())
    .then((data) => {
      // Traitement des données
      const events = data.result;
      console.log(events);
      const currentDate = new Date();

      const upcomingEvents = events.filter(
        (event) => new Date(event.date) > currentDate
      );
      const otherEvents = events.filter(
        (event) => new Date(event.date) <= currentDate
      );

      const upcomingEvent = upcomingEvents[0];

      // Mettre à jour les valeurs du temps restant à intervalles réguliers
      const updateCountdown = () => {
        const eventDate = new Date(upcomingEvent.date);
        const currentDate = new Date();
        const timeDiff = eventDate.getTime() - currentDate.getTime();
        const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

        document.getElementById("days").innerText = days;
        document.getElementById("hours").innerText = hours;
        document.getElementById("minutes").innerText = minutes;
        document.getElementById("seconds").innerText = seconds;
      };

      // Mettre à jour le décompte du temps toutes les secondes
      setInterval(updateCountdown, 1000);

      // Construction de la liste des intervenants
      const intervenantsList = upcomingEvent
        ? upcomingEvent.intervenants
            .map(
              (intervenant) => `
  <div class="flex flex-col bg-[#0b0b2c] shadow-md space-y-4 p-2 justify-center items-center border border-[#424262] rounded-md">
    <img src="${getImageUrl(
      intervenant.image.asset._ref
    )}" alt="" class="w-32 h-32 object-cover rounded-full" />
    <small>${intervenant.nom}</small>
    <small>${intervenant.role}</small>
  </div>
`
            )
            .join("")
        : "";
      // Affichage des détails de l'événement à venir dans la section "upcoming"

      const upcomingEventHtml =
        upcomingEvents.length > 0
          ? `
  <div>
  <div class="flex flex-wrap justify-evenly items-center bg-indigo-950 w-full min-h-[300px] p-3">
    <div class="w-60 h-60">
      <img src="${getImageUrl(
        upcomingEvent.image.asset._ref
      )}" alt="" class="w-full h-full rounded-md object-cover" />
    </div>
    <div class="flex flex-col justify-center items-start">
      <span id="status" class="p-2 text-white bg-gradient-to-r from-gray-950 from-0% via-indigo-950 via-45% to-gray-950 to-90% bg-opacity-25 text-center">${
        new Date(upcomingEvent.date) > currentDate ? "A Venir" : "Passé"
      }</span>
      <p class="text-white py-3">
        <span id="time">${formatDate(new Date(upcomingEvent.date))}</span>
      </p>
      <h1 id="theme" class="uppercase text-2xl w-64">${upcomingEvent.theme}</h1>
      <div class="flex items-center">
      <a href="${upcomingEvent.lienInscription}" target="_blank">
        <button class="p-3 bg-primary mr-6">Inscrivez-vous</button>
      </a>
        <ul class="flex flex-wrap gap-2">
          <li class="bg-gradient-to-r from-gray-950 from-0% via-indigo-950 via-45% to-gray-950 to-90% p-3" ><span id="days"> </span> <span>jours</span></li>
          <li class="bg-gradient-to-r from-gray-950 from-0% via-indigo-950 via-45% to-gray-950 to-90% p-3" ><span id="hours"> </span> <span>h</span></li>
          <li class="bg-gradient-to-r from-gray-950 from-0% via-indigo-950 via-45% to-gray-950 to-90% p-3" ><span id="minutes"> </span> <span>min</span></li>
          <li class="bg-gradient-to-r from-gray-950 from-0% via-indigo-950 via-45% to-gray-950 to-90% p-3" ><span id="seconds"> </span> <span>s</span></li>
        </ul>
      </div>
    </div>
  </div>
  <div class="py-8 flex justify-evenly  w-full h-auto flex-wrap px-3">
    <div class="w-2/3">
      <h2 class="bg-gradient-to-r from-red-600 to-orange-500 inline-block text-transparent bg-clip-text pb-8">A propos</h2>
      <p id="description" class="pb-3">${upcomingEvent.description}</p>
    </div>
    <div>
      <div class="border border-[#424262] rounded-md p-5 space-y-3 flex flex-col">
        <div><i class='bx bxs-calendar'></i> ${formatDate(
          new Date(upcomingEvent.date)
        )}</div>
        <div><i class='bx bxl-zoom'></i> ${upcomingEvent.mode}</div>
        <div><i class='bx bxs-user'></i>  Organisé par <span>${
          upcomingEvent.organisateur
        }</span></div>
        <div>
        <a href="${upcomingEvent.lienInscription}" target="_blank">
          <button class="p-1 mt-2 bg-gradient-to-r from-red-700 to-orange-500 font-semibold rounded w-full"><span class="flex w-full bg-primary  p-2 items-center justify-center">
          S'inscrire
        </span></button>
          </a>
        </div>
        <div>
        <a href="${upcomingEvent.calendarLink}" target="_blank">
          <button class="p-1 mt-2 bg-gradient-to-r from-red-700 to-orange-500  text-white font-semibold rounded w-full"><span class="flex w-full bg-primary  p-2 justify-center">
          Ajouter à votre calendrier
        </span></button>
          </a>
        
        </div>
        <div>
        
          <button onClick="share('${
            upcomingEvent.lienPartage
          }')" class="p-1 mt-2 bg-gradient-to-r from-red-700 to-orange-500  text-white font-semibold rounded w-full"><span class="flex w-full bg-primary  p-2 justify-evenly items-center">
          Partager <i class='bx bx-share-alt bx-tada' style='color:#ffffff' ></i>
        </span></button>
        
          
        </div>
      </div>
    </div>
  </div>
  <div class="flex flex-col w-full min-h-[200px]">
    <h2 class="bg-gradient-to-r from-red-600 to-orange-500 inline-block text-transparent bg-clip-text text-center py-9">Intervenants</h2>
    <div class="mx-auto flex flex-wrap space-x-10">
      ${intervenantsList}
    </div>
  </div>
</div>
  `
          : `
  <div class="text-center mt-8">Aucun événement à venir pour le moment.</div>
`;
      const commingEvent = document.getElementById("upcoming");
      commingEvent.innerHTML = upcomingEventHtml;

      // Affichage des autres événements dans la section "others"
      const otherEventsHtml = events.map(
        (event) => `
    <div class="border border-orange-500 rounded-tl-xl rounded-br-xl relative w-64 min-h-[380px] mx-5 my-5" onClick="handleClick('${
      event._id
    }')">
      <img src="${getImageUrl(
        event.image.asset._ref
      )}" alt="" class="w-full h-60 object-cover rounded-tl-xl" />
      <span class="absolute top-0 right-0 bg-primary p-3 text-white">${
        new Date(event.date) > currentDate ? "A Venir" : "Passé"
      }</span>
      <p class="p-2">Date : ${formatDate(
        new Date(event.date)
      )} <span></span></p>
      <p class="p-2">Thème : ${event.theme} <span></span></p>
    </div>
   ` 
      ).join('');
      const others = document.getElementById("others");
      others.innerHTML = `
    <div class="flex flex-col">
      <h2 class="bg-gradient-to-r from-red-600 to-orange-500 inline-block text-transparent bg-clip-text text-center py-9">Autres Evènements</h2>
      <div class="mx-auto  flex flex-wrap  justify-center items-center cursor-pointer">
        ${otherEventsHtml}
      </div>
    </div>
  `;
    })
    .catch((error) => {
      console.error(
        "Erreur lors de la récupération des données depuis Sanity :",
        error
      );

      document.getElementById(
        "main"
      ).innerHTML = `<div class="w-full flex flex-col justify-center items-center mt-20">
                                  <img src="../assets/error.gif"/>

                                    <p class="text-center text-2xl md:text-xl text-white py-3">OOPS, Erreur serveur</p>
                                    <button class="p-2 bg-red-500 rounded-md" onClick="reload()">Ressayez</button>
                                      </div>`;
    });
});

//Ecouter des infos sur les evenements
function handleClick(eventId) {
  let PROJECT_ID = "otqb5lj1";
  let DATASET = "production";

  let QUERY = encodeURIComponent('*[_type == "event"]');

  // Compose the URL for your project's endpoint and add the query
  let URL = `https://${PROJECT_ID}.api.sanity.io/v2021-10-21/data/query/${DATASET}?query=${QUERY}`;
  // Récupération des données depuis Sanity
  fetch(URL)
    .then((response) => response.json())
    .then((data) => {
      // Traitement des données
      const events = data.result;
      const selectedEvent = events.find((event) => event._id === eventId);
      console.log(selectedEvent);
      const currentDate = new Date();
      const upcomingEvents = events.filter(
        (event) => new Date(event.date) > currentDate
      );

      // Faites défiler jusqu'à la section "upcoming"
      document
        .getElementById("upcoming")
        .scrollIntoView({ behavior: "smooth" });
      const upcomingEvent = selectedEvent;

      // Mettre à jour les valeurs du temps restant à intervalles réguliers
      const updateCountdown = () => {
        const eventDate = new Date(upcomingEvent.date);
        const currentDate = new Date();
        const timeDiff = eventDate.getTime() - currentDate.getTime();
        const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

        document.getElementById("days").innerText = days >= 0 ? days : 0;
        document.getElementById("hours").innerText = hours >= 0 ? hours : 0;
        document.getElementById("minutes").innerText =
          minutes >= 0 ? minutes : 0;
        document.getElementById("seconds").innerText =
          seconds >= 0 ? minutes : 0;

        // Vérification si tous les compteurs sont égaux à zéro
      };

      // Mettre à jour le décompte du temps toutes les secondes
      setInterval(updateCountdown, 1000);

      // Construction de la liste des intervenants
      const intervenantsList = upcomingEvent
        ? upcomingEvent.intervenants
            .map(
              (intervenant) => `
  <div class="flex flex-col  bg-[#0b0b2c] shadow-md space-y-4 p-2 justify-center items-center border border-[#424262]  rounded-md">
    <img src="${getImageUrl(
      intervenant.image.asset._ref
    )}" alt="" class="w-32 h-32 object-cover rounded-full" />
    <small>${intervenant.nom}</small>
    <small>${intervenant.role}</small>
  </div>
`
            )
            .join("")
        : "";
      // Affichage des détails de l'événement à venir dans la section "upcoming"

      const upcomingEventHtml = upcomingEvent
        ? `
  <div>
  <div class="flex flex-wrap justify-evenly items-center bg-indigo-950 w-full min-h-[300px] p-3">
    <div class="w-60 h-60">
      <img src="${getImageUrl(
        upcomingEvent.image.asset._ref
      )}" alt="" class="w-full h-full rounded-md object-cover" />
    </div>
    <div class="flex flex-col justify-center items-start">
      <span id="status" class="p-2 text-white bg-gradient-to-r from-gray-950 from-0% via-indigo-950 via-45% to-gray-950 to-90% bg-opacity-25 text-center">${
        new Date(upcomingEvent.date) > currentDate ? "A Venir" : "Passé"
      }</span>
      <p class="text-white py-3">
        <span id="time">${formatDate(new Date(upcomingEvent.date))}</span>
      </p>
      <h1 id="theme" class="uppercase text-2xl w-64">${upcomingEvent.theme}</h1>
      <div class="flex items-center">
      <a href="${upcomingEvent.lienInscription}" target="_blank">
        <button class="p-3 bg-primary mr-6">Inscrivez-vous</button>
      <a/>
        <ul class="flex flex-wrap  gap-2">
          <li class="bg-gradient-to-r from-gray-950 from-0% via-indigo-950 via-45% to-gray-950 to-90% p-3" ><span id="days"> </span> <span>jours</span></li>
          <li class="bg-gradient-to-r from-gray-950 from-0% via-indigo-950 via-45% to-gray-950 to-90% p-3" ><span id="hours"> </span> <span>h</span></li>
          <li class="bg-gradient-to-r from-gray-950 from-0% via-indigo-950 via-45% to-gray-950 to-90% p-3" ><span id="minutes"> </span> <span>min</span></li>
          <li class="bg-gradient-to-r from-gray-950 from-0% via-indigo-950 via-45% to-gray-950 to-90% p-3" ><span id="seconds"> </span> <span>s</span></li>
        </ul>
      </div>
    </div>
  </div>
  <div class="py-8 flex justify-between w-full h-auto flex-wrap px-3">
    <div class="w-2/3">
      <h2 class="bg-gradient-to-r from-red-600 to-orange-500 inline-block text-transparent bg-clip-text pb-9">A propos</h2>
      <p id="description" class="pb-3">${upcomingEvent.description}</p>
    </div>
    <div>
      <div class="border border-[#424262] rounded-md p-5 space-y-3 flex flex-col">
        <div><i class='bx bxs-calendar'></i> ${formatDate(
          new Date(upcomingEvent.date)
        )}</div>
        <div><i class='bx bxl-zoom'></i> ${upcomingEvent.mode}</div>
        <div><i class='bx bxs-user'></i>  Organisé par <span>${
          upcomingEvent.organisateur
        }</span></div>
        <div>
        <a href="${upcomingEvent.lienInscription}" target="_blank">
          <button class="p-1 mt-2 bg-gradient-to-r from-red-700 to-orange-500 font-semibold rounded w-full"><span class="flex w-full bg-primary  p-2 items-center justify-center">
          S'inscrire
        </span></button>
          </a>
        </div>
        <div>
        <a href="${upcomingEvent.calendarLink}" target="_blank">
          <button class="p-1 mt-2 bg-gradient-to-r from-red-700 to-orange-500  text-white font-semibold rounded w-full"><span class="flex w-full bg-primary  p-2 justify-center">
          Ajouter à votre calendrier
        </span></button>
          </a>
        
        </div>
        <div>
        
          <button onClick="share('${
            upcomingEvent.lienPartage
          }')" class="p-1 mt-2 bg-gradient-to-r from-red-700 to-orange-500  text-white font-semibold rounded w-full"><span class="flex w-full bg-primary  p-2 justify-evenly items-center">
          Partager <i class='bx bx-share-alt bx-tada' style='color:#ffffff' ></i>
        </span></button>
        
          
        </div>
      </div>
    </div>
  </div>
  <div class="flex flex-col w-full min-h-[200px]">
    <h2 class="bg-gradient-to-r from-red-600 to-orange-500 inline-block text-transparent bg-clip-text text-center py-9">Intervenants</h2>
    <div class="mx-auto flex flex-wrap space-x-10">
      ${intervenantsList}
    </div>
  </div>
</div>
  `
        : `
  <div>Aucun événement à venir pour le moment.</div>
`;
      const commingEvent = document.getElementById("upcoming");
      commingEvent.innerHTML = upcomingEventHtml;

      // Affichage des autres événements dans la section "others"
      const otherEventsHtml = events.map(
        (event) => `
    <div class="border border-orange-500 rounded-tl-xl rounded-br-xl relative w-64 min-h-[380px] mx-5 my-5" onClick="handleClick('${
      event._id
    }')">
      <img src="${getImageUrl(
        event.image.asset._ref
      )}" alt="" class="w-full h-60 object-cover rounded-tl-xl" />
      <span class="absolute top-0 right-0 bg-primary p-3 text-white">${
        new Date(event.date) > currentDate ? "A Venir" : "Passé"
      }</span>
      <p class="p-2">Date : ${formatDate(
        new Date(event.date)
      )} <span></span></p>
      <p class="p-2">Thème : ${event.theme} <span></span></p>
    </div>
  `
      ).join('');
      const others = document.getElementById("others");
      others.innerHTML = `
    <div class="flex flex-col">
      <h2 class="bg-gradient-to-r from-red-600 to-orange-500 inline-block text-transparent bg-clip-text text-center py-9">Autres Evènements</h2>
      <div class="mx-auto flex flex-wrap justify-center items-center">
        ${otherEventsHtml}
      </div>
    </div>
  `;
    })
    .catch((error) => {
      console.error(
        "Erreur lors de la récupération des données depuis Sanity :",
        error
      );

      document.getElementById(
        "main"
      ).innerHTML = `<div class="w-full flex flex-col justify-center items-center mt-20">
                                  <img src="../assets/error.gif"/>

                                    <p class="text-center text-2xl md:text-xl text-white py-3">OOPS, Erreur serveur</p>
                                    <button class="p-2 bg-red-500 rounded-md" onClick="reload()">Ressayez</button>
                                      </div>`;
    });

  const selectedEvent = events.find((event) => event._id === eventId);
  console.log(selectedEvent);
}

function reload() {
  window.location.reload();
}

function share(link) {
  if (navigator.share) {
    
      navigator
        .share({
          title: "Data Afrique Hub event",
          text: "Data Afrique Hub event",
          url: link,
        })
        .then(() => console.log("Partage réussi"))
        .catch((error) => console.error("Erreur lors du partage :", error));
    
  } else {
    // Gérer le cas où l'API de partage n'est pas prise en charge
    //   shareButton.style.display = 'none';
  }
}
