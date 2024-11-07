import { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { RadioButton } from 'primereact/radiobutton';
import axios from 'axios';
import 'primeicons/primeicons.css';

const Login = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const [userType, setUserType] = useState<string>('user'); // Define o tipo de usuário

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:8080/login', { email, password });
      const { token, user } = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      window.location.href = '/';
    } catch (error) {
      console.error('Falha no login', error);
    }
  };

  const handleRegister = async () => {
    try {
      const response = await axios.post('http://localhost:8080/users', { username, email, password, type: userType, role: "user" });
      if (response.status === 201) {
        await handleLogin();
      }
    } catch (error) {
      console.error('Falha no registro', error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        
        {/* Títulos de Login / Registro lado a lado */}
        <div className="flex justify-center mb-6">
          <button
            className={`mr-4 font-semibold ${isLogin ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
            onClick={() => setIsLogin(true)}
          >
            Login
          </button>
          <button
            className={`font-semibold ${!isLogin ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
            onClick={() => setIsLogin(false)}
          >
            Registro
          </button>
        </div>

        {isLogin ? (
          <>
            <h2 className="mb-6 text-2xl font-semibold text-center">Login</h2>
            <div className="mb-4">
              <label className="block mb-2 font-medium text-gray-700">Email</label>
              <InputText
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Digite seu email"
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-6">
              <label className="block mb-2 font-medium text-gray-700">Senha</label>
              <div className="relative">
                <InputText
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Digite sua senha"
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2 top-2 text-gray-500 hover:text-gray-700 focus:outline-none"
                >
                  <i className={`pi ${showPassword ? 'pi-eye-slash' : 'pi-eye'}`} />
                </button>
              </div>
            </div>
            <Button
              label="Login"
              icon="pi pi-sign-in"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg"
              onClick={handleLogin}
            />
          </>
        ) : (
          <>
            <h2 className="mb-6 text-2xl font-semibold text-center">Registro</h2>
            <div className="mb-4">
              <label className="block mb-2 font-medium text-gray-700">Nome de Usuário</label>
              <InputText
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Digite seu nome de usuário"
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2 font-medium text-gray-700">Email</label>
              <InputText
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Digite seu email"
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-6">
              <label className="block mb-2 font-medium text-gray-700">Senha</label>
              <InputText
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Digite sua senha"
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Seleção de Tipo de Usuário */}
            <div className="mb-6">
              <label className="block mb-2 font-medium text-gray-700">Tipo de Conta</label>
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <RadioButton
                    inputId="user"
                    name="userType"
                    value="user"
                    onChange={(e) => setUserType(e.value)}
                    checked={userType === 'user'}
                  />
                  <label htmlFor="user" className="ml-2">Aluno</label>
                </div>
                <div className="flex items-center">
                  <RadioButton
                    inputId="professional"
                    name="userType"
                    value="professional"
                    onChange={(e) => setUserType(e.value)}
                    checked={userType === 'professional'}
                  />
                  <label htmlFor="professional" className="ml-2">Profissional da saúde</label>
                </div>
              </div>
            </div>

            <Button
              label="Registrar"
              icon="pi pi-user-plus"
              className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg"
              onClick={handleRegister}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default Login;
