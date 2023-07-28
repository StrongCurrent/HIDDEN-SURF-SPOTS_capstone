import dbConnect from "../../../db/connect";
import Spot from "../../../db/models/spots";

export default async function handler(request, response) {
  await dbConnect();

  if (request.method === "GET") {
    if (request.query.spotId) {
      const spot = await Spot.findById(request.query.spotId);
      if (!spot) {
        return response.status(404).json({ message: "Spot not found" });
      }
      return response.status(200).json(spot);
    }

    const spots = await Spot.find();
    response.status(200).json(spots);
  } else if (request.method === "POST") {
    const { spotName, longitude, latitude } = request.body;

    const existingSpot = await Spot.findOne({ spotName: spotName });

    if (existingSpot) {
      return response
        .status(400)
        .json({ message: "The name is already taken" });
    }

    const newSpot = new Spot({
      spotName,
      longitude,
      latitude,
    });
    await newSpot.save();

    response.status(201).json(newSpot);
  } else if (request.method === "DELETE") {
    const { spotId } = request.body;

    if (!spotId) {
      return response.status(400).json({ message: "No spot id provided" });
    }

    const spot = await Spot.findById(spotId);
    if (!spot) {
      return response.status(404).json({ message: "Spot not found" });
    }

    await Spot.deleteOne({ _id: spotId });

    return response.status(200).json({ message: "Spot deleted successfully" });
  } else {
    response.status(404).json({ status: "404 Page not found" });
  }
}