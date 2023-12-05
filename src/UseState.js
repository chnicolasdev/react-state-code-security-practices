import React, { useState } from 'react';

function UseState({ name }) {
    const [error, setError] = useState(false);

    return (
        <div>
            <h2>Eliminar { name }</h2>
            <p>Por favor, escribe el código de seguridad</p>

            {error && (
                <p>Error: el código es incorrecto</p>
            )}

            <input type="text" placeholder='Código de seguridad' />
            <button
                onClick={() => setError(!error)}
                >
                Comprobar</button>
        </div>
    );
}

export { UseState };