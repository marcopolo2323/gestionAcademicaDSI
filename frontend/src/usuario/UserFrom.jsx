import { useState } from "react"; 
import useUsuarioStore from "../store/UsuarioStore"; 

const UserForm = () => {
    const { agregarUsuario } = useUsuarioStore(); 

    const [userData, setUserData] = useState({
        username: "",
        password_hash: "",
        email: ""
    });

    const [error, setError] = useState(""); // Estado para manejar errores
    const [successMessage, setSuccessMessage] = useState(""); // Mensaje de éxito

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData({
            ...userData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(""); // Reiniciar errores al enviar el formulario

        try {
            await agregarUsuario(userData);
            setSuccessMessage("¡Usuario agregado exitosamente!");
            setUserData({
                username: "",
                password_hash: "",
                email: ""
            });
        } catch (err) {
            setError("Error al agregar el usuario. Intenta nuevamente ",err);
        }
    };

    return (
        <div className="register">
            <h1>Formulario de Registro</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Nombre de usuario"
                    required
                    name="username"
                    value={userData.username}
                    onChange={handleInputChange}
                />
                <input
                    type="password"
                    placeholder="Contraseña"
                    required
                    name="password_hash"
                    value={userData.password_hash}
                    onChange={handleInputChange}
                />
                <input
                    type="email"
                    placeholder="Correo electrónico"
                    required
                    name="email"
                    value={userData.email}
                    onChange={handleInputChange}
                />
                <button type="submit">Registrar</button>  
            </form>
            {error && <p className="error-message">{error}</p>} {/* Mensaje de error */}
            {successMessage && <p className="success-message">{successMessage}</p>} {/* Mensaje de éxito */}
        </div>
    );
};

export default UserForm;