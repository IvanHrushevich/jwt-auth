import { useContext, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { Context } from './index';

import LoginForm from './components/LoginForm';

function App() {
  const { store } = useContext(Context);
  useEffect(() => {
    if (localStorage.getItem('token')) {
      store.checkAuth();
    }
  }, []);

  if (store.isAuth) {
    return (
      <>
        <h2 style={{ textAlign: 'center' }}>User: {store.user?.email}</h2>
        <button type="button" onClick={() => store.logout()}>
          Log out
        </button>
      </>
    );
  }

  return <LoginForm />;
}

export default observer(App);
