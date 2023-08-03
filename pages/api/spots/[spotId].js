import dbConnect from "../../../db/connect";
import Spot from "../../../db/models/spots";
import mongoose from "mongoose";

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
    const { info, spotName } = request.body;

    if (info) {
      const newInfo = {
        _id: new mongoose.Types.ObjectId(),
        info,
      };

      try {
        const updatedSpot = await Spot.findByIdAndUpdate(
          spotId,
          { $push: { informations: newInfo } },
          { new: true }
        );

        if (!updatedSpot) {
          response.status(404).json({ message: "No spot found to update" });
        } else {
          response.status(200).json(updatedSpot);
        }
      } catch (error) {
        response
          .status(500)
          .json({ message: "Internal server error", error: error.message });
      }
    } else if (spotName) {
      try {
        const updatedSpot = await Spot.findByIdAndUpdate(
          spotId,
          { $set: { spotName: spotName } },
          { new: true }
        );

        if (!updatedSpot) {
          response.status(404).json({ message: "No spot found to update" });
        } else {
          response.status(200).json(updatedSpot);
        }
      } catch (error) {
        response
          .status(500)
          .json({ message: "Internal server error", error: error.message });
      }
    } else {
      response
        .status(400)
        .json({ message: "No information or spotName provided" });
    }
  }
}
