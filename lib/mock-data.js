const mockData = [
  {
    id: 1,
    name: "le truc vert",
    longitude: 44.715522,
    latitude: -1.250977,
  },
  {
    id: 2,
    name: "SpotName",
    longitude: 3243453,
    latitude: 2343434,
  },
  {
    id: 3,
    name: "SpotName",
    longitude: 322345423,
    latitude: 23468734,
  },
  {
    id: 4,
    name: "SpotName",
    longitude: 32467823,
    latitude: 2343879784,
  },
  {
    id: 5,
    name: "SpotName",
    longitude: 3908902423,
    latitude: 2343899654,
  },
];

export default mockData;

export const addSpotData = (spotData) => {
  const newId = mockData.length + 1;

  const newSpotData = { ...spotData, id: newId };
  mockData.push(newSpotData);
};
