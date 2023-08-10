import dbConnect from "../../../db/connect";
import Spot from "../../../db/models/spots";
import mongoose from "mongoose";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(request, response) {
  await dbConnect();

  const { spotId } = request.query;
  const session = await getServerSession(request, response, authOptions);

  if (!session) {
    return response.status(401).json({ msg: "PLEASE LOG IN" });
  }

  const spot = await Spot.findById(spotId);
  if (!spot) {
    return response.status(404).json({ message: "SPOT NOT FOUND" });
  }

  if (spot.createdBy !== session.user.email) {
    return response.status(401).json({ msg: "you are not allowed to modify this spot" });
  }

  if (request.method === "GET") {
    return response.status(200).json(spot);
  }

  if (request.method === "DELETE") {
    try {
      await Spot.deleteOne({ _id: spotId });
        return response.status(200).json({ message: "SPOT DELETED SUCCESSFULLY" });
    } catch (error) {
        console.error("Error deleting the spot:", error);
        return response.status(500).json({ message: "INTERNAL SERVER ERROR", error: error.message });
    }
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

        return response.status(200).json(updatedSpot);

      } catch (error) {
        return response
          .status(500)
          .json({ message: "INTERNAL SERVER ERROR", error: error.message });
      }
    } else if (spotName) {
      const lowerCaseSpotName = spotName.toLowerCase();
      const existingSpot = await Spot.findOne({ spotName: lowerCaseSpotName });

      if (existingSpot && String(existingSpot._id) !== spotId) {
        return response
          .status(400)
          .json({ message: "PLEASE CHOOSE ANOTHER NAME, THIS ONE IS ALREADY TAKEN." });
      }

      try {
        const updatedSpot = await Spot.findByIdAndUpdate(
          spotId,
          { $set: { spotName: lowerCaseSpotName } },
          { new: true }
        );

        return response.status(200).json(updatedSpot);

      } catch (error) {
        return response.status(500).json({ message: error.message, error: error });
      }
    } else {
      return response
        .status(400)
        .json({ message: "NO INFORMATION OR SPOT NAME PROVIDED" });
    }
  }
}