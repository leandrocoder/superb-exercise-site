<template>
  <div class="home">
    <h3>Welcome</h3>
    <h1>Restaurant</h1>
    <button @click="$router.push('/form')">Find a Table</button>
  </div>
</template>

<script>
export default {
  name: 'Home',
  mounted() {
    this.$store.commit('booking', null)
  }
}
</script>
