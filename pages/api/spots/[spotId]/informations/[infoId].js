import Spot from "../../../../../db/models/spots";
import mongoose from "mongoose";

export default async function handler(req, res) {
  if (req.method !== "DELETE") {
    res.setHeader("Allow", ["DELETE"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
    return;
  }

  const { spotId, infoId } = req.query;

  const objectIdSpot = new mongoose.Types.ObjectId(spotId);
  const objectIdInfo = new mongoose.Types.ObjectId(infoId);

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
}
