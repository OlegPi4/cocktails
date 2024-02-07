<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router';
import { Back } from '@element-plus/icons-vue'
import { ROUTER_PATH } from '@/constants';

const props = defineProps({
   imgUrl: {
      type: String,
      required: false,
   },
   backFunc: {
      type: Function,
      required: false,
   },
   isBackButtonVisible: {
      type: Boolean,
      default: false,
   }
});

const route = useRoute();
const router = useRouter();

const routeName = computed(() => route.name);

function goToCocktailRandom() {
   router.push(ROUTER_PATH.COCKTAIL_RANDOM);

   if (routeName.value === ROUTER_PATH.COCKTAIL_RANDOM ) {
      router.go();
   }
}

function goBack() {
   props.backFunc ? props.backFunc() : router.go(-1);
}

function getUrl() {
   let url = 'https://www.thecocktaildb.com/images/media/drink/ck6d0p1504388696.jpg'
   if (!props.imgUrl) {
      return url;   
   } 
   url = props.imgUrl;
   return url;
}

</script>

<template>
   <div class="root">
      <div 
         :style="`background-image: url(${getUrl()})`"
         class="img"></div>
      <div class="main">
         <div class="btns">
            <el-button v-if="isBackButtonVisible"
               size="large" 
               type="primary" 
               :icon="Back" 
               circle 
               class="back" 
               @click="goBack"/>
            <el-button
               class="btn"
               @click="goToCocktailRandom">Get random cocktail</el-button>
         </div>
         <div class="img-min"
            :style="`background-image: url(${getUrl()})`"
            >
         </div>
         <slot></slot>
      </div>
      
   </div>
</template>

<style lang="sass" scoped>
@import '../assets/styles/main'

.root 
   display: flex
   height: 100vh
   background-color: $background
   @media screen and (max-width: 860px)
  

.img
   width: 50%
   background-repeat: no-repeat
   background-position: 50% 50%
   background-size: cover
   @media screen and (max-width: 1212px)
      width: 37%

   @media screen and (max-width: 860px)
      display: none

      
.main
   position: relative
   width: 50%
   max-height: 100%
   padding: 32px 40px
   @media screen and (max-width: 1212px)
      width: 63%
   @media screen and (max-width: 860px)
      width: 100%
      padding: 25px 30px
   @media screen and (max-width: 460px)
      padding: 25px 15px
.btns
   height: 40px
   display: flex
   justify-content: space-between
   align-items: center
   flex-wrap: wrap   
   margin-bottom: 40px
.btn
   position: absolute
   top: 32px
   right: 40px
   font-size: 16px
   font-family: 'Raleway', 'Arial', sans-serif
   background-color: $accent
   border-color: $accent
   color: $text
   @media screen and (max-width: 460px)
      right: 20px

   &:hover,
   &:active
      background-color: darken($accent, 10%)
      border-color: darken($accent, 10%)

.back 
   font-size: 20px
   background-color: transparent
   border-color: #fff

   &:hover
      border-color: $accent 
      color: $accent

</style>