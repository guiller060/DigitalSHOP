<template>
  <div class="product-list">
    <ProductCard
      v-for="product in products"
      :key="product.id"
      :product="product"
      @add-to-cart="addToCart"
    />
  </div>
</template>

<script>
import ProductCard from './ProductCard.vue'

export default {
  name: 'ProductList',
  components: { ProductCard },
  data() {
    return {
      products: [
        {
          id: 1,
          name: 'Mouse inalámbrico',
          price: 15,
          image: require('@/assets/Mouse inalámbrico.png')
        },
        {
          id: 2,
          name: 'Teclado mecánico retroiluminado',
          price: 35,
          image: require('@/assets/Teclado mecánico.png')
        },
        {
          id: 3,
          name: 'Monitor 24” LED',
          price: 120,
          image: require('@/assets/Monitor 24 LED.png')
        },
        {
          id: 4,
          name: 'Laptop Lenovo IdeaPad',
          price: 580,
          image: require('@/assets/Laptop Lenovo IdeaPad.png')
        },
        {
          id: 5,
          name: 'Webcam HD 1080p',
          price: 45,
          image: require('@/assets/Webcam HD 1080p.png')
        },
        {
          id: 6,
          name: 'Parlantes Bluetooth portátiles',
          price: 30,
          image: require('@/assets/Parlantes Bluetooth portátiles.png')
        }
      ]
    }
  },
  methods: {
    addToCart(product) {
      this.$emit('add-to-cart', product)
    }
  }
}
</script>

<style scoped>
.product-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 24px;
  padding: 20px;
}
</style>
