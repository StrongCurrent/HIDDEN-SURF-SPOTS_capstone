import styled from 'styled-components';

export const SpotsList = styled.ul`
  padding: 0;
  margin: 0;
  list-style-type: none;
`;

export const Spot = styled.li`
  font-weight: 400;
  text-align: center;
  text-transform: uppercase;
  font-size: 1rem;
  list-style: none;
  padding: 5px 0px;
  display: block;
  margin-bottom: 5px;
  background-color: #fcfcfc;
  border-bottom: solid 1px #d5d5d5;
  border-top: ${({ isEven }) =>
    isEven ? "solid 5px #2f6673" : "solid 5px #5d9ea6"};

  &:hover {
    background-color: #f7f7f7;
    font-weight: 500;
  }

  &:first-child {
    border-top: none;
  }
`;

export const SpotLink = styled.a`
  padding: 10px;
  color: inherit;
  text-decoration: none;
  display: block;
  width: 100%;
  height: 100%;
`;

export const NoEntryMessage = styled.div`
  text-align: center;
  text-transform: uppercase;
  font-size: 1rem;
  color: #ff0000;
  list-style: none;
  padding: 40px 0;
  background-color: #fcfcfc;
  border-bottom: solid 1px #d5d5d5;
  border-top: solid 5px #2f6673;
`;