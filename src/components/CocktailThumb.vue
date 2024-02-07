//CocktailThumb.vue
<script setup>
const props = defineProps({
   cocktail: {
      type: Object,
      required: true,
   }
})

</script>

<template>
   <div class="root">
      <RouterLink :to="`/cocktails/${cocktail.idDrink}`">
         <div 
            :style="`background-image: url(${cocktail.strDrinkThumb})`"  
            class="pic"></div>
         <div class="name"> {{ cocktail.strDrink }}</div>
      </RouterLink>   
   </div>
</template>

<style lang="sass" scoped>
@import '../assets/styles/main'

.root 
   width: calc((100% - 76px)/3)
   padding-right: 38px
   padding-bottom: 20px
   min-height: 245px
   
   @media screen and (max-width: 900px)
      width: calc((100% - 44px)/2)
      padding-right: 22px  

   @media screen and (max-width: 860px)
      width: calc((100% - 60px)/3)
      padding-right: 22px  

   @media screen and (max-width: 560px)
      width: calc((100% - 44px)/2)
      padding-right: 22px  

   @media screen and (max-width: 350px)
      width: calc((100% - 30px))
      padding-right: 10px

   &:ntn-child(3n+3)
      padding-right: 0

.pic
   width: 120px
   height: 120px
   margin: 0 auto
   background-repeat: no-repeat
   background-position: 50% 50%
   background-size: 100%
.name
   padding-top: 15px
   letter-spacing: 0.1em
   

</style>