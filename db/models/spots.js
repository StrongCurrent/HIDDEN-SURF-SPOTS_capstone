import mongoose from "mongoose";

const { Schema } = mongoose;

const spotSchema = new Schema({
  spot: { type: String, required: true },
  longitude: { type: Number, required: true },
  latitude: { type: Number, required: true },
});

const Spot = mongoose.models.Spot || mongoose.model("Spot", spotSchema);

export default Spot;

