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

      if (this.$router.name !== "Home") {
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
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
  padding: 0 0.5rem;
}

#nav a.router-link-exact-active {
  color: #42b983;
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
}
button:hover {
  cursor: pointer;
  transform: scale(1.1);
}
.cancel {
  background-color: #1b262c;
  color: whitesmoke;
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

input[type="text"],
input[type="search"],
select {
  width: 70%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

label {
  display: block;
  text-align: left;
  margin-left: 10rem;
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