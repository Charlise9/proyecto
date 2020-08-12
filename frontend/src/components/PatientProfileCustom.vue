<template>
  <div>
    <h1>{{ patients.name}}</h1>
    <!-- <p>
      Fecha de registro:
      <span>{{ formatDate(patients.registrationDate) }}</span>
    </p>-->
    <!-- MODAL PARA VER LOS DATOS -->

    <button @click="seeInfo=true">Datos Usuario</button>

    <div v-show="seeInfo" class="modal">
      <div class="modalBox">
        <p>
          Fecha de registro:
          <span>{{ patients.registrationDate }}</span>
        </p>
        <p>
          Dirección:
          <span>{{patients.address}}</span>
        </p>
        <p>
          Localidad:
          <span>{{patients.location}}</span>
        </p>
        <p>
          DNI:
          <span>{{patients.dni}}</span>
        </p>
        <p>
          Fecha de nacimiento:
          <span>{{ patients.birthDate }}</span>
        </p>
        <p>
          Nº de la Seguridad Social:
          <span>{{ patients.socialSecurityNumber }}</span>
        </p>
        <p>
          Nº de Teléfono:
          <span>{{ patients.phoneNumber }}</span>
        </p>
        <p>
          Email:
          <span>{{ patients.email }}</span>
        </p>
        <button @click="seeInfo =! seeInfo">Cerrar</button>
        <button>Editar</button>
      </div>
    </div>

    <p>
      Consultas realizadas:
      <span>{{ patients.numberOfConsultsDone }}</span>
    </p>
    <!-- <p>{{patients.registrationDate}}</p> -->
  </div>
</template>

<script>
import { format } from "date-fns";

export default {
  name: "PatientProfileCustom",
  props: {
    patients: Object,
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