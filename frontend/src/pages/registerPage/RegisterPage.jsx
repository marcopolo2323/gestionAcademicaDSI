import RegisterForm from '../../components/registerForm/RegisterForm';
import './page.css'

const RegisterPage = () => {
  return (
    <div className='pagee'>
      <h1 style={{textAlign: 'center'}}>Registro</h1>
      <RegisterForm />
    </div>
  );
};

export default RegisterPage;
