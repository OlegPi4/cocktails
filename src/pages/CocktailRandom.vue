<script setup>
import axios from 'axios';
import { ref, computed} from 'vue'
import AppLayout from '../components/AppLayout.vue'
import { COCKTAIL_RANDOM, INGRADIENT_PIC } from '@/constants/api'
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css'
import { translate } from 'element-plus';


const cocktail = ref(null);           
const currentIngr = ref(null);

const ingredients = computed(() => {
   const ingredients = [];
   
   for(let i = 1; i <= 15; i++ ) {
      if(!cocktail.value[`strIngredient${i}`]) break

      const ingredient = {};
      ingredient.name = cocktail.value[`strIngredient${i}`];
      ingredient.measure = cocktail.value[`strMeasure${i}`];
      ingredients.push(ingredient);
   }
   return ingredients;
})


async function getCocktail(){
   const data = await axios.get(COCKTAIL_RANDOM)
   cocktail.value = data?.data?.drinks[0];
}

function pointMouse(ingredient) {
    currentIngr.value = ingredient;
}

function clearPointMouse() {
   currentIngr.value = null;
}

function numb() {
   let widthDoc = document.documentElement.clientWidth;
   if (widthDoc > 960) {
      return 3;
   } else if ( 860 <= widthDoc && widthDoc <= 960 ) {
      return 2;
   } else if ( 630 <= widthDoc && widthDoc < 860 ) {
     return 3;
   } else if ( 460 <= widthDoc && widthDoc < 630 ) {
      return 2;
   } else {
      return 1;
   }
}

function clickPagination(key) {
   const swiperWrap = document.querySelector('.swiper-wrapper');
   const swiperSlide = document.querySelector('.swiper-slide').clientWidth;
   
   let widthWrap = swiperWrap.clientWidth;
   let shiftBack = 0;
   
   if (widthWrap > 630) {
      shiftBack = 2;
   } else if ( 420 <= widthWrap && widthWrap <= 630 ) {
      shiftBack = 1;
   } else {
      shiftBack = 0;
   }

   let  shift = (swiperSlide * (key - shiftBack)) + 20;
   
   swiperWrap.style.cssText = `
   transform: translateX(-${shift}px);
   transition-duration: 500ms;
   `;
}

getCocktail();
</script>

<template>
   <div v-if="cocktail" class="wrap">
      <AppLayout 
         :imgUrl="cocktail.strDrinkThumb"
         :isBackButtonVisible="true"
         >
      <div class="wrapper">
         <div class="info">
            <div class="title">{{ cocktail.strDrink }}</div>
            <div class="line"></div>
            <div class="slider">
               <swiper
                  :slides-per-view="numb()"
                  :space-between="10"
                  class="swiper">
                  <swiper-slide
                     v-for="(ingredient, key) in ingredients "
                     :key="key"
                     @mouseover="pointMouse(ingredient)"
                     @mouseout="clearPointMouse()"
                     class="slide"
                      >
                     <img :src="`${INGRADIENT_PIC}${ingredient.name}-Small.png`" alt="ingredient">
                     <div class="name">
                        {{ ingredient.name }} :   {{ ingredient.measure }}                       
                     </div>
                  </swiper-slide>
               </swiper>   
               <div class="pagination">
                  <div v-for="(item, key) in ingredients"
                     :key="key"
                     class="point"
                     @click="clickPagination(key)"
                     @mouseover="pointMouse(item)"
                     @mouseout="clearPointMouse()"
                     :class="{'pointer-active' : item.name == (currentIngr !== null ? currentIngr.name : '')}" 
                  >
                  </div>
               </div>
            </div> 
            <div class="intruct">
               {{ cocktail.strInstructions }}
            </div>
         </div>
      </div>
   </AppLayout> 
   </div>
   
</template>

<style lang="sass" scoped>
@import '../assets/styles/main'

.slider
   padding: 50px 0px

.swiper
   width: 586px
   
   @media screen and (max-width: 960px)
      width: 520px

   @media screen and (max-width: 630px)
      width: 440px
      
   @media screen and (max-width: 480px)
      width: 300px

   @media screen and (max-width: 340px)
      width: 200px
.slide 
   min-height: 180px
      
.name
   padding-top: 15px

.pagination
   margin-top: 5px
   display: flex
   justify-content: center
   align-items: center
   max-height: 9px
   height: 100%
.point
   margin-left: 15px
   width: 7px
   height: 7px
   background-color: #fff
   border-radius: 50%

.pointer-active
   background-color: $accent   
   width: 11px
   height: 11px

</style>