import {
    elements
} from "./base";

//get value from search
export const getInput = () => elements.searchInput.value;
export const clearInput = () => {
    elements.searchInput.value = ""
};

export const clearResults = () => {
    elements.searchResList.innerHTML = "";
}

//limits titles in search results to one line
const limitRecipeTitle = (title, limit = 17) => {
    const shorterTitle = [];
    if (title.length > limit) {
        title.split(" ").reduce((accumilator, currentValue) => {
            if (accumilator + currentValue.length <= limit) {
                shorterTitle.push(currentValue)
            }
            return accumilator + currentValue.length
        }, 0);
        return `${shorterTitle.join(" ")}...`;
    }

    return title;

}

// render 1 recipe
const renderRecipe = (recipe) => {
    const {
        recipe_id,
        image_url,
        title,
        publisher
    } = recipe;
    const markup = `
    <li>
        <a class="results__link" href="#${recipe_id}">
        <figure class="results__fig">
            <img src="${image_url}" alt="${title}">
        </figure>
        <div class="results__data">
            <h4 class="results__name">"${limitRecipeTitle(title)}</h4>
            <p class="results__author">${publisher}</p>
        </div>
    </a>
</li>`;
    elements.searchResList.insertAdjacentHTML("beforeend", markup);
}

const renderButtons = (page) => {

}

export const renderResults = (recipes, page = 1, resultsPerPage = 10) => {
    const start = (page - 1) * resultsPerPage;
    const end = page * resultsPerPage;
    recipes.slice(start, end).forEach(renderRecipe)
}