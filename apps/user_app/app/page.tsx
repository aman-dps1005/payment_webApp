import Image from "next/image";
import { Card } from "@repo/ui/card";
import { Code } from "@repo/ui/code";
import styles from "./page.module.css";
import { Button } from "@repo/ui/button";

import { PrismaClient } from "@repo/db/client";

import {useBalance} from "@repo/store/useBalance"
import { useSession } from "next-auth/react";
import Userdetail from "../components/userDetail";


export default function Page(): JSX.Element {

  return (
   <div>
      <div className="text-2xl">hi there from front end</div>
      <Userdetail/>
   </div>
  );
}
