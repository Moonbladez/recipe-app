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
        //Search for recipes
        await state.search.getResults();

        //Render results on UI after we get results
        clearLoader();
        searchView.renderResults(state.search.result);
    }
}
elements.searchForm.addEventListener("submit", e => {
    e.preventDefault();
    controlSearch();
});


/* RECIPE CONTROLLER */

const r = new Recipe("this.uri");
r.getRecipe();