import { getServerSession } from "next-auth"
import { authOptions } from "../../../lib/auth";
export default async function() {

    const session=await getServerSession(authOptions);


    return <div className="w-screen bg-gradient-to-r from-zinc-900 via-indigo-900 to-violet-500">
        <div className="text-4xl text-orange-200 pt-8 mb-8 pl-4 font-bold">
            {session?.user?.name?`Hello, ${session?.user?.name.split(" ")[0]} good to see you`:`hi there please Login`}
        </div>
        
    </div>
}