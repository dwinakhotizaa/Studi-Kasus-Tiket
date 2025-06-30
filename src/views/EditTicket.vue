<template>
  <div class="edit-ticket-container">
    <div class="edit-ticket-card">
      <div class="edit-header">
        <h2 class="edit-title">
          <i class="fas fa-edit"></i> Edit Tiket #{{ ticketId }}
        </h2>
        <router-link to="/tickets" class="back-link">
          <i class="fas fa-arrow-left"></i> Kembali ke Daftar
        </router-link>
      </div>

      <form @submit.prevent="updateTicket" class="ticket-form">
        <div class="form-grid">

          <!-- Editable fields -->
          <div class="form-group">
            <label class="form-label">Email</label>
            <input
              v-model="form.email"
              type="email"
              class="form-input"
              placeholder="Masukkan email"
              required
            />
          </div>

          <div class="form-group span-2">
            <label class="form-label">Deskripsi</label>
            <textarea
              v-model="form.description"
              class="form-textarea"
              placeholder="Masukkan deskripsi lengkap"
              rows="5"
              required
            ></textarea>
          </div>

          <div class="form-group">
            <label class="form-label">Jenis Tiket</label>
            <select 
              v-model="form.ticket_type_id" 
              class="form-select"
              required
            >
              <option 
                v-for="type in ticketTypes" 
                :key="type.id" 
                :value="type.id"
              >
                {{ type.name }}
              </option>
            </select>
          </div>

          <div class="form-group">
            <label class="form-label">Status Tiket</label>
            <div class="status-select-wrapper">
              <select v-model="form.status" class="form-select">
                <option value="open">Terbuka</option>
                <option value="progress">Dalam Proses</option>
                <option value="closed">Selesai</option>
                <option value="cancel">Dibatalkan</option>
              </select>
              <div class="status-indicator" :class="'status-' + form.status"></div>
            </div>
          </div>
        </div>

        <div class="form-actions">
          <button type="button" class="cancel-btn" @click="router.push('/tickets')">
            Batal
          </button>
          <button type="submit" class="submit-btn" :disabled="isSubmitting">
            <i class="fas fa-save"></i>
            {{ isSubmitting ? 'Menyimpan...' : 'Simpan Perubahan' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'

const route = useRoute()
const router = useRouter()
const ticketId = route.params.id

const form = ref({
  email: '',
  description: '',
  ticket_type_id: null,
  status: 'open'
})

const ticketTypes = ref([])
const isSubmitting = ref(false)

const getTicket = async () => {
  try {
    const { data } = await axios.get(`http://localhost:8000/api/tickets/${ticketId}`)
    form.value = {
      email: data.email,
      description: data.description,
      ticket_type_id: data.ticket_type_id,
      status: data.status
    }
    
    // Load ticket types
    const typesRes = await axios.get('http://localhost:8000/api/ticket-types')
    ticketTypes.value = typesRes.data
  } catch (err) {
    alert('Gagal memuat data tiket')
    console.error(err)
    router.push('/tickets')
  }
}

const updateTicket = async () => {
  isSubmitting.value = true
  try {
    const payload = {
      title: form.value.title?.trim() || '',
      email: form.value.email?.trim() || '',
      description: form.value.description?.trim() || '',
      ticket_type_id: Number(form.value.ticket_type_id),
      status: form.value.status || 'open'
    }

    await axios.put(`http://localhost:8000/api/tickets/${ticketId}`, payload)

    alert('Perubahan berhasil disimpan!')
    router.push('/tickets')
  } catch (err) {
    console.error('Validasi gagal:', err.response?.data?.errors || err)
    alert('Gagal menyimpan perubahan:\n' + JSON.stringify(err.response?.data?.errors || err, null, 2))
  } finally {
    isSubmitting.value = false
  }
}

onMounted(() => {
  getTicket()
})
</script>

<style scoped>
.edit-ticket-container {
  max-width: 800px;
  margin: 2rem auto;
  padding: 0 1rem;
}

.edit-ticket-card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  padding: 2rem;
}

.edit-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid #f1f3f5;
}

.edit-title {
  font-size: 1.5rem;
  color: #333;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin: 0;
}

.edit-title i {
  color: #4361ee;
}

.back-link {
  color: #4361ee;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  transition: all 0.2s ease;
}

.back-link:hover {
  text-decoration: underline;
}

.ticket-form {
  display: grid;
  gap: 1.5rem;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
}

.span-2 {
  grid-column: span 2;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.form-label {
  font-weight: 500;
  color: #555;
  font-size: 0.95rem;
}

.form-input,
.form-textarea,
.form-select {
  padding: 0.75rem 1rem;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.2s ease;
  background-color: #f8fafc;
}

.form-input:focus,
.form-textarea:focus,
.form-select:focus {
  outline: none;
  border-color: #4361ee;
  box-shadow: 0 0 0 3px rgba(67, 97, 238, 0.1);
  background-color: white;
}

.form-textarea {
  min-height: 150px;
  resize: vertical;
}

.status-select-wrapper {
  position: relative;
}

.form-select {
  appearance: none;
  width: 100%;
  padding-right: 2.5rem;
}

.status-indicator {
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  width: 12px;
  height: 12px;
  border-radius: 50%;
}

.status-open {
  background-color: #f8961e; /* Orange for open */
}

.status-progress {
  background-color: #4895ef; /* Blue for progress */
}

.status-closed {
  background-color: #4cc9f0; /* Teal for closed */
}

.status-cancel {
  background-color: #f72585; /* Pink for cancelled */
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid #f1f3f5;
}

.submit-btn,
.cancel-btn {
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.submit-btn {
  background: #4361ee;
  color: white;
  border: none;
}

.submit-btn:hover {
  background: #3a56d4;
}

.submit-btn:disabled {
  background: #a5b1f8;
  cursor: not-allowed;
}

.cancel-btn {
  background: white;
  color: #64748b;
  border: 1px solid #e2e8f0;
}

.cancel-btn:hover {
  background: #f8fafc;
  border-color: #cbd5e1;
}

.display-field {
  padding: 0.75rem 1rem;
  background-color: #f8fafc;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
  color: #64748b;
}

@media (max-width: 768px) {
  .edit-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
  
  .back-link {
    align-self: flex-end;
  }
  
  .form-grid {
    grid-template-columns: 1fr;
  }
  
  .span-2 {
    grid-column: span 1;
  }
  
  .form-actions {
    flex-direction: column;
  }
  
  .submit-btn,
  .cancel-btn {
    width: 100%;
    justify-content: center;
  }
}
</style>