import { useSession, signOut, signIn } from "next-auth/react";
import { useRouter } from "next/router";
import {
  FixedLine,
  Welcome,
  Container,
  Text,
  LoginButton,
  LogoutButton,
} from "./style";
import LoadingSpinner from "../LoadingSpinner";
import Error from "../Error";

function Profile() {
  const { data: session, status } = useSession();
  const router = useRouter();

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
        <Error>Please log in to access your data.</Error>
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
    <>
      <FixedLine aria-hidden="true" />{" "}
      <Container>
        <Welcome>G&apos;day {session.user.name},</Welcome>
        <Text>you are logged in as: {session.user.email}</Text>
        <Text>
          As long as you are logged in, you can use the app and its features.
        </Text>
        <Text>I would be happy about a small donation if you like the app</Text>
        <LogoutButton aria-label="Logout" onClick={handleLogout}>
          Logout
        </LogoutButton>
      </Container>
    </>
  );
}

export default Profile;
