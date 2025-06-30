<template>
  <div class="home-page">
    <Navbar />
    
    <main class="home-container">
      <div class="hero-section">
        <div class="hero-content">
          <h1 class="hero-title">Selamat Datang di Sistem Tiket Bantuan</h1>
          <p class="hero-subtitle">
            Kelola permintaan bantuan tim Anda dengan lebih efisien dan terorganisir
          </p>
          <div class="hero-actions">
            <router-link to="/form" class="primary-btn">
  <i class="fas fa-plus"></i> Buat Tiket Baru
</router-link>

            <router-link to="/tickets" class="secondary-btn">
              <i class="fas fa-list"></i> Lihat Daftar Tiket
            </router-link>
          </div>
        </div>
        <div class="hero-image">
          <i class="fas fa-headset hero-fallback-icon"></i>
        </div>
      </div>

      <div class="features-section">
        <h2 class="section-title">Menggunakan Sistem Tiket Kami</h2>
        <div class="features-grid">
          <div class="feature-card">
            <div class="feature-icon">
              <i class="fas fa-ticket-alt"></i>
            </div>
            <h3>Buat Tiket</h3>
            <p>Ajukan permintaan bantuan dengan mudah melalui formulir sederhana</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon">
              <i class="fas fa-clock"></i>
            </div>
            <h3>Lacak Status</h3>
            <p>Pantau perkembangan tiket Anda dari awal hingga selesai</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon">
              <i class="fas fa-bell"></i>
            </div>
            <h3>Notifikasi</h3>
            <p>Dapatkan pemberitahuan real-time tentang update tiket</p>
          </div>
        </div>
      </div>
    </main>
    
    <footer class="home-footer">
      <p>&copy; 2025 Sistem Tiket Bantuan. All rights reserved.</p>
    </footer>
  </div>
</template>

<script setup>
import Navbar from '@/components/Navbar.vue'
</script>

<style scoped>
.home-page {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #f8fafc;
}

.home-container {
  flex: 1;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
}

.hero-section {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
  margin: 3rem 0;
}

.hero-content {
  flex: 1;
  text-align: left;
}

.hero-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 1rem;
  line-height: 1.2;
}

.hero-subtitle {
  font-size: 1.25rem;
  color: #64748b;
  margin-bottom: 2rem;
  max-width: 600px;
}

.hero-actions {
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
}

.primary-btn, .secondary-btn {
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 500;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.2s ease;
}

.primary-btn {
  background-color: #4361ee;
  color: white;
}

.primary-btn:hover {
  background-color: #3a56d4;
}

.secondary-btn {
  background-color: white;
  color: #4361ee;
  border: 1px solid #e2e8f0;
}

.secondary-btn:hover {
  background-color: #f8fafc;
}

.hero-image {
  flex: 1;
  display: flex;
  justify-content: center;
}

.hero-fallback-icon {
  font-size: 10rem;
  color: #4361ee;
  opacity: 0.2;
}

.features-section {
  margin: 5rem 0;
}

.section-title {
  text-align: center;
  font-size: 2rem;
  color: #1e293b;
  margin-bottom: 3rem;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.feature-card {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.feature-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
}

.feature-icon {
  font-size: 2rem;
  color: #4361ee;
  margin-bottom: 1rem;
}

.feature-card h3 {
  font-size: 1.25rem;
  color: #1e293b;
  margin-bottom: 0.75rem;
}

.feature-card p {
  color: #64748b;
  line-height: 1.6;
}

.home-footer {
  background-color: #1e293b;
  color: white;
  text-align: center;
  padding: 1.5rem;
  font-size: 0.9rem;
}

@media (max-width: 768px) {
  .hero-section {
    flex-direction: column;
    text-align: center;
  }
  
  .hero-content {
    text-align: center;
  }
  
  .hero-subtitle {
    margin-left: auto;
    margin-right: auto;
  }
  
  .hero-actions {
    justify-content: center;
  }
  
  .hero-image {
    order: -1;
  }
  
  .hero-fallback-icon {
    font-size: 8rem;
  }
}
</style>