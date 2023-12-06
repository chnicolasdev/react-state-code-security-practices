import React from 'react';

class Loading extends React.Component{

    // Componente sin render (desaparece)
    componentWillUnmount() {
        console.log('componentWillUnmount');
    }

    render() {
        return (
            <p>Cargando...</p>
        );
    }
}

export { Loading };