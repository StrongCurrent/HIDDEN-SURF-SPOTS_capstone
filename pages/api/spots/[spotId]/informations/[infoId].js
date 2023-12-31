import Spot from "../../../../../db/models/spots";
import mongoose from "mongoose";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../../auth/[...nextauth]";

export default async function handler(req, res) {
  const { spotId, infoId } = req.query;
  const objectIdSpot = new mongoose.Types.ObjectId(spotId);
  const objectIdInfo = new mongoose.Types.ObjectId(infoId);

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

  if (req.method === "DELETE") {
    try {
      const result = await Spot.updateOne(
        { _id: objectIdSpot },
        { $pull: { informations: { _id: objectIdInfo } } }
      );

      if (!result.modifiedCount) {
        res.status(404).json({ success: false });
      } else {
        res
          .status(200)
          .json({ success: true, message: "ENTRY SUCCESSFULLY DELETED" });
      }
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  } else if (req.method === "PUT") {
    const { info } = req.body;

    if (!info) {
      return res
        .status(400)
        .json({ success: false, message: "YOU FORGOT TO ENTER THE INFORMATION" });
    }

    try {
      const result = await Spot.updateOne(
        { _id: objectIdSpot, "informations._id": objectIdInfo },
        { $set: { "informations.$.info": info } }
      );

      if (!result.modifiedCount) {
        if (result.matchedCount > 0) {
          res
            .status(200)
            .json({ success: true, message: "NO CHANGES WERE MADE" });
        } else {
          res.status(404).json({ success: false });
        }
      } else {
        res
          .status(200)
          .json({ success: true, message: "ENTRY SUCCESSFULLY UPDATED" });
      }
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  } else {
    res.setHeader("Allow", ["DELETE", "PUT"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}