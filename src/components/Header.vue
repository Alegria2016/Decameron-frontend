<template>
  <header class="header">
    <div class="header-container">
      <!-- Logo -->
      <router-link to="/" class="logo">
        <img src="../assets/logo.svg" alt="Hotel Logo" class="logo-img">
        <span class="logo-text">Hotel Management</span>
      </router-link>

      <!-- Menú para desktop -->
      <nav class="nav-desktop" aria-label="Navegación principal">
        <ul class="nav-list">
          <li class="nav-item">
            <router-link to="/hotels" class="nav-link">Hoteles</router-link>
          </li>
           
        </ul>
      </nav>

      <!-- Menú hamburguesa para mobile -->
      <button 
        class="menu-toggle" 
        @click="toggleMenu"
        aria-label="Menú de navegación"
        :aria-expanded="isMenuOpen"
      >
        <span class="hamburger"></span>
      </button>

      <!-- Menú para mobile -->
      <nav 
        class="nav-mobile" 
        :class="{ 'is-active': isMenuOpen }"
        aria-label="Navegación principal"
      >
        <ul class="nav-list">
          <li class="nav-item">
            <router-link to="/hotels" class="nav-link" @click="closeMenu">Hoteles</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/rooms" class="nav-link" @click="closeMenu">Habitaciones</router-link>
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const isMenuOpen = ref(false)

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const closeMenu = () => {
  isMenuOpen.value = false
}

const handleClickOutside = (event) => {
  if (!event.target.closest('.nav-mobile') && !event.target.closest('.menu-toggle')) {
    closeMenu()
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<style scoped>
/* Estilos base */
.header {
  background-color: #ffffff;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;
}

.header-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* Logo */
.logo {
  display: flex;
  align-items: center;
  text-decoration: none;
  color: #2c3e50;
  font-weight: 700;
  font-size: 1.2rem;
}

.logo-img {
  height: 40px;
  margin-right: 0.75rem;
}

.logo-text {
  transition: color 0.3s ease;
}

.logo:hover .logo-text {
  color: #3498db;
}

/* Lista de navegación */
.nav-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
}

/* Navegación desktop */
.nav-desktop .nav-list {
  gap: 2rem;
}

.nav-item {
  display: flex;
  align-items: center;
}

.nav-link {
  color: #2c3e50;
  text-decoration: none;
  font-weight: 500;
  position: relative;
  padding: 0.5rem 0;
  transition: color 0.3s ease;
}

.nav-link:hover {
  color: #3498db;
}

.nav-link.router-link-active {
  color: #3498db;
}

.nav-link.router-link-active::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: #3498db;
}

/* Menú hamburguesa (mobile) */
.menu-toggle {
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
}

.hamburger {
  display: block;
  width: 25px;
  height: 2px;
  background-color: #2c3e50;
  position: relative;
  transition: all 0.3s ease;
}

.hamburger::before,
.hamburger::after {
  content: '';
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: inherit;
  left: 0;
  transition: all 0.3s ease;
}

.hamburger::before {
  top: -8px;
}

.hamburger::after {
  top: 8px;
}

.is-active .hamburger {
  background-color: transparent;
}

.is-active .hamburger::before {
  transform: translateY(8px) rotate(45deg);
}

.is-active .hamburger::after {
  transform: translateY(-8px) rotate(-45deg);
}

/* Navegación mobile */
.nav-mobile {
  display: none;
  position: fixed;
  top: 80px;
  left: 0;
  width: 100%;
  background-color: #ffffff;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
  padding: 1rem 0;
  transform: translateY(-150%);
  transition: transform 0.3s ease;
  z-index: 99;
}

.nav-mobile.is-active {
  transform: translateY(0);
}

.nav-mobile .nav-list {
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.nav-mobile .nav-link {
  padding: 0.5rem 1rem;
}

/* Responsive */
@media (max-width: 768px) {
  .nav-desktop {
    display: none;
  }

  .menu-toggle {
    display: block;
  }

  .nav-mobile {
    display: block;
  }
}

@media (max-width: 480px) {
  .header-container {
    padding: 1rem;
  }

  .logo-text {
    font-size: 1rem;
  }

  .logo-img {
    height: 30px;
  }
}
</style>