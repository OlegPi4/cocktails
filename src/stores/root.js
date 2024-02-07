// stores/root.js
import { defineStore } from 'pinia'
import axios from 'axios'
import { INGRADIENTS_URL, COCKTAILS_BY_INGR_URL} from '../constants'

export const useRootStore = defineStore('root', {
  state: () => ({
    ingredients: [],
    ingredient: null,
    cocktails:[],
  }),
  actions: {
    async getIngredients() {
      const data = await axios.get(INGRADIENTS_URL)
      this.ingredients = data?.data?.drinks;
    },
    async getCocktails(ingredient) {
      const data = await axios.get(`${COCKTAILS_BY_INGR_URL}${ingredient}`)
      this.cocktails = data?.data?.drinks;
    },
    setIngradient(val) {
      this.ingredient = val;
    },
    async getCocktail(ingredientId) {
      const data = await axios.get(`${COCKTAILS_BY_INGR_URL}${ingredientId}`)
    }
  }
})
