<template>
  <div class="VoteAnswer">
    <h1>Votar respuesta</h1>

    <img id="choice" src="@/assets/morpheus.gif" alt="Choice" />

    <h3>Escoge...</h3>

    <h3>¿Fue efectivo el tratamiento?</h3>

    <button id="negative" @click="negativeVote()">No</button>

    <button id="positive" @click="positiveVote()">Si</button>

    <button class="goback back" @click="goBack()">Volver</button>
  </div>
</template>

<script>
import axios from "axios";
import { getAuthToken } from "../helpers/utils";
import Swal from "sweetalert2";

export default {
  name: "VoteAnswer",
  data() {
    return {
      chooseVote: null,
    };
  },
  methods: {
    sweetalertVote() {
      Swal.fire({
        text: "Vas a votar una respuesta, ¿estás seguro?",
        icon: "question",
        confirmButtonText: "Sí",
        showCancelButton: true,
      }).then((result) => {
        if (result.value) {
          Swal.fire({
            title: "¡RESPUESTA VOTADA!",
            icon: "success",
            confirmButtonText: "Ok",
            onClose: () => {
              this.goBack();
            },
          });
        }
      });
    },

    // FUNCIÓN PARA VOTAR LA RESPUESTA
    async voteAnswer(id) {
      id = this.$route.params.id;

      if (this.chooseVote !== null) {
        try {
          // LLAMADA DE AXIOS
          const response = await axios.post(
            `http://localhost:3000/users/answers/${id}/vote`,
            {
              vote: this.chooseVote,
            },
            {
              headers: {
                Authorization: `${getAuthToken()}`,
              },
            }
          );

          console.log(response.data);
        } catch (error) {
          console.log(error);
        }
      }
    },
    negativeVote() {
      this.chooseVote = false;
      this.voteAnswer();
      this.sweetalertVote();
    },
    positiveVote() {
      this.chooseVote = true;
      this.voteAnswer();
      this.sweetalertVote();
    },

    goBack() {
      this.$router.go(-1);
    },
  },
  created() {
    /* this.voteAnswer(); */
  },
};
</script>

<style scoped>
#choice {
  width: 50%;
  display: block;
  margin: 2rem auto;
}

#negative {
  background-color: rgb(206, 25, 25);
}

#positive {
  background-color: rgb(26, 79, 226);
}

.goback {
  display: block;
  margin: 2rem auto;
}

.VoteAnswer {
  position: relative;
  min-height: 85vh;
}

.VoteAnswer:before {
  background-image: url("../assets/vote-wallpaper.gif");
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