import Spot from "../../../../db/models/spots";
import mongoose from "mongoose";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../auth/[...nextauth]";

export default async function handler(req, res) {
  const { spotId } = req.query;
  const objectIdSpot = new mongoose.Types.ObjectId(spotId);

  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(401).json({ msg: "PLEASE LOG IN" });
  }

  const spot = await Spot.findById(objectIdSpot);

  if (!spot) {
    return res.status(404).json({ message: "SPOT NOT FOUND" });
  }

  if (spot.createdBy !== session.user.email) {
    return res.status(401).json({ msg: "YOU ARE NOT ALLOWED TO MODIFY THIS SPOT'S INFORMATION" });
  }

  if (req.method === "POST") {
    const { info } = req.body;

    if (!info) {
      return res.status(400).json({ success: false, message: "MISSING INFO DATA" });
    }

    try {
      const result = await Spot.updateOne(
        { _id: objectIdSpot },
        { $push: { informations: { info: info } } }
      );

      if (!result.modifiedCount) {
        res.status(404).json({ success: false });
      } else {
        res.status(201).json({ success: true, message: "INFORMATION SUCCESSFULLY ADDED" });
      }
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}