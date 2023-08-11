import styled from "styled-components";

export const FixedLine = styled.div`
  position: fixed;
  top: 60;
  left: 0;
  right: 0;
  height: 5px;
  background-color: #2f6673;
  z-index: 10000;
`;

export const Welcome = styled.h2`
  margin-top: 1.5rem;
  margin-bottom: 0.5rem;
`;

export const User = styled.p`
  font-size: 1.1rem;
  font-weight: 500;
  text-transform: uppercase;
  margin: 0px 0px 20px 0px;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  height: 100vh;
  padding: 2rem;
  padding-top: 0vh;
  max-width: 600px;
  margin: 0 auto;
`;

export const Text = styled.p`
  font-size: 1rem;
  text-align: center;
  margin: 0rem 0rem 1.5rem 0rem;
`;

export const BaseModalButton = styled.button`
  text-transform: uppercase;
  text-shadow: 0px 1px 3px #474747;
  color: #ffffff;
  font-weight: 600;
  letter-spacing: 1px;
  height: 45px;
  width: 135px;
  border-radius: 5px;
  border: none;
  margin-top: 1rem;

  &:focus {
    font-weight: 200;
  }
`;

export const LogoutButton = styled(BaseModalButton)`
  background-color: #ff5050;

  &:hover,
  &:focus {
    background-color: #ff3232;
  }
`;

export const LoginButton = styled(BaseModalButton)`
  background-color: #2f9e44;
  margin: 20px 0px 0px 10px;

  &:hover,
  &:focus {
    background-color: #40c057;
  }
`;
