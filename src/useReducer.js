const initialState = {
    value: '',
    error: false,
    loading: false,
    deleted: false,
    confirmed: false,
}

// const reducer = ( state, action ) => {
// }

// Forma 1
/*
const reducer = ( state, action ) => {
    if (action.type === 'ERROR') {
        return {
            ...state,
            error: true,
            loading: false,
        };
    } else if (action.type === 'CHECK') {
        return {
            ...state,
            loading: true,
        };
    } else if (action.type === 'WRITE') {
        return {
            ...state,
            loading: true,
        };
    } else {
        return {
            ...state,
        }
    }
}
*/

// Forma 2
// Forma mas común con switch creando reducer
/*
const reducerSwitch = ( state, action ) => {
    switch (action.type) {
        case 'ERROR':
            return {
                ...state,
                error: true,
                loading: false,
            };
        case 'CHECK':
            return {
                ...state,
                loading: true,
            };
        default:
            return {
                ...state,
            };
    }
}
*/

// Forma 3
// Reducer Object
// Retornar objeto con ({}) de las arrow functions
const reducerObject = ( state ) => ({
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
        return reducerObject(state)[action.type];
    } else {
        return state;
    }
}