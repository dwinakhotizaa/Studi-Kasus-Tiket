<template>
  <nav class="navbar">
    <div class="navbar-container">
      <div class="navbar-brand">
        <router-link to="/" class="logo-link">
          <span class="logo-icon"><i class="fas fa-ticket-alt"></i></span>
          <span class="logo-text">TiketBantu</span>
        </router-link>
      </div>
      
      <div class="navbar-menu">
        <ul class="nav-links">
          <li class="nav-item">
            <router-link to="/" class="nav-link" active-class="active">
              <i class="fas fa-home"></i>
              <span>Home</span>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/form" class="nav-link" active-class="active">
              <i class="fas fa-plus-circle"></i>
              <span>Tambah Tiket</span>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/tickets" class="nav-link" active-class="active">
              <i class="fas fa-list"></i>
              <span>Daftar Tiket</span>
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.navbar {
  background: linear-gradient(135deg, #4361ee, #3f37c9);
  color: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 1000;
  padding: 0.8rem 0;
}

.navbar-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.navbar-brand {
  display: flex;
  align-items: center;
}

.logo-link {
  display: flex;
  align-items: center;
  text-decoration: none;
  color: white;
  font-weight: 600;
  font-size: 1.25rem;
  gap: 0.5rem;
}

.logo-icon {
  font-size: 1.5rem;
  color: #fff;
}

.logo-text {
  font-family: 'Poppins', sans-serif;
}

.navbar-menu {
  display: flex;
}

.nav-links {
  list-style: none;
  display: flex;
  gap: 1rem;
  margin: 0;
  padding: 0;
}

.nav-item {
  display: flex;
  align-items: center;
}

.nav-link {
  color: rgba(255, 255, 255, 0.9);
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.2s ease;
  font-size: 0.95rem;
}

.nav-link:hover {
  background-color: rgba(255, 255, 255, 0.1);
  color: white;
}

.nav-link.active {
  background-color: rgba(255, 255, 255, 0.2);
  color: white;
  font-weight: 500;
}

.nav-link i {
  font-size: 1rem;
}

@media (max-width: 768px) {
  .navbar-container {
    padding: 0 1rem;
  }
  
  .logo-text {
    display: none;
  }
  
  .nav-link span {
    display: none;
  }
  
  .nav-link {
    padding: 0.5rem;
    border-radius: 50%;
    width: 2.5rem;
    height: 2.5rem;
    justify-content: center;
  }
  
  .nav-link i {
    font-size: 1.2rem;
    margin: 0;
  }
}
</style>