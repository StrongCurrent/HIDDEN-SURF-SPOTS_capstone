import dbConnect from "../../../db/connect";
import Spot from "../../../db/models/spots";

export default async function handler(request, response) {
  await dbConnect();

  const { spotId } = request.query;

  if (request.method === "GET") {
    const spot = await Spot.findById(spotId);
    if (!spot) {
      return response.status(404).json({ message: "Spot not found" });
    }
    return response.status(200).json(spot);
  }

  if (request.method === "DELETE") {
    const deletedSpot = await Spot.findByIdAndDelete(spotId);
    if (!deletedSpot) {
      return response.status(404).json({ message: "No spot found to delete" });
    }
    return response.status(200).json({ message: "Spot deleted successfully" });
  }

  return response.status(404).json({ message: "404 Page not found" });
}