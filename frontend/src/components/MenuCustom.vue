<template>
  <div class="menu">
    <div id="nav">
      <div class="homeButtons">
        <router-link :to="{  name: 'Home' }">
          <img class="icon" src="@/assets/casa.png" alt="foto inicio" /> Inicio
        </router-link>
        <router-link :to="{  name: 'About' }">
          <img class="icon" src="@/assets/informacion.png" alt="foto info" />Más información
        </router-link>
      </div>
      <div class="profileButtons">
        <router-link v-if="hide" :to="{  name: 'LoginPatient' }">
          <img class="icon" src="@/assets/iniciar-sesion.png" alt="foto login" />Acceso Paciente
        </router-link>
        <router-link v-if="hide" :to="{  name: 'LoginDoctor' }">
          <img class="icon" src="@/assets/iniciar-sesion.png" alt="foto login" />Acceso Médico
        </router-link>

        <p v-if="logged">{{ username }}</p>

        <router-link v-if="iAmUser" :to="{  name: 'ViewUserProfile', params:{ id:userId} }">
          <img class="icon" src="@/assets/usuario.png" alt="foto perfil" />Mi perfil
        </router-link>
        <router-link v-if="iAmDoctor" :to="{  name: 'ViewDoctorProfile', params:{id:userId} }">
          <img class="icon" src="@/assets/usuario.png" alt="foto perfil" />Mi perfil
        </router-link>

        <button class="logout" @click="$emit('logout')" v-show="canLogout">
          <img class="icon" src="@/assets/cerrar-sesion.png" alt="foto logout" />Logout
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MenuCustom",
  props: {
    username: String,
    logged: Boolean,
    hide: Boolean,
    canLogout: Boolean,
    userId: String,
    iAmUser: Boolean,
    iAmDoctor: Boolean,
  },
};
</script>

<style scoped>
a {
  text-decoration: none;
}

.icon {
  width: 15px;
  margin-right: 0.5rem;
}

.logout {
  background-color: red;
  color: black;
}
</style>