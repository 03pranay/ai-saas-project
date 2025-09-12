import sql from '../configs/db.js';
import {auth} from '../middlewares/auth.js';

export const getUserCreations = async (req, res) => {
    try {
        const {userId} = req.auth();
        const creations = await sql`SELECT * FROM creations WHERE user_id= ${userId} ORDER BY created_at DESC`;
        res.status(200).json({ success: true, creations });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching user creations', error });
    }
};

export const getPublishedCreations = async (req, res) => {
    try {
        const creations = await sql`SELECT * FROM creations WHERE publish = true ORDER BY created_at DESC`;
        res.status(200).json(creations);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching published creations', error });
    }
};

export const toggleLikeCreation  = async (req, res) => {
    try {
        const {userId} = req.auth();
        const {id} = req.body;
        const [creation] = await sql`SELECT * FROM creations WHERE id = ${id}`;

        if(!creation) {
            return res.status(404).json({ message: 'Creation not found' });
        }
        const currentLikes = creation.likes ;
        const userIdstr = userId.toString();
        let updatedLikes;
        let message;
        if(currentLikes.includes(userIdstr)) {
            updatedLikes = currentLikes.filter((user) => user !== userIdstr);
            message = 'Creation unliked';
        } else{
            updatedLikes = [...currentLikes, userIdstr];
            message = 'Creation liked';
        }
        const formattedArray = `{${updatedLikes.join(',')}}`;
        
         await sql`UPDATE creations SET likes = ${formattedArray} :: text[] WHERE id = ${id} `;
         res.status(200).json(message);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching published creations', error });
    }
};