<template>
  <div class="ticket-list fade-in">
    <div class="list-header">
      <div class="tabs">
        <button 
          v-for="tab in tabs" 
          :key="tab.id"
          :class="['tab-button', { 'active': activeTab === tab.id }]"
          @click="activeTab = tab.id"
        >
          {{ tab.label }}
        </button>
      </div>
      
      <div class="search-container">
        <div class="search-box">
          <input
            type="text"
            v-model="searchQuery"
            placeholder="Cari tiket..."
            class="search-input"
            @input="handleSearch"
          />
          <button class="search-btn" @click="handleSearch">
            <i class="fas fa-search"></i>
          </button>
          <button 
            v-if="searchQuery" 
            class="clear-btn" 
            @click="clearSearch"
          >
            <i class="fas fa-times"></i>
          </button>
        </div>
      </div>
      
      <div class="list-actions">
        <button class="refresh-btn" @click="fetchTickets">
          <i class="fas fa-sync-alt"></i>
        </button>
      </div>
    </div>

    <div v-if="loading" class="loading-state">
      <i class="fas fa-spinner fa-spin loading-icon"></i>
      <p>Memuat data tiket...</p>
    </div>

    <div v-else-if="error" class="error-state">
      <i class="fas fa-exclamation-triangle error-icon"></i>
      <p>Gagal memuat data: {{ error }}</p>
      <button class="retry-btn" @click="fetchTickets">Coba Lagi</button>
    </div>

    <div v-else-if="filteredTickets.length === 0" class="empty-state">
      <i class="fas fa-inbox empty-icon"></i>
      <p>Tidak ada tiket ditemukan</p>
    </div>

    <div v-else class="ticket-container">
      <div 
        v-for="ticket in paginatedTickets" 
        :key="ticket.id"
        :class="['ticket-card', `status-${ticket.status}`]"
      >
        <div class="ticket-header">
          <span class="ticket-id">#{{ ticket.id }}</span>
          <span class="ticket-date">{{ formatDate(ticket.assign_at) }}</span>
          <span class="ticket-status">{{ getStatusLabel(ticket.status) }}</span>
        </div>
        
        <div class="ticket-body">
          <h3 class="ticket-title">{{ ticket.title }}</h3>
          <p class="ticket-desc" v-if="ticket.description">
            {{ truncateDescription(ticket.description) }}
          </p>
        </div>
        
        <div class="ticket-footer">
          <div class="ticket-meta">
            <span class="ticket-author">
              <i class="fas fa-user"></i>
              {{ ticket.full_name }}
            </span>
            <span class="ticket-project">
              <i class="fas fa-project-diagram"></i>
              {{ ticket.project?.name || 'Tidak ada proyek' }}
            </span>
          </div>
          
          <div class="ticket-actions">
            <button class="action-btn view-btn" @click="viewTicket(ticket.id)">
              <i class="fas fa-eye"></i>
            </button>
            <button 
  class="action-btn edit-btn" 
  @click="editTicket(ticket.id)"
>
  <i class="fas fa-edit"></i>
</button>

            <button 
              class="action-btn delete-btn" 
              v-if="ticket.status === 'cancel'" 
              @click="deleteTicket(ticket.id)"
            >
              <i class="fas fa-trash-alt"></i>
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="pagination" v-if="filteredTickets.length > 0">
      <button 
        class="pagination-btn" 
        :disabled="currentPage === 1"
        @click="currentPage--"
      >
        <i class="fas fa-chevron-left"></i>
      </button>
      
      <span class="page-info">
        Halaman {{ currentPage }} dari {{ totalPages }}
      </span>
      
      <button 
        class="pagination-btn" 
        :disabled="currentPage === totalPages"
        @click="currentPage++"
      >
        <i class="fas fa-chevron-right"></i>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const router = useRouter()

const tickets = ref([])
const loading = ref(true)
const error = ref(null)
const activeTab = ref('all')
const searchQuery = ref('')
const currentPage = ref(1)
const itemsPerPage = ref(5)

const tabs = [
  { id: 'all', label: 'Semua' },
  { id: 'open', label: 'Terbuka' },
  { id: 'progress', label: 'Proses' },
  { id: 'closed', label: 'Selesai' }
]

const fetchTickets = async () => {
  loading.value = true
  error.value = null
  try {
    const res = await axios.get('http://localhost:8000/api/tickets')
    tickets.value = res.data
  } catch (err) {
    error.value = 'Gagal memuat data tiket. Silakan coba lagi nanti.'
    console.error('Error fetching tickets:', err)
  } finally {
    loading.value = false
  }
}

const filteredTickets = computed(() => {
  let filtered = tickets.value
  if (activeTab.value !== 'all') {
    filtered = filtered.filter(t => t.status === activeTab.value)
  }
  if (searchQuery.value) {
    const q = searchQuery.value.toLowerCase()
    filtered = filtered.filter(t =>
      t.title.toLowerCase().includes(q) ||
      t.full_name.toLowerCase().includes(q)
    )
  }
  return filtered
})

const totalPages = computed(() => {
  return Math.ceil(filteredTickets.value.length / itemsPerPage.value)
})

const paginatedTickets = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value
  const end = start + itemsPerPage.value
  return filteredTickets.value.slice(start, end)
})

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('id-ID', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

const truncateDescription = (desc) => {
  return desc.length > 100 ? desc.substring(0, 100) + '...' : desc
}

const getStatusLabel = (status) => {
  const labels = {
    open: 'Terbuka',
    progress: 'Proses',
    closed: 'Selesai',
    cancel: 'Dibatalkan'
  }
  return labels[status] || status
}

const handleSearch = () => {
  currentPage.value = 1
}

const clearSearch = () => {
  searchQuery.value = ''
  handleSearch()
}

const viewTicket = (id) => {
  router.push({ name: 'TicketDetail', params: { id } })
}

const editTicket = (id) => {
  router.push({ name: 'EditTicket', params: { id } })
}

const deleteTicket = async (id) => {
  const confirmed = confirm('Yakin ingin menghapus tiket ini?')
  if (!confirmed) return
  try {
    await axios.delete(`http://localhost:8000/api/tickets/${id}`)
    await fetchTickets()
  } catch (err) {
    console.error('Gagal menghapus tiket:', err)
    alert('Gagal menghapus tiket. Silakan coba lagi.')
  }
}

onMounted(fetchTickets)
</script>


<style scoped>
.ticket-list {
  background: white;
  border-radius: var(--border-radius);
  padding: 1.5rem;
  box-shadow: var(--box-shadow);
}

.list-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
  gap: 1rem;
}

.tabs {
  display: flex;
  gap: 0.5rem;
  background: #f1f3f5;
  padding: 0.25rem;
  border-radius: 50px;
}

.tab-button {
  padding: 0.5rem 1rem;
  border: none;
  background: transparent;
  border-radius: 50px;
  font-weight: 500;
  cursor: pointer;
  transition: var(--transition);
}

.tab-button.active {
  background: white;
  color: var(--primary-color);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.search-container {
  flex: 1;
  max-width: 400px;
  margin: 0 1rem;
}

.search-box {
  position: relative;
  display: flex;
  align-items: center;
  background: white;
  border-radius: 50px;
  border: 1px solid #e9ecef;
  overflow: hidden;
  transition: var(--transition);
}

.search-box:focus-within {
  border-color: var(--primary-color);
  box-shadow: 0 0 0 3px rgba(67, 97, 238, 0.1);
}

.search-input {
  flex: 1;
  padding: 0.75rem 1rem;
  border: none;
  outline: none;
  font-size: 0.95rem;
  background: transparent;
}

.search-btn,
.clear-btn {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  color: #6c757d;
  cursor: pointer;
  transition: var(--transition);
}

.search-btn:hover {
  color: var(--primary-color);
}

.clear-btn {
  color: #adb5bd;
}

.clear-btn:hover {
  color: var(--danger-color);
}

.refresh-btn {
  background: none;
  border: none;
  color: #6c757d;
  cursor: pointer;
  font-size: 1rem;
  transition: var(--transition);
}

.refresh-btn:hover {
  color: var(--primary-color);
  transform: rotate(180deg);
}

.loading-state,
.error-state,
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem 0;
  text-align: center;
}

.loading-icon,
.error-icon,
.empty-icon {
  font-size: 2rem;
  margin-bottom: 1rem;
}

.loading-icon {
  color: var(--primary-color);
}

.error-icon {
  color: var(--danger-color);
}

.empty-icon {
  color: #adb5bd;
}

.retry-btn {
  margin-top: 1rem;
  padding: 0.5rem 1.5rem;
  background: var(--primary-color);
  color: white;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  transition: var(--transition);
}

.retry-btn:hover {
  background: var(--secondary-color);
}

.ticket-container {
  display: grid;
  gap: 1rem;
}

.ticket-card {
  border-radius: var(--border-radius);
  padding: 1.25rem;
  border-left: 4px solid;
  transition: var(--transition);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.ticket-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
}

.ticket-card.status-open {
  border-left-color: var(--warning-color);
}

.ticket-card.status-progress {
  border-left-color: var(--accent-color);
}

.ticket-card.status-closed {
  border-left-color: var(--success-color);
}

.ticket-card.status-cancel {
  border-left-color: var(--danger-color);
}

.ticket-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  font-size: 0.85rem;
  color: #6c757d;
}

.ticket-status {
  padding: 0.25rem 0.75rem;
  border-radius: 50px;
  font-size: 0.75rem;
  font-weight: 500;
  text-transform: capitalize;
}

.ticket-card.status-open .ticket-status {
  background-color: rgba(248, 150, 30, 0.1);
  color: var(--warning-color);
}

.ticket-card.status-progress .ticket-status {
  background-color: rgba(72, 149, 239, 0.1);
  color: var(--accent-color);
}

.ticket-card.status-closed .ticket-status {
  background-color: rgba(76, 201, 240, 0.1);
  color: var(--success-color);
}

.ticket-card.status-cancel .ticket-status {
  background-color: rgba(247, 37, 133, 0.1);
  color: var(--danger-color);
}

.ticket-title {
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
  color: var(--dark-color);
}

.ticket-desc {
  color: #6c757d;
  font-size: 0.9rem;
  line-height: 1.5;
}

.ticket-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid #f1f3f5;
}

.ticket-meta {
  display: flex;
  gap: 1rem;
  font-size: 0.85rem;
  color: #6c757d;
}

.ticket-author,
.ticket-project {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.ticket-actions {
  display: flex;
  gap: 0.5rem;
}

.action-btn {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: var(--transition);
}

.action-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.action-btn:disabled:hover {
  background: inherit !important;
}

.view-btn {
  background: rgba(108, 117, 125, 0.1);
  color: #6c757d;
}

.view-btn:hover {
  background: rgba(108, 117, 125, 0.2);
}

.edit-btn {
  background: rgba(67, 97, 238, 0.1);
  color: var(--primary-color);
}

.edit-btn:hover {
  background: rgba(67, 97, 238, 0.2);
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin-top: 2rem;
}

.pagination-btn {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: 1px solid #e9ecef;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: var(--transition);
}

.pagination-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.pagination-btn:not(:disabled):hover {
  background: var(--primary-color);
  color: white;
  border-color: var(--primary-color);
}

.page-info {
  font-size: 0.9rem;
  color: #6c757d;
}

.delete-btn {
  background: rgba(247, 37, 133, 0.1);
  color: var(--danger-color);
}
.delete-btn:hover {
  background: rgba(247, 37, 133, 0.2);
}

@media (max-width: 768px) {
  .list-header {
    flex-direction: column;
    gap: 1rem;
  }
  
  .search-container {
    width: 100%;
    max-width: none;
    margin: 0;
  }
  
  .tabs {
    order: 1;
  }
  
  .search-box {
    order: 2;
  }
  
  .list-actions {
    order: 3;
    align-self: flex-end;
  }
  
  .ticket-meta {
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .ticket-footer {
    flex-direction: column;
    gap: 1rem;
    align-items: flex-start;
  }
  
  .ticket-actions {
    width: 100%;
    justify-content: flex-end;
  }
}
</style>