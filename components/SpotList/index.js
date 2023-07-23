import styled from "styled-components";
import mockData from "../../lib/mock-data";

export default function SpotList() {
  if (mockData.length === 0) {
    return <NoEntryMessage>there is no entry yet</NoEntryMessage>;
  }

  return (
    <SpotsList>
      {mockData.map((item, index) => {
        const isEven = index % 2 === 0;
        return (
          <Spot key={item.id} isEven={isEven}>
            {item.name}
          </Spot>
        );
      })}
    </SpotsList>
  );
}

const SpotsList = styled.ul`
  padding: 0;
  margin: 0;
  list-style-type: none;
`;

const Spot = styled.li`
  font-weight: 400;
  text-align: center;
  text-transform: uppercase;
  font-size: 1rem;
  list-style: none;
  padding: 5px 0px;
  margin-bottom: 5px;
  background-color: #fcfcfc;
  border-bottom: solid 1px #d5d5d5;
  border-top: ${({ isEven }) =>
  isEven ? "solid 5px #2f6673" : "solid 5px #5d9ea6"};
`;

const NoEntryMessage = styled.div`
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
