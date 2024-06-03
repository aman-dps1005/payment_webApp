import express from "express";
import db from "@repo/db/client";

const app=express();
app.use(express.json());

app.get("/bankwebhook",(req,res)=>{
    const paymentInformation: {
        token: string;
        userId: string;
        amount: string;
    } = {
        token: req.body.token,
        userId: req.body.user_identifier,
        amount: req.body.amount
    };


    try{
        db.$transaction([
            db.balance.updateMany({
                where:{
                    userId:Number(paymentInformation.userId)
                },
                data:{
                    amount:{
                        increment:Number(paymentInformation.amount)
                    }
                }
            }),
            db.onRampTransaction.updateMany({
                where: {
                    token: paymentInformation.token
                }, 
                data: {
                    status: "Success",
                    amount:Number(paymentInformation.amount)
                }
            })
        ]);

        return res.status(200).json({
            message:"captured"
        })
    }
    catch(e){
        console.error(e);
        res.status(411).json({
            message:"error while processing the web hook"
        })
    }
})


app.listen(3004);