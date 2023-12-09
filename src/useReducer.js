import React, { useEffect, useReducer } from 'react';

const SECURITY_CODE = 'paradigma';

function UseReducer({ name }) {
    const [state, dispatch] = useReducer(reducer, initialState);

    console.log({state});

    useEffect(() => {
        console.log("Empezando el efecto")

        // Si es true, se ejecuta, comienza en false, por eso no se ejecuta al iniciar.
        if (!!state.loading) {
            setTimeout(() => {
                console.log("Haciendo la validación")

                if (state.value === SECURITY_CODE) {
                    dispatch({
                        type: 'CONFIRM',
                    });
                } else {
                    dispatch({
                        type: 'ERROR',
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
                        dispatch({
                            type: 'WRITE',
                            payload: event.target.value,
                        });
                    }}
                />
                <button
                    onClick={() =>
                        dispatch({
                            type: 'CHECK'
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
                        dispatch({
                            type: 'DELETE',
                        });
                    }}>Si, eliminar</button>
                <button
                    onClick={() => {
                        dispatch({
                            type: 'RESET',
                        });
                    }}>No, me arrepentí</button>
            </React.Fragment>
        );
    } else {
        return (
            <React.Fragment>
                <p>Eliminado con éxito</p>

                <button
                    onClick={() => {
                        dispatch({
                            type: 'RESET',
                        });
                    }}>Resetear, volver atrás</button>
            </React.Fragment>
        );
    }
}

const initialState = {
    value: '',
    error: false,
    loading: false,
    deleted: false,
    confirmed: false,
}

const reducerObject = ( state, payload ) => ({
    'WRITE': {
        ...state,
        value: payload,
    },
    'RESET': {
        value: '',
        error: false,
        loading: false,
        deleted: false,
        confirmed: false,
    },
    'DELETE': {
        ...state,
        deleted: true,
    },
    'CONFIRM': {
        ...state,
        error: false,
        loading: false,
        confirmed: true,
    },
    'ERROR': {
        ...state,
        error: true,
        loading: false,
    },
    'CHECK': {
        ...state,
        loading: true,
    },
});

const reducer = ( state, action ) => {
    if (reducerObject(state)[action.type]) {
        return reducerObject(state, action.payload)[action.type];
    } else {
        return state;
    }
}

export { UseReducer };



