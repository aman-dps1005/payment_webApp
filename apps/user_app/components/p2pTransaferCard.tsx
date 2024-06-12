import { Card } from "@repo/ui/card";
import { getServerSession } from "next-auth";
import { authOptions } from "../lib/auth";

export const P2PTransactions=async ({p2ptransfers}:{
        p2ptransfers: {
            time: Date,
            amount: number,
            // TODO: Can the type of `status` be more specific?
            to:number,
            from:number
        }[]
})=>{

    const session=await getServerSession(authOptions);
    const userId=session?.user?.id;

    if(!p2ptransfers.length){
        return<Card title="Transactions">
            <div className="text-center pb-8 pt-8">
                No Recent Transactions
            </div>
        </Card>
    }
    return(
        <Card title="Transactions">
            <div className="pt-2">
                {p2ptransfers.map(t=><div className="flex justify-between">
                    <div>
                        <div>
                            {userId==t.from?
                                <div>Sent INR</div>
                                :
                                <div>Received INR</div>
                            }
                        </div>
                        <div className="text-slate-600 text-xs">
                            {t.time.toDateString()}
                        </div>
                    </div>

                    <div className="flex flex-col justify-center pl-60">
                        {userId==t.from?
                            <div>-Rs {t.amount/100}</div>
                            :
                            <div>+Rs {t.amount/100}</div>
                        }
                    </div>

                </div>)}
            </div>
        </Card>
    )
    
}