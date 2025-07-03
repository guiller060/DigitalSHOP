<template>
  <div class="cart">
    <h2>🛒 Carrito de Compras</h2>

    <div v-if="cart.length > 0" class="cart-items">
      <div v-for="item in cart" :key="item.id" class="cart-item">
        <img :src="item.image" :alt="item.name" class="item-image" />
        <div class="item-details">
          <h4>{{ item.name }}</h4>
          <div class="quantity-controls">
            <button @click="decreaseQuantity(item)" class="quantity-btn">-</button>
            <span class="quantity">{{ item.quantity }}</span>
            <button @click="increaseQuantity(item)" class="quantity-btn">+</button>
          </div>
          <p class="item-price">${{ item.price }} x {{ item.quantity }} = ${{ item.price * item.quantity }}</p>
        </div>
        <button @click="removeFromCart(item.id)" class="remove-btn">❌</button>
      </div>
      
      <div class="cart-summary">
        <div class="subtotal">
          <p>Subtotal: ${{ subtotal }}</p>
          <p v-if="shippingCost > 0">Envío: ${{ shippingCost }}</p>
          <p class="total">Total: ${{ total }}</p>
        </div>
        
        <div class="shipping-option">
          <label>
            <input 
              type="checkbox" 
              v-model="requiresShipping" 
              @change="updateShipping"
            />
            ¿Requiere envío a domicilio? (+${{ shippingRate }})
          </label>
        </div>
        
        <router-link to="/checkout" class="checkout-btn">
          Proceder con la compra
        </router-link>
      </div>
    </div>
    
    <div v-else class="empty-cart">
      <p>El carrito está vacío.</p>
      <router-link to="/products" class="continue-shopping">
        Continuar comprando
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ShoppingCart',
  props: {
    cart: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      requiresShipping: false,
      shippingRate: 10
    }
  },
  computed: {
    subtotal() {
      return this.cart.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2)
    },
    shippingCost() {
      return this.requiresShipping ? this.shippingRate : 0
    },
    total() {
      return (parseFloat(this.subtotal) + this.shippingCost).toFixed(2)
    }
  },
  methods: {
    removeFromCart(itemId) {
      this.$emit('remove-from-cart', itemId)
    },
    increaseQuantity(item) {
      this.$emit('update-quantity', item.id, item.quantity + 1)
    },
    decreaseQuantity(item) {
      if (item.quantity > 1) {
        this.$emit('update-quantity', item.id, item.quantity - 1)
      }
    },
    updateShipping() {
      this.$emit('update-shipping', this.requiresShipping)
    }
  }
}
</script>

<style scoped>
.cart {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.cart h2 {
  text-align: center;
  margin-bottom: 30px;
  color: #333;
}

.cart-items {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.cart-item {
  display: flex;
  align-items: center;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background: white;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.item-image {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 8px;
  margin-right: 20px;
}

.item-details {
  flex: 1;
}

.item-details h4 {
  margin: 0 0 10px 0;
  color: #333;
}

.quantity-controls {
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 10px 0;
}

.quantity-btn {
  width: 30px;
  height: 30px;
  border: 1px solid #ddd;
  background: white;
  cursor: pointer;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
}

.quantity-btn:hover {
  background: #f5f5f5;
}

.quantity {
  font-weight: bold;
  min-width: 30px;
  text-align: center;
}

.item-price {
  margin: 10px 0 0 0;
  font-weight: bold;
  color: #007bff;
}

.remove-btn {
  background: none;
  border: none;
  font-size: 18px;
  cursor: pointer;
  padding: 5px;
  border-radius: 4px;
}

.remove-btn:hover {
  background: #f8f9fa;
}

.cart-summary {
  margin-top: 30px;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background: #f8f9fa;
}

.subtotal {
  margin-bottom: 20px;
}

.subtotal p {
  margin: 5px 0;
  font-size: 16px;
}

.total {
  font-size: 18px;
  font-weight: bold;
  color: #333;
  border-top: 1px solid #ddd;
  padding-top: 10px;
}

.shipping-option {
  margin-bottom: 20px;
}

.shipping-option label {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
}

.checkout-btn {
  display: block;
  width: 100%;
  padding: 15px;
  background: #007bff;
  color: white;
  text-decoration: none;
  border-radius: 6px;
  text-align: center;
  font-weight: bold;
  transition: background 0.3s;
}

.checkout-btn:hover {
  background: #0056b3;
}

.empty-cart {
  text-align: center;
  padding: 40px;
}

.empty-cart p {
  font-size: 18px;
  color: #666;
  margin-bottom: 20px;
}

.continue-shopping {
  display: inline-block;
  padding: 12px 24px;
  background: #007bff;
  color: white;
  text-decoration: none;
  border-radius: 6px;
  font-weight: bold;
}

.continue-shopping:hover {
  background: #0056b3;
}

@media (max-width: 768px) {
  .cart-item {
    flex-direction: column;
    text-align: center;
  }
  
  .item-image {
    margin-right: 0;
    margin-bottom: 15px;
  }
  
  .quantity-controls {
    justify-content: center;
  }
}
</style>