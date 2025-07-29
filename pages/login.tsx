// pages/login.tsx
import { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import Header from '../components/Header';
import Footer from '../components/Footer';

const environments = [
  { label: 'DEV', value: 'dev' },
  { label: 'UAT', value: 'uat' },
  { label: 'PROD', value: 'prod' }
];

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [environment, setEnvironment] = useState('');

  const handleLogin = () => {
    console.log({ username, password, environment });
    // Route to main CR page or save session, etc.
  };

  return (
    <>
      <Header />
      <main className="p-4 max-w-md mx-auto">
        <h3>Login</h3>
        <div className="p-field my-3">
          <label htmlFor="username">Username</label>
          <InputText id="username" value={username} onChange={(e) => setUsername(e.target.value)} className="w-full" />
        </div>
        <div className="p-field my-3">
          <label htmlFor="password">Password</label>
          <Password id="password" value={password} onChange={(e) => setPassword(e.target.value)} toggleMask className="w-full" />
        </div>
        <div className="p-field my-3">
          <label htmlFor="env">Environment</label>
          <Dropdown value={environment} options={environments} onChange={(e) => setEnvironment(e.value)} placeholder="Select Environment" className="w-full" />
        </div>
        <Button label="Login" onClick={handleLogin} className="mt-3" />
      </main>
      <Footer />
    </>
  );
}
