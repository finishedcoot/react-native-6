import { useContext, useState } from "react";
import { Alert } from "react-native";
import AuthContent from "../components/Auth/AuthContent";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import { AuthContext } from "../store/auth-context";

import { login } from "../util/auth";

function LoginScreen() {
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const authCtx = useContext(AuthContext);

  async function loginUpHandler({ email, password }) {
    try {
      setIsAuthenticating(true);
      const token = await login(email, password);
      authCtx.authenticate(token);
    } catch (error) {
      console.log(error);
      Alert.alert(
        "Authentication Failed!",
        "Could not log you in, please chek your credentials."
      );
      setIsAuthenticating(false);
    }
  }

  if (isAuthenticating) {
    return <LoadingOverlay message={"Logging you in..."} />;
  }

  return <AuthContent isLogin onAuthenticate={loginUpHandler} />;
}

export default LoginScreen;
