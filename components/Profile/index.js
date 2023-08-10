import { useSession, signOut, signIn } from "next-auth/react";

function Profile() {
  const { data: session } = useSession();

  if (!session) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <p>Oops you are not logged in. Please log in to access your data.</p>
        <button onClick={() => signIn('github')}>Login with Github</button>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <p>Hi, {session.user.name} thank you for using this app.</p>
      <p>You are logged in as: {session.user.email}</p>
      <p>You can use the app completely when you are logged in.</p>
      <p>When you log out, you have to log in again to access your saved data.</p>
      <button onClick={signOut}>Logout</button>
    </div>
  );
}

export default Profile;
