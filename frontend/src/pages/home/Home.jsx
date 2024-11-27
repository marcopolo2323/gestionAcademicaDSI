import styles from "./Home.module.css";

const Home = () => {
  return (
    <div className={styles.home}>
      <div className={styles.logoContainer}>
        <img
          className={styles.logo}
          src="src/assets/Logo-suiza.png"
          alt="logo_suiza"
        />
        <img
          className={styles.logo}
          src="src/assets/logoDSI.png"
          alt="logo_dsi"
        />
      </div>
      <h1 className={styles.welcome}>Bienvenido al Instituto Tecnológico</h1>
      <p className={styles.description}>
        Accede al sistema para ver tus horarios, materias y más.
      </p>
    </div>
  );
};

export default Home;
