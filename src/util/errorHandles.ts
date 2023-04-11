import {ValidationError} from "joi";
import { MongoServerError } from "mongodb";



const handleError = (error: unknown) => {
	if (error instanceof MongoServerError) {
		if (error.code === 11000) {
			return {
				error: {
					name: error.name,
					message: "email address already in use",
				},
			};
		}
	} else if (error instanceof Error) {
		return {
			error: {
				name: error.name,
				message: error.message,
			},
		};
	}else {
		return error
	}
};

export default handleError;
