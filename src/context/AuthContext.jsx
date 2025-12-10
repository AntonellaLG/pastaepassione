import React, { createContext, useContext, useState, useEffect } from "react";

// Crear el contexto
export const AuthContext = createContext();

// Proveedor del contexto del usuario, se encarga de distribuir las funciones globales
export function AuthProvider({ children }) {
    
  // Estado de autenticación
  const [usuario, setUsuario] = useState(null);    //decia useState({ nombre: "", email: "" }), pero lo cambiamos a null porque el usuario todavia no está autenticado
  const [cargando, setCargando] = useState(true);

  // Verificar token al cargar la aplicación
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const emailGuardado = localStorage.getItem("authEmail");
    if (token) {
      const username = token.replace("fake-token-", "");
      setUsuario({
        nombre: username,
        email: emailGuardado || "",
      });
    }
    setCargando(false);
  }, []);

  const iniciarSesion = (username, emailIngresado) => {
    const token = `fake-token-${username}`;
    localStorage.setItem("authToken", token); //guardo en el local storage con set, consulto con get
    localStorage.setItem("authEmail", emailIngresado);

    setUsuario({
      nombre: username,
      email: emailIngresado || "",
    });
  };

  // Función para cerrar sesión
  const cerrarSesion = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('authEmail');
    setUsuario(null); //vuelvo a establecer el usuario en null
  };

  const value = {
    //Valor que se provee a todos los componentes
    usuario,
    iniciarSesion,
    cerrarSesion,
    isAuthenticated: !!usuario, //Propiedad computada (reactiva). Cuando le pongo la doble negacion al usuario, entonces este user deja de ser null y transformo el valor en booleano. Ie, que si el usuario agrega info, la paso a la funcion iniciarSecion del contexto. Si el usuario agrega un dato, pasa a true. Si quiere loguearse como admin y se equivoca, tanto en el nombre como en el email, va a ser false. 
    esAdmin: usuario?.nombre === 'admin',
    cargando,
  };

  return (
    <AuthContext.Provider value={value}>
        {children}
    </AuthContext.Provider>
  );
}

// Hook personalizado
export function useAuthContext() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext debe usarse dentro de AuthProvider");
  }
  return context;
}