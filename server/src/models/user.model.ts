import { model, Schema, Document } from 'mongoose';

// User model, used by patients only.
export interface IPatient extends Document {
	//? username will be an Email.
	username: String;
	password: String;
	firstName: String;
	lastName: String;
	birthYear: Number;
	studies: String;
	sex: String;
	role: Number;
	createdAt?: Date;
	updatedAt?: Date;
}

const userSchema = new Schema(
	{
		//! username will be an Email.
		username: { type: String, unique: true },
		password: String,
		firstName: String,
		lastName: String,
		birthYear: Number,
		studies: String,
		sex: String,
		role: Number,
		createdAt: { type: Date, default: Date.now },
		updatedAt: { type: Date, default: Date.now },
	},
	{ collection: 'users' }
);

export default model<IPatient>('Patient', userSchema);
