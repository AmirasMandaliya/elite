import { useState } from 'react';
import { useCookies } from 'react-cookie';
import { Link, useNavigate } from 'react-router-dom';
import { makeUnauthenticatedPOSTRequest } from '../utils/serverHelpers';
import TextInput from '../components/TextInput';
import PasswordInput from '../components/PasswordInput';
import photo2 from '../files/logo4.png';

const LoginComponent = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cookies, setCookie] = useCookies(['token']);
  const navigate = useNavigate();

  const login = async () => {
    try {
      const data = { email, password };
      const response = await makeUnauthenticatedPOSTRequest('/auth/login', data);

      if (response && response.token) {
        const token = response.token;
        const date = new Date();
        date.setDate(date.getDate() + 30);
        setCookie('token', token, { path: '/', expires: date });
        alert('Login successful!');
        navigate('/home');
      } else {
        alert('Invalid credentials. Please try again.');
      }
    } catch (error) {
      console.error('Error during login:', error); // Log the actual error
      alert('An error occurred during login. Please try again later.');
    }
  };

  return (
    <div className="w-full h-full flex flex-col items-center">
      <div className="logo p-5 border-b border-solid border-gray-400 w-full flex justify-center">
        <img src={photo2} width="150" alt="Logo" />
      </div>
      <div className="inputRegion w-1/3 py-10 flex flex-col items-center justify-center">
        <div className="font-bold mb-6">To continue, log in to Elite.</div>
        <TextInput
          label="Email ID or username"
          placeholder="Enter your email id or username"
          className="my-6"
          value={email}
          setValue={setEmail}
        />
        <PasswordInput
          label="Password"
          placeholder="Enter Password"
          value={password}
          setValue={setPassword}
        />
        <div className="w-full flex items-center justify-end my-8">
          <button
            className="bg-blue-400 font-bold p-4 px-6 rounded-full"
            onClick={(e) => {
              e.preventDefault();
              login();
            }}
          >
            LOG IN
          </button>
        </div>
        <div className="w-full border border-solid border-gray-400"></div>
        <div className="my-6 font-semibold text-xl">Don't have an account?</div>
        <div className="border border-gray-500 w-full rounded-full flex items-center justify-center py-3 font-bold text-gray-500">
          <Link to="/signup">SIGN UP FOR ELITE</Link>
        </div>
      </div>
    </div>
  );
};

export default LoginComponent;