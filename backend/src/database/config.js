import mongoose from "mongoose";

export const dbConnection = async () => {
	try {
		mongoose.connect(process.env.DB_CONNECTION, {
			autoIndex: true,
		});
		console.log("Fue conectado a la base de datos satisfactoriamente");
	} catch (error) {
		console.log(error);
		throw new Error("No se conectó a la base de datos satisfactoriamente");
	}
};