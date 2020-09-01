<template>
  <div class="ViewUserProfile">
    <vue-headful title="Hack A DOCTOR | mi perfil-paciente" />

    <div v-if="isLoaded">
      <h1>{{ patients.name}}</h1>

      <img class="profile" v-if="patients.image" :src="getImageName(patients.image)" />
      <img class="profile" v-else src="@/assets/default-profile-picture.jpg" alt="Foto de perfil" />

      <!--    MODAL PARA VER LA INFO DEL USUARIO -->

      <button @click="seeInfo=true">Datos Usuario</button>

      <div v-if="seeInfo" class="modal">
        <div class="modalBox">
          <p>
            <b>Fecha de registro:</b>
            <span>{{ getFormat(patients.registrationDate) }}</span>
          </p>
          <p>
            <b>Dirección:</b>
            <span>{{patients.address}}</span>
          </p>
          <p>
            <b>Localidad:</b>
            <span>{{patients.location}}</span>
          </p>
          <p>
            <b>DNI:</b>
            <span>{{patients.dni}}</span>
          </p>
          <p>
            <b>Fecha de nacimiento:</b>
            <span>{{ getFormat(patients.birthDate) }}</span>
          </p>
          <p>
            <b>Nº de la Seguridad Social:</b>
            <span>{{ patients.socialSecurityNumber }}</span>
          </p>
          <p>
            <b>Nº de Teléfono:</b>
            <span>{{ patients.phoneNumber }}</span>
          </p>
          <p>
            <b>Email:</b>
            <span>{{ patients.email }}</span>
          </p>
          <button class="back" @click="seeInfo =! seeInfo">Cerrar</button>
          <button @click="editInfo=true, seeInfo=false">Editar</button>
        </div>
      </div>

      <!-- MODAL PARA EDITAR LOS DATOS DE USUARIO  -->
      ￼
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
          <label for="SSNumber">Nº de la Seguridad Social:</label>
          <input
            type="number"
            id="SSNumber"
            placeholder="Nº de la Seguridad Social"
            v-model="newSocialSecurityNumber"
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

      <button @click="editPass=true">Cambiar contraseña</button>

      <!-- MODAL PARA CAMBIAR LA CONTRASEÑA -->

      <div v-if="editPass" class="modal">
        <div class="modalBox">
          <h3>Actualiza tu contraseña</h3>
          <input type="password" placeholder="Tu co￼ntraseña actual" v-model="oldPassword" />
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

      <router-link :to="{  name: 'PatientConsultsHistory', params:{ id:patientId }}">
        <button>Ver historial de consultas</button>
      </router-link>

      <h3>Estadísticas:</h3>

      <p>
        ￼
        Consultas realizadas:
        <span>{{ patients.numberOfConsultsDone }}</span>
      </p>

      <p>
        Nº de respuestas recibidas:
        <span>{{ patients.numberOfAnswers }}</span>
      </p>
    </div>

    <!-- SPINNER -->
    <div v-else>
      <spinner />
    </div>
  </div>
</template>

<script>
/* import patientprofile from "@/components/PatientProfileCustom.vue"; */
import axios from "axios";
import { getAuthToken } from "../helpers/utils";
import Swal from "sweetalert2";
import spinner from "@/components/SpinnerCustom.vue";
import { format } from "date-fns";

export default {
  name: "ViewUserProfile",
  components: {
    spinner,
  },
  data() {
    return {
      patients: null,
      seeInfo: false,
      editInfo: false,
      avatar: null,
      patientId: "",
      newName: "",
      newAddress: "",
      newLocation: "",
      newDni: "",
      newBirthDate: "",
      newSocialSecurityNumber: "",
      newPhoneNumber: "",
      newEmail: "",
      editPass: false,
      oldPassword: "",
      newPassword: "",
      repeatNewPassword: "",
      isLoaded: false,
      newAvatar: null,
      format,
    };
  },
  computed: {
    /* isLoaded() {
      return patients !== null;
      return false;
    }, */
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
              this.editInfo = false;
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
      {
      }
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
    // FUNCIÓN PARA EL FORMATO DE LA FECHA
    getFormat(date) {
      return this.format(new Date(date), "dd-MM-yyyy");
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

        /* console.log(response.data.data); */

        this.patients = response.data.data;

        this.patientId = response.data.data.id;
        this.newName = response.data.data.name;
        this.newAddress = response.data.data.address;
        this.newLocation = response.data.data.location;
        this.newDni = response.data.data.dni;
        this.newBirthDate = response.data.data.birthDate;
        this.newSocialSecurityNumber = response.data.data.socialSecurityNumber;
        this.newPhoneNumber = response.data.data.phoneNumber;
        this.newEmail = response.data.data.email;

        this.isLoaded = true;
      } catch (error) {
        console.log(error);
      }
    },
    // FUNCIÓN PARA EDITAR LA INFO DEL PACIENTE
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
        formData.append("socialSecurityNumber", this.newSocialSecurityNumber);
        formData.append("phoneNumber", this.newPhoneNumber);
        if (this.newAvatar !== null) {
          formData.append("avatar", this.newAvatar);
        }

        // LLAMADA DE AXIOS
        const response = await axios.put(
          "http://localhost:3000/users/" + id,
          formData,
          {
            headers: {
              Authorization: `${getAuthToken()}`,
            },
          }
        );

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
            `http://localhost:3000/users/${id}/password`,
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
</style>