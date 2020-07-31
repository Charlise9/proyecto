<template>
  <div>
    <ul>
      <li v-for="doctor in doctors" :key="doctor.id">
        <p>Nombre: {{doctor.name}}</p>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "DoctorsCard",
  props: {
    doctors: Array,
  },
};
</script>

<style scoped>
</style>