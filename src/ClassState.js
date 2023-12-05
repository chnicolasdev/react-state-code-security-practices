import React from 'react';

class ClassState extends React.Component{

    constructor(props) {
        /*
        Cuando queramos modificar this en nuestra clase,
        pero todo lo que herada siga funcionando,
        se agrega super(); con las props que se envían al componente
        */
        super(props);

        this.state = {
            error: false,
        }
    }
    render() {
        // this.props, así llegan las props a las clases
        return (
            <div>
                <h2>Eliminar { this.props.name }</h2>
                <p>Por favor, escribe el código de seguridad</p>

                {this.state.error && (
                    <p>Error: el código es incorrecto</p>
                )}

                <input type="text" placeholder='Código de seguridad' />
                <button
                    // setState, viene de React.Component, indicando cual es el estado que queremos actualizar
                    // onClick={() => this.setState(prevState => ({ error: !prevState.error }))}
                    onClick={() => this.setState({ error: !this.state.error })}
                    >Comprobar</button>
            </div>
        );
    }
}

export { ClassState };