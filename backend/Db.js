import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  Title: { type: String, required: true },
  Description: { type: String, required: true },
});

const UserSchema = mongoose.model('Task', userSchema);
export default UserSchema;
