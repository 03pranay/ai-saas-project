import express from 'express';
import cors from 'cors';  
import 'dotenv/config';
import {clerkMiddleware, requireAuth} from '@clerk/express';
import aiRouter from './routes/aiRoutes.js';
import connectcloudinary from './configs/cloudinary.js';
import userRouter from './routes/userRoutes.js';

const app = express();
await connectcloudinary();

app.use(cors());
app.use(express.json());
app.use(clerkMiddleware()); /* all request will be now passed througbh clerk middleware */
  /* all the routes below this line will be protected and will require authentication */

app.get('/', (req, res)=>{
    res.send("server is live");
})

app.use(requireAuth()); 

app.use('/api/ai', aiRouter);  /* all the routes in aiRouter will be prefixed with /api/ai */
app.use('/api/user', userRouter);  /* all the routes in userRouter will be prefixed with /api/user */

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});