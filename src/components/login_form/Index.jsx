import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth/auth_context";


const LoginForm = ({ setNewUser }) => {
  const nav = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData, 
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(formData)
    console.log(formData)
    nav('/dashboard')
  };

    
  const handleClick = () => {
    setNewUser(true);
  };

  return (
    <div className='forms'>
      <h2>Login</h2>
      <form autoComplete='off' onSubmit={handleSubmit}>
        <label htmlFor='email'>Email: </label>
        <input type='email' id='email' name='email' placeholder='Email' onChange={handleChange}/>
        <label htmlFor='password'>Password: </label>
        <input
          type='password'
          id='password'
          name='password'
          placeholder='Password'
          minLength='6'
          onChange={handleChange}
        />
        <button type='submit'>
          Log In
        </button>
      </form>
      <p>
        Dont have an account? <button onClick={handleClick}>Sign Up</button>
      </p>
    </div>
  );
};

export default LoginForm;
