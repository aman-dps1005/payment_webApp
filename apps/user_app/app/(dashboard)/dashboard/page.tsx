import { getServerSession } from "next-auth"
import { authOptions } from "../../../lib/auth";
export default async function() {

    const session=await getServerSession(authOptions);


    return <div className="bg-gradient-to-r from-purple-500 to-pink-500 w-full">
        <div className="text-4xl text-[#5d5277] pt-8 mb-8 font-bold">
            {`Hello, ${session?.user?.name.split(" ")[0]}`}
        </div>
        
    </div>
}