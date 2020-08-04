<template>
  <div>
    <input
      type="search"
      @keyup="searchByName()"
      v-model="searchName"
      placeholder="Buscar por nombre o especialidad"
    />
    <button @click="searchByName()">Buscar</button>
    <br />
    <!--  <input type="search" v-model="searchSpeciality" placeholder="Buscar por especialidad" />
    <button>Buscar</button>
    -->
    <ul id="searchByName">
      <li v-for="doctor in doctors" :key="doctor.id">
        <p>
          <b>{{doctor.name}}</b>
        </p>
        <p>
          <b>Especialidad:</b>
          <span>{{ doctor.speciality }}</span>
        </p>
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
      searchName: "",
      searchSpeciality: "",
    };
  },
  methods: {
    searchByName() {
      let search = this.searchName;
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
</style>