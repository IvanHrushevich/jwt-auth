import { FC, useState } from 'react';

const LoginForm: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: 180, margin: 'auto' }}>
      <input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button>Login</button>
      <button>Registration </button>
    </div>
  );
};

export default LoginForm;
