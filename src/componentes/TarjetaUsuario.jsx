import React from "react";

function TarjetaUsuario(props) {
  //Desestructuramos para que el código sea más limpio de leer
  const { user, posicion, alBorrar, alEditar } = props;

  return (
    <div className="tarjeta-usuario" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div>
        <p>Usuario: <strong>{user.nombre}</strong></p>
        <p>Correo: {user.email}</p>
      </div>
      
      <div style={{ display: 'flex', gap: '10px' }}>
        {/* Disparamos las funciones del padre pasándole la posición de esta tarjeta */}
        <button 
          onClick={() => alBorrar(posicion)} 
          
          style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '18px' }}
        >
          ❌
        </button>

        <button
          onClick={() => alEditar(posicion)}
          style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '18px' }}
        >
          ✏️
        </button>
      </div>
    </div>
  );
}

export default TarjetaUsuario;