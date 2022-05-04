<template>
  <body>
    <header>
      <h1 class="title">Hello movie sites</h1>
      <nav class="nav">
        <ul class="menu-group">
          <router-link class="menu-item" to="/">top</router-link>
          <router-link class="menu-item" to="/home">home</router-link>
          <router-link class="menu-item" to="/trending">trending</router-link>
        </ul>
      </nav>
    </header>

    <router-view></router-view>
  </body>
</template>


<script>
export default {};
</script>

<style>
header {
  display: flex;
  width: 100%;
  height: 50px;
  background-color: silver;
  align-items: center;
}

.title {
  margin-right: auto;
}

.menu-item {
  list-style: none;
  display: inline-block;
  padding: 10px;
}

#moreItemField ul {
  list-style: none;
  padding-left: 0;
  /* width: 300px; */
}
#moreItemField li div {
  display: block;
  padding: 5px;
  text-decoration: none;
  color: #666 !important;
  cursor: pointer;
}
#moreItemField li div.select {
  background: #f2f2f2;
  padding-left: 5px;
}

.movie-contents {
  display: flex;
  padding: 10px;
  /* justify-content: space-between; */
  /* width: 1500px; */
  /* padding: 0 4%; */
}

.movie-list {
  padding: 10px;
  /* position: absolute;
  top: 100px;
  left: 200px; */
  width: 1500px;
}
</style>
