import mongoose from 'mongoose';

export interface JwtPayload {
  email: string;
  // user_id: mongoose.Types.ObjectId;
}
