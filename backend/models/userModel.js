import mongoose from 'mongoose';
import bcryptjs from 'bcryptjs';

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    name: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    profileImage: {
      type: String,
      required: true,
      default: 'https://i.stack.imgur.com/34AD2.jpg',
    },
    description: {
      type: String,
      required: true,
      default: 'No Description Yet',
    },
    following: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: 'User',
        },
      },
    ],
    followers: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: 'User',
        },
      },
    ],
    posts: [
      {
        post: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: 'Post',
        },
      },
    ],
    savedPosts: [
      {
        post: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: 'Post',
        },
      },
    ],
    likedPosts: [
      {
        post: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: 'Post',
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcryptjs.compare(enteredPassword, this.password);
};

// middleware that runs before save new user
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }

  const salt = await bcryptjs.genSalt(10);
  this.password = await bcryptjs.hash(this.password, salt);
});

const User = mongoose.model('User', userSchema);
export default User;
