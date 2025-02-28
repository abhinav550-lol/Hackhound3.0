import 'dotenv/config'
import config from './src/config.js';

import express from 'express'
import session from 'express-session';
import errorMiddleware from './src/err/errorMiddleware.js'
import bodyParser from 'body-parser';
import cors from 'cors'
import fileUpload from 'express-fileupload';
import { connectDB } from './src/utils/mongoConnection.js';

import PatientRoutes from './src/routes/PatientRoutes.js'
import DoctorRoutes from './src/routes/DoctorRoutes.js'


const app = express();

//config
app.use(session({
	secret: config.SESSION_SECRET,
	resave: false,
	saveUninitialized: true,
	cookie: { secure: false }
  }))

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use(cors({
	origin : config.FRONTEND_URI,   
	methods: ['GET' , 'POST' , 'PUT' , 'PATCH' , 'DELETE'],
	credentials : true,
}))

app.use(fileUpload({
	createParentPath : true,
}));

//routes

app.use('/api/p' , PatientRoutes);
app.use('/api/d' , DoctorRoutes);


//error handling
app.use(errorMiddleware);


const startServer = async () => {
	try {
		const mongoUri = config.MONGO_URI;
	  if (!mongoUri) {
		throw new Error("MONGO_URI is not defined in the .env file");
	  }
  
	  await connectDB(mongoUri);
  
	  app.listen(3000 , () => {console.log("Server online!")});
	} catch (error) {
	  console.error("Error starting the server:", error);
	  process.exit(1); 
	}
  };
  
startServer();
