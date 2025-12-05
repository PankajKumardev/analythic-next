import mongoose, { Schema, Document } from 'mongoose';

export interface IEvent extends Document {
  projectId: string;
  eventId: string;
  name: string;
  properties: {
    url: string;
    referrer?: string;
    screen?: string;
    language?: string;
    userAgent?: string;
  };
  geo: {
    country: string;
    city?: string;
  };
  timestamp: Date;
}

const EventSchema = new Schema<IEvent>({
  projectId: { 
    type: String, 
    required: true, 
    index: true 
  },
  
  // Prevent duplicate events (deduplication)
  eventId: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  
  name: { 
    type: String, 
    required: true,
    enum: ['pageview', 'click', 'custom']
  },
  
  properties: {
    url: { type: String, required: true },
    referrer: String,
    screen: String,
    language: String,
    userAgent: String
  },
  
  geo: {
    country: { type: String, required: true },
    city: String
  },
  
  timestamp: { 
    type: Date, 
    default: Date.now
  }
}, {
  timestamps: false
});

// Compound index for aggregation queries
EventSchema.index({ projectId: 1, timestamp: -1 });

// TTL index - auto-delete after 48 hours (only define once)
EventSchema.index({ timestamp: 1 }, { expireAfterSeconds: 172800 });

export const EventModel = mongoose.models.Event || mongoose.model<IEvent>('Event', EventSchema);
