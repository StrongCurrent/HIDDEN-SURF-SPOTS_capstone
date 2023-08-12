import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import styled from "styled-components";
import LoadingSpinner from "../components/LoadingSpinner";
import { AiOutlineGithub } from "react-icons/ai";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  height: 100vh;
  background-color: #2f6673;
  padding-top: 30vh;
`;

const WelcomeText = styled.p`
  color: #ffffff;
  text-align: center;
  font-weight: 400;
  font-size: 1.5rem;
  margin: 0rem;
`;

const Heading = styled.h1`
  color: #ffffff;
  text-align: center;
  font-weight: 400;
  font-size: 1.5rem;
  margin: 1rem 0rem 3rem 0rem;
`;

const ButtonWrapper = styled.div`
  width: max-content;
`;

const LoginButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem 1rem;
  width: 100%;
  background-color: #ffffff;
  font-weight: 800;
  color: #000000;
  border: none;
  border-radius: 20px;
`;

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "loading") {
    return <LoadingSpinner />;
  }

  if (session) {
    router.push("/yoursurfspots");
    return <LoadingSpinner />;
  }

  return (
    <Container>
      <WelcomeText>WELCOME TO</WelcomeText>
      <ButtonWrapper>
        <Heading>HIDDEN SURF SPOTS</Heading>
        <LoginButton onClick={() => signIn("github")}>
          <AiOutlineGithub size={25} style={{ marginRight: "10px" }} />
          Continue with Github
        </LoginButton>
      </ButtonWrapper>
    </Container>
  );
}
