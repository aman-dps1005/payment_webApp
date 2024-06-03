"use client"
import { Appbar } from "@repo/ui/appbar";
import { useSession ,signIn,signOut} from "next-auth/react";
import { useRouter } from "next/navigation";



export const AppbarMain=()=>{
    const session=useSession();
    const router=useRouter();

    const handleSignOut = async () => {
        await signOut();
        router.push("api/auth/signin");
    };

    return(
        <div>
            <Appbar user={session.data?.user} onSignin={signIn} onSignout={handleSignOut}
            />
        </div>
    )
}