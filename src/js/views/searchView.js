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
    elements.searchResultPages.innerHTML = "";
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

//type: "previous" or "next"
const createButton = (page, type) => `
    <button class="btn-inline results__btn--${type}" data-goto=${type === "previous" ? page -1: page +1}>
        <svg class="search__icon">
            <use href="img/icons.svg#icon-triangle-${type === "previous" ? "left": "right"}"></use>
        </svg>
        <span>Page ${type === "previous" ? page -1: page +1}</span>
    </button>
`

const renderButtons = (page, numOfResults, resultsPerPage) => {
    //round up
    const pages = Math.ceil(numOfResults / resultsPerPage);

    let button;
    if (page === 1 && pages > 1) {
        //button to next page
        button = createButton(page, "next")
    } else if (page < pages) {
        //both buttons
        button = `${button = createButton(page, "previous")}
        ${button = createButton(page, "next")}
        `
    } else if (page === pages && pages > 1) {
        //button to previous page
        button = createButton(page, "previous")
    }

    elements.searchResultPages.insertAdjacentHTML("afterbegin", button);
};

export const renderResults = (recipes, page = 1, resultsPerPage = 10) => {

    //render results of current page
    const start = (page - 1) * resultsPerPage;
    const end = page * resultsPerPage;
    recipes.slice(start, end).forEach(renderRecipe)

    //render pagination
    renderButtons(page, recipes.length, resultsPerPage)
    console.log(start)
}