import { useState, FormEvent, ChangeEvent, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import auth from '../utils/auth';
import { login, register } from "../api/authAPI";

const Login = () => {
  const [loginData, setLoginData] = useState({
    username: '',
    password: ''
  });
  const [registerData, setRegisterData] = useState({
    username: '',
    password: ''
  });
  const [errorData, setErrorData] = useState('');
  const navigate = useNavigate();

    useEffect(() => {
      if(auth.loggedIn())
        navigate("/");
    }, []);

  const handleLoginChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value
    });
  };

  const handleRegisterChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setRegisterData({
      ...registerData,
      [name]: value
    });
  };

  const handleLoginSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const data = await login(loginData);
      auth.login(data.token);
    } catch (err) {
      setErrorData('Failed to login: ' + err);
    }
  };

  const handleRegisterSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const data = await register(registerData);
      auth.login(data.token);
    } catch (err) {
      setErrorData('Failed to Register: ' + err);
    }
  };

  return (
    <div>
    <div className="d-flex flex-row">
    <div className="mr-5">
      <h1 className="font-weight-bold text-light mb-3 text-left bebas-neue-regular">Login</h1>
      <form onSubmit={handleLoginSubmit}>
        <div className="form-group text-left">
          <label className="text-light bebas-neue-regular">Username</label>
          <input 
            type='text'
            name='username'
            className="form-control"
            value={loginData.username || ''}
            placeholder="Username"
            onChange={handleLoginChange}
          />
        </div>
        <div className="form-group text-left">
          <label className="text-light bebas-neue-regular">Password</label>
          <input 
            type='password'
            name='password'
            className="form-control"
            value={loginData.password || ''}
            placeholder="Password"
            onChange={handleLoginChange}
          />
        </div>
        <button type="submit" className="btn btn-primary bebas-neue-regular">Submit</button>
      </form>
    </div>
    <div className="mr-5 d-flex justify-content-center align-items-center">
      <h3 className="text-light font-weight-bold bebas-neue-regular">OR</h3>
    </div>
    <div>
      <h1 className="font-weight-bold text-light mb-3 text-left bebas-neue-regular">Register</h1>
      <form onSubmit={handleRegisterSubmit}>
        <div className="form-group text-left">
          <label className="text-light bebas-neue-regular">Username</label>
          <input 
            type='text'
            name='username'
            className="form-control"
            value={registerData.username || ''}
            placeholder="Username"
            onChange={handleRegisterChange}
          />
        </div>
        <div className="form-group text-left">
          <label className="text-light bebas-neue-regular">Password</label>
          <input 
            type='password'
            name='password'
            className="form-control"
            value={registerData.password || ''}
            placeholder="Password"
            onChange={handleRegisterChange}
          />
        </div>
        <button type="submit" className="btn btn-primary bebas-neue-regular">Submit</button>
      </form>
    </div>
    </div>
    {errorData &&
    <h4 className="text-danger mt-5">{errorData}</h4>
    }
    </div>
   );
};

export default Login;