import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
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

  &:focus {
    font-weight: 200;
  }
`;

export const LogoutButton = styled(BaseModalButton)`
  background-color: #ff5050;

  &:hover, &:focus {
    background-color: #ff3232;
  }
`;

export const LoginButton = styled(BaseModalButton)`
  background-color: #2f9e44;
  margin: 0px 0px 0px 10px;

  &:hover, &:focus {
    background-color: #40c057;
  }
`;

