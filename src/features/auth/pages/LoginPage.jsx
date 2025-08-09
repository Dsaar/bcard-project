import FormPageLayout from '../../../app/layout/FormPageLayout';
import LoginForm from '../login/LoginForm';

function LoginPage() {
  return (
    <FormPageLayout sx={{pt:15}}>
      <LoginForm />
    </FormPageLayout>
  );
}
export default LoginPage;
