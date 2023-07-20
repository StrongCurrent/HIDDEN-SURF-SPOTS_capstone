import styled from "styled-components";
import mockData from "../../public/mock-data";

export default function SpotList() {
  console.log(mockData);

  if (mockData.length === 0) {
    return <NoEntryMessage>there is no entry yet</NoEntryMessage>;
  }

  return (
    <>
      {mockData.map((item, index) => {
        const isEven = index % 2 === 0;
        return (
          <Spots key={item.id} isEven={isEven}>
            {item.name}
          </Spots>
        );
      })}
    </>
  );
}

const Spots = styled.li`
  font-family: "Roboto", sans-serif;
  font-weight: 400;
  text-align: center;
  text-transform: uppercase;
  font-size: 1rem;
  list-style: none;
  padding-top: 5px;
  padding-bottom: 5px;
  margin-bottom: 5px;
  background-color: #fcfcfc;
  border-bottom: solid thin #d5d5d5;
  border-top: ${({ isEven }) =>
    isEven ? "solid 5px #2f6673" : "solid 5px #5d9ea6"};
`;

const NoEntryMessage = styled.div`
  text-align: center;
  text-transform: uppercase;
  font-size: 1rem;
  color: red;
  list-style: none;
  padding-top: 40px;
  padding-bottom: 40px;
  background-color: #fcfcfc;
  border-bottom: solid thin #d5d5d5;
  border-top: solid 5px #2f6673;
`;
