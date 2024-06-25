import { getServerSession } from "next-auth"
import { authOptions } from "../../../lib/auth";
export default async function() {

    const session=await getServerSession(authOptions);


    return <div className="bg-gradient-to-r from-pink-500 to-cyan-500 w-full">
        <div className="text-4xl text-[#5d5277] pt-8 mb-8 font-bold">
            {session?.user?.name?`Hello, ${session?.user?.name.split(" ")[0]} good to see you,Welcome`:`hi there please Login`}
        </div>
        
    </div>
}