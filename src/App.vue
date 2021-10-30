<template>
  <v-app id="app">
    <router-view/>
  </v-app>
</template>

<style lang="scss">

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #333;
}

.page {
  height: 100vh;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;

  .maincontent {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
}

h1, h2, h3, h4, h5, h6 {
  margin: 0;
  padding: 0;
}

.form {
  width: 500px;
}
</style>



