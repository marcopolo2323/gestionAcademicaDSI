import useStore from "../../store/useStore"; // Cambiar importación

const AdminPage = () => {
  const { user } = useStore(); // Usar useStore en lugar de useAuth

  if (!user) {
    return <p>No user data available</p>;
  }

  return (
    <div>
      <h1>Mi Perfil</h1>
      <p>Nombre de usuario: {user.username}</p>
      <p>ID de Usuario: {user.id}</p>
      <p>Rol: {user.role}</p>
    </div>
  );
};

export default AdminPage;