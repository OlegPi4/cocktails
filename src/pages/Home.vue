<script setup>
import AppLayout from '../components/AppLayout.vue'
import CocktailThumb from '../components/CocktailThumb.vue'
import { useRootStore } from '../stores/root'
import { storeToRefs } from 'pinia'

const rootStore = useRootStore();
rootStore.getIngredients();

const { ingredients, ingredient, cocktails } = storeToRefs(rootStore);

function getCocktails() {
   rootStore.getCocktails(rootStore.ingredient);
}

function removeIngredient() {
   rootStore.setIngradient(null); 
}

function isBackButtonVisible() {
   if (ingredient.value) {
      return true
   } else {
      return false
   }

}

</script>
<template>
   <AppLayout 
      :backFunc="removeIngredient"
      :is-back-button-visible="isBackButtonVisible()" > 
      <div class="wrapper">
         <div  v-if="!ingredient || !cocktails" class="info">
            <div class="title">Choose your drink</div>
            <div class="line"></div>
            <div class="select-wrapper">
               <el-select
                  v-model="rootStore.ingredient"
                  class="select"
                  filterable
                  allow-create
                  placeholder="Choose main ingredient"
                  size="large"
                  @change="getCocktails"
               >
                  <el-option
                     v-for="item in ingredients"
                     :key="item.strIngredient1"
                     :label="item.strIngredient1"
                     :value="item.strIngredient1"
                  />
               </el-select>
            </div>
            <p class="text">Try our delicious cocktail recipes for every occasion. Find delicious cocktail recipes by ingredient through our cocktail generator.</p>
            <img src="/src/assets/img/cocktails.png" alt="coctails" class="home-img">
         </div>
         <div  v-else class="info">
            <div class="title"> COCKTAILS WITH {{ ingredient }} </div>
            <div class="line line-cockt"></div>
            <div class="cocktails">
               <CocktailThumb 
                  v-for="cocktail in cocktails"
                  :key="cocktail.idDrink"
                  :cocktail="cocktail" />
            </div>
         </div>
      </div>
   </AppLayout>
</template>
<style lang="sass" scoped>
@import '../assets/styles/main'

.select-wrapper
   padding-top: 50px

.select 
   width: 240px

.text
   max-width: 516px
   padding: 0 15px
   margin: 20px auto 60px
   padding-top: 50px 10px 0px 10px
   line-height: 36px
   letter-spacing: 0.1em
   color: $textMuted
.line-cockt   
   margin-bottom: 60px
.cocktails
   display: flex
   flex-wrap: wrap
   justify-content: center
   align-items: center
   max-height: 400px
   overflow-y: auto

.cocktails::-webkit-scrollbar 
   width: 10px
   
.cocktails::-webkit-scrollbar-track 
   background: rgba($accent, 0.7)        
   border-radius: 6px
.cocktails::-webkit-scrollbar-thumb 
   background-color: #444
   border-radius: 20px
   border: 2px solid #ccc



.home-img

   @media screen and (max-width: 420px) 
      width: 280px
      height: 100px


</style>