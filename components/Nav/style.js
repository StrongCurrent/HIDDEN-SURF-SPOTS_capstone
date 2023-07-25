import styled from "styled-components";
import Link from "next/link";

export const StyledNav = styled.nav`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 0px;
  background-color: #fcfcfc;
  border: 1px solid #d5d5d5;
`;

export const StyledUl = styled.ul`
  display: flex;
  gap: 1px;
  padding: 0%;
  height: 100%;
  width: 100%;
`;

export const StyledLi = styled.li`
  list-style: none;
  margin: 0;
  height: 100%;
  width: 100%;

  &:hover {
    background-color: #f0f0f0;
  }
`;

export const StyledLink = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

export const StyledIcon = styled.svg`
  fill: ${(props) => (props.$active ? "#5d9ea6" : "#2f6673")};
`;
