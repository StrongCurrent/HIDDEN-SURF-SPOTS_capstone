import dbConnect from "../../../db/connect";
import Spot from "../../../db/models/spots";

export default async function handler(request, response) {
  await dbConnect();

  if (request.method === "GET") {
    const spots = await Spot.find();
    response.status(200).json(spots);
  } else if (request.method === "POST") {
    const { spotName, longitude, latitude } = request.body;

    const existingSpot = await Spot.findOne({ spotName: spotName });

    if (existingSpot) {
      return response
        .status(400)
        .json({ message: "SPOT NAME IS ALREADY TAKEN" });
    }

    const newSpot = new Spot({
      spotName,
      longitude,
      latitude,
    });
    await newSpot.save();

    response.status(201).json(newSpot);
  } else {
    response.status(404).json({ status: "404 Page not found" });
  }
}
