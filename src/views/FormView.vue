<template>
  <main>
    <Navbar />
    <section class="form-wrapper">
      <h2>Buat Tiket Baru</h2>
      <FormTiket />
    </section>
  </main>
</template>

<script setup>
import Navbar from '@/components/Navbar.vue'
import FormTiket from '@/components/FormTiket.vue'
</script>

<style scoped>
.form-wrapper {
  max-width: 800px;
  margin: 2rem auto;
  padding: 2rem;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 0 10px #ddd;
}
</style>
