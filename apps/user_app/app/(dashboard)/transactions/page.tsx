import { getServerSession } from "next-auth"
import { authOptions } from "../../../lib/auth"
import prisma from "@repo/db/client";
import {P2PTransactions} from "../../../components/p2pTransaferCard"
import { Center } from "@repo/ui/center";


async function getP2pTransfers(){
    const session=await getServerSession(authOptions);
    const userId=session?.user?.id;

    const SentMoney=await prisma.p2pTransfer.findMany({
        where:{
            fromUserId:Number(userId)
        }
    })

    const receivedMoney=await prisma.p2pTransfer.findMany({
        where:{
            toUserId:Number(userId)
        }
    })

    const combinedArray = [...SentMoney, ...receivedMoney];

    combinedArray.sort((a, b) =>{
        const dateA = new Date(a.timestamp);
        const dateB = new Date(b.timestamp);

        // Ensure that dateA and dateB are valid  Date objects
        if (isNaN(dateA.getTime()) || isNaN(dateB.getTime())) {
            // Handle the case where either timestamp is not a valid date
            return 0; // Or some other fallback logic, depending on your requirements
        }

        // Perform the comparison based on the timestamps
        return dateA.getTime() - dateB.getTime();
    });

    return combinedArray.map(t=>({
        time:t.timestamp,
        amount:t.amount,
        to:t.toUserId,
        from:t.fromUserId
    }))
}
export default async function() {
    const p2pTransfers=await getP2pTransfers();
    return <div className="bg-gradient-to-r from-pink-500 to-cyan-500 w-screen ">
        <Center>
            <div className="pt-4 ">
                <P2PTransactions p2ptransfers={p2pTransfers}/>
            </div>
        </Center>
        
    </div>
}