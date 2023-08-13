import styled from "styled-components";

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
  justify-content: center;
  height: auto;
  padding: 0 2rem 2rem 2rem;
  max-width: 600px;
  margin: 0 auto;
`;

export const Text = styled.p`
  font-size: 1rem;
  text-align: center;
  margin: 0rem 0rem 1.5rem 0rem;
`;

export const BaseLogButton = styled.button`
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

  &:hover {
    font-weight: 800;
  }

  &:focus {
    text-shadow: none; 
    font-weight: 800;
  }
`;

export const LogoutButton = styled(BaseLogButton)`
  background-color: #da2001;
  border: solid 3px #da2001;

  &:hover,
  &:focus {
    font-weight: 800; 
  }

  &:focus {
    color: #da2001;
    background-color: #ffffff;
  }
`;

export const LoginButton = styled(BaseLogButton)`
  background-color: #007f1a;
  border: solid 3px #007f1a;
  margin: 20px 0px 0px 10px;

  &:hover,
  &:focus {
    font-weight: 800;
  }

  &:focus {
    color: #007f1a;
    background-color: #ffffff;
  }
`;