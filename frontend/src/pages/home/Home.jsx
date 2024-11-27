// Home.jsx

import styles from './Home.module.css'; // Importa el archivo de estilos
import LoginForm from "../../components/Registros/loginForm/LoginForm"; // Asegúrate de ajustar la ruta según tu estructura de carpetas



const Home = () => {
  return (
    <div className={styles.container}>
      
      <div className={styles.content}>
        <div className={styles.welcome}>
          <h1>Bienvenido al Instituto Tecnológico</h1>
          <p>Accede al sistema para ver tus horarios, materias y más.</p>
        </div>
        <div className={styles.login}>
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default Home;