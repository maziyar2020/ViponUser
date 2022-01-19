<template>
  <Navbar :text="navbarText" />
  <div class="main-section" style="min-height:100vh;">درباره ویپون</div>
</template>

<script>
import Navbar from '@common/Navbar.vue'
export default {
  name : 'About',
  data(){
    return {
      navbarText : 'درباره ویپون'
    }
  },
  components:{
    Navbar
  }
}
</script>

<style scoped>

</style>