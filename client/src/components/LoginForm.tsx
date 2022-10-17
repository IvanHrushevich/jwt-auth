import { FC, useContext, useState } from 'react';
import { Context } from '../index';

const LoginForm: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { store } = useContext(Context);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: 180, margin: 'auto' }}>
      <input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button type="button" onClick={() => store.login(email, password)}>
        Login
      </button>
      <button type="button" onClick={() => store.registration(email, password)}>
        Registration
      </button>
    </div>
  );
};

export default LoginForm;
