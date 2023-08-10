import { useSession, signOut, signIn } from "next-auth/react";
import { LoginButton, LogoutButton, Container } from "./style";

function Profile() {
  const { data: session } = useSession();

  if (!session) {
    return (
      <Container>
        <p>Oops you are not logged in. Please log in to access your data.</p>
        <LoginButton onClick={() => signIn('github')}>Login with Github</LoginButton>
      </Container>
    );
  }

  return (
    <Container>
      <p>Hi, {session.user.name} thank you for using this app.</p>
      <p>You are logged in as: {session.user.email}</p>
      <p>You can use the app completely when you are logged in.</p>
      <p>When you log out, you have to log in again to access your saved data.</p>
      <LogoutButton onClick={signOut}>Logout</LogoutButton>
    </Container>
  );
}

export default Profile;
