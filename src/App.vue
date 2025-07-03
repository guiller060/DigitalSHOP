<template>
  <div id="app">
    <!-- Navegación -->
    <nav class="navbar">
      <div class="nav-brand">
        <router-link to="/" class="brand-link">
          <h1>🛍️ Tienda en Línea</h1>
        </router-link>
      </div>
      <div class="nav-links">
        <router-link to="/" class="nav-link">🏠 Inicio</router-link>
        <router-link to="/products" class="nav-link">📦 Productos</router-link>
        <router-link to="/cart" class="nav-link">
          🛒 Carrito 
          <span v-if="cartCount > 0" class="cart-badge">{{ cartCount }}</span>
        </router-link>
      </div>
    </nav>

    <!-- Contenido dinámico -->
    <main class="main-content">
      <router-view 
        :cart="cart" 
        @add-to-cart="addToCart" 
        @remove-from-cart="removeFromCart"
        @update-quantity="updateQuantity"
        @update-shipping="updateShipping"
        @clear-cart="clearCart"
      />
    </main>

    <!-- Footer -->
    <footer class="footer">
      <div class="footer-content">
        <div class="footer-section">
          <h4>🛍️ Tienda en Línea</h4>
          <p>Tu tienda de confianza para productos de tecnología</p>
        </div>
        <div class="footer-section">
          <h4>Contacto</h4>
          <p>📧 DigitalSHOP@hotmail.com</p>
          <p>📞 +507 6234-5678</p>
        </div>
        <div class="footer-section">
          <h4>Síguenos</h4>
          <p>
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a> |
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a> |
            <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a>
          </p>
        </div>
      </div>
      <div class="footer-bottom">
        <p>&copy; 2024 Tienda en Línea. Todos los derechos reservados.</p>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      cart: [],
      shipping: {
        required: false,
        cost: 0
      }
    }
  },
  computed: {
    cartCount() {
      return this.cart.reduce((total, item) => total + item.quantity, 0)
    },
    cartTotal() {
      return this.cart.reduce((total, item) => total + (item.price * item.quantity), 0)
    }
  },
  methods: {
    addToCart(product) {
      const existingItem = this.cart.find(item => item.id === product.id)
      if (existingItem) {
        existingItem.quantity++
      } else {
        this.cart.push({ ...product, quantity: 1 })
      }
      this.showNotification(`${product.name} agregado al carrito`)
    },
    
    removeFromCart(productId) {
      this.cart = this.cart.filter(item => item.id !== productId)
      this.showNotification('Producto eliminado del carrito')
    },
    
    updateQuantity(productId, newQuantity) {
      const item = this.cart.find(item => item.id === productId)
      if (item) {
        if (newQuantity <= 0) {
          this.removeFromCart(productId)
        } else {
          item.quantity = newQuantity
        }
      }
    },
    
    updateShipping(requiresShipping) {
      this.shipping.required = requiresShipping
      this.shipping.cost = requiresShipping ? 10 : 0
    },
    
    clearCart() {
      this.cart = []
      this.shipping = { required: false, cost: 0 }
      this.showNotification('¡Compra realizada con éxito!')
    },
    
    showNotification(message) {
      const notification = document.createElement('div')
      notification.className = 'notification'
      notification.textContent = message
      document.body.appendChild(notification)
      
      setTimeout(() => {
        notification.classList.add('show')
      }, 100)
      
      setTimeout(() => {
        notification.classList.remove('show')
        setTimeout(() => {
          document.body.removeChild(notification)
        }, 300)
      }, 3000)
    }
  },
  watch: {
    cart: {
      handler(newCart) {
        if (typeof Storage !== 'undefined') {
          localStorage.setItem('cart', JSON.stringify(newCart))
        }
      },
      deep: true
    }
  },
  mounted() {
    if (typeof Storage !== 'undefined') {
      const savedCart = localStorage.getItem('cart')
      if (savedCart) {
        this.cart = JSON.parse(savedCart)
      }
    }
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background-color: #f5f5f5;
  line-height: 1.6;
}

#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.navbar {
  background: linear-gradient(135deg, #223eb8 0%, #142030 100%);
  color: white;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  position: sticky;
  top: 0;
  z-index: 1000;
}

.brand-link {
  text-decoration: none;
  color: white;
}

.nav-brand h1 {
  font-size: 1.5rem;
  transition: transform 0.3s ease;
}

.nav-brand h1:hover {
  transform: scale(1.05);
}

.nav-links {
  display: flex;
  gap: 2rem;
}

.nav-link {
  color: white;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  transition: all 0.3s ease;
  position: relative;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.nav-link:hover {
  background-color: rgba(255,255,255,0.2);
  transform: translateY(-2px);
}

.nav-link.router-link-active {
  background-color: rgba(255,255,255,0.3);
  font-weight: bold;
}

.cart-badge {
  background-color: #5c1fbe75;
  color: white;
  border-radius: 50%;
  padding: 2px 6px;
  font-size: 0.8rem;
  font-weight: bold;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); }
}

.main-content {
  flex: 1;
  max-width: 1200px;
  margin: 2rem auto;
  padding: 0 2rem;
  width: 100%;
}

.footer {
  background-color: #333;
  color: white;
  margin-top: auto;
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}

.footer-section h4 {
  margin-bottom: 1rem;
  color: #667eea;
}

.footer-section p {
  margin-bottom: 0.5rem;
  color: #f7f4f4;
}

.footer-section a {
  color: #999;
  text-decoration: none;
  margin: 0 5px;
  transition: color 0.3s ease;
}

.footer-section a:hover {
  color: #ffffff;
}

.footer-bottom {
  background-color: #222;
  text-align: center;
  padding: 1rem;
  border-top: 1px solid #444;
}

.footer-bottom p {
  color: #999;
}

/* Notificaciones */
.notification {
  position: fixed;
  top: 20px;
  right: 20px;
  background: #28a745;
  color: white;
  padding: 1rem 1.5rem;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.3);
  transform: translateX(100%);
  transition: transform 0.3s ease;
  z-index: 10000;
  font-weight: bold;
}

.notification.show {
  transform: translateX(0);
}

/* Responsive */
@media (max-width: 768px) {
  .navbar {
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
  }
  
  .nav-links {
    gap: 1rem;
  }
  
  .nav-link {
    padding: 0.5rem;
    font-size: 0.9rem;
  }
  
  .main-content {
    padding: 0 1rem;
  }
  
  .footer-content {
    grid-template-columns: 1fr;
    text-align: center;
  }
}

@media (max-width: 480px) {
  .nav-links {
    flex-direction: column;
    width: 100%;
    text-align: center;
  }
  
  .nav-link {
    justify-content: center;
  }
}
</style>
