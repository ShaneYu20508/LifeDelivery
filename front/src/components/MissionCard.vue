<template>
  <v-card>
    <v-card-title>{{ name }}</v-card-title>
  </v-card>
</template>

<script setup>
const props = defineProps(['_id','title','reward','description','createdAt','image'])
</script>
