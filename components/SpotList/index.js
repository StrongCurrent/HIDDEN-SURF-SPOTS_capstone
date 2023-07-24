import { SpotsList, Spot, NoEntryMessage } from "./style";
import mockData from "../../lib/mock-data";

export default function SpotList() {
  if (mockData.length === 0) {
    return <NoEntryMessage>there is no entry yet</NoEntryMessage>;
  }

  return (
    <SpotsList>
      {mockData.map((spot, index) => {
        const isEven = index % 2 === 0;
        return (
          <Spot key={spot.id} isEven={isEven}>
            <a
              href={`/SpotInformation/${spot.id}`}
              style={{ color: "#2f6673", textDecoration: "none" }}
            >
              {spot.name}
            </a>
          </Spot>
        );
      })}
    </SpotsList>
  );
}
