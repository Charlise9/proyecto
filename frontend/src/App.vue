<template>
  <div id="app">
    <menucustom
      :username="username"
      :logged="logged"
      :hide="hide"
      :canLogout="canLogout"
      :userId="userId"
      :iAmUser="iAmUser"
      :iAmDoctor="iAmDoctor"
      @logout="logoutUser"
    />
    <router-view @login="getName" />
    <footercustom />
  </div>
</template>

<script>
import menucustom from "@/components/MenuCustom.vue";
import footercustom from "@/components/FooterCustom.vue";
import { logout, getId, isLoggedIn } from "@/helpers/utils";

export default {
  name: "App",
  components: {
    menucustom,
    footercustom,
  },
  data() {
    return {
      username: "",
      logged: false,
      hide: true,
      canLogout: false,
      userId: "",
      iAmUser: false,
      iAmDoctor: false,
    };
  },
  methods: {
    getName() {
      this.username = localStorage.getItem("NAME");
      this.logged = isLoggedIn();
      this.hide = false;
      this.canLogout = true;
      this.userId = getId();

      const type = localStorage.getItem("KIND_OF_USER");

      if (type === "patient") {
        this.iAmUser = true;
        this.iAmDoctor = false;
      } else if (type === "doctor") {
        this.iAmDoctor = true;
        this.iAmUser = false;
      } else {
        this.iAmDoctor = false;
        this.iAmUser = false;
        this.hide = true;
        this.canLogout = false;
      }
    },
    logoutUser() {
      this.hide = true;
      this.canLogout = false;
      this.logged = false;
      this.iAmDoctor = false;
      this.iAmUser = false;
      logout();
      /* this.$router.push("/"); */

      if (this.$route.name !== "Home") {
        this.$router.push({ name: "Home" });
      }
    },
  },
  created() {
    this.getName();
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Comfortaa:wght@300&family=Pacifico&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Pacifico&display=swap");

* {
  margin: 0;
  padding: 0;
}

html {
  --titleFont: Pacifico, sans-serif;
  --bodyFont: Comfortaa, sans-serif;
}

ul {
  list-style: none;
}

#app {
  font-family: var(--bodyFont) /* Avenir, Helvetica, Arial, sans-serif */;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#app h1,
h3 {
  font-family: var(--titleFont);
}

#nav {
  /* text-align: center;
  margin: 2rem 1rem;
  min-height: 40px; */
  /* padding: 0 2rem; */
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #cffffe;
  /* position: fixed; */
  width: 100%;
  height: 4rem;
}

.homeButtons {
  display: inline-block;
  /* float: left; */
  padding-left: 2rem;
}

#nav .profileButtons {
  text-align: center;
  display: inline-block;
  /* float: right; */
  padding-right: 4rem;
}

#nav .profileButtons p {
  display: inline-block;
  margin: 1rem;
}

#nav .profileButtons button {
  margin-top: 1rem;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
  padding: 0 0.5rem;
}

#nav a.router-link-exact-active {
  color: #ff9234;
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  background: rgb(0, 0, 0, 0.5);
}

.modalBox {
  background-color: #fefefe;
  margin: 2% auto;
  padding: 3rem;
  width: 80%;
  border: 2px solid #42b983;
  border-radius: 12px;
}

.modalBox p {
  margin: 1rem;
}

.modalBox span {
  padding-left: 1rem;
}

.profile {
  width: 200px;
  height: 200px;
  border-radius: 50%;
  border: 3px solid #42b983;
  display: block;
  margin: 2rem auto;
}

/* input:hover {
  border: 2px solid #42b983;
  cursor: pointer;
} */
input:focus {
  outline: none;
}
button:focus {
  outline: none;
}
button {
  margin: 1rem;
  background-color: #42b983;
  border: none;
  color: white;
  padding: 10px 25px;
  text-align: center;
  text-decoration: none;
  font-size: 12px;
  border-radius: 12px;
  transition: all 0.5s;
  font-family: var(--bodyFont);
}
button:hover {
  cursor: pointer;
  transform: scale(1.1);
}
.cancel {
  background-color: #1b262c;
  color: whitesmoke;
}

.back {
  background-color: #07689f;
}

.buttons {
  display: block;
}
/* input {
  margin: 0.1rem;
  border-radius: 12px;
  border: 2px solid #42b983;
  width: 300px;
  text-align: center;
  display: block;
}

label {
  display: inline-block;
} */

input,
input[type="search"],
select {
  width: 70%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  font-family: var(--bodyFont);
}

label {
  display: block;
  text-align: center;
  font-weight: bold;
}

.sendconsult {
  border-radius: 5px;
  background-color: #f2f2f2;
  padding: 20px;
}

.textArea {
  height: 150px;
}
</style>