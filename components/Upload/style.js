import styled from "styled-components";

export const StyledMain = styled.main`
  text-align: center;
`;

export const Form = styled.form`
  max-width: 20rem;
  margin: 1rem auto 4rem auto;
`;

export const ImageContainer = styled.div`
  position: relative;
  max-width: 40rem;
  margin: 0 auto;

  img {
    border: 2px solid var(--theme-secondary-light);
    border-radius: 1rem;
  }
`;
