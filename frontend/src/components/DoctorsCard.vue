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
        <p>
          <b>{{doctor.name}}</b>
        </p>
        <p>
          <b>Especialidad:</b>
          <span>{{ doctor.speciality }}</span>
        </p>
        <button>Ver perfil</button>
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
</style>