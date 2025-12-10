import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from 'react-toastify';

// Crear el contexto
export const CartContext = createContext();

// Proveedor del contexto del carrito, se encarga de distribuir las funciones globales
export function CartProvider({ children }) {

  // Estado del carrito
  const [carrito, setCarrito] = useState([]);
  const [cargaCompleta, setCargaCompleta] = useState(false); //flag o bandera

  useEffect(() => { //lo uso para la carga inicial
    const carritoGuardado = localStorage.getItem("carrito"); 
    if (carritoGuardado) {
      setCarrito(JSON.parse(carritoGuardado));
    }
    setCargaCompleta(true); // Marca que la carga inicial ha terminado
  }, []);

  useEffect(() => { // cada vez que carrito o cargaCompleta cambie, guardarlo en localStorage
    if (cargaCompleta && carrito.length > 0) { // ← SOLO guardar si hay items
      localStorage.setItem("carrito", JSON.stringify(carrito));
    } else if (cargaCompleta && carrito.length === 0) {
      localStorage.removeItem("carrito"); // // y elimina cariito[] si está vacío
    }
  }, [carrito, cargaCompleta]);

  // Funciones para el carrito
  const agregarAlCarrito = (producto) => {
    const productoExistente = carrito.find((p) => p.id === producto.id);

    if (productoExistente) {
      // Si ya está en el carrito, aumenta la cantidad
      setCarrito(
        carrito.map((p) =>
          p.id === producto.id? { ...p, cantidad: (p.cantidad || 1) + 1 } : p
        )
      );
    } else {
      // Si no está, lo agrega con cantidad inicial = 1
      setCarrito([...carrito, { ...producto, cantidad: 1 }]);
    }
    
    toast.success(`Producto ${producto.nombre} agregado al carrito`);
  };

    //Vacía todo el carrito
  const vaciarCarrito = () => {
    setCarrito([]);
  };

  // Aumenta la cantidad de un producto existente
  const agregarCantidad = (idProducto) => {
    const productoExistente = carrito.find(p => p.id === idProducto);

    if (productoExistente) {
      setCarrito(
        carrito.map(p =>
          p.id === idProducto ? { ...p, cantidad: (p.cantidad || 1) + 1 } : p
        )
      );
    }
  };

  //Reduce la cantidad o elimina el producto
  const quitarCantidad = (idProducto) => {
    const productoExistente = carrito.find(p => p.id === idProducto);

    if (!productoExistente) return;

    if ((productoExistente.cantidad || 1) > 1) {
      // Resta una unidad
      setCarrito(
        carrito.map(p =>
          p.id === idProducto
            ? { ...p, cantidad: p.cantidad - 1 }
            : p
        )
      );
    } else {
      // Si llega a 0, se elimina del carrito
      setCarrito(carrito.filter(p => p.id !== idProducto));
    }
  };

  const quitarDelCarrito = (idProducto => {
      setCarrito(carrito.filter(p => p.id !== idProducto));
    }
  );

  //Calcula el total del carrito
  const total = carrito.reduce((sum, item) => {
    const cantidad = Number(item.cantidad || 1);
    const precioUnitario = Number(item.precio || 0);
    return sum + cantidad * precioUnitario;
  }, 0);

  // Valor que se provee a todos los componentes
  const value = {
    // Carrito
    carrito,
    agregarAlCarrito,
    vaciarCarrito,
    agregarCantidad,
    quitarCantidad,
    quitarDelCarrito,
    total
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

export function useCartContext() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCartContext debe usarse dentro de CartProvider");
  }
  return context;
}