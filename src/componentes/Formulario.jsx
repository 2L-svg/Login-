import React from "react";

// Nuestro molde de inputs (lo movimos aquí para que lo use el formulario)
function CampoTexto(props){
  return(
    <div className="campo-grupo">
      <label>{props.titulo}</label>
      <input 
        type={props.tipo}
        name={props.name}  //esto le dice a read que campo es
        placeholder={`Ingresa tu ${props.titulo.toLowerCase()}`} 
        onChange={props.alCambiar} 
        value={props.valor} 
      />
    </div>
  )
}

function Formulario(props) {
  return (
    <div className="formulario-contenedor">
      <CampoTexto 
        titulo="usuario" 
        tipo="text" 
        name="usuario" //coincide con la llave del objeto
        alCambiar={(e) => props.setUsuario(e.target.value)} 
        value={props.usuario} 
      />
      <CampoTexto
        titulo="correo"
        tipo="email"
        name="correo" //coincide con la llave del objeto
        alCambiar={(e) => props.setCorreo(e.target.value)}
        value={props.correo}
      />
      <CampoTexto
        titulo="contraseña"
        tipo="password"
        name="password"//coincide con la llave del objeto
        alCambiar={(e) => props.setPassword(e.target.value)}
        value={props.password}
      />
      <button 
  onClick={props.alEnviar} 
  className="btn-registrar"
  style={{
    //cambia de clor time
    backgroundColor: props.enEdicion !== null ? '#2b6cb0' : '#280202',
    transition: 'background-color 0.3s ease' // Suaviza el cambio de color
  }}
>
  {props.enEdicion !== null ? "✏️ Guardar Cambios" : "➕ Registrar"}
</button>
    </div>
  );
}

export default Formulario;