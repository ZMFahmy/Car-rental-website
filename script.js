// Fetch data from PHP file
function filter() {
  countryFilter = document.getElementById("country-dropdown").value;
  cityFilter = document.getElementById("city-dropdown").value;
  priceFilter = document.getElementById("price-dropdown").value;

  if (countryFilter == "---") {
    countryFilter = null;
    cityFilter = null;
  }
  if (priceFilter == "---") priceFilter = null;

  const carsDiv = document.getElementById("cars-section");
  while (carsDiv.firstChild) {
    carsDiv.removeChild(carsDiv.firstChild);
  }

  count = 0;

  fetch("cars_from_db.php")
    .then((response) => response.json())
    .then((carsArray) => {
      // Loop through the data and create HTML elements dynamically
      carsArray.forEach((car) => {
        if (
          ((countryFilter == null && cityFilter == null) ||
            (car.country === countryFilter && car.city === cityFilter)) &&
          (priceFilter == null || car.rental_price <= priceFilter)
        ) {
          count = count + 1;

          const carElement = document.createElement("div");
          carElement.classList.add("flex");
          carElement.classList.add("car-element");

          imgElement = document.createElement("img");
          imgElement.classList.add("car-img");
          imgElement.src = `${car.image_1}`;
          imgElement.alt = "car image";
          carElement.appendChild(imgElement);

          box = document.createElement("div");
          box.classList.add("flex-vertical");
          box.classList.add("info-box");

          infoArea = document.createElement("div");
          infoArea.classList.add("info-text");

          model = document.createElement("h2");
          model.textContent = `${car.model}`;
          model.classList.add("model-name");
          yearOfRelease = document.createElement("p");
          yearOfRelease.textContent = `Year of release: ${car.year}`;
          yearOfRelease.classList.add("info-line");
          country = document.createElement("p");
          country.textContent = `Country: ${car.country}`;
          country.classList.add("info-line");
          city = document.createElement("p");
          city.textContent = `City: ${car.city}`;
          city.classList.add("info-line");
          price = document.createElement("p");
          price.textContent = `Rental price: ${car.rental_price} $`;
          price.classList.add("info-line");

          infoArea.appendChild(model);
          infoArea.appendChild(yearOfRelease);
          infoArea.appendChild(country);
          infoArea.appendChild(city);
          infoArea.appendChild(price);

          box.appendChild(infoArea);

          rentBtnContainer = document.createElement("div");
          rentBtnContainer.classList.add("flex-for-btn");

          rentBtn = document.createElement("button");
          rentBtn.classList.add("btn");
          rentBtn.classList.add("rent-btn");
          rentBtn.textContent = "more info";

          function rentBtnEventHandlerWrapper() {
            const model = car.model;
            const year_of_release = car.year;
            const plate_id = car.plate_id;
            const image_1 = car.image_1;
            const image_2 = car.image_2;
            const image_3 = car.image_3;
            const image_4 = car.image_4;
            const country = car.country;
            const city = car.city;
            const rental_price = car.rental_price;
            const distance_driven = car.distance_driven;
            const color = car.color;
            const description = car.description;

            toggleInfoWindow(
              model,
              year_of_release,
              plate_id,
              image_1,
              image_2,
              image_3,
              image_4,
              country,
              city,
              rental_price,
              distance_driven,
              color,
              description
            );
          }

          rentBtn.addEventListener("click", rentBtnEventHandlerWrapper);

          rentBtnContainer.appendChild(rentBtn);
          box.appendChild(rentBtnContainer);

          carElement.append(box);

          carsDiv.appendChild(carElement);
        }
      });
      const label = document.getElementsByClassName("cars-label")[0];
      label.textContent = `Available Cars (${count})`;
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
}

function dropFilter() {
  countryFilter = document.getElementById("country-dropdown");
  priceFilter = document.getElementById("price-dropdown");

  countryFilter.options[0].selected = true;
  priceFilter.options[0].selected = true;

  populateCityDropdown();
  filter();
}

filter();

const filterButton = document.getElementsByClassName("filter-btn")[0];
filterButton.addEventListener("click", filter);

const dropFilterButton = document.getElementsByClassName("drop-filter-btn")[0];
dropFilterButton.addEventListener("click", dropFilter);

////////////////////////////////////////////////////////////////
/* Populating second dropdown box based on value of the first */

// Get references to the dropdowns
const countryDropdown = document.getElementById("country-dropdown");
const cityDropdown = document.getElementById("city-dropdown");

// Define options for the second dropdown based on the selected value in the first dropdown
const options = {
  Italy: ["Milan", "Rome", "Florence"],
  Egypt: ["Alexandria", "Cairo", "Giza"],
};

// Function to populate the second dropdown based on the selection in the first dropdown
function populateCityDropdown() {
  const countryValue = countryDropdown.value;
  const cityValues = options[countryValue];

  // Clear existing options in the second dropdown
  cityDropdown.innerHTML = "";

  // Add new options to the second dropdown
  if (cityValues) {
    cityValues.forEach((value) => {
      const option = document.createElement("option");
      option.textContent = value;
      cityDropdown.appendChild(option);
    });
  }
}

// Event listener to trigger the population of the second dropdown
countryDropdown.addEventListener("change", populateCityDropdown);

// Populate the second dropdown initially based on the default selection in the first dropdown
populateCityDropdown();

////////////////////////////////////////////////////////////////
function toggleInfoWindow(
  model = null,
  year_of_release = null,
  plate_id = null,
  image_1 = null,
  image_2 = null,
  image_3 = null,
  image_4 = null,
  country = null,
  city = null,
  rental_price = null,
  distance_driven = null,
  color = null,
  description = null
) {
  document.getElementById("popup").classList.toggle("active");

  if (document.getElementById("popup").classList.contains("active")) {
    const contentElement = document.getElementById("popup-content");
    const screenHeight = window.screen.height;
    contentElement.style.top = `${window.scrollY + screenHeight / 2}px`;
    document.body.style.overflowY = "hidden";

    const title = document.getElementsByClassName("title-model-name")[0];
    title.innerHTML = `${year_of_release} ${model}`;

    const carInfoContainer =
      document.getElementsByClassName("car-info-part")[0];

    carDescription = document.createElement("p");
    carDescription.classList.add("car-description");
    carDescription.textContent = description;
    carInfoContainer.appendChild(carDescription);

    relatedInfo = document.createElement("div");
    relatedInfo.classList.add("related-info");

    plate_id_el = document.createElement("p");
    plate_id.textContent = `Plate ID: ${plate_id}`;
    country_el = document.createElement("p");
    country_el.textContent = `Country: ${country}`;
    city_el = document.createElement("p");
    city_el.textContent = `City: ${city}`;
    distance_driven_el = document.createElement("p");
    distance_driven_el.textContent = `Distance driven: ${distance_driven} km`;
    color_el = document.createElement("p");
    color_el.textContent = `Color: ${color}`;

    relatedInfo.appendChild(plate_id_el);
    relatedInfo.appendChild(country_el);
    relatedInfo.appendChild(city_el);
    relatedInfo.appendChild(distance_driven_el);
    relatedInfo.appendChild(color_el);
    carInfoContainer.appendChild(relatedInfo);

    const carImagesContainer = document.getElementsByClassName(
      "car-images-container"
    )[0];
    car_img_1 = document.createElement("img");
    car_img_1.classList.add("info-car-img");
    car_img_1.style.height = "200px";
    car_img_1.style.width = "auto";
    car_img_1.src = image_1;
    car_img_2 = document.createElement("img");
    car_img_2.classList.add("info-car-img");
    car_img_2.style.height = "200px";
    car_img_2.style.width = "auto";
    car_img_2.src = image_2;
    car_img_3 = document.createElement("img");
    car_img_3.classList.add("info-car-img");
    car_img_3.style.height = "200px";
    car_img_3.style.width = "auto";
    car_img_3.src = image_3;
    car_img_4 = document.createElement("img");
    car_img_4.classList.add("info-car-img");
    car_img_4.style.height = "200px";
    car_img_4.style.width = "auto";
    car_img_4.src = image_4;

    carImagesContainer.appendChild(car_img_1);
    carImagesContainer.appendChild(car_img_2);
    carImagesContainer.appendChild(car_img_3);
    carImagesContainer.appendChild(car_img_4);

    const rent_btn_container =
      document.getElementsByClassName("rent-btn-container")[0];
    rentBtn = document.createElement("button");
    rentBtn.classList.add("btn");
    rentBtn.textContent = `rent for ${rental_price} $ per day`;
    rentBtn.style.marginTop = "45px";
    rentBtn.style.marginBottom = "45px";
    rent_btn_container.appendChild(rentBtn);
  } else {
    const info = document.getElementsByClassName("car-info-part")[0];
    const imgContainer = document.getElementsByClassName(
      "car-images-container"
    )[0];
    const rentBtnContainer =
      document.getElementsByClassName("rent-btn-container")[0];
    while (info.firstChild) {
      info.removeChild(info.firstChild);
    }
    while (imgContainer.firstChild) {
      imgContainer.removeChild(imgContainer.firstChild);
    }
    while (rentBtnContainer.firstChild) {
      rentBtnContainer.removeChild(rentBtnContainer.firstChild);
    }

    document.body.style.overflowY = "auto";
  }
}
