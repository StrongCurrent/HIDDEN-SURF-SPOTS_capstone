import { useSession, signOut, signIn } from "next-auth/react";
import {
  Welcome,
  User,
  Container,
  Text,
  LoginButton,
  LogoutButton,
} from "./style";
import LoadingSpinner from "../LoadingSpinner";
import Error from "../Error";

function getAussieGreeting() {
  const currentHour = new Date().getHours();

  if (currentHour >= 5 && currentHour < 12) {
    return "Mornin' sets rollin' in,";
  } else if (currentHour >= 12 && currentHour < 18) {
    return "Arvo's surf calling for,";
  } else if (currentHour >= 18 && currentHour < 22) {
    return "Sun's setting, surf's up,";
  } else {
    return "Stars above, waves below,";
  }
}

function Profile() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <Container>
        <LoadingSpinner aria-label="Loading" />
      </Container>
    );
  }

  if (!session) {
    return (
      <Container>
        <Error>OOPS YOU ARE NOT LOGGED IN </Error>{" "}
        <Error>LOGIN TO ACCESS YOUR DATA</Error>
        <LoginButton aria-label="Login" onClick={() => signIn("github")}>
          Login
        </LoginButton>
      </Container>
    );
  }

  const handleLogout = () => {
    signOut({
      callbackUrl: `${window.location.origin}/`,
    });
  };

  return (
    <Container>
      <Welcome>{getAussieGreeting()}</Welcome>
      <User>{session.user.name}</User>
      <Text>you are logged in as: {session.user.email}</Text>
      <Text>
        As long as you are logged in, you can use the app and its features.
      </Text>
      <Text>I would be happy about a small donation if you like the app</Text>
      <LogoutButton aria-label="Logout" onClick={handleLogout}>
        Logout
      </LogoutButton>
    </Container>
  );
}

export default Profile;
