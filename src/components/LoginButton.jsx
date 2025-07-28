import { useAuth0 } from "@auth0/auth0-react";
import '../index.css'

const LoginButton = (loading) => {
  const { loginWithRedirect } = useAuth0();

  return <button disabled={loading} className="button" onClick={() => loginWithRedirect()}>Log In</button>;
};

export default LoginButton;