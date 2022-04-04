<template>
  <div >

      <h1 align="center">
        <a href="#">
          <img alt="Survey"
               src="https://readme-typing-svg.herokuapp.com/?lines=Automotive+Sales+Customer+Survey&center=true&width=550&height=70">
        </a>
      </h1>

    <router-view />


  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'App',
  components: {
    },
  setup() {

  },

});
</script>

<style>

::v-deep(b) {
  display: block;
}

::v-deep(.p-card-body) {
  padding: 2rem;
}
</style>
