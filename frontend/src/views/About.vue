<template>
  <div class="about">
    <vue-headful title="Clientes  | About" />

    <div class="info">
      <h1 class="title">e - DOCTOR</h1>
      <img class="mypicture" src="@/assets/carlosbarrientos.jpg" alt="Carlos Barrientos" />
      <div class="aboutinfo">
        <h3>Información personal</h3>
        <p>
          Hola, gracias por visitar mi página, me llamo Carlos Barrientos Guillén, tengo 31 años y soy de Sada, A Coruña. Aunque tengo formación
          en recursos humanos (carrera y máster), mi experiencia laboral es financiera. Trabajé durante 14 meses en el departamento de Garantías y
          Tasaciones de ABANCA y 5 meses en Prosegur en un proyecto de cláusulas suelo. He decidido cambiar el rumbo de mi vida y dedicarme de pleno
          a la programación.
        </p>
      </div>
      <div class="aboutproject">
        <h3>Sobre el proyecto</h3>
        <p>
          Mi proyecto consiste en una app de consultas médicas online, en la que puedes buscar qué médico quieres que te atienda. Puedes elegir entre
          varios profesionales de las ramas de endocrinología, medicina de familia, ginecología y dermatología. Una vez te registres y loguees puedes
          enviar tu consulta al médico que elijas y él te responderá. En las consultas puedes adjuntar imágenes y documentos y una vez te responda el
          médico, podrás valorar su consulta.
        </p>
      </div>
      <div class="abouttechnology">
        <h3>Tecnologías usadas</h3>
        <ul>
          <li>
            <b>BASE DE DATOS:</b> utilicé SQL y el programa MySQL Workbech.
          </li>
          <li>
            <b>BACKEND:</b> JavaScript, Node JS, jsonwebtoken, Express, hapi-joi, Sendgrid, date-fns, sharp
          </li>
          <li>
            <b>FRONTEND:</b> Vue.js, JavaScript, Axios, HTML, CSS, vue-headful, sweetalert
          </li>
        </ul>
      </div>
      <div class="aboutcontact">
        <h3>Contáctame</h3>
        <p>
          Nº teléfono:
          <b>
            <i>+34 661 272 752</i>
          </b>
        </p>
        <a href="https://www.linkedin.com/in/carlosbarrgui/" target="_blank">
          <img src="@/assets/linkedin.png" alt="Logo de LinkedIn" />
        </a>
        <a
          href="mailto:carlosbarrientosguillen@gmail.com?Subject=Quiero%20contratarte"
          target="_blank"
        >
          <img src="@/assets/gmail.png" alt="Logo de Gmail" />
        </a>
      </div>
    </div>
  </div>
</template>
<style scoped>
.about {
  position: relative;
  min-height: 85vh;
}

.about:before {
  background-image: url("../assets/unansweredconsults-wallpaper.jpg");
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

.about .info img {
  width: 200px;
  display: block;
  margin: 2rem auto;
}

.about .info a img {
  width: 50px;
  display: inline-block;
  padding: 0.5rem;
}

.aboutinfo,
.aboutproject,
.abouttechnology {
  margin: 1rem auto;
  width: 65%;
  /* padding: 1rem; */
}

.about h3 {
  margin-bottom: 1rem;
}
.about ul li {
  padding: 0.5rem;
}
</style>
