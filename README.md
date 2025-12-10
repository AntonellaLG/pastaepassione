# 🍝 Pasta e Passione
*Ecommerce de productos gastronómicos italianos*

**Pasta e Passione** es un proyecto desarrollado como **trabajo final del curso de React de Talento Tech**.  
Es una **aplicación de ecommerce completa** donde los usuarios pueden navegar por un catálogo, gestionar un carrito, iniciar sesión y simular una compra.
Además, incluye un **dashboard de administrador** con control total sobre los productos.

---

## 🚀 Funcionalidades principales

### 👤 Usuarios
- 🔐 **Registro e inicio de sesión** (usuario y administrador).  
- 🔒 **Rutas protegidas**: cada rol solo ve las páginas permitidas.  
- 🔄 Persistencia de sesión mediante LocalStorage.  

### 🛍️ Productos
- Visualización de productos con imágenes, precios y descripción.  
- Vista en formato **tarjetas responsivas**.  
- 🔍 **Búsqueda avanzada:** permite filtrar productos por **nombre** y **descripción**.  
- 📄 **Paginado del catálogo:** los productos se dividen en múltiples páginas, lo que mejora la legibilidad y la experiencia de usuario.  

### 🧺 Carrito de compras
- Agregar productos con cantidad personalizada.  
- Incrementar o disminuir cantidad.  
- Eliminar un producto del carrito.  
- Vaciar el carrito completo.  
- Cálculo automático del subtotal y total.  
- Flujo completo de compra (simulado). 

### 🛠️ Dashboard de administrador
- ➕ Agregar productos nuevos.  
- ✏️ Editar productos existentes.  
- 🗑️ Eliminar productos.  
- Vista privada accesible solo para administradores.  

### 📱 Diseño responsive
- Totalmente adaptado a computadoras, tablets y móviles.  
- Uso combinado de **Styled Components + Bootstrap**.  

### 🧉 Mejoras de UX
- Alertas visuales (SweetAlert2).  
- Notificaciones (Toastify).  
- Animaciones suaves al interactuar con productos/carrito.  

---

## 🧰 Tecnologías utilizadas

| Tecnología | Uso |
|-----------|-----|
| ⚛️ **React** | Estructura principal del proyecto |
| 🧩 **React Router DOM** | Navegación + rutas protegidas |
| 🪣 **Context API** | Estado global (auth, carrito, productos) |
| ⚡ **Vite** | Entorno de desarrollo |
| 🧠 **React Hooks** | useState, useEffect, useContext, useNavigate |
| 🎨 **Styled Components** | Estilos con JavaScript + media queries |
| 🅱️ **Bootstrap 5** | Layout, botones, helpers |
| 🍬 **SweetAlert2** | Popups personalizados |
| 🔔 **Toastify** | Notificaciones |
| 🖼️ **React Icons** | Iconografía |



---

## 🌐 Deploy

El proyecto está desplegado en Vercel para su visualización:  
👉 https://pastaepassione.vercel.app/

---

## 🧭 Estructura del proyecto

src/

│

├── assets/ # Imágenes y recursos estáticos

├── components/ # Componentes reutilizables

├── context/ # Context API (AuthContext, CartContext)

├── pages/ # Páginas principales (Home, Login, Carrito, Dashboard...)

├── breakpoints.js # Variables para diseño responsive

│

├── App.jsx # Enrutamiento global

├── main.jsx # Punto de entrada

└── index.css # Estilos globales
