import { useContext, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';

import { Context } from './index';
import LoginForm from './components/LoginForm';
import UserService from './services/UserService';
import { User } from './models/User.model';

function App() {
  const { store } = useContext(Context);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      store.checkAuth();
    }
  }, []);

  const [users, setUsers] = useState<User[]>([]);

  async function fetchUsers() {
    try {
      const response = await UserService.fetchUsers();
      setUsers(response.data);
    } catch (error) {
      console.log('error', error);
    }
  }

  if (store.isLoading) {
    return <h2>Loading...</h2>;
  }

  if (store.isAuth) {
    return (
      <div>
        <h2 style={{ textAlign: 'center' }}>User: {store.user?.email}</h2>
        <button type="button" onClick={() => store.logout()}>
          Log out
        </button>
        <button type="button" onClick={fetchUsers}>
          Fetch Users
        </button>
        {users.map((user) => (
          <div key={user.email}>{user.email}</div>
        ))}
      </div>
    );
  }

  return <LoginForm />;
}

export default observer(App);
