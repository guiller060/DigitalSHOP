<template>
  <div class="home">
    <div class="overlay">
      <h1>Bienvenido a DigitalSHOP</h1>
      <p>Haz clic para comenzar a explorar nuestros productos.</p>
      <router-link to="/products" class="btn">Ir a Productos</router-link>
    </div>
  </div>
</template>

<style scoped>
.home {
  background-image: url('@/assets/fondo.jpg');
  background-size: cover;
  background-position: center;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.overlay {
  background-color: rgba(22, 11, 88, 0.5); /* oscurece un poco el fondo para que el texto se lea */
  padding: 40px;
  border-radius: 12px;
  color: white;
}

.btn {
  background-color: #3765c9;
  color: white;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: bold;
  text-decoration: none;
  margin-top: 20px;
  display: inline-block;
}
</style>

