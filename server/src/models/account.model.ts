import { model, Schema, Document } from "mongoose";

// Account model, used by Admins and Doctors.
export interface IAccount extends Document {
	// accountId: String;
	username: String;
	password: String;
	firstName: String;
	lastName: String;
	role: Number;
}

const Account = new Schema(
	{
		// accountId: String,
		username: { type: String, unique: true },
		password: String,
		firstName: String,
		lastName: String,
		role: Number,
	},
	//Shares collection with the "User" model.
	{ timestamps: false, collection: "users" }
);

export default model<IAccount>("Account", Account);
