// pages/inscription.tsx
import Login from '../components/Login';
import Page from '../app/page';

const LoginPage: React.FC = () => {
  return (
    <Page>
      <div>
        <h1>Login</h1>
        <Login />
      </div>
    </Page>
  );
};

export default LoginPage;