<template>
  <div class="ViewDoctorProfile">
    <vue-headful title="e-DOCTOR | mi perfil-doctor" />

    <div v-if="isLoaded">
      <h1>{{ doctors.name}}</h1>

      <img class="profile" v-if="doctors.image" :src="getImageName(doctors.image)" />
      <img class="profile" v-else src="@/assets/default-profile-picture.jpg" alt="Foto de perfil" />

      <h3>DATOS PERSONALES</h3>

      <!-- MODAL PARA VER LOS DATOS -->

      <button class="infoButtons" @click="seeInfo=true">Datos Usuario</button>

      <div v-if="seeInfo" class="modal">
        <div class="modalBox">
          <p>
            <b>Fecha de registro:</b>
            <span>{{ getFormat(doctors.registration_date) }}</span>
          </p>
          <p>
            <b>Especialidad:</b>
            <span>
              <i>{{doctors.speciality}}</i>
            </span>
          </p>
          <p>
            <b>Experiencia:</b>
            <span>{{ getFormatExperience(doctors.experience) }}</span>
          </p>
          <p>
            <b>Dirección:</b>
            <span>{{doctors.address}}</span>
          </p>
          <p>
            <b>Localidad:</b>
            <span>{{doctors.location}}</span>
          </p>
          <p>
            <b>Fecha de nacimiento:</b>
            <span>{{ getFormat(doctors.birth_date) }}</span>
          </p>
          <p>
            <b>Nº de colegiado:</b>
            <span>{{ doctors.collegiate_number }}</span>
          </p>
          <p>
            <b>DNI:</b>
            <span>{{ doctors.dni }}</span>
          </p>
          <p>
            <b>Nº de Teléfono:</b>
            <span>{{ doctors.phone_number }}</span>
          </p>
          <p>
            <b>Email:</b>
            <span>{{ doctors.email }}</span>
          </p>
          <button class="back" @click="seeInfo =! seeInfo">Cerrar</button>
          <button @click="editInfo=true, seeInfo=false">Editar</button>
        </div>
      </div>

      <!-- MODAL PARA EDITAR LOS DATOS DE USUARIO -->

      <div v-if="editInfo" class="modal">
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
          <input
            type="date"
            id="BirthDate"
            placeholder="Fecha de nacimiento"
            v-model="newBirthDate"
          />
          <label for="PhoneNumber">Nº de teléfono:</label>
          <input
            type="number"
            id="PhoneNumber"
            placeholder="Nº de teléfono"
            v-model="newPhoneNumber"
          />
          <label for="Email">Email:</label>
          <input type="email" id="Email" placeholder="Email" v-model="newEmail" />

          <label for="ProfilePic">Foto de perfil:</label>
          <input type="file" id="ProfilePic" ref="avatar" @change="profileImage" />

          <div class="buttons">
            <button class="cancel" @click="editInfo =! editInfo">Cancelar</button>
            <button @click="sweetalertEdit()">Confirmar cambios</button>
          </div>
        </div>
      </div>

      <button class="infoButtons" @click="editPass=true">Cambiar contraseña</button>

      <!-- MODAL PARA CAMBIAR LA CONTRASEÑA -->

      <div v-if="editPass" class="modal">
        <div class="modalBox">
          <h3>Actualiza tu contraseña</h3>
          <input type="password" placeholder="Tu contraseña actual" v-model="oldPassword" />
          <input type="password" placeholder="Contraseña nueva" v-model="newPassword" />
          <input
            type="password"
            placeholder="Confirmar contraseña nueva"
            v-model="repeatNewPassword"
          />
          <div class="buttons">
            <button class="cancel" @click="editPass =! editPass">Cancelar</button>
            <button @click="sweetalertEditPass()">Actualizar contraseña</button>
          </div>
        </div>
      </div>

      <button class="infoButtons" @click="seeStatistics=true">Estadísticas</button>

      <!-- MODAL PARA VER LAS ESTADÍSTICAS -->

      <div v-if="seeStatistics" class="modal">
        <div class="modalBox">
          <h2>Estadísticas</h2>
          <p>
            <b>Consultas recibidas:</b>
            <span>{{ questions.number_of_consults }}</span>
          </p>
          <p>
            <b>Consultas respondidas:</b>
            <span>{{statistics.number_of_answers}}</span>
          </p>
          <p>
            <b>Votos positivos:</b>
            <span>{{statistics.positives}}</span>
          </p>
          <p>
            <b>Votos negativos:</b>
            <span>{{statistics.negatives}}</span>
          </p>

          <button class="back" @click="seeStatistics =! seeStatistics">Cerrar</button>
        </div>
      </div>

      <h3>CONSULTAS</h3>

      <!-- BOTÓN PARA VER LAS CONSULTAS PENDIENTES DE CONTESTAR -->
      <router-link :to="{  name: 'UnansweredConsults', params:{ id:doctorId }}">
        <button>Consultas pendientes de responder {{ questions.number_of_consults - statistics.number_of_answers }}</button>
      </router-link>

      <!-- BOTÓN PARA VER EL HISTORIAL DE CONSULTAS -->
      <router-link :to="{  name: 'DoctorConsultsHistory', params:{ id:doctorId }}">
        <button>Ver historial de consultas</button>
      </router-link>
    </div>

    <!-- SPINNER -->
    <div v-else>
      <spinner />
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { getAuthToken } from "../helpers/utils";
import Swal from "sweetalert2";
import spinner from "@/components/SpinnerCustom.vue";
import { format, formatDistanceToNowStrict } from "date-fns";
import es from "date-fns/locale/es";

export default {
  name: "ViewDoctorProfile",
  components: {
    spinner,
  },
  data() {
    return {
      doctors: null,
      questions: {},
      statistics: {},
      doctorId: "",
      seeInfo: false,
      editInfo: false,
      avatar: null,
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
      isLoaded: false,
      newAvatar: null,
      format,
      formatDistanceToNowStrict,
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
              this.updateInfo();
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
    // FUNCIÓN PARA FORMATEAR LA FECHA

    getFormat(date) {
      return this.format(new Date(date), "dd-MM-yyyy");
    },

    getFormatToDB(date) {
      return this.format(new Date(date), "yyyy-MM-dd");
    },

    // FUNCIÓN PARA FORMATEAR LA EXPERIENCIA

    getFormatExperience(date) {
      return this.formatDistanceToNowStrict(new Date(date), {
        locale: es,
      });
    },

    // FUNCIÓN PARA VER LA IMAGEN
    getImageName(name) {
      return "http://localhost:3000/uploads/" + name;

      /* console.log(name); */
    },

    // FUNCIÓN PARA SUBIR IMÁGENES
    async profileImage() {
      this.newAvatar = await this.$refs.avatar.files[0];
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

        console.log(response.data.data);

        const info = response.data.data;

        this.doctors = response.data.data.doctor;
        this.questions = response.data.data.questions;
        this.statistics = response.data.data.statistics;

        this.doctorId = info.doctor.id;
        this.newName = info.doctor.name;
        this.newAddress = info.doctor.address;
        this.newLocation = info.doctor.location;
        this.newDni = info.doctor.dni;
        this.newBirthDate = this.getFormatToDB(info.doctor.birth_date);
        this.newPhoneNumber = info.doctor.phone_number;
        this.newEmail = info.doctor.email;

        this.isLoaded = true;
      } catch (error) {
        console.log(error);
      }
    },
    // FUNCIÓN PARA EDITAR LA INFO DEL MÉDICO
    async updateInfo(id) {
      id = this.$route.params.id;

      try {
        let formData = new FormData();
        formData.append("name", this.newName);
        formData.append("email", this.newEmail);
        formData.append("address", this.newAddress);
        formData.append("location", this.newLocation);
        formData.append("dni", this.newDni);
        formData.append("birthDate", this.newBirthDate);
        formData.append("phoneNumber", this.newPhoneNumber);
        if (this.newAvatar !== null) {
          formData.append("avatar", this.newAvatar);
        }

        // LLAMADA DE AXIOS
        const response = await axios.put(
          "http://localhost:3000/doctors/" + id,
          formData,
          {
            headers: {
              Authorization: `${getAuthToken()}`,
            },
          }
        );

        /* onsole.log(response.data.data); */

        this.getProfile();
        this.editInfo = false;
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
  async created() {
    await this.getProfile();
  },
};
</script>

<style scoped>
.span {
  padding-left: 1rem;
  font-size: 20rem;
}

.ViewDoctorProfile {
  position: relative;
  min-height: 85vh;
}

.ViewDoctorProfile:before {
  background-image: url("../assets/doctorprofile-wallpaper.jpg");
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  background-attachment: fixed;
  opacity: 0.5;
  min-height: 100%;
  z-index: -1;
  content: " ";
  display: block;
  position: absolute;
  width: 100%;
}
</style>