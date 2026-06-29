import React from "react";

// Nuestro molde de inputs corregido
function CampoTexto(props){
  return(
    <div className="campo-grupo">
      <label>{props.titulo}</label>
      <input 
        type={props.tipo}
        name={props.name}  // Esto mapea dinámicamente el campo en el objeto
        placeholder={`Ingresa tu ${props.titulo.toLowerCase()}`} 
        onChange={props.alCambiar} 
        value={props.valor} // 👈 Corregido: aquí lee la prop 'valor' que viene del padre
      />
    </div>
  )
}

function Formulario(props) {
  // Desestructuramos el objeto que viene desde App.jsx para usarlo fácil aquí
  const { usuario, correo, password } = props.datos;

  return (
    <div className="formulario-contenedor">
      <CampoTexto 
        titulo="Usuario" 
        tipo="text" 
        name="usuario" 
        alCambiar={props.alCambiarInput} // 👈 Usa la función genérica de la App
        valor={usuario} 
      />
      
      <CampoTexto
        titulo="Correo"
        tipo="email"
        name="correo" 
        alCambiar={props.alCambiarInput} // 👈 Usa la función genérica de la App
        valor={correo}
      />
      
      <CampoTexto
        titulo="Contraseña"
        tipo="password"
        name="password" // 👈 Corregido: Debe decir "password" en minúsculas para coincidir con tu objeto de App.jsx
        alCambiar={props.alCambiarInput} // 👈 Usa la función genérica de la App
        valor={password}
      />
      
      <button 
        onClick={props.alEnviar} 
        className="btn-registrar"
        style={{
          backgroundColor: props.enEdicion !== null ? '#801f32' : '#02a3ae',
          transition: 'background-color 0.3s ease' 
        }}
      >
        {props.enEdicion !== null ? " Guardar Cambios" : " Registrar"}
      </button>
    </div>
  );
}

export default Formulario;