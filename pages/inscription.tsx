// pages/inscription.tsx
import SignUpForm from '../components/SignUpForm';
import Page from '../app/page';

const InscriptionPage: React.FC = () => {
  return (
    <Page>
      <div>
        <h1>Inscription</h1>
        <SignUpForm />
      </div>
    </Page>
  );
};

export default InscriptionPage;