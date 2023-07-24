const mockData = [
    {
        id: 1,
        name: "le truc vert",
      },
      {
        id: 2,
        name: "SpotName",
      },
      {
        id: 3,
        name: "SpotName",
      },
      {
        id: 4,
        name: "SpotName",
      },
      {
        id: 5,
        name: "SpotName",
      },
];

export default mockData;

export const addSpotData = (spotData) => {
  const newId = mockData.length + 1;

  const newSpotData = { ...spotData, id: newId };
  mockData.push(newSpotData);
};