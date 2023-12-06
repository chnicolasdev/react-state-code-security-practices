import React from 'react';
import { Loading } from './Loading';

const SECURITY_CODE = 'paradigma';

class ClassState extends React.Component{

    constructor(props) {
        /*
        Cuando queramos modificar this en nuestra clase,
        pero todo lo que herada siga funcionando,
        se agrega super(); con las props que se envían al componente
        */
        super(props);

        this.state = {
            value: '',
            error: false,
            loading: false,
        }
    }

    // Componente se va a montar
    // componentWillMount() {
    // UNSAFE_componentWillMount() {
    //     console.log('componentWillMount');
    // }

    // Componente montado
    // componentDidMount() {
    //     console.log('componentDidMount');
    // }

    // Desde la 2da y cada vez que actualicemos
    componentDidUpdate() {
        console.log("Empezando el efecto")

        if (!!this.state.loading) {
            setTimeout(() => {
                console.log("Haciendo la validación")

                this.setState({ loading: !this.state.loading })
                if (this.state.value === SECURITY_CODE) {
                    this.setState({ error: false, loading: false });
                } else {
                    this.setState({ error: true, loading: false });
                }

                console.log("Terminando la validación")
            }, 3000);
        }
    }

    render() {

        // const { value, error, loading } = this.state;
        // this.props, así llegan las props a las clases
        return (
            <div>
                <h2>Eliminar { this.props.name }</h2>
                <p>Por favor, escribe el código de seguridad</p>

                {(this.state.error && !this.state.loading) && (
                    <p>Error: el código es incorrecto</p>
                )}

                {this.state.loading && (
                    <Loading />
                )}

                <input
                    placeholder='Código de seguridad'
                    value={this.state.value}
                    onChange={( event ) => {
                        this.setState({ value: event.target.value });
                    }}
                />
                <button
                    // setState, viene de React.Component, indicando cual es el estado que queremos actualizar
                    // onClick={() => this.setState(prevState => ({ error: !prevState.error }))}
                    // onClick={() => this.setState({ error: !this.state.error })}
                    onClick={() => this.setState({ loading: !this.state.loading })}
                    >Comprobar</button>
            </div>
        );
    }
}

export { ClassState };