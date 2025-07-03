<template>
  <div class="checkout">
    <h2>🧾 Finalizar Compra</h2>
    
    <div class="checkout-container">
      <!-- Formulario de datos del cliente -->
      <div class="customer-form">
        <h3>📋 Datos del Cliente</h3>
        <form @submit.prevent="procesarCompra">
          <div class="form-group">
            <label for="nombre">Nombre Completo *</label>
            <input 
              id="nombre" 
              v-model="cliente.nombre" 
              type="text" 
              required 
              placeholder="Ingresa tu nombre completo" 
            />
          </div>
          
          <div class="form-group">
            <label for="email">Correo Electrónico *</label>
            <input 
              id="email" 
              v-model="cliente.email" 
              type="email" 
              required 
              placeholder="tu@email.com" 
            />
          </div>
          
          <div class="form-group">
            <label for="telefono">Teléfono *</label>
            <input 
              id="telefono" 
              v-model="cliente.telefono" 
              type="tel" 
              required 
              placeholder="+507 6234-5678" 
            />
          </div>
          
          <div class="form-group">
            <label for="cedula">Cédula/ID *</label>
            <input 
              id="cedula" 
              v-model="cliente.cedula" 
              type="text" 
              required 
              placeholder="8-123-4567" 
            />
          </div>

          <!-- Opción de envío -->
          <div class="shipping-section">
            <h3>🚚 Opciones de Entrega</h3>
            <div class="shipping-options">
              <label class="shipping-option">
                <input 
                  type="radio" 
                  v-model="tipoEntrega" 
                  value="recoger" 
                  @change="actualizarCostoEnvio" 
                />
                <span>Recoger en tienda (Gratis)</span>
              </label>
              <label class="shipping-option">
                <input 
                  type="radio" 
                  v-model="tipoEntrega" 
                  value="envio" 
                  @change="actualizarCostoEnvio" 
                />
                <span>Envío a domicilio (+$10.00)</span>
              </label>
            </div>
          </div>

          <!-- Formulario de dirección (solo si requiere envío) -->
          <div v-if="tipoEntrega === 'envio'" class="address-section">
            <h3>📍 Dirección de Entrega</h3>
            <div class="form-group">
              <label for="provincia">Provincia *</label>
              <select id="provincia" v-model="cliente.provincia" required>
                <option value="">Seleccionar provincia</option>
                <option value="Panama">Panamá</option>
                <option value="Chiriqui">Chiriquí</option>
                <option value="Cocle">Coclé</option>
                <option value="Colon">Colón</option>
                <option value="Darien">Darién</option>
                <option value="Herrera">Herrera</option>
                <option value="Los Santos">Los Santos</option>
                <option value="Veraguas">Veraguas</option>
                <option value="Bocas del toro">Bocas del toro</option>
              </select>
            </div>
            
            <div class="form-group">
              <label for="distrito">Distrito *</label>
              <input 
                id="distrito" 
                v-model="cliente.distrito" 
                type="text" 
                required 
                placeholder="Ej: San Changuinola" 
              />
            </div>
            
            <div class="form-group">
              <label for="direccion">Dirección Completa *</label>
              <textarea 
                id="direccion" 
                v-model="cliente.direccion" 
                required 
                placeholder="Ingresa tu dirección completa"
                rows="3"
              ></textarea>
            </div>
          </div>

          <!-- Método de pago -->
          <div class="payment-section">
            <h3>💳 Método de Pago</h3>
            <div class="payment-options">
              <label class="payment-option">
                <input 
                  type="radio" 
                  v-model="metodoPago" 
                  value="tarjeta" 
                />
                <span>💳 Tarjeta de Crédito/Débito</span>
              </label>
              <label class="payment-option">
                <input 
                  type="radio" 
                  v-model="metodoPago" 
                  value="efectivo" 
                />
                <span>💵 Efectivo (Contra entrega)</span>
              </label>
              <label class="payment-option">
                <input 
                  type="radio" 
                  v-model="metodoPago" 
                  value="transferencia" 
                />
                <span>🏦 Transferencia Bancaria</span>
              </label>
            </div>
          </div>

          <!-- Información de tarjeta (solo si elige tarjeta) -->
          <div v-if="metodoPago === 'tarjeta'" class="card-section">
            <h3>💳 Información de Tarjeta</h3>
            <div class="form-group">
              <label for="numeroTarjeta">Número de Tarjeta *</label>
              <input 
                id="numeroTarjeta" 
                v-model="tarjeta.numero" 
                type="text" 
                required 
                placeholder="1234 5678 9012 3456" 
                maxlength="19"
                @input="formatearTarjeta"
              />
            </div>
            
            <div class="form-row">
              <div class="form-group">
                <label for="expiracion">Fecha de Expiración *</label>
                <input 
                  id="expiracion" 
                  v-model="tarjeta.expiracion" 
                  type="text" 
                  required 
                  placeholder="MM/AA" 
                  maxlength="5"
                  @input="formatearExpiracion"
                />
              </div>
              <div class="form-group">
                <label for="cvv">CVV *</label>
                <input 
                  id="cvv" 
                  v-model="tarjeta.cvv" 
                  type="text" 
                  required 
                  placeholder="123" 
                  maxlength="4"
                />
              </div>
            </div>
            
            <div class="form-group">
              <label for="nombreTarjeta">Nombre en la Tarjeta *</label>
              <input 
                id="nombreTarjeta" 
                v-model="tarjeta.nombre" 
                type="text" 
                required 
                placeholder="Nombre como aparece en la tarjeta" 
              />
            </div>
          </div>

          <!-- Botones de acción -->
          <div class="form-actions">
            <router-link to="/cart" class="btn btn-secondary">
              ← Volver al Carrito
            </router-link>
            <button type="submit" class="btn btn-primary" :disabled="procesandoCompra">
              <span v-if="procesandoCompra">Procesando...</span>
              <span v-else>Finalizar Compra 🛒</span>
            </button>
          </div>
        </form>
      </div>

      <!-- Resumen de la compra -->
      <div class="order-summary">
        <h3>📋 Resumen de la Compra</h3>
        
        <div class="summary-items">
          <div v-for="item in cart" :key="item.id" class="summary-item">
            <img :src="item.image" :alt="item.name" class="summary-image" />
            <div class="summary-details">
              <h4>{{ item.name }}</h4>
              <p>Cantidad: {{ item.quantity }}</p>
              <p class="summary-price">${{ (item.price * item.quantity).toFixed(2) }}</p>
            </div>
          </div>
        </div>

        <div class="summary-totals">
          <div class="summary-line">
            <span>Subtotal:</span>
            <span>${{ subtotal.toFixed(2) }}</span>
          </div>
          <div class="summary-line">
            <span>Envío:</span>
            <span>${{ costoEnvio.toFixed(2) }}</span>
          </div>
          <div class="summary-line total">
            <span>Total:</span>
            <span>${{ total.toFixed(2) }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CheckoutPage',
  props: {
    cart: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      cliente: {
        nombre: '',
        email: '',
        telefono: '',
        cedula: '',
        provincia: '',
        distrito: '',
        direccion: ''
      },
      tipoEntrega: 'recoger',
      metodoPago: 'tarjeta',
      tarjeta: {
        numero: '',
        expiracion: '',
        cvv: '',
        nombre: ''
      },
      costoEnvio: 0,
      procesandoCompra: false
    }
  },
  computed: {
    subtotal() {
      return this.cart.reduce((total, item) => total + (item.price * item.quantity), 0)
    },
    total() {
      return this.subtotal + this.costoEnvio
    }
  },
  methods: {
    actualizarCostoEnvio() {
      this.costoEnvio = this.tipoEntrega === 'envio' ? 10.00 : 0
    },
    
    formatearTarjeta() {
      // Formatear número de tarjeta: 1234 5678 9012 3456
      let valor = this.tarjeta.numero.replace(/\D/g, '')
      valor = valor.replace(/(\d{4})(?=\d)/g, '$1 ')
      this.tarjeta.numero = valor
    },
    
    formatearExpiracion() {
      // Formatear fecha: MM/AA
      let valor = this.tarjeta.expiracion.replace(/\D/g, '')
      if (valor.length >= 2) {
        valor = valor.substring(0, 2) + '/' + valor.substring(2, 4)
      }
      this.tarjeta.expiracion = valor
    },
    
    async procesarCompra() {
      this.procesandoCompra = true
      
      try {
        // Validar que haya productos en el carrito
        if (this.cart.length === 0) {
          alert('No hay productos en el carrito')
          return
        }
        
        // Validar campos requeridos según el tipo de entrega
        if (this.tipoEntrega === 'envio') {
          if (!this.cliente.provincia || !this.cliente.distrito || !this.cliente.direccion) {
            alert('Por favor completa todos los campos de dirección')
            return
          }
        }
        
        // Validar información de tarjeta si es necesario
        if (this.metodoPago === 'tarjeta') {
          if (!this.tarjeta.numero || !this.tarjeta.expiracion || !this.tarjeta.cvv || !this.tarjeta.nombre) {
            alert('Por favor completa todos los campos de la tarjeta')
            return
          }
        }
        
        // Crear objeto de compra
        const compra = {
          cliente: this.cliente,
          productos: this.cart,
          tipoEntrega: this.tipoEntrega,
          metodoPago: this.metodoPago,
          subtotal: this.subtotal,
          costoEnvio: this.costoEnvio,
          total: this.total,
          fecha: new Date().toLocaleString('es-PA'),
          numero: this.generarNumeroCompra()
        }
        
        // Simular procesamiento
        await this.simularProcesamiento()
        
        // Generar factura
        this.generarFactura(compra)
        
        // Limpiar carrito
        this.$emit('clear-cart')
        
        // Mostrar mensaje de éxito
        alert('¡Compra realizada con éxito! Se ha generado tu factura.')
        
        // Redirigir a inicio
        this.$router.push('/')
        
      } catch (error) {
        console.error('Error al procesar compra:', error)
        alert('Error al procesar la compra. Por favor intenta nuevamente.')
      } finally {
        this.procesandoCompra = false
      }
    },
    
    async simularProcesamiento() {
      // Simular tiempo de procesamiento
      await new Promise(resolve => setTimeout(resolve, 2000))
    },
    
    generarNumeroCompra() {
      return 'TL' + Date.now().toString().slice(-8)
    },
    
    generarFactura(compra) {
      // Crear contenido HTML para convertir a PDF
      const htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <title>Factura</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              margin: 20px;
              background: white;
            }
            .header {
              text-align: center;
              margin-bottom: 30px;
              border-bottom: 2px solid #333;
              padding-bottom: 20px;
            }
            .company-name {
              font-size: 24px;
              font-weight: bold;
              color: #333;
              margin-bottom: 10px;
            }
            .invoice-title {
              font-size: 18px;
              color: #666;
            }
            .section {
              margin: 20px 0;
              padding: 15px;
              border: 1px solid #ddd;
              border-radius: 5px;
            }
            .section-title {
              font-size: 16px;
              font-weight: bold;
              color: #333;
              margin-bottom: 10px;
              border-bottom: 1px solid #eee;
              padding-bottom: 5px;
            }
            .info-row {
              display: flex;
              justify-content: space-between;
              margin: 8px 0;
              padding: 3px 0;
            }
            .info-label {
              font-weight: bold;
              color: #555;
            }
            .products-table {
              width: 100%;
              border-collapse: collapse;
              margin: 15px 0;
            }
            .products-table th,
            .products-table td {
              border: 1px solid #ddd;
              padding: 12px;
              text-align: left;
            }
            .products-table th {
              background-color: #f8f9fa;
              font-weight: bold;
            }
            .products-table td:last-child,
            .products-table th:last-child {
              text-align: right;
            }
            .totals {
              margin-top: 20px;
              border-top: 2px solid #333;
              padding-top: 15px;
            }
            .total-row {
              display: flex;
              justify-content: space-between;
              margin: 5px 0;
              font-size: 14px;
            }
            .total-final {
              font-size: 18px;
              font-weight: bold;
              color: #333;
              border-top: 1px solid #333;
              padding-top: 10px;
              margin-top: 10px;
            }
            .footer {
              text-align: center;
              margin-top: 40px;
              padding: 20px;
              background: #f8f9fa;
              border-radius: 5px;
              color: #666;
            }
            @media print {
              body { margin: 0; }
              .section { break-inside: avoid; }
            }
          </style>
        </head>
        <body>
          <div class="header">
            <div class="company-name">🛍️ TIENDA EN LÍNEA</div>
            <div class="invoice-title">Factura de Compra</div>
            <div style="margin-top: 15px; font-size: 14px; color: #666;">
              Fecha: ${compra.fecha} | Número: ${compra.numero}
            </div>
          </div>

          <div class="section">
            <div class="section-title">📋 DATOS DEL CLIENTE</div>
            <div class="info-row">
              <span class="info-label">Nombre:</span>
              <span>${compra.cliente.nombre}</span>
            </div>
            <div class="info-row">
              <span class="info-label">Cédula:</span>
              <span>${compra.cliente.cedula}</span>
            </div>
            <div class="info-row">
              <span class="info-label">Email:</span>
              <span>${compra.cliente.email}</span>
            </div>
            <div class="info-row">
              <span class="info-label">Teléfono:</span>
              <span>${compra.cliente.telefono}</span>
            </div>
          </div>

          <div class="section">
            <div class="section-title">🚚 DETALLES DE ENTREGA</div>
            <div class="info-row">
              <span class="info-label">Método de Pago:</span>
              <span>${compra.metodoPago.toUpperCase()}</span>
            </div>
            <div class="info-row">
              <span class="info-label">Tipo de Entrega:</span>
              <span>${compra.tipoEntrega === 'envio' ? 'ENVÍO A DOMICILIO' : 'RECOGER EN TIENDA'}</span>
            </div>
            ${compra.tipoEntrega === 'envio' ? `
              <div class="info-row">
                <span class="info-label">Provincia:</span>
                <span>${compra.cliente.provincia}</span>
              </div>
              <div class="info-row">
                <span class="info-label">Distrito:</span>
                <span>${compra.cliente.distrito}</span>
              </div>
              <div class="info-row">
                <span class="info-label">Dirección:</span>
                <span>${compra.cliente.direccion}</span>
              </div>
            ` : ''}
          </div>

          <div class="section">
            <div class="section-title">🛒 PRODUCTOS COMPRADOS</div>
            <table class="products-table">
              <thead>
                <tr>
                  <th>Producto</th>
                  <th>Cantidad</th>
                  <th>Precio Unit.</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                ${compra.productos.map(item => `
                  <tr>
                    <td>${item.name}</td>
                    <td>${item.quantity}</td>
                    <td>${item.price.toFixed(2)}</td>
                    <td>${(item.price * item.quantity).toFixed(2)}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>

          <div class="totals">
            <div class="total-row">
              <span>Subtotal:</span>
              <span>${compra.subtotal.toFixed(2)}</span>
            </div>
            <div class="total-row">
              <span>Envío:</span>
              <span>${compra.costoEnvio.toFixed(2)}</span>
            </div>
            <div class="total-row total-final">
              <span>TOTAL:</span>
              <span>${compra.total.toFixed(2)}</span>
            </div>
          </div>

          <div class="footer">
            <p>¡Gracias por su compra!</p>
            <p>Para cualquier consulta, contáctenos a: <strong>info@tiendaenlinea.com</strong></p>
          </div>
        </body>
        </html>
      `
      
      // Crear PDF usando window.print()
      const printWindow = window.open('', '_blank')
      printWindow.document.write(htmlContent)
      printWindow.document.close()
      
      // Esperar a que se cargue el contenido y luego imprimir
      printWindow.onload = function() {
        printWindow.print()
        // Cerrar la ventana después de imprimir
        setTimeout(() => {
          printWindow.close()
        }, 1000)
      }
    }
  }
}
</script>

<style scoped>
.checkout {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.checkout h2 {
  text-align: center;
  margin-bottom: 30px;
  color: #333;
  font-size: 2.5rem;
}

.checkout-container {
  display: grid;
  grid-template-columns: 1fr 400px;
  gap: 40px;
}

.customer-form {
  background: white;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
}

.customer-form h3 {
  margin-bottom: 20px;
  color: #333;
  font-size: 1.4rem;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
  color: #555;
}

.form-group input,
.form-group select,
.form-group textarea {
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 16px;
  transition: border-color 0.3s;
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #007bff;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
}

.shipping-section,
.payment-section {
  margin: 30px 0;
}

.shipping-options,
.payment-options {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.shipping-option,
.payment-option {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.shipping-option:hover,
.payment-option:hover {
  background-color: #f8f9fa;
}

.shipping-option input,
.payment-option input {
  width: auto;
}

.address-section,
.card-section {
  margin: 20px 0;
  padding: 20px;
  background: #f8f9fa;
  border-radius: 8px;
  border: 1px solid #e9ecef;
}

.form-actions {
  display: flex;
  gap: 15px;
  justify-content: flex-end;
  margin-top: 30px;
}

.btn {
  padding: 12px 24px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  text-decoration: none;
  display: inline-block;
  text-align: center;
  font-weight: bold;
  transition: background-color 0.3s;
}

.btn-primary {
  background: #007bff;
  color: white;
}

.btn-primary:hover {
  background: #0056b3;
}

.btn-primary:disabled {
  background: #6c757d;
  cursor: not-allowed;
}

.btn-secondary {
  background: #6c757d;
  color: white;
}

.btn-secondary:hover {
  background: #545b62;
}

.order-summary {
  background: white;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  height: fit-content;
  position: sticky;
  top: 20px;
}

.order-summary h3 {
  margin-bottom: 20px;
  color: #333;
  font-size: 1.4rem;
}

.summary-items {
  margin-bottom: 20px;
}

.summary-item {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 15px 0;
  border-bottom: 1px solid #eee;
}

.summary-image {
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 6px;
}

.summary-details {
  flex: 1;
}

.summary-details h4 {
  margin: 0 0 5px 0;
  font-size: 1rem;
  color: #333;
}

.summary-details p {
  margin: 2px 0;
  color: #666;
  font-size: 0.9rem;
}

.summary-price {
  font-weight: bold;
  color: #007bff !important;
}

.summary-totals {
  border-top: 2px solid #ddd;
  padding-top: 15px;
}

.summary-line {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  font-size: 1rem;
}

.summary-line.total {
  font-weight: bold;
  font-size: 1.2rem;
  color: #333;
  border-top: 1px solid #ddd;
  padding-top: 10px;
}

@media (max-width: 768px) {
  .checkout-container {
    grid-template-columns: 1fr;
    gap: 20px;
  }
  
  .form-row {
    grid-template-columns: 1fr;
  }
  
  .form-actions {
    flex-direction: column;
  }
  
  .order-summary {
    position: static;
  }
}
</style>