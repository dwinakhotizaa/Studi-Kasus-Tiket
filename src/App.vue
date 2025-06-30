<template>
  <div id="app">
    <router-view v-slot="{ Component }">
      <transition name="fade-in" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>

  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css');

:root {
  --primary-color: #4361ee;
  --secondary-color: #3f37c9;
  --accent-color: #4895ef;
  --light-color: #f8f9fa;
  --dark-color: #212529;
  --success-color: #4cc9f0;
  --warning-color: #f8961e;
  --danger-color: #f72585;
  --border-radius: 12px;
  --box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  --transition: all 0.3s ease;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Poppins', sans-serif;
  background-color: #f5f7fa;
  color: var(--dark-color);
  line-height: 1.6;
}

#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.app-footer {
  background-color: var(--dark-color);
  color: white;
  text-align: center;
  padding: 1.5rem 0;
  font-size: 0.9rem;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.fade-in {
  animation: fadeIn 0.5s ease-out forwards;
}
</style>
