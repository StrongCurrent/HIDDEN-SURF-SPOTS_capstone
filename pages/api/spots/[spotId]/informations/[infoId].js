import Spot from "../../../../../db/models/spots";
import mongoose from "mongoose";

export default async function handler(req, res) {
  const { spotId, infoId } = req.query;
  const objectIdSpot = new mongoose.Types.ObjectId(spotId);
  const objectIdInfo = new mongoose.Types.ObjectId(infoId);

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
          .json({ success: true, message: "Entry successfully deleted" });
      }
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  } else if (req.method === "PUT") {
    const { info } = req.body;

    if (!info) {
      return res
        .status(400)
        .json({ success: false, message: "Missing info data" });
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
            .json({ success: true, message: "No changes were made" });
        } else {
          res.status(404).json({ success: false });
        }
      } else {
        res
          .status(200)
          .json({ success: true, message: "Entry successfully updated" });
      }
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  } else {
    res.setHeader("Allow", ["DELETE", "PUT"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
