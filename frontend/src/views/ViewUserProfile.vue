<template>
  <div class="ViewUserProfile">
    <vue-headful title="Hack A DOCTOR | mi perfil-paciente" />

    <h1>{{ patients.name}}</h1>

    <!--    MODAL PARA VER LA INFO DEL USUARIO -->

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
        <button @click="editInfo=true, seeInfo=false">Editar</button>
      </div>
    </div>

    <!-- MODAL PARA EDITAR LOS DATOS DE USUARIO  -->

    <div v-show="editInfo" class="modal">
      <div class="modalBox">
        <h3>Actualiza tu información</h3>
        <label for="Name">Nombre:</label>
        <input type="text" id="Name" placeholder="Nombre" v-model="newName" />
        <label for="Address">Dirección:</label>
        <input type="text" id="Address" placeholder="Dirección" v-model="newAddress" />
        <label for="Location">Localidad:</label>
        <input type="text" id="Location" placeholder="Localización" v-model="newLocation" />
        <label for="Dni">DNI:</label>
        <input type="text" id="Dni" placeholder="DNI" v-model="newDni" />
        <label for="BirthDate">Fecha de nacimiento:</label>
        <input type="date" id="BirthDate" placeholder="Fecha de nacimiento" v-model="newBirthDate" />
        <input
          type="number"
          placeholder="Nº de la Seguridad Social"
          v-model="newSocialSecurityNumber"
        />
        <input type="number" placeholder="Nº de teléfono" v-model="newPhoneNumber" />
        <input type="email" placeholder="Email" v-model="newEmail" />

        <button @click="editInfo =! editInfo">Cancelar</button>
        <button @click="updateInfo()">Confirmar cambios</button>
      </div>
    </div>

    <p>
      Consultas realizadas:
      <span>{{ patients.numberOfConsultsDone }}</span>
    </p>
  </div>
</template>

<script>
/* import patientprofile from "@/components/PatientProfileCustom.vue"; */
import axios from "axios";
import { getAuthToken } from "../helpers/utils";

export default {
  name: "ViewUserProfile",
  components: {
    /* patientprofile, */
  },
  data() {
    return {
      patients: {},
      seeInfo: false,
      editInfo: false,
      newName: "",
      newAddress: "",
      newLocation: "",
      newDni: "",
      newBirthDate: "",
      newSocialSecurityNumber: "",
      newPhoneNumber: "",
      newEmail: "",
    };
  },
  methods: {
    // FUNCIÓN PARA VER EL PERFIL DE USUARIO
    async getProfile(id) {
      id = this.$route.params.id;

      try {
        // LLAMADA DE AXIOS
        const response = await axios.get("http://localhost:3000/users/" + id, {
          headers: {
            Authorization: `${getAuthToken()}`,
          },
        });

        console.log(response.data.data);

        this.patients = response.data.data;

        this.newName = response.data.data.name;
        this.newAddress = response.data.data.address;
        this.newLocation = response.data.data.location;
        this.newDni = response.data.data.dni;
        this.newBirthDate = response.data.data.birthDate;
        this.newSocialSecurityNumber = response.data.data.socialSecurityNumber;
        this.newPhoneNumber = response.data.data.phoneNumber;
        this.newEmail = response.data.data.email;
      } catch (error) {
        console.log(error);
      }
    },
    // FUNCIÓN PARA EDITAR LA INFO DEL PACIENTE
    async updateInfo(id) {
      id = this.$route.params.id;

      try {
        // LLAMADA DE AXIOS
        const response = await axios.put(
          "http://localhost:3000/users/" + id,
          {
            name: this.newName,
            email: this.newEmail,
            address: this.newAddress,
            location: this.newLocation,
            dni: this.newDni,
            birthDate: this.newBirthDate,
            socialSecurityNumber: this.newSocialSecurityNumber,
            phoneNumber: this.newPhoneNumber,
          },
          {
            headers: {
              Authorization: `${getAuthToken()}`,
            },
          }
        );

        console.log(response.data.data);

        this.editInfo = false;
      } catch (error) {
        console.log(error);
      } finally {
        location.reload();
      }
    },
  },
  created() {
    this.getProfile();
  },
};
</script>

<style scoped>
</style>