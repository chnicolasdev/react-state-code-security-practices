import React, { useEffect, useReducer } from 'react';

const SECURITY_CODE = 'paradigma';

function UseReducer({ name }) {
    const [state, dispatch] = useReducer(reducer, initialState);

    console.log({state});

    // Declarativo
    const onConfirm = () => dispatch({ type: actionTypes.CONFIRM });
    const onError   = () => dispatch({ type: actionTypes.ERROR });
    const onCheck   = () => dispatch({ type: actionTypes.CHECK });
    const onDelete  = () => dispatch({ type: actionTypes.DELETE });
    const onReset   = () => dispatch({ type: actionTypes.RESET });

    // Destructuración de event.target.value
    const onWrite = ({ target: {value} }) => {
        dispatch({ type: actionTypes.WRITE, payload: value });
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
                    onChange={onWrite}
                />
                <button onClick={onCheck}>
                    Comprobar
                </button>
            </div>
        );
    } else if (state.confirmed && !state.deleted) {
        return (
            <React.Fragment>
                <p>¿Seguro que quieres eliminar el useState?</p>
                <button onClick={onDelete}>
                        Si, eliminar
                </button>
                <button onClick={onReset}>
                    No, me arrepentí
                </button>
            </React.Fragment>
        );
    } else {
        return (
            <React.Fragment>
                <p>Eliminado con éxito</p>

                <button onClick={onReset}>
                    Resetear, volver atrás
                </button>
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

// Se agrega actionTypes para evitar problemas de sintaxis
const actionTypes = {
    CONFIRM: 'CONFIRM',
    WRITE: 'WRITE',
    RESET: 'RESET',
    DELETE: 'DELETE',
    ERROR: 'ERROR',
    CHECK: 'CHECK',
};

const reducerObject = ( state, payload ) => ({
    [actionTypes.WRITE]: {
        ...state,
        value: payload,
    },
    [actionTypes.RESET]: {
        value: '',
        error: false,
        loading: false,
        deleted: false,
        confirmed: false,
    },
    [actionTypes.DELETE]: {
        ...state,
        deleted: true,
    },
    [actionTypes.CONFIRM]: {
        ...state,
        error: false,
        loading: false,
        confirmed: true,
    },
    [actionTypes.ERROR]: {
        ...state,
        error: true,
        loading: false,
    },
    [actionTypes.CHECK]: {
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



