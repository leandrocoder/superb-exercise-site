<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="scss">

html, body {
  background-color: #2c3e50;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #ddd;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #ddd;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
