import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useStore from '../../../store/useStore';
import styles from './LoginForm.module.css';

const LoginForm = () => {
  const [formData, setFormData] = useState({
    username: '', 
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [validationErrors, setValidationErrors] = useState({});

  const navigate = useNavigate();
  const { login, user, getRouteByRole } = useStore();

  useEffect(() => {
    if (user) {
      const destination = getRouteByRole(user.role);
      navigate(destination);
    }
  }, [user, navigate, getRouteByRole]);

  const validateForm = () => {
    const errors = {};
    if (!formData.username.trim()) {
      errors.username = 'El usuario es requerido';
    }
    if (!formData.password) {
      errors.password = 'La contraseña es requerida';
    }
    return errors;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Limpiar error específico
    if (validationErrors[name]) {
      setValidationErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
    setError('');
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    
    // Validar formulario
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }

    setIsLoading(true);
    setError('');
    setValidationErrors({});

    try {
      await login({
        username: formData.username.trim(),
        password: formData.password,
      });

      setFormData({
        username: '',
        password: ''
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.formContainer}>
      <div className={styles.formWrapper}>
        <form onSubmit={handleLogin} className={styles.form}>
          <div className="mb-4">
            <label htmlFor="username" className={styles.inputLabel}>
              Usuario
            </label>
            <input
              id="username"
              name="username"
              type="text"
              value={formData.username}
              onChange={handleInputChange}
              placeholder="Ingrese su usuario"
              className={`${styles.inputField} ${validationErrors.username ? 'border-red-500' : ''}`}
              autoComplete="username"
            />
            {validationErrors.username && (
              <p className={styles.errorMessage}>{validationErrors.username}</p>
            )}
          </div>

          <div className="mb-6">
            <label htmlFor="password" className={styles.inputLabel}>
              Contraseña
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Ingrese su contraseña"
              className={`${styles.inputField} ${validationErrors.password ? 'border-red-500' : ''}`}
              autoComplete="current-password"
            />
            {validationErrors.password && (
              <p className={styles.errorMessage}>{validationErrors.password}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={styles.submitButton}
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Iniciando sesión...
              </div>
            ) : (
              'Iniciar Sesión'
            )}
          </button>

          {error && (
            <div className={styles.errorContainer}>
              <p>{error}</p>
            </div>
          )}

          <div className={styles.forgotPasswordLink}>
            <a href="/forgot-password">¿Olvidaste tu contraseña?</a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
