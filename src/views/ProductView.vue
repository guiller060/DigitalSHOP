<template>
  <div>
    <h2>Catálogo de productos</h2>
    <ProductList @add-to-cart="addToCart" />
  </div>
</template>

<script>
import ProductList from '../components/ProductList.vue'

export default {
  name: 'ProductView',
  components: { ProductList },
  methods: {
    addToCart(product) {
      this.$emit('add-to-cart', product)
    }
  }
}
</script>

<style scoped>
h2 {
  margin-bottom: 20px;
}
</style>
