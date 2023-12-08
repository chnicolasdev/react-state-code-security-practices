import React, { useState, useEffect } from 'react';

const SECURITY_CODE = 'paradigma';

function UseState({ name }) {
    const [state, setState] = useState({
        value: '',
        error: false,
        loading: false
    });
    // const [value, setValue] = useState('');
    // const [error, setError] = useState(false);
    // const [loading, setLoading] = useState(false);

    console.log(state);

    useEffect(() => {
        console.log("Empezando el efecto")

        // Si es true, se ejecuta, comienza en false, por eso no se ejecuta al iniciar.
        if (!!state.loading) {
            setTimeout(() => {
                console.log("Haciendo la validación")

                if (state.value === SECURITY_CODE) {
                    setState({
                        ...state,
                        error: false,
                        loading: false,
                    });
                } else {
                    setState({
                        ...state,
                        loading: false,
                        error: true,
                    });
                }
                console.log("Terminando la validación")
            }, 3000);
        }
        console.log("Terminando el efecto")
    }, [state.loading]);

    return (
        <div>
            <h2>Eliminar { name }</h2>
            <p>Por favor, escribe el código de seguridad</p>

            {(state.error && !state.loading) && (
                <p>Error: el código es incorrecto</p>
            )}

            {state.loading && (
                <p>Cargando...</p>
            )}

            <input
                placeholder='Código de seguridad'
                value={ state.value }
                onChange={(event) => {
                    // setValue(event.target.value);
                    setState({
                        ...state,
                        value: event.target.value,
                    });
                }}
            />
            <button
                // onClick={() => setError(!error)}
                onClick={() =>
                    // setLoading(true)
                    setState({
                        ...state,
                        loading: true,
                    })
                }
                >
                Comprobar</button>
        </div>
    );
}

export { UseState };