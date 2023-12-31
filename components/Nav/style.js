import styled from "styled-components";
import Link from "next/link";

export const StyledNav = styled.nav`
  position: fixed;
  z-index: 1000;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: #fcfcfc;
  border: 1px solid #d5d5d5;
`;

export const StyledUl = styled.ul`
  display: flex;
  gap: 1px;
  padding: 0%;
  height: 100%;
  width: 100%;
  padding: 0px;
  margin: 0px;
`;

export const StyledLi = styled.li`
  list-style: none;
  height: 100%;
  width: 100%;
  border-right: 1px solid #d5d5d5;

  &:last-child {
    border-right: none;
  }

  &:hover {
    background-color: #F7F7F7;
  }
`;

export const StyledLink = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60px;
  width: 100%;
`;

export const StyledIcon = styled.svg`
  fill: ${(props) => (props.$active ? "var(--theme-primary-dark)" : "var(--theme-secondary-light)")};
`;
