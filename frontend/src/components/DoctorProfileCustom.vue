<template>
  <div>
    <h1>{{ doctors.name}}</h1>
    <!-- <p>
      Fecha de registro:
      <span>{{ formatDate(doctors.registrationDate) }}</span>
    </p>-->
    <!-- MODAL PARA VER LOS DATOS -->

    <button @click="seeInfo=true">Datos Usuario</button>

    <div v-show="seeInfo" class="modal">
      <div class="modalBox">
        <p>
          Fecha de registro:
          <span>{{ doctors.registration_date }}</span>
        </p>
        <p>
          Especialidad:
          <span>{{doctors.speciality}}</span>
        </p>
        <p>
          Experiencia:
          <span>{{doctors.experience}}</span>
        </p>
        <p>
          Dirección:
          <span>{{doctors.address}}</span>
        </p>
        <p>
          Localidad:
          <span>{{doctors.location}}</span>
        </p>
        <p>
          Fecha de nacimiento:
          <span>{{ doctors.birth_date }}</span>
        </p>
        <p>
          Nº de colegiado:
          <span>{{ doctors.collegiate_number }}</span>
        </p>
        <p>
          DNI:
          <span>{{ doctors.dni }}</span>
        </p>
        <p>
          Nº de Teléfono:
          <span>{{ doctors.phone_number }}</span>
        </p>
        <p>
          Email:
          <span>{{ doctors.email }}</span>
        </p>
        <button @click="seeInfo =! seeInfo">Cerrar</button>
        <button>Editar</button>
      </div>
    </div>

    <p>
      Consultas recibidas:
      <span>{{ questions.number_of_consults }}</span>
    </p>
  </div>
</template>

<script>
import { format } from "date-fns";

export default {
  name: "DoctorProfileCustom",
  props: {
    doctors: Object,
    questions: Object,
    statistics: Object,
  },
  data() {
    return {
      seeInfo: false,
    };
  },
  methods: {
    formatDate(date) {
      return format(new Date(date), "dd-MM-yyyy");
    },
  },
};
</script>

<style scoped>
</style>