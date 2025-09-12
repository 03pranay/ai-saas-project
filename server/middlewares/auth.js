//middleware to check user id and check if user has access to premium plan or not

import { clerkClient } from "@clerk/express";

export const auth  = async(req, res, next)=>{
    try{
        const {userId, has} = await req.auth();
    const hasPremiumPlan = await has({plan: 'premium'});
    const user = await clerkClient.users.getUser(userId); // to get user details from clerk

    if(!hasPremiumPlan && user.privateMetadata.free_usage){  // check if user does not have premium plan and has free usage left
        req.free_usage = user.privateMetadata.free_usage; // privatemetadata is used to check how much user can access free usage.
    } else{
        await clerkClient.users.updateUserMetadata( userId, {privateMetadata: {free_usage: 0}}); // if user has premium plan then we will update the free usage to 0
        req.free_usage = 0;
    }
    req.plan = hasPremiumPlan ? 'premium' : 'free';
    next();
    
    } catch(error){
        res.json({ success: false, message: error.message });

    }
}