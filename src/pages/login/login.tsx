import { useState } from 'react';
import axios from 'axios';
import CardLogin from '../../components/cardLogin';
import { TextInput } from '../../components/input/text-input/input.tsx';
import { LargeButton } from '../../components/largeButton/largeButton.styled.ts';

interface User {
  username: string;
  email: string;
  password: string;
}

function App() {
  const [user, setUser] = useState<User>({
    username: '',
    email: '',
    password: '',
  });

  async function login() {
    console.log(user.email, user.password);
    try {
      const response = await axios.post('http://localhost:3001/login', {
        email: user.email,
        password: user.password,
      });
      alert(response.data.message);
      window.location.href = '/home';
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <CardLogin title="Login ou Registre-se">
      <TextInput
        data-bs-theme="dark"
        placeholder="Email"
        value={user.email}
        onChange={e => setUser({ ...user, email: e.target.value })}
        type="text"
        id="username"
        label="Username"
      />{' '}
      <TextInput
        data-bs-theme="dark"
        placeholder="Password"
        value={user.password}
        onChange={e => setUser({ ...user, password: e.target.value })}
        type="password"
        id="password"
        label="Password"
      />
      <LargeButton onClick={() => login()}>Login</LargeButton>
      <span style={{ fontSize: 12, fontWeight: 'bold' }}>
        Não possui conta? <a href="">Cadastre-se</a>
      </span>
    </CardLogin>
  );
}

export default App;
