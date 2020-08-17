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

    <button @click="editPass=true">Cambiar contraseña</button>

    <!-- MODAL PARA CAMBIAR LA CONTRASEÑA -->

    <div v-show="editPass" class="modal">
      <div class="modalBox">
        <h3>Actualiza tu contraseña</h3>
        <input type="password" placeholder="Tu contraseña actual" v-model="oldPassword" />
        <input type="password" placeholder="Contraseña nueva" v-model="newPassword" />
        <input type="password" placeholder="Confirmar contraseña nueva" v-model="repeatNewPassword" />
        <button @click="editPass =! editPass">Cancelar</button>
        <button @click="sweetalertEditPass()">Actualizar contraseña</button>
      </div>
    </div>

    <router-link :to="{  name: 'UnansweredConsults', params:{ id:doctorId }}">
      <button>Consultas pendientes de responder</button>
    </router-link>

    <router-link :to="{  name: 'DoctorConsultsHistory', params:{ id:doctorId }}">
      <button>Ver historial de consultas</button>
    </router-link>

    <button @click="seeStatistics=true">Estadísticas</button>

    <div v-show="seeStatistics" class="modal">
      <div class="modalBox">
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
        <button @click="seeStatistics =! seeStatistics">Cerrar</button>
      </div>
    </div>
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
      doctorId: "",
      seeInfo: false,
      editInfo: false,
      newName: "",
      newAddress: "",
      newLocation: "",
      newDni: "",
      newBirthDate: "",
      newPhoneNumber: "",
      newEmail: "",
      editPass: false,
      oldPassword: "",
      newPassword: "",
      repeatNewPassword: "",
      seeStatistics: false,
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
    sweetalertError() {
      Swal.fire({
        title: "¡ALERTA!",
        text: "Tienes campos vacíos",
        icon: "warning",
        confirmButtonText: "Ok",
      });
    },
    sweetalertErrorPassword() {
      Swal.fire({
        title: "¡ALERTA!",
        text: "No coinciden las contraseñas",
        icon: "warning",
        confirmButtonText: "Ok",
      });
    },
    sweetalertEditPass() {
      Swal.fire({
        text: "Vas a cambiar la contraseña, ¿estás seguro?",
        icon: "question",
        confirmButtonText: "Sí",
        showCancelButton: true,
      }).then((result) => {
        if (result.value) {
          Swal.fire({
            title: "CONTRASEÑA ACTUALIZADA!",
            icon: "success",
            confirmButtonText: "Ok",
            onClose: () => {
              this.updatePass();
            },
          });
        }
      });
    },
    // FUNCIÓN PARA VER EL PERFIL DEL MÉDICO
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

        /* console.log(response.data.data); */

        const info = response.data.data;

        this.doctors = response.data.data.doctor;
        this.questions = response.data.data.questions;
        this.statistics = response.data.data.statistics;

        this.doctorId = info.doctor.id;
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
    // FUNCIÓN PARA EDITAR LA INFO DEL MÉDICO
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

    // FUNCIÓN PARA EDITAR LA CONTRASEÑA
    async updatePass(id) {
      id = this.$route.params.id;

      if (
        this.oldPassword === "" ||
        this.newPassword === "" ||
        this.repeatNewPassword === ""
      ) {
        this.sweetalertError();
      } else if (this.newPassword !== this.repeatNewPassword) {
        this.sweetalertErrorPassword();
      } else {
        try {
          // LLAMADA DE AXIOS
          const response = await axios.post(
            `http://localhost:3000/doctors/${id}/password`,
            {
              oldPassword: this.oldPassword,
              newPassword: this.newPassword,
            },
            {
              headers: {
                Authorization: `${getAuthToken()}`,
              },
            }
          );

          this.oldPassword = "";
          this.newPassword = "";
          this.repeatNewPassword = "";

          this.editPass = false;
        } catch (error) {
          console.log(error);
        }
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