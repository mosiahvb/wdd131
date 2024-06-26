import recipes from './recipes.mjs';

function random(num) {
	return Math.floor(Math.random() * num);
}

function getRandomListEntry(list) {
	const listLength = list.length;
	const randomNum = random(listLength);
	return list[randomNum];
}


function recipeTemplate(recipe) {
    const image = recipe.image;
    const tags = recipe.tags;
    const name = recipe.name;
    const description = recipe.description;
    const rating = recipe.rating;

    const tagsHtml = tagsTemplate(tags);
    const ratingHtml = ratingTemplate(rating);
	return `
    <div class="recipe">
        <img src="${image}" alt="">
        <div class="name">
            ${tagsHtml}
            <p>${name}</p>
            ${ratingHtml}
            <p class="about">${description}</p>
        </div>
    </div>
    `;
}

function tagsTemplate(tags) {
    let htmlArray = [];

    tags.forEach(tag => {
      let htmlTag = `<h2>${tag}</h2>`;
      htmlArray.push(htmlTag);
    });
  
    let html = htmlArray.join(' ');
    return html;
}

function ratingTemplate(rating) {
	let html = `<span
	class="rating"
	role="img"
	aria-label="Rating: ${rating} out of 5 stars"
>`

    for (let i = 1; i <= 5; i++) {
        if (i <= rating) {
            html += `<span aria-hidden="true" class="icon-star">⭐</span>`;
        } else {
            html += `<span aria-hidden="true" class="icon-star-empty">☆</span>`;
        }
    }

	html += `</span>`
	return html
}

function renderRecipes(recipeList) {
    const recipesContainer = document.getElementById('recipes');
    let recipesHtml = '';

    recipeList.forEach(recipe => {
        recipesHtml += recipeTemplate(recipe);
    });

    recipesContainer.innerHTML = recipesHtml;
}

function filterRecipes(query) {
    const filtered = recipes.filter(recipe => {
        const nameL = recipe.name.toLowerCase();
        const descriptionL = recipe.description.toLowerCase();
        const tagsL = recipe.tags.map(tag => tag.toLowerCase()).join(' ');
        const ingredientsL = recipe.recipeIngredient.map(ingredient => ingredient.toLowerCase()).join(' ');

        return (
            nameL.includes(query) ||
            descriptionL.includes(query) ||
            tagsL.includes(query) ||
            ingredientsL.includes(query)
        );
    });
    filtered.sort((a, b) => a.name.localeCompare(b.name));

    return filtered;
}

function searchHandler(i) {
    i.preventDefault();
    const search = document.getElementById('search');
    const query = search.value.trim().toLowerCase(); 

    const filtered = filterRecipes(query);
    renderRecipes(filtered);
}

function init() {
    const randomRecipe = getRandomListEntry(recipes);
    renderRecipes([randomRecipe]);

    const searchForm = document.querySelector('form');
    searchForm.addEventListener('submit', searchHandler);
}

document.addEventListener('DOMContentLoaded', init);