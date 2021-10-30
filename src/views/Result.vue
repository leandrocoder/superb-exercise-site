<template>
  <div class="page">
    <div class="maincontent">
      <div>
        <h1>RESTAURANT</h1>
        <p class="mt-6">Your reservation are successful schedule to {{dayName}} {{date}} at {{hour}}</p>
        <v-btn to="/">Back to home</v-btn>
      </div>
    </div>
    <v-spacer />
    <div class="footer">
      <p>Made by Leandro Carlos</p>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Home',
  computed: {
      ...mapGetters(['day', 'dayName', 'date', 'hour']),
  }
}
</script>

