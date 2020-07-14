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
        console.log(data.meals);
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

submit.addEventListener('submit', searchMeal);