<template>
  <div>
    <h3>Bienvenido a tu página de Consultas Médicas Online</h3>
    <input
      type="search"
      @keyup="searching()"
      v-model="searchInfo"
      placeholder="Buscar por nombre o especialidad"
    />
    <button @click="searching()">Buscar</button>
    <br />
    <!--  <input type="search" v-model="searchSpeciality" placeholder="Buscar por especialidad" />
    <button>Buscar</button>
    -->
    <ul>
      <li v-for="doctor in doctors" :key="doctor.id">
        <!-- <button class="name">
          <a href>{{ doctor.name }}</a>
        </button>-->
        <router-link :to="{  name: 'DoctorProfile', params:{ id:doctor.id }}">{{ doctor.name}}</router-link>
        <p>
          <b>Especialidad:</b>
          <span>{{ doctor.speciality }}</span>
        </p>
        <p>
          <b>Experiencia:</b>
          <span>{{ doctor.experience }}</span>
        </p>
        <router-link :to="{  name: 'DoctorProfile', params:{ id:doctor.id }}">
          <button>Ver perfil</button>
        </router-link>
      </li>
    </ul>

    <!-- <ul id="searchBySpeciality">
      <li v-for="doctor in filteredSpeciality" :key="doctor.id">
        <p>
          <b>{{doctor.name}}</b>
        </p>
        <p>
          <b>Especialidad:</b>
          <span>{{ doctor.speciality }}</span>
        </p>
      </li>
    </ul>-->
  </div>
</template>

<script>
export default {
  name: "DoctorsCard",
  props: {
    doctors: Array,
  },
  data() {
    return {
      searchInfo: "",
    };
  },
  methods: {
    searching() {
      let search = this.searchInfo;
      this.$emit("doctorsList", search);
    },
  },

  computed: {
    /* filteredName() {
      if (!this.searchName) {
        return this.doctors;
      }
      return this.doctors.filter((doctor) =>
        doctor.name.toLowerCase().includes(this.searchName.toLowerCase())
      );
    },

    filteredSpeciality() {
      if (!this.searchSpeciality) {
        return this.doctors;
      }
      return this.doctors.filter((doctor) =>
        doctor.speciality
          .toLowerCase()
          .includes(this.searchSpeciality.toLowerCase())
      );
    }, */
  },
};
</script>

<style scoped>
ul {
  list-style: none;
}

ul li {
  margin-bottom: 1.5rem;
}

.name {
  border: none;
  text-decoration: none;
  background-color: white;
}

a {
  text-decoration: none;
  color: black;
  font-size: 20px;
}
</style>