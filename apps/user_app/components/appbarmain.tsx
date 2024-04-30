"use client"
import { Appbar } from "@repo/ui/appbar";
import { useSession ,signIn,signOut} from "next-auth/react";

export const AppbarMain=()=>{
    const session=useSession();
    return(
        <div>
             <Appbar user={session.data?.user} onSignin={signIn} onSignout={signOut}/>
        </div>
    )
}