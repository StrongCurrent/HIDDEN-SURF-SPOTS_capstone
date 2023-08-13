import dbConnect from "../../../db/connect";
import Spot from "../../../db/models/spots";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";

function normalizeSpotName(name) {
  return name.toLowerCase().replace(/\s+/g, "");
}

export default async function handler(request, response) {
  await dbConnect();

  const session = await getServerSession(request, response, authOptions);
  if (!session) {
    return response.status(401).json({ msg: "PLEASE LOG IN" });
  }

  if (request.method === "GET") {
    const spots = await Spot.find({ createdBy: session.user.email });
    response.status(200).json(spots);
  } else if (request.method === "POST") {
    const { spotName, longitude, latitude } = request.body;
    const normalizedSpotName = normalizeSpotName(spotName);

    const existingSpot = await Spot.findOne({
      spotName: normalizedSpotName,
      createdBy: session.user.email,
    });
    if (existingSpot) {
      return response.status(400).json({
        message:
          "CHOOSE ANOTHER NAME, THIS ONE TAKEN. SPOT HAS NOT BEEN ADDED.",
      });
    }

    const newSpot = new Spot({
      spotName: normalizedSpotName,
      longitude,
      latitude,
      createdBy: session.user.email,
    });

    await newSpot.save();
    response.status(201).json(newSpot);
  } else {
    response.status(404).json({ status: "404 PAGE NOT FOUND" });
  }
}