<template>
  <div class="ViewDoctorProfile">
    <vue-headful title="Hack A DOCTOR | mi perfil-doctor" />

    <h1>{{ doctors.name}}</h1>

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
        <button @click="editInfo=true, seeInfo=false">Editar</button>
      </div>
    </div>

    <!-- MODAL PARA EDITAR LOS DATOS DE USUARIO -->

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
        <label for="PhoneNumber">Nº de teléfono:</label>
        <input type="number" id="PhoneNumber" placeholder="Nº de teléfono" v-model="newPhoneNumber" />
        <label for="Email">Email:</label>
        <input type="email" id="Email" placeholder="Email" v-model="newEmail" />

        <button @click="editInfo =! editInfo">Cancelar</button>
        <button @click="sweetalertEdit(), updateInfo()">Confirmar cambios</button>
      </div>
    </div>

    <h2>Estadísticas</h2>

    <p>
      Consultas recibidas:
      <span>{{ questions.number_of_consults }}</span>
    </p>

    <p>
      Consultas respondidas:
      <span>{{statistics.number_of_answers}}</span>
    </p>

    <p>
      Votos positivos:
      <span>{{statistics.positives}}</span>
    </p>

    <p>
      Votos negativos:
      <span>{{statistics.negatives}}</span>
    </p>

    <p>
      Votos verificados:
      <span>{{ statistics.verifieds }}</span>
    </p>

    <p>
      Votos pendientes de verificar:
      <span>{{ statistics.not_verifieds }}</span>
    </p>
  </div>
</template>

<script>
import axios from "axios";
import { getAuthToken } from "../helpers/utils";
import Swal from "sweetalert2";

export default {
  name: "ViewDoctorProfile",
  components: {},
  data() {
    return {
      doctors: {},
      questions: {},
      statistics: {},
      seeInfo: false,
      editInfo: false,
      newName: "",
      newAddress: "",
      newLocation: "",
      newDni: "",
      newBirthDate: "",
      newPhoneNumber: "",
      newEmail: "",
    };
  },
  methods: {
    sweetalertEdit() {
      Swal.fire({
        text: "¿Seguro que quieres editar tus datos?",
        icon: "question",
        confirmButtonText: "Sí",
        showCancelButton: true,
      }).then((result) => {
        if (result.value) {
          Swal.fire({
            title: "¡DATOS ACTUALIZADOS!",
            text:
              "Si has actualizado el email, se te ha enviado un correo de confirmación",
            icon: "success",
            confirmButtonText: "Ok",
            onClose: () => {
              location.reload();
            },
          });
        }
      });
    },
    // FUNCIÓN PARA VER EL PERFIL DE USUARIO
    async getProfile(id) {
      id = this.$route.params.id;

      try {
        // LLAMADA DE AXIOS
        const response = await axios.get(
          "http://localhost:3000/doctors/" + id,
          {
            headers: {
              Authorization: `${getAuthToken()}`,
            },
          }
        );

        console.log(response.data.data);

        const info = response.data.data;

        this.doctors = response.data.data.doctor;
        this.questions = response.data.data.questions;
        this.statistics = response.data.data.statistics;

        this.newName = info.doctor.name;
        this.newAddress = info.doctor.address;
        this.newLocation = info.doctor.location;
        this.newDni = info.doctor.dni;
        this.newBirthDate = info.doctor.birth_date;
        this.newPhoneNumber = info.doctor.phone_number;
        this.newEmail = info.doctor.email;
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
          "http://localhost:3000/doctors/" + id,
          {
            name: this.newName,
            email: this.newEmail,
            address: this.newAddress,
            location: this.newLocation,
            dni: this.newDni,
            birthDate: this.newBirthDate,
            phoneNumber: this.newPhoneNumber,
          },
          {
            headers: {
              Authorization: `${getAuthToken()}`,
            },
          }
        );

        console.log(response.data.data);

        /* this.editInfo = false; */
      } catch (error) {
        console.log(error);
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