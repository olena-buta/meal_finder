const search = document.getElementById('search');
const submit = document.getElementById('submit');
const random = document.getElementById('random');
const resultHeading = document.getElementById('result-heading');
const mealEl = document.getElementById('meals');
const singleMealEl = document.getElementById('single-meal');
const notification = document.getElementById('notification-container');

function searchMeal(e) {
  e.preventDefault();

  singleMealEl.innerHTML = '';
  const term = search.value;

  if (term.trim()) {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
      .then(response => response.json())
      .then(data => {
        resultHeading.innerHTML = `<h2>Search result for <strong>${term}</strong>:</h2>`;
        search.value = '';

        if (data.meals === null) {
          resultHeading.innerHTML = `<h2>There are no search <strong>${term}</strong>. Try again.</h2>`;
          search.value = '';
        } else {
          mealEl.innerHTML = data.meals.map(meal => `<div class="meal">
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}"/>
            <div class="meal-info" data-mealID="${meal.idMeal}">
              <h3>${meal.strMeal}</h3>
            </div>
          </div>`).join('');
        }
      });
  } else {
    showNotification();
  }
}

function showNotification() {
  notification.classList.add('show');

  setTimeout(() => notification.classList.remove('show'), 2000);
}

function showSingleMealEl(id) {
  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
    .then(response => response.json())
    .then(data => {
      const meal = data.meals[0];

      addMealToDOM(meal);
    });
}

function addMealToDOM(meal) {
  const ingredients = [];

  for (let i = 1; i <= 20; i++) {
    if (meal[`strIngredient${i}`]) {
      ingredients.push(`${meal[`strMeasure${i}`]} - ${meal[`strIngredient${i}`]}`)
    } else {
      break;
    }
  }

  singleMealEl.innerHTML = `
    <div class="single-meal">
      <h1>${meal.strMeal}</h1>
      <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
      <div class="single-meal-info">
        ${meal.strCategory ? `<p>${meal.strCategory}</p>` : ''}
        ${meal.strArea ? `<p>${meal.strArea}</p>` : ''}
      </div>
      <div class="main">
        <h2>Ingredients</h2>
        <ul>
          ${ingredients.map(ingredient => `
            <li>${ingredient}</li>
          `).join('')}
        </ul>
        <p>${meal.strInstructions}</p>
      </div>
    </div>
  `;
}

submit.addEventListener('submit', searchMeal);

mealEl.addEventListener('click', e => {
  const mealItem = e.target;
  const mealID = mealItem.getAttribute('data-mealid');
  showSingleMealEl(mealID);
});