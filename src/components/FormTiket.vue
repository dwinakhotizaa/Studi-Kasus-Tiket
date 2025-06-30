<template>
  <div class="form-container fade-in">
    <form @submit.prevent="submitTicket" class="ticket-form">
      <div class="form-grid">
        <div class="form-group">
          <label class="form-label">Nama Lengkap</label>
          <div class="input-wrapper">
            <i class="fas fa-user input-icon"></i>
            <input 
              v-model="form.full_name" 
              required 
              class="form-input" 
              placeholder="Masukkan nama lengkap"
            />
          </div>
        </div>

        <div class="form-group">
          <label class="form-label">Email</label>
          <div class="input-wrapper">
            <i class="fas fa-envelope input-icon"></i>
            <input 
              v-model="form.email" 
              type="email" 
              required 
              class="form-input" 
              placeholder="Masukkan email aktif"
            />
          </div>
        </div>

        <div class="form-group">
          <label class="form-label">Judul Masalah</label>
          <div class="input-wrapper">
            <i class="fas fa-heading input-icon"></i>
            <input 
              v-model="form.title" 
              required 
              class="form-input" 
              placeholder="Ringkasan masalah/permintaan"
            />
          </div>
        </div>

        <div class="form-group span-2">
          <label class="form-label">Deskripsi (Opsional)</label>
          <div class="input-wrapper">
            <i class="fas fa-align-left input-icon"></i>
            <textarea 
              v-model="form.description" 
              class="form-textarea" 
              rows="4"
              placeholder="Jelaskan masalah secara detail..."
            ></textarea>
          </div>
        </div>

        <div class="form-group">
          <label class="form-label">Tanggal Masalah</label>
          <div class="input-wrapper">
            <i class="fas fa-calendar-day input-icon"></i>
            <input 
              v-model="form.assign_at" 
              type="date" 
              required 
              class="form-input" 
            />
          </div>
        </div>

        <div class="form-group">
          <label class="form-label">Jenis Tiket</label>
          <div class="input-wrapper">
            <i class="fas fa-tag input-icon"></i>
            <select 
              v-model="form.ticket_type_id" 
              required 
              class="form-select"
            >
              <option disabled value="">Pilih jenis tiket</option>
              <option 
                v-for="type in ticketTypes" 
                :key="type.id" 
                :value="type.id"
              >
                {{ type.name }}
              </option>
            </select>
            <i class="fas fa-chevron-down select-arrow"></i>
          </div>
        </div>

        <div class="form-group span-2">
          <label class="form-label">Proyek Terkait</label>
          <div class="input-wrapper">
            <i class="fas fa-project-diagram input-icon"></i>
            <select 
              v-model="form.project_id" 
              required 
              class="form-select"
            >
              <option disabled value="">Pilih proyek terkait</option>
              <option 
                v-for="project in projects" 
                :key="project.id" 
                :value="project.id"
              >
                {{ project.name }}
              </option>
            </select>
            <i class="fas fa-chevron-down select-arrow"></i>
          </div>
        </div>
      </div>

      <div class="form-actions">
        <button 
          type="submit" 
          :disabled="isSubmitting" 
          class="submit-btn"
        >
          <i class="fas fa-paper-plane btn-icon"></i>
          {{ isSubmitting ? 'Mengirim...' : 'Kirim Tiket' }}
        </button>
      </div>

      <div v-if="submitError" class="error-message">
        <i class="fas fa-exclamation-circle"></i>
        {{ submitError }}
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const router = useRouter() 
const emit = defineEmits(['submitted'])

const form = ref({
  full_name: '',
  email: '',
  title: '',
  description: '',
  assign_at: '',
  ticket_type_id: null,
  project_id: null
})

const ticketTypes = ref([])
const projects = ref([])
const isSubmitting = ref(false)
const submitError = ref(null)

onMounted(async () => {
  try {
    const [typesRes, projectsRes] = await Promise.all([
      axios.get('http://localhost:8000/api/ticket-types'),
      axios.get('http://localhost:8000/api/projects')
    ])
    ticketTypes.value = typesRes.data
    projects.value = projectsRes.data
  } catch (error) {
    console.error('Gagal memuat data:', error)
  }
})

const submitTicket = async () => {
  isSubmitting.value = true
  submitError.value = null
  
  try {
    const payload = {
      ...form.value,
      ticket_type_id: Number(form.value.ticket_type_id),
      project_id: Number(form.value.project_id)
    }
    
    await axios.post('http://localhost:8000/api/tickets', payload)
    
    // Reset form
    form.value = {
      full_name: '',
      email: '',
      title: '',
      description: '',
      assign_at: '',
      ticket_type_id: null,
      project_id: null
    }
    
    emit('submitted')
    router.push('/tickets')
  } catch (error) {
    submitError.value = 'Gagal mengirim tiket. Silakan coba lagi.'
    console.error('Error submitting ticket:', error)
  } finally {
    isSubmitting.value = false
  }
}
</script>

<style scoped>
.form-container {
  background: white;
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
  overflow: hidden;
}

.ticket-form {
  padding: 1.5rem;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
  margin-bottom: 1.5rem;
}

@media (max-width: 768px) {
  .form-grid {
    grid-template-columns: 1fr;
  }
  
  .span-2 {
    grid-column: span 1;
  }
}

.span-2 {
  grid-column: span 2;
}

.form-group {
  margin-bottom: 0;
}

.form-label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: var(--dark-color);
  font-size: 0.9rem;
}

.input-wrapper {
  position: relative;
}

.input-icon {
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: var(--primary-color);
  font-size: 0.9rem;
}

.form-input,
.form-textarea,
.form-select {
  width: 100%;
  padding: 0.75rem 1rem 0.75rem 2.5rem;
  border: 1px solid #e9ecef;
  border-radius: var(--border-radius);
  font-size: 0.95rem;
  transition: var(--transition);
  background-color: #f8f9fa;
}

.form-input:focus,
.form-textarea:focus,
.form-select:focus {
  outline: none;
  border-color: var(--primary-color);
  box-shadow: 0 0 0 3px rgba(67, 97, 238, 0.1);
  background-color: white;
}

.form-textarea {
  min-height: 120px;
  resize: vertical;
}

.form-select {
  appearance: none;
  cursor: pointer;
}

.select-arrow {
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
  color: #6c757d;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
}

.submit-btn {
  padding: 0.75rem 1.5rem;
  background: var(--primary-color);
  color: white;
  border: none;
  border-radius: var(--border-radius);
  font-weight: 500;
  cursor: pointer;
  transition: var(--transition);
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.submit-btn:hover {
  background: var(--secondary-color);
  transform: translateY(-2px);
}

.submit-btn:disabled {
  background: #adb5bd;
  cursor: not-allowed;
  transform: none;
}

.btn-icon {
  font-size: 0.9rem;
}

.error-message {
  margin-top: 1rem;
  padding: 0.75rem;
  background: rgba(247, 37, 133, 0.1);
  color: var(--danger-color);
  border-radius: var(--border-radius);
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.error-message i {
  font-size: 1rem;
}
</style>