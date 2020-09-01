<template>
  <div>
    <h3>Bienvenido a tu página de Consultas Médicas Online</h3>
    <div id="searching">
      <input
        type="search"
        @keyup="searching()"
        v-model="searchInfo"
        placeholder="Buscar por nombre o especialidad"
      />
      <button class="search" @click="searching()">Buscar</button>
    </div>

    <div id="list">
      <ul class="list">
        <li v-for="doctor in showedDoctor" :key="doctor.id">
          <img id="profile" v-if="doctor.image" :src="getImageName(doctor.image)" />
          <img id="profile" v-else src="@/assets/default-profile-picture.jpg" alt="Foto de perfil" />

          <router-link
            class="name"
            :to="{  name: 'DoctorProfile', params:{ id:doctor.id }}"
          >{{ doctor.name}}</router-link>
          <p>
            <b>Especialidad:</b>
            <span>{{ doctor.speciality }}</span>
          </p>
          <p>
            <b>Experiencia:</b>
            <span>{{ getFormat(doctor.experience) }}</span>
          </p>
          <router-link :to="{  name: 'DoctorProfile', params:{ id:doctor.id }}">
            <button>Ver perfil</button>
          </router-link>
        </li>
      </ul>
    </div>

    <!-- PAGINACIÓN -->

    <div id="navigation" class="bd-example">
      <nav aria-label="Page navigation example">
        <ul class="pagination justify-content-center">
          <li class="page-item" :class="{disabled: currentPage === 0}">
            <button class="page-link" @click="previousPage">&lt;</button>
          </li>

          <li
            id="page"
            v-for="page in pages"
            :key="page"
            class="page-item"
            :class="{active: currentPage === page}"
          >
            <button class="page-link" @click="goToPage(page)">{{ page + 1 }}</button>
          </li>

          <li class="page-item" :class="{disabled: currentPage === pages.length -1}">
            <button class="page-link" @click="nextPage">&gt;</button>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script>
import { formatDistanceToNowStrict } from "date-fns";
import es from "date-fns/locale/es";

export default {
  name: "DoctorsCard",
  props: {
    doctors: Array,
  },

  data() {
    return {
      searchInfo: "",
      formatDistanceToNowStrict,
      currentIndex: 0,
      elementsPerPage: 6,
      currentPage: 0,
    };
  },
  computed: {
    showedDoctor() {
      return this.doctors.slice(
        this.currentIndex,
        this.currentIndex + this.elementsPerPage
      );
    },
    pages() {
      let numberOfPages = Math.ceil(this.doctors.length / this.elementsPerPage);
      let pageArray = [];
      for (let i = 0; i < numberOfPages; i++) {
        pageArray.push(i);
      }
      return pageArray;
    },
  },
  methods: {
    searching() {
      let search = this.searchInfo;
      this.$emit("doctorsList", search);
    },
    getFormat(date) {
      return this.formatDistanceToNowStrict(new Date(date), {
        locale: es,
      });
    },
    // FUNCIÓN PARA VER LA IMAGEN
    getImageName(name) {
      return "http://localhost:3000/uploads/" + name;
    },

    // FUNCIÓN PARA RETROCEDER EN LA PAGINACIÓN
    previousPage() {
      this.currentPage = this.currentPage - 1;
      this.currentIndex = this.currentIndex - this.elementsPerPage;
    },
    // FUNCIÓN PARA AVANZAR EN LA PAGINACIÓN
    nextPage() {
      this.currentPage = this.currentPage + 1;
      this.currentIndex = this.currentIndex + this.elementsPerPage;
    },
    // FUNCIÓN PARA IR A LA PÁGINA CONCRETA QUE QUIERES
    goToPage(page) {
      this.currentPage = page;
      this.currentIndex = page * this.elementsPerPage;
    },
  },
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}

#list ul {
  margin-bottom: 1.5rem;
  display: flex;
  justify-content: center;
  flex-direction: row;
  flex-wrap: wrap;
  max-width: 900px;
}

#list .name {
  border: none;
  text-decoration: none;
  background-color: transparent;
}

#list a {
  text-decoration: none;
  color: black;
  font-size: 20px;
  background: transparent;
}

#list {
  display: flex;
  flex-direction: column;
  align-items: center;
}

#list ul li {
  border: 2px solid #07689f;
  border-radius: 15px;
  margin: 2rem auto;
  display: inline-block;
  padding: 1rem 1rem;
  width: 14rem;
  height: 18rem;
  background-color: #e4f9ff;
}
/* #list ul li img {
  width: 100px;
  height: 100px;
} */

#list ul li .name {
  font-size: 1.15rem;
}

#list ul li p {
  display: block;
  padding: 0.3rem;
  font-size: 0.75rem;
}
#list ul li p span {
  margin-left: 0.3rem;
  font-size: 1rem;
}
#list ul li button {
  margin: 1rem auto;
  padding: 0.5rem 1rem;
}

#searching .search {
  margin-left: 1rem;
  padding: 0.5rem 1rem;
}

#searching {
  width: 60vh;
  margin: 1rem auto;
}

#profile {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  border: 3px solid #42b983;
  display: block;
  margin: 1rem auto;
}

/* PAGINACIÓN */

#navigation nav {
  display: block;
}

#navigation .bd-example {
  position: relative;
  /* padding: 1rem; */
  margin: 1rem -15px 0;
  border: solid #f7f7f9;
  /* border-width: 0.2rem 0 0; */
}

#navigation ::after,
::before {
  box-sizing: border-box;
}

#navigation .bd-example .pagination {
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
}

#navigation .justify-content-center {
  -webkit-box-pack: center !important;
  -ms-flex-pack: center !important;
  justify-content: center !important;
}
#navigation ul .pagination {
  display: block;
  list-style-type: disc;
  margin-block-start: 1em;
  margin-block-end: 1em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  padding-inline-start: 40px;
}

#navigation ul .pagination li {
  display: list-item;
  text-align: -webkit-match-parent;
}

#navigation .pagination {
  /* display: -webkit-box;
    display: -ms-flexbox; */
  display: flex;
  padding-left: 0;
  list-style: none;
  border-radius: 0.25rem;
}

.active {
  background-color: #07689f;
  color: whitesmoke;
}

/* #navigation ul li  */
.disabled {
  opacity: 0.4;
  cursor: not-allowed;
  pointer-events: none;
}

#navigation button {
  padding: 0.5rem;
  border-radius: 0;
  background-color: transparent;
  border: 1px solid #cccccc;
  color: black;
  font-family: var(--bodyFont);
}

#navigation button .active {
  color: whitesmoke;
}

#navigation button:hover {
  background-color: #a2d5f2;
}

@media (min-width: 576px) {
  #navigation .bd-example {
    padding: 1.5rem;
    margin-right: 0;
    margin-left: 0;
    border-width: 0.2rem;
  }
}
</style>