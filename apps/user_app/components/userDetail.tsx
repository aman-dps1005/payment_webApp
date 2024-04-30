"use client"

import { useSession } from "next-auth/react"

const Userdetail=()=>{
    const session=useSession();

    return <div>
        {JSON.stringify(session)}
    </div>
}

export default  Userdetail;