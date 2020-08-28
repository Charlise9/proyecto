<template>
  <div class="sendconsult">
    <h1>Enviar Consulta</h1>

    <label for="Seriusness">Gravedad:</label>
    <!-- <input type="text" id="Seriusness" placeholder="Gravedad" v-model="seriusness" /> -->
    <select id="Seriusness" v-model="seriusness">
      <option value="BAJA">BAJA</option>
      <option value="MEDIA">MEDIA</option>
      <option value="ALTA">ALTA</option>
    </select>

    <label for="Symptoms">Síntomas:</label>
    <input type="text" id="Symptoms" placeholder="Síntomas" v-model="sypmtoms" />

    <label for="MedicalHistory">Antecedentes médicos:</label>
    <input
      type="text"
      id="MedicalHistory"
      placeholder="Antecedentes médicos"
      v-model="medicalHistory"
    />

    <label for="Description">Descripción:</label>
    <input
      class="textArea"
      type="text"
      id="Description"
      placeholder="Descripción"
      v-model="description"
    />

    <label for="ConsultPic">Adjuntar imagen:</label>
    <input type="file" id="ConsultPic" ref="image" @change="consultImage" />

    <label for="ConsultDoc">Adjuntar documento:</label>
    <input type="file" id="ConsultDoc" ref="document" @change="consultDocument" />

    <button class="cancel" @click="goBack()">Cancelar</button>
    <button @click="sweetalertNewConsult()">Enviar</button>
  </div>
</template>

<script>
import axios from "axios";
import { getAuthToken } from "../helpers/utils";
import Swal from "sweetalert2";

export default {
  name: "SendConsult",
  data() {
    return {
      seriusness: null,
      sypmtoms: null,
      medicalHistory: null,
      description: null,
      image: null,
      document: null,
    };
  },
  methods: {
    sweetalertNewConsult() {
      Swal.fire({
        text: "Vas a enviar una consulta, ¿estás seguro?",
        icon: "question",
        confirmButtonText: "Sí",
        showCancelButton: true,
      }).then((result) => {
        if (result.value) {
          Swal.fire({
            title: "¡CONSULTA ENVIADA!",
            icon: "success",
            confirmButtonText: "Ok",
            onClose: () => {
              this.sendConsult();
              this.goBack();
            },
          });
        }
      });
    },

    // FUNCIÓN PARA SUBIR IMÁGENES
    async consultImage() {
      this.image = await this.$refs.image.files[0];
    },

    // FUNCIÓN PARA SUBIR DOCUMENTOS
    async consultDocument() {
      this.document = await this.$refs.document.files[0];
    },

    // FUNCIÓN PARA ENVIAR CONSULTA
    async sendConsult(id) {
      id = this.$route.params.id;

      try {
        let formData = new FormData();
        formData.append("seriusness", this.seriusness);
        formData.append("symptoms", this.sypmtoms);
        formData.append("medicalHistory", this.medicalHistory);
        formData.append("description", this.description);
        if (this.image !== null) {
          formData.append("image", this.image);
        }
        if (this.document !== null) {
          formData.append("document", this.document);
        }

        // LLAMADA DE AXIOS
        const response = await axios.post(
          `http://localhost:3000/doctors/${id}/consults`,
          formData,
          {
            headers: {
              Authorization: `${getAuthToken()}`,
            },
          }
        );

        console.log(response.data.data);
      } catch (error) {
        console.log(error);
      }
    },
    goBack() {
      this.$router.go(-1);
    },
  },
};
</script>

<style scoped>
</style>