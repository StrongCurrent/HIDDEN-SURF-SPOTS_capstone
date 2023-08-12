import mongoose from "mongoose";

const { Schema } = mongoose;

const AdditionalInformationSchema = new Schema({
  info: { type: String },
});

const spotSchema = new Schema({
  spotName: { type: String, required: true },
  longitude: { type: Number, required: true },
  latitude: { type: Number, required: true },
  informations: [AdditionalInformationSchema],
  image:{ type: Number, required: false },
  createdBy: { type: String, required: true },
});

const Spot = mongoose.models.Spot || mongoose.model("Spot", spotSchema);

export default Spot;
