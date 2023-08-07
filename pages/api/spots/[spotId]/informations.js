import Spot from "../../../../db/models/spots";
import mongoose from "mongoose";

export default async function handler(req, res) {
  const { spotId } = req.query;
  const objectIdSpot = new mongoose.Types.ObjectId(spotId);

  if (req.method === "POST") {
    const { info } = req.body;

    if (!info) {
      return res
        .status(400)
        .json({ success: false, message: "Missing info data" });
    }

    try {
      const result = await Spot.updateOne(
        { _id: objectIdSpot },
        { $push: { informations: { info: info } } }
      );

      if (!result.modifiedCount) {
        res.status(404).json({ success: false });
      } else {
        res
          .status(201)
          .json({ success: true, message: "Information successfully added" });
      }
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}