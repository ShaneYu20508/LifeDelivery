<template>
<v-card class="mailman-card">
    <v-img :src="image" cover height="200"></v-img>
    <v-card-title>
      <router-link class="text-decoration-none text-black" :to="'/mailmans/'+_id">{{ code }}</router-link>
    </v-card-title>
    <v-card-subtitle>{{ skills }}</v-card-subtitle>
    <v-card-text>{{ experience }} </v-card-text>
    <v-card-actions>
      <v-btn color="primary">指定幹員</v-btn>
    </v-card-actions>
</v-card>
</template>

<script setup>
const props = defineProps(['_id','code','experience','skills','image'])
</script>
