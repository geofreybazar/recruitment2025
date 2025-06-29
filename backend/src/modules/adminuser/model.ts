import mongoose from "mongoose";

const AdminUserSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  middlename: {
    type: String,
  },
  rank: {
    type: String,
    required: true,
  },
  accountNumber: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  passwordhash: {
    type: String,
    required: true,
  },
  refreshtokens: [],
  phoneNumber: {
    type: String,
    required: true,
  },
});

AdminUserSchema.set("toJSON", {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const AdminUser = mongoose.model("AdminUser", AdminUserSchema);

export default AdminUser;
