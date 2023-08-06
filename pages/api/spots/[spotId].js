import dbConnect from "../../../db/connect";
import Spot from "../../../db/models/spots";
import mongoose from "mongoose";

export default async function handler(request, response) {
  await dbConnect();

  const { spotId } = request.query;

  if (request.method === "GET") {
    const spot = await Spot.findById(spotId);
    if (!spot) {
      return response.status(404).json({ message: "SPOT NOT FOUND" });
    }
    return response.status(200).json(spot);
  }

  if (request.method === "DELETE") {
    const deletedSpot = await Spot.findByIdAndDelete(spotId);
    if (!deletedSpot) {
      return response.status(404).json({ message: "NO SPOT FOUND TO DELETE" });
    }
    return response.status(200).json({ message: "SPOT DELETED SUCCESSFULLY" });
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
          response.status(404).json({ message: "NO SPOT FOUND TO UPDATE" });
        } else {
          response.status(200).json(updatedSpot);
        }
      } catch (error) {
        response
          .status(500)
          .json({ message: "INTERNAL SERVER ERROR", error: error.message });
      }
    } else if (spotName) {
      const lowerCaseSpotName = spotName.toLowerCase();
      const existingSpot = await Spot.findOne({ spotName: lowerCaseSpotName });

      if (existingSpot && String(existingSpot._id) !== spotId) {
        return response
          .status(400)
          .json({ message: "SPOT NAME IS ALREADY TAKEN" });
      }

      try {
        const updatedSpot = await Spot.findByIdAndUpdate(
          spotId,
          { $set: { spotName: lowerCaseSpotName } },
          { new: true }
        );

        if (!updatedSpot) {
          response.status(404).json({ message: "NO SPOT FOUND TO UPDATE" });
        } else {
          response.status(200).json(updatedSpot);
        }
      } catch (error) {
        response.status(500).json({ message: error.message, error: error });
      }
    } else {
      response
        .status(400)
        .json({ message: "NO INFORMATION OR SPOT NAME PROVIDED" });
    }
  }
}
