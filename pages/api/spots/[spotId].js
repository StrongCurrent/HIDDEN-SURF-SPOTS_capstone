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

  if (request.method === "PUT") {
    const { info } = request.body;

    try {
      const updatedSpot = await Spot.findByIdAndUpdate(
        spotId,
        { $push: { informations: { info } } }, 
        { new: true }
      );
      
      if (!updatedSpot) {
        response.status(404).json({ message: "No spot found to update" });
      } else {
        response.status(200).json(updatedSpot);
      }

    } catch (error) {
      response.status(500).json({ message: "Internal server error", error: error.message });
    }
  }

  if (!["GET", "DELETE", "PUT"].includes(request.method)) {
    return response.status(404).json({ message: "404 Page not found" });
  }
}
