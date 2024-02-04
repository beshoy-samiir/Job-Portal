import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import JWT from "jsonwebtoken";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: validator.isEmail,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
      select: true,
    },
    location: {
      type: String,
      default: "Egypt",
    },
  },
  { timestamps: true }
);


userSchema.pre("save", async function () {
  if (!this.isModified) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.comparePassword = async function (userPassword) {
  const isMatch = await bcrypt.compare(userPassword, this.password);
  console.log(userPassword);
  console.log(this.password);
  return isMatch;
};

userSchema.methods.createJWT = function () {
  const token = JWT.sign({ userId: this._id }, process.env.JWTKEY)
  return token
};

export default mongoose.model("User", userSchema);