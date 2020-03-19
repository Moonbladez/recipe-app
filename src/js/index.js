import Search from "./models/Search";
import Recipe from "./models/Recipe";
import * as searchView from "./views/searchView";
import {
    elements,
    renderLoader,
    clearLoader
} from "./views/base";

/* 
Global state of the app -
    search object
    current recipe object
    shopping list object
    liked recipes
 */
const state = {};
//SEARCH CONTROLLER
const controlSearch = async () => {
    //Get query from view
    const query = searchView.getInput();
    if (query) {
        //new search object and add to state
        state.search = new Search(query);

        //Prepare UI for results
        //clears search input
        searchView.clearInput();
        //clears previous results on new search
        searchView.clearResults();
        //render loader
        renderLoader(elements.searchResults)

        try {
            await state.search.getResults();

            //Render results on UI after we get results
            clearLoader();
            searchView.renderResults(state.search.result);
        } catch (error) {
            alert(error)
            clearLoader();
        }
        //Search for recipes

    }
}
elements.searchForm.addEventListener("submit", e => {
    e.preventDefault();
    controlSearch();
});


elements.searchResultPages.addEventListener("click", event => {
    const button = event.target.closest(".btn-inline")
    if (button) {
        const goToPage = parseInt(button.dataset.goto, 10);
        searchView.clearResults();
        searchView.renderResults(state.search.result, goToPage);

    }
})


/* RECIPE CONTROLLER */
const controleRecipe = async () => {
    //get id from url, remove hash
    const id = window.location.hash.replace("#", "")


    //check we have an id
    if (id) {
        //prepare UI for changes

        //create new recipe object
        state.recipe = new Recipe(id)
        try {
            //get recipe data
            await state.recipe.getRecipe();
            state.recipe.parseIngredients();

            //calculate servings
            state.recipe.calcTime();
            state.recipe.calcServings();

            //render recipe
            console.log(state.recipe)
        } catch (error) {
            alert(error)
        }
    }
}


["hashchange", "load"].forEach(event => window.addEventListener(event, controleRecipe))