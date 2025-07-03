<template>
  <div class="cart-page">
    <h2>🛒 Tu Carrito de Compras</h2>
    <ShoppingCart 
      :cart="cart" 
      @remove-from-cart="removeFromCart"
      @update-quantity="updateQuantity"
      @update-shipping="updateShipping"
    />
  </div>
</template>

<script>
import Shoppingcart from '../components/Shoppingcart.vue'

export default {
  name: 'ShoppingCartView',
  props: {
    cart: {
      type: Array,
      default: () => []
    }
  },
  components: {
    ShoppingCart: Shoppingcart
  },
  methods: {
    removeFromCart(productId) {
      this.$emit('remove-from-cart', productId)
    },
    updateQuantity(productId, quantity) {
      this.$emit('update-quantity', productId, quantity)
    },
    updateShipping(requiresShipping) {
      this.$emit('update-shipping', requiresShipping)
    }
  }
}
</script>

<style scoped>
.cart-page {
  animation: slideIn 0.5s ease;
  min-height: 60vh;
}

.cart-page h2 {
  text-align: center;
  margin-bottom: 2rem;
  color: #333;
  font-size: 2.5rem;
  font-weight: bold;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 768px) {
  .cart-page h2 {
    font-size: 2rem;
    margin-bottom: 1rem;
  }
}
</style>