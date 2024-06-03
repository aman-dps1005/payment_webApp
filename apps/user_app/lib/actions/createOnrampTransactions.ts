"use server"

import { getServerSession } from "next-auth"
import { authOptions } from "../auth"
import prisma from "@repo/db/client";

export const createOnrampTransaction =async (amount:number,provider:string)=>{
    const session=await getServerSession(authOptions);
    const userId=Number(session?.user?.id);
    const token=Math.random().toString();
    
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

    if(transaction){
        await prisma.onRampTransaction.update({
            where:{
                id:transaction.id
            },
            data:{
                status:"Success"
            }
        })
    }

    console.log(transaction);
}