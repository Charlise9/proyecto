<template>
  <div>
    <div id="list">
      <ul>
        <li v-for="consult in showedConsults" :key="consult.id">
          <p>
            <b>Código de consulta:</b>
            <span>{{ consult.consultation_id }}</span>
          </p>
          <p>
            <b>Paciente que realizó la consulta:</b>
            <span>{{ consult.consult_patient }}</span>
          </p>
          <p>
            <b>Fecha:</b>
            <span>{{ getFormat(consult.date) }}</span>
          </p>
          <p>
            <b>Dirigida al doctor/a:</b>
            <span>{{consult.doctor_name}}</span>
          </p>
          <p>
            <b>Especialista en:</b>
            <span>{{consult.speciality}}</span>
          </p>
          <p>
            <b>Gravedad:</b>
            <span>{{ consult.seriusness }}</span>
          </p>
          <p>
            <b>Síntomas:</b>
            <span>{{ consult.symptoms }}</span>
          </p>
          <p>
            <b>Antecedentes médicos:</b>
            <span>{{ consult.medical_history }}</span>
          </p>
          <p>
            <b>Descripción:</b>
            <span>{{ consult.description }}</span>
          </p>
          <p>
            <b>Foto adjunta:</b>

            <span>
              <a v-if="consult.image" :href="getImageName(consult.image)" target="_blank">
                <button class="file">Ver imagen adjunta</button>
              </a>
              <p v-else>No hay imágen adjunta</p>
            </span>
          </p>
          <p>
            <b>Archivo adjunto:</b>
            <span>
              <a v-if="consult.document" :href="getFileName(consult.document)" target="_blank">
                <button class="file">Ver documento adjunto</button>
              </a>
              <p v-else>No hay documento adjunto</p>
            </span>
          </p>

          <router-link :to="{  name: 'ViewAnswer', params:{ id:consult.answer_id }}">
            <button>Ver respuesta</button>
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
import { format } from "date-fns";

export default {
  name: "ConsultsHistoryCustom",
  props: {
    consults: Array,
  },
  data() {
    return {
      format,
      currentIndex: 0,
      elementsPerPage: 4,
      currentPage: 0,
    };
  },
  computed: {
    showedConsults() {
      return this.consults.slice(
        this.currentIndex,
        this.currentIndex + this.elementsPerPage
      );
    },
    pages() {
      let numberOfPages = Math.ceil(
        this.consults.length / this.elementsPerPage
      );
      let pageArray = [];
      for (let i = 0; i < numberOfPages; i++) {
        pageArray.push(i);
      }
      return pageArray;
    },
  },
  methods: {
    getFormat(date) {
      return this.format(new Date(date), "dd-MM-yyyy  HH:mm");
    },

    // FUNCIÓN PARA VER LA IMAGEN
    getImageName(name) {
      return "http://localhost:3000/uploads/" + name;
    },

    // FUNCIÓN PARA VER EL DOCUMENTO
    getFileName(name) {
      return "http://localhost:3000/files/" + name;
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

#list {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 0.75rem;
}

#list ul {
  margin-bottom: 1.5rem;
  display: flex;
  justify-content: center;
  flex-direction: row;
  flex-wrap: wrap;
  max-width: 900px;
}

#list ul li {
  border: 2px solid #07689f;
  border-radius: 15px;
  margin: 2rem auto;
  display: block;
  padding: 1rem;
  width: 22rem;
  height: 24rem;
  background-color: #e4f9ff;
}
#list ul li p {
  display: block;
  padding: 0.3rem;
  font-size: 0.75rem;
}

#list ul li p span {
  margin-left: 0.3rem;
  /* font-size: 1rem; */
}

#list ul li button {
  margin: 0.5rem auto;
  padding: 0.5rem 1rem;
}

#list ul li .file button {
  margin: 1rem auto;
  padding: 0.5rem 0.5rem;
}

.file {
  color: whitesmoke;
  font-size: 0.6rem;
  background-color: #07689f;
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