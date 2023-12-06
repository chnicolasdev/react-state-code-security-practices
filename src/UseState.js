import React, { useState, useEffect } from 'react';

const SECURITY_CODE = 'paradigma';

function UseState({ name }) {
    const [value, setValue] = useState('');
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    console.log(value);

    useEffect(() => {
        console.log("Empezando el efecto")

        // Si es true, se ejecuta, comienza en false, por eso no se ejecuta al iniciar.
        if (!!loading) {
            setTimeout(() => {
                console.log("Haciendo la validación")

                if (value !== SECURITY_CODE) {
                    setError(true);
                } else {
                    setError(false);
                }
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

            {(error && !loading) && (
                <p>Error: el código es incorrecto</p>
            )}

            {loading && (
                <p>Cargando...</p>
            )}

            <input
                placeholder='Código de seguridad'
                value={ value }
                onChange={(event) => {
                    setValue(event.target.value);
                }}
            />
            <button
                // onClick={() => setError(!error)}
                onClick={() => setLoading(true)}
                >
                Comprobar</button>
        </div>
    );
}

export { UseState };