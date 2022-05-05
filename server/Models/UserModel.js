import mongoose from "mongoose";
import bcrypt from 'bcryptjs';

const userSchema = mongoose.Schema({
  name:{
    type: String,
    required: true
  },
  email:{
    type: String,
    required: true,
    unique: true,
  },
  password:{
    type: String,
    required: true,
  },
  isAdmin:{
    type: Boolean,
    required: true,
    default: false,
  },   
},
{
  timestamps: true
}
);

// LOGIN
userSchema.methods.comparePassword = async function (password) {
	return await bcrypt.compare(password, this.password);
}

// REGISTER
userSchema.pre("save",async function(next){
  if(!this.isModified("password")){
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt); 
})

const User = mongoose.model("User", userSchema);


export default User;