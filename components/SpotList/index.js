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
          <a
            key={spot.id}
            href={`/SpotInformation/${spot.id}`}
            style={{ color: "#2f6673", textDecoration: "none", display: "block" }}
          >
            <Spot isEven={isEven}>
              {spot.name}
            </Spot>
          </a>
        );
      })}
    </SpotsList>
  );
}

