
import config from "../conf/index.js";

//Implementation to extract city from query params
function getCityFromURL(search) {
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it
  const params = new URLSearchParams(search);
  const city = params.get('city');
  return city
}

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) { 
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data
  try{
    const response = await fetch(
      config.backendEndpoint + `/adventures?city=${city}`
    );
    const json = await response.json();
    return json;
  } catch(err){
    return null;
  }
}

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM
  adventures.forEach((adv) => {
    let divColEle  = document.createElement('div');
    divColEle.className = 'col-6 col-lg-3 mb-3';
    divColEle.innerHTML = `
      <a href="detail/?adventure=${adv.id}" id="${adv.id}">
        <div class="card">
          <img src="${adv.image}" class="activity-card img"/>
          <div class="category-banner">${adv.category}</div>
          <div class="card-body d-md-flex justify-content-between">
            <h5>${adv.name}</h5>
            <p>₹${adv.costPerHead}</p>
          </div>
          <div class="card-body d-md-flex justify-content-between">
            <h5>Duration</h5>
            <p>${adv.duration} Hours</p>
          </div>
        </div>
      </a>
    `;

    let divRowEle = document.getElementById('data');
    divRowEle.append(divColEle);
  });
}

//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list
  let filterListByDuration = list.filter(
    (element) => low <= element.duration && element.duration <= high
  );
  console.log(filterListByDuration);
  return filterListByDuration;
}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list
  let filterListByCategory = list.filter((element) => 
    categoryList.includes(element.category)
  );
  return filterListByCategory;
}

// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(list, filters) {
  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods
  let filterfunction1 = [];
  if((filters.duration) != "" && (filters.category).length > 0){
    debugger;
    const durationfil = filters.duration;
    const categoryfil = filters.category;
    filterfunction1 = filterByCategory(list, filters.category);
    const myArray = (filters.duration).split("-");
    const low = myArray[0];
    const high = myArray[1];
    filterfunction1 = filterByDuration(filterfunction1, low, high);
  } else if((filters.duration) == "" && (filters.category).length > 0){
    const durationfil = filters.duration;
    const categoryfil = filters.category;
    filterfunction1 = filterByCategory(list, filters.category);
  } else if((filters.duration) != "" && (filters.category).length == 0){
    const myArray = (filters.duration).split("-");
    const low = myArray[0];
    const high = myArray[1];
    filterfunction1 = filterByDuration(list, low, high);
  } else{
    filterfunction1 = list;
  }

  // Place holder for functionality to work in the Stubs
  return filterfunction1;
}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters as a String to localStorage
  const jsonvalue = JSON.stringify(filters);
  localStorage.setItem("filters", jsonvalue);
  return true;
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return String read as an object
  const jsonresult = JSON.parse(localStorage.getItem("filters"));
  // Place holder for functionality to work in the Stubs
  return jsonresult;
}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills
  (filters.category).forEach((element) => {
    let divColEle = document.createElement('div');
    divColEle.className = 'category-filter';
    divColEle.innerHTML = `<span>${element}</span>`;

    let divRowEle = document.getElementById('category-list');
    divRowEle.append(divColEle);
  });
}
export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
};
 
