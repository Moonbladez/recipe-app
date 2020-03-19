import axios from "axios";

export default class Recipe {
    constructor(id) {
        this.id = id;
    }

    async getRecipe() {
        try {
            const result = await axios(
                `https://forkify-api.herokuapp.com/api/get?rId=${this.id}`
            );
            this.title = result.data.recipe.title;
            this.author = result.data.recipe.publisher;
            this.image = result.data.recipe.image_url;
            this.url = result.data.recipe.source_url;
            this.ingredients = result.data.recipe.ingredients;
        } catch (error) {
            alert(error);
        }
    }

    calcTime() {

        //Assuming  we need 15 minutes for each 3 ing
        const numberOfIngredients = this.ingredients.length;
        const periods = Math.ceil(numberOfIngredients / 3);
        this.time = periods * 15;
    }

    calcServings() {
        this.servings = 4;
    }

    parseIngredients() {
        const longerUnits = [
            "tablespoons",
            "tablespoon",
            "ounces",
            "ounce",
            "teaspoons",
            "teaspoon",
            "cups",
            "pounds",
            "pound",
        ];
        const shorterUnits = [
            "tbsp",
            "tbsp",
            "oz",
            "oz",
            "tsp",
            "tsp",
            "cup",
            "lbs",
            "pound",
        ];

        const newIngredients = this.ingredients.map(element => {
            //uniform units
            let ingredient = element.toLowerCase();
            longerUnits.forEach((currentUnit, i) => {
                ingredient = ingredient.replace(currentUnit, shorterUnits[i]);
            });
            //remove ()
            ingredient = ingredient.replace(/ *\([^)]*\) */g, " ");



            //parse ingredients into count, unit and ingredient
            const ingredientArr = ingredient.split(' ');
            //index where unit is located
            const unitIndex = ingredientArr.findIndex(element2 => {
                shorterUnits.includes(element2);
            });
            //ingredient object
            let ingredientObj;
            if (unitIndex > -1) {
                //there is a unit
                //example 4 1/2 cups, countArr is [4, 1/2] => eval("4+1/2") => 4.5
                //example 4 cups, countArr is [4]
                const countArr = ingredientArr.slice(0, unitIndex);

                let count;
                if (countArr.length === 1) {
                    //remove any - and replace with a +
                    count = eval(ingredientArr[0].replace('-', '+'));
                } else {
                    count = eval(ingredientArr.slice(0, unitIndex).join("+"));
                }

                ingredientObj = {
                    count,
                    unit: ingredientArr[unitIndex],
                    ingredient: ingredientArr.slice(unitIndex + 1).join(' ')
                };

            } else if (parseInt(ingredientArr[0], 10)) {
                // there is no unit but first element is a number(1 bread)
                ingredientObj = {
                    count: parseInt(ingredientArr[0], 10),
                    unit: '',
                    ingredient: ingredientArr.slice(1).join(' ')
                };


            } else if (unitIndex === -1) {
                ///there is no unit and no number in 1st position
                ingredientObj = {
                    count: 1,
                    unit: '',
                    ingredient
                };
            }

            return ingredientObj;
        });
        this.ingredients = newIngredients;
    }
}