import { useState } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
 // Importa useNavigate

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(""); // Estado para manejar errores
    const navigate = useNavigate(); // Inicializa useNavigate

    const onSubmitForm = async (e) => {
        e.preventDefault();
        try {
            // Cambia la URL a la ruta correcta para autenticar usuarios
            const response = await Axios.post("http://localhost:3001/usuarios", {
                username,
                password
            });

            // Maneja la respuesta aquí
            if (response.data.success) {
                // Redirige a otra ruta, por ejemplo "/home"
                navigate("/home");
            } else {
                // Si la autenticación falla, muestra un mensaje de error
                setError("Usuario o contraseña incorrectos.");
            }
        } catch (err) {
            console.error(err);
            setError("Ocurrió un error al intentar iniciar sesión.");
        }
    };

    // Función para manejar el clic en el enlace de registro
    const handleRegisterClick = () => {
        navigate("/registro"); // Cambia "/register" a la ruta deseada para el registro
    };

    return (
        <div style={styles.container}>
            <h1>Iniciar Sesión</h1>
            <form onSubmit={onSubmitForm} style={styles.form}>
                <input 
                    type="text" 
                    onChange={(e) => setUsername(e.target.value)} 
                    value={username} 
                    placeholder="Usuario" 
                    required 
                    style={styles.input}
                />
                <br />
                <input 
                    type="password" 
                    onChange={(e) => setPassword(e.target.value)} 
                    value={password} 
                    placeholder="Contraseña" 
                    required 
                    style={styles.input}
                />
                <br />
                {error && <p style={styles.error}>{error}</p>} {/* Muestra mensaje de error */}
                <button type="submit" style={styles.button}>Iniciar Sesión</button>
            </form>
            <p onClick={handleRegisterClick} style={styles.registerLink}>
                ¿No tienes una cuenta? Regístrate aquí.
            </p>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        width: '300px',
    },
    input: {
        marginBottom: '10px',
        padding: '10px',
        fontSize: '16px',
        borderRadius: '4px',
        border: '1px solid #ccc',
    },
    button: {
        padding: '10px',
        fontSize: '16px',
        backgroundColor: '#007bff',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer'
    },
    registerLink: {
        color: '#007bff', // Color del texto del enlace
        cursor: 'pointer', // Cambia el cursor al pasar sobre el texto
        textDecoration: 'underline' // Subraya el texto para indicar que es un enlace
    },
    error: {
        color: 'red', // Color del mensaje de error
        marginBottom: '10px'
    }
};

export default Login;