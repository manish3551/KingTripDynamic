import config from "../conf/index.js";
 
//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Get the Adventure Id from the URL
  const params = new URLSearchParams(search);
  const adventureId = params.get('adventure');
  return adventureId;
  
  // Place holder for functionality to work in the Stubs
  
} 
//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Fetch the details of the adventure by making an API call
  try{
    const response = await fetch(
      config.backendEndpoint + `/adventures/detail?adventure=${adventureId}`
    );
    const json = await response.json();
    return json;
  } catch(err){
    return null;
  }

  // Place holder for functionality to work in the Stubs

}

//Implementation of DOM manipulation to add adventure details to DOM
function addAdventureDetailsToDOM(adventure) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the details of the adventure to the HTML DOM
  document.getElementById('adventure-name').innerHTML = adventure.name;
  document.getElementById('adventure-subtitle').innerHTML = adventure.subtitle;
  document.getElementById('adventure-content').innerHTML = adventure.content;
  const image = document.getElementById('photo-gallery');
  adventure.images.forEach(element => {
    image.innerHTML += `<img src=${element} class="activity-card-image"/>`;
    // console.log(element);
  });
}

//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the bootstrap carousel to show the Adventure images
  document.getElementById('photo-gallery').innerHTML = `
  <div id="carouselExampleIndicators" class="carousel slide">
    <div class="carousel-indicators" id="carousel-indicators"></div>
    <div class="carousel-inner" id="carousel-inner"></div>
    <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Previous</span>
    </button>
    <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Next</span>
    </button>
  </div>
  `;

  // let carouselInner = document.getElementById('carousel-inner');
  // images.forEach(element => {
  //   carouselInner.innerHTML += `
  //     <div class="carousel-item">
  //       <img src=${element} alt="" class="activity-card-image d-block w-100" />
  //     </div>
  //   `;
  // });
  images.forEach((image, indexImage ) => {
    const carouselItem = document.createElement("div");
    const carouselActiveClass = indexImage === 0 ? " active" : "";
    carouselItem.className = `carousel-item ${carouselActiveClass}`;
    carouselItem.innerHTML = `<img src=${image} alt="" class="activity-card-image mb-3 pb-md-0" />`;
    document.getElementById('carousel-inner').append(carouselItem)

    const carouselIndicators = `
      <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to=${indexImage} ${indexImage === 0 ? 'class="active"' : ''} aria-current="true" aria-label="Slide ${indexImage}"></button>
    `;

    document.getElementById("carousel-indicators").innerHTML += carouselIndicators;
  });

  
}

//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If the adventure is already reserved, display the sold-out message.
  if(adventure.available){
    document.getElementById("reservation-panel-available").style.display = "block";
    document.getElementById("reservation-panel-sold-out").style.display = "none";
    document.getElementById("reservation-person-cost").innerHTML = adventure.costPerHead;
  }else{
    document.getElementById("reservation-panel-available").style.display = "none";
    document.getElementById("reservation-panel-sold-out").style.display = "block";
  }
  
}

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  // TODO: MODULE_RESERVATIONS
  // 1. Calculate the cost based on number of persons and update the reservation-cost field
  document.getElementById("reservation-cost").innerHTML = adventure.costPerHead * persons;
}

//Implementation of reservation form submission
function captureFormSubmit(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. Capture the query details and make a POST API call using fetch() to make the reservation
  // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".

  const myForm = document.getElementById("myForm");
  myForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    
    const formData = JSON.stringify({
      name: myForm.elements["name"].value,
      date: myForm.elements["date"].value,
      person: myForm.elements["person"].value,
      adventure: adventure.id, 
    });
    
    try{
      const response = await fetch(
        config.backendEndpoint + "/reservations/new", 
        {
          method: "POST",
          body: formData,
          headers: {
            "Content-Type": "application/json",
          },  
        });

        if(response.ok){
          alert("Success!");
          window.location.reload();
        } else{
          alert("Failed!");
        }
    } catch(err){
      alert("Failed! - fetch call result")
    }
    
  });

}

//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't
  if(adventure.reserved) {
    document.getElementById("reserved-banner").style.display = "block";
  } else {
    document.getElementById("reserved-banner").style.display = "none";
  }
  
}

export {
  getAdventureIdFromURL,
  fetchAdventureDetails,
  addAdventureDetailsToDOM,
  addBootstrapPhotoGallery,
  conditionalRenderingOfReservationPanel,
  captureFormSubmit,
  calculateReservationCostAndUpdateDOM,
  showBannerIfAlreadyReserved,
};
