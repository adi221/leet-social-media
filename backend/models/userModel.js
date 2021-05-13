import mongoose from 'mongoose';
import bcryptjs from 'bcryptjs';

const followingSchema = {
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
};

const followersSchema = {
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
};

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
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
    following: [followingSchema],
    numFollowing: {
      type: Number,
      default: 0,
      required: true,
    },
    followers: [followersSchema],
    numFollowers: {
      type: Number,
      default: 0,
      required: true,
    },
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
