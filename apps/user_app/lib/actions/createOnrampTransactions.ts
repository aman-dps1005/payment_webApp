"use server"

import { getServerSession } from "next-auth"
import { authOptions } from "../auth"
import prisma from "@repo/db/client";
import axios from "axios";

export const createOnrampTransaction =async (amount:number,provider:string)=>{
    const session=await getServerSession(authOptions);
    const userId=Number(session?.user?.id);
    const token=(Math.random()*1000).toString();
    
    //in real world scenario the token comes from banking server through another api then gets fetched and then used to request to bank server again


    if(!userId){
        return {
            message:"user not logged in"
        }
    }
    const transaction=await prisma.onRampTransaction.create({
        data:{
            userId,
            amount:amount*100,
            provider:provider,
            status:"Processing",
            startTime:new Date(),
            token:token
        }
    })

    //hit your webhook (just added minor changes,random comment)
    try{
        const DBupdate=await axios.post("http://3.110.209.219:3000/hdfcwebhook",{
            token:token,
            user_identifier:userId,
            amount:amount*100
        })
    
        console.log(DBupdate);
        
        console.log(transaction);
    
        if(transaction && DBupdate){
            return "Success";
        }
        else{
            return "Failure";
        }   
    }
    catch(err){
        console.log(err);
    }
    
}