<template>
    <v-row id="home" class="bg-c1">
      <v-col class="d-none d-sm-none d-md-flex pa-0">
        <v-main class="d-flex pa-0">
          <v-img
          id="big-pic"
          src="../../../imgs/detective.jfif"></v-img>
          <v-img
          id="sm-pic01"
          src="../../../imgs/sm-pic01.jpg"></v-img>
          <v-img
          id="sm-pic02"
          src="../../../imgs/sm-pic02.jpg"></v-img>
        </v-main>
      </v-col>
      <v-col class="xs-12 d-flex align-center pa-0">
        <v-main class="text-center pa-0">
          <h1 class="text-h2 text-c2">Life Delivery</h1>
          <h2 class="text-overline text-c2">special service for special request</h2>
        </v-main>
      </v-col>
    </v-row>
</template>

<style scoped>
#home{
  height: calc(100% + 12px);
}
</style>

<script>
import { gsap } from 'gsap'

export default {
  mounted () {
    gsap.from('h1', { duration: 1, opacity: 0, y: -50 })
    gsap.from('h2', { duration: 1.5, opacity: 0, delay: 1.5 })
  }
}

</script>
