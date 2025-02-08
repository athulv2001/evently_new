import { model, models, Schema, Document } from "mongoose";

// The Location type (if you have it as a separate type, for example)
type Location = string;

export interface IEvent extends Document {
  _id: string;
  title: string;
  description?: string;
  location?: Location;  // Ensure this is optional and matches the schema
  createdAt: Date;
  imageUrl: string;
  startDateTime: Date;
  endDateTime: Date;
  price?: string;
  isFree: boolean;
  url?: string;
  category: { _id: string, name: string };
  organizer: { _id: string, firstName: string, lastName: string };
}

const EventSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  location: { type: String }, // Keep this as a string, optional by not marking required
  createdAt: { type: Date, default: Date.now },
  imageUrl: { type: String, required: true },
  startDateTime: { type: Date, default: Date.now },
  endDateTime: { type: Date, default: Date.now },
  price: { type: String },
  isFree: { type: Boolean, default: false },
  category: { type: Schema.Types.ObjectId, ref: 'Category' },
  organizer: { type: Schema.Types.ObjectId, ref: 'User' },
});

const Event = models.Event || model('Event', EventSchema);

export default Event;
