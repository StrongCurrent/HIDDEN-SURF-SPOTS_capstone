import { SpotsList, Spot, NoEntryMessage } from "./style";
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