<template>
  <div class="card">
    <div class="image-wrapper">
      <img :src="product.image" alt="producto" class="product-image" />
    </div>
    <h3>{{ product.name }}</h3>
    <p class="price">${{ product.price }} USD</p>
    <button @click="$emit('add-to-cart', product)">🛒 Agregar al carrito</button>
  </div>
</template>

<script>
export default {
  name: 'ProductCard',
  props: {
    product: Object
  }
}
</script>

<style scoped>
.card {
  background-color: #ffffff;
  border-radius: 12px;
  padding: 16px;
  text-align: center;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%; /* asegura misma altura */
  box-sizing: border-box;
}

.card:hover {
  transform: translateY(-5px);
}

.image-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 160px;
  margin-bottom: 10px;
}

.product-image {
  max-height: 100%;
  max-width: 100%;
  object-fit: contain;
}

.price {
  color: #2e8b57;
  font-weight: bold;
  margin: 10px 0;
}

/* Estilo del botón */
button {
  background-color: #000000;
  color: #ffffff;
  border: none;
  padding: 10px 16px;
  font-size: 14px;         /* más pequeño */
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  font-weight: normal;     /* sin negrita */
}

button:hover {
  background-color: #222222;
  transform: translateY(-2px);
}
</style>
