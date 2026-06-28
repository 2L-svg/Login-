import React, { useState, useEffect } from "react"; 
import log from './Imagen1.png';
import './stilo.css';

// Importamos nuestros nuevos componentes desde su carpeta
import Formulario from "./componentes/Formulario";
import TarjetaUsuario from "./componentes/TarjetaUsuario";

function Cabecera(){
  return(
    <div style={{
      height: '60px',
      width: '100%', 
      maxWidth: '500px',
      backgroundColor: '#678362',
      borderRadius: '15px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-around',
      marginTop: '20px'
    }}>
      <img src={log} alt="Logo" style={{ height: '45px', width: '45px', borderRadius: '50px' }} />
    </div>
  )
}

function App(){
  // Modificamos a un solo estado en forma de objeto
  const [datosFormulario, setDatosFormulario] = useState({
    usuario: "",
    correo: "",
    password: ""
  });

  const [mensaje, setMensaje] = useState("");
  const [enEdicion, setEdicion] = useState(null);

  const [listaUsuarios, setlistaUsuarios] = useState(() => {
    const datosGuardados = localStorage.getItem("usuarios");
    return datosGuardados ? JSON.parse(datosGuardados) : [];
  });

  useEffect(() => {
    localStorage.setItem("usuarios", JSON.stringify(listaUsuarios));
  }, [listaUsuarios]);

  // Esta función controla todos los inputs dinámicamente
  const manejarCambioInput = (e) =>{
    const {name, value} = e.target; 
    setDatosFormulario({
      ...datosFormulario, 
      [name]: value 
    });
  };

  const enviarDatos = () => {
    // Accedemos a los datos usando desestructuración
    const {usuario, correo, password} = datosFormulario;

    if (usuario === "" || correo === "" || password === ""){
      setMensaje("Por favor, rellena todos los campos ✌️");
      setTimeout(() => {
        setMensaje("");
      }, 3000);
      return; // 👈 Agregado: detenemos la función aquí si está vacío
    } 

    if (password.length < 6){
      setMensaje("La contraseña tiene que tener más de 6 dígitos 🔒");
      setTimeout(() => setMensaje(""), 3000);
      return;
    }

    const expresionCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!expresionCorreo.test(correo)) {
      setMensaje("Por favor, ingresa un correo electrónico válido 📧");
      setTimeout(() => setMensaje(""), 3000);
      return;
    }
  
    const nuevoUsuario = {
      nombre: usuario,
      email: correo,
      password: password
    };

    if (enEdicion !== null){
      const listaModificada = [...listaUsuarios];
      listaModificada[enEdicion] = nuevoUsuario;
      setlistaUsuarios(listaModificada);
      setMensaje("Datos editados correctamente ✏️");
      setEdicion(null);
    } else {
      setlistaUsuarios([...listaUsuarios, nuevoUsuario]);
      setMensaje(`Bienvenido, ${usuario} 🎉`);
    }

    setTimeout(() => setMensaje(""), 3000);
    // Limpiamos el objeto completo
    setDatosFormulario({usuario: "", correo: "", password: ""});
  };

  const eliminarUsuario = (posicionBorrar) => {
    const listaNueva = listaUsuarios.filter((user, posicionActual) => posicionActual !== posicionBorrar);
    setlistaUsuarios(listaNueva);
    setMensaje("Usuario eliminado correctamente ❌");
    setTimeout(() => setMensaje(""), 3000);
  }

  const editarUsuario = (posicionEditar) => {
    const usuarioAeditar = listaUsuarios[posicionEditar];
    // Corregido: "nombre" y "password" con minúscula para que coincida con el backend/objeto
    setDatosFormulario({
      usuario: usuarioAeditar.nombre, 
      correo: usuarioAeditar.email,
      password: usuarioAeditar.password 
    });
    setEdicion(posicionEditar);
  }

  return(
    <div className="pantalla-login">
      <Cabecera/>
      
      {/* Corregido: Pasamos el objeto y la función controladora por props */}
      <Formulario 
        datos={datosFormulario}
        alCambiarInput={manejarCambioInput}
        enEdicion={enEdicion}
        alEnviar={enviarDatos}
      />

      {mensaje && (
        <p className="mensaje-alerta">
          {mensaje}
        </p>
      )}
   
      <h4>Lista de usuarios</h4>
      
      {listaUsuarios.map((user, posicion) => (
        <TarjetaUsuario 
          key={posicion}
          user={user}
          posicion={posicion}
          alBorrar={eliminarUsuario}
          alEditar={editarUsuario}
        />
      ))}
    </div>
  )
}

export default App;