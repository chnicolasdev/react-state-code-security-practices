import React, { useState, useEffect } from 'react';

const SECURITY_CODE = 'paradigma';

function UseState({ name }) {
    const [state, setState] = useState({
        value: '',
        error: false,
        loading: false,
        deleted: false,
        confirmed: false,
    });

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
                        confirmed: true,
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

    // Primera vista
    if (!state.deleted && !state.confirmed) {
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
    } else if (state.confirmed && !state.deleted) {
        return (
            <React.Fragment>
                <p>¿Seguro que quieres eliminar el useState?</p>
                <button
                    onClick={() => {
                        setState({
                            ...state,
                            deleted: true,
                        })
                    }}>Si, eliminar</button>
                <button
                    onClick={() => {
                        setState({
                            ...state,
                            confirmed: false,
                        })
                    }}>No, me arrepentí</button>
            </React.Fragment>
        );
    } else {
        return (
            <React.Fragment>
                <p>Eliminado con éxito</p>

                <button
                    onClick={() => {
                        setState({
                            ...state,
                            confirmed: false,
                            deleted: false,
                            value: ''
                        })
                    }}>Resetear, volver atrás</button>
            </React.Fragment>
        );
    }
    
}

export { UseState };