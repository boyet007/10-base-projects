const meals = document.getElementById("meals");
const favoriteContainer = document.getElementById("fav-meals");

getRandomMeal();
fetchFavMeals();

async function getRandomMeal() {
  const resp = await fetch(
    "https://www.themealdb.com/api/json/v1/1/random.php"
  );
  const respData = await resp.json();
  const randomMeal = respData.meals[0];
  console.log(randomMeal);
  addMeal(randomMeal, true);
}

async function getMealById(id) {
  const resp = await fetch(
    "https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + id
  );
  const respData = await resp.json();
  const meal = respData.meals[0];
  return meal;
}

async function getMealsBySearch(term) {
  const meals = await fetch(
    "https://www.themealdb.com/api/json/v1/1/search.php?s=" + term
  );
}

function addMeal(mealData, random = false) {
  const meal = document.createElement("div");
  meal.classList.add("meal");

  meal.innerHTML = `
  <div class="meal-header">
    ${
      random
        ? `
        <span class="random">Menu Hari Ini</span>`
        : ""
    }  
  
    <img src="${mealData.strMealThumb}" alt="${mealData.strMeal}" />
  </div>
  <div class="meal-body">
    <h4>${mealData.strMeal}</h4>
    <button class="fav-btn"><i class="fas fa-heart"></i></button>
  </div>`;

  const btn = meal.querySelector(".meal-body .fav-btn");

  btn.addEventListener("click", (e) => {
    if (btn.classList.contains("active")) {
      removeMealFromLS(mealData.idMeal);
      btn.classList.remove("active");
    } else {
      addMealToLS(mealData.idMeal);
      btn.classList.add("active");
    }

    fetchFavMeals();
    // e.target.classList.toggle("active");
  });

  meals.appendChild(meal);
}

function addMealFav(mealData) {
  const favMeal = document.createElement("li");

  favMeal.innerHTML = `
    <img src="${mealData.strMealThumb}" alt="${mealData.strMeal}" />
    <span>${mealData.strMeal}</span>
    <button class="clear"><i class="fas fa-window-close"></i></button>
  `;

  const btn = favMeal.querySelector(".clear");
  btn.addEventListener("click", () => {
    removeMealFromLS(mealData.idMeal);
    fetchFavMeals();
  }); 
  favoriteContainer.appendChild(favMeal);
}

function addMealToLS(meal) {
  const mealIds = getMealsFromLS();
  console.log(meal);
  localStorage.setItem("mealIds", JSON.stringify([...mealIds, meal]));
}

function getMealsFromLS() {
  const mealIds = JSON.parse(localStorage.getItem("mealIds"));
  return mealIds === null ? [] : mealIds;
}

function removeMealFromLS(mealId) {
  const mealIds = getMealsFromLS();
  localStorage.setItem(
    "mealIds",
    JSON.stringify(mealIds.filter((id) => id !== mealId))
  );
}

async function fetchFavMeals() {
    favoriteContainer.innerHTML = '';
  const mealIds = getMealsFromLS();

  for (let i = 0; i < mealIds.length; i++) {
    const mealId = mealIds[i];
    const meal0s = [];
    meal = await getMealById(mealId);
    addMealFav(meal);
  }
}
