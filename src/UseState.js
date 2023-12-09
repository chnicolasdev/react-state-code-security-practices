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

    const onConfirm = () => {
        setState({
            ...state,
            error: false,
            loading: false,
            confirmed: true,
        });
    }

    const onError = () => {
        setState({
            ...state,
            loading: false,
            error: true,
        });
    }

    const onWrite = (newValue) => {
        setState({
            ...state,
            value: newValue,
        });
    }

    const onCheck = () => {
        setState({
            ...state,
            loading: true,
        })
    }

    const onDelete = () => {
        setState({
            ...state,
            deleted: true,
        })
    }

    const onReset = () => {
        setState({
            value: '',
            error: false,
            loading: false,
            deleted: false,
            confirmed: false,
        })
    }

    useEffect(() => {
        console.log("Empezando el efecto")

        // Si es true, se ejecuta, comienza en false, por eso no se ejecuta al iniciar.
        if (!!state.loading) {
            setTimeout(() => {
                console.log("Haciendo la validación")

                if (state.value === SECURITY_CODE) {
                    onConfirm();
                } else {
                    onError();
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
                        onWrite(event.target.value);
                    }}
                />
                <button
                    onClick={() =>
                        onCheck()
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
                        onDelete()
                    }}>Si, eliminar</button>
                <button
                    onClick={() => {
                        onReset()
                    }}>No, me arrepentí</button>
            </React.Fragment>
        );
    } else {
        return (
            <React.Fragment>
                <p>Eliminado con éxito</p>

                <button
                    onClick={() => {
                        onReset()
                    }}>Resetear, volver atrás</button>
            </React.Fragment>
        );
    }
    
}

export { UseState };