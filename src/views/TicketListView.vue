<template>
  <main>
    <Navbar />
    <section class="ticket-list-wrapper">
      <h2>Daftar Tiket</h2>
      <TicketList />
    </section>
  </main>
</template>

<script setup>
import Navbar from '@/components/Navbar.vue'
import TicketList from '@/components/TicketList.vue'
</script>

<style scoped>
.ticket-list-wrapper {
  max-width: 1000px;
  margin: 2rem auto;
  padding: 2rem;
}
</style>
