import mongoose from 'mongoose';

// An interface that describes the properties to create a new user
interface UserAttr {
  email: string;
  password: string;
}

interface UserModal extends mongoose.Model<any>{
    build(attrs: UserAttr): UserDoc;
}

interface UserDoc extends mongoose.Document {
    email: string;
    password: string
}

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.statics.build = (attrs: UserAttr) => {
  return new User(attrs);
};

const User = mongoose.model<UserDoc, UserModal>('User', userSchema);


export { User };
