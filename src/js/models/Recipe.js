import axios from "axios";


export default class Recipe {
    constructor(uri) {
        this.uri = uri;
    }

    async getRecipe() {
        try {
            const res = await axios(`https://forkify-api.herokuapp.com/api/get?rId=47746`);
            console.log(res);
        } catch (error) {
            console.log(error);
        }
    }
};