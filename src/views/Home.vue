<template>
  <div class="page">
    <div class="maincontent">
      <div>
        <h4>Welcome</h4>
        <h1>RESTAURANT</h1>
        <div class="mt-8">
          <v-btn to="form" color="primary">Find a Table</v-btn>
        </div>
      </div>
    </div>
    <v-spacer />
    <div class="footer">
      <p>Made by Leandro Carlos</p>
    </div>
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
