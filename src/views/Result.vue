<template>
  <div class="home">
    <h1>Restaurant</h1>
    <h3>Booking</h3>
    <p>Your reservation are successful schedule to {{dayName}} {{date}} at {{hour}}</p>
    <button @click="$router.push('/')">Back to home page</button>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Home',
  beforeMount() {
      //if (this.$store.booking == null) this.$router.push('/')
  },
  computed: {
      ...mapGetters(['day', 'dayName', 'date', 'hour']),
  }
}
</script>
