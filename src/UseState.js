import React, { useState, useEffect } from 'react';

function UseState({ name }) {
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        console.log("Empezando el efecto")

        // Si es true, se ejecuta, comienza en false, por eso no se ejecuta al iniciar.
        if (!!loading) {
            setTimeout(() => {
                console.log("Haciendo la validación")
                setLoading(false);
                console.log("Terminando la validación")
            }, 3000);
        }

        console.log("Terminando el efecto")
    }, [loading]);

    return (
        <div>
            <h2>Eliminar { name }</h2>
            <p>Por favor, escribe el código de seguridad</p>

            {error && (
                <p>Error: el código es incorrecto</p>
            )}

            {loading && (
                <p>Cargando...</p>
            )}

            <input type="text" placeholder='Código de seguridad' />
            <button
                // onClick={() => setError(!error)}
                onClick={() => setLoading(!error)}
                >
                Comprobar</button>
        </div>
    );
}

export { UseState };