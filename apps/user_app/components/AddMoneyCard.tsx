"use client"
import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { Center } from "@repo/ui/center";
import { Select } from "@repo/ui/select";
import { useState } from "react";
import { TextInput } from "@repo/ui/textinput";
import { createOnrampTransaction } from "../lib/actions/createOnrampTransactions";

const SUPPORTED_BANKS = [{
    name: "HDFC Bank",
    redirectUrl: "https://netbanking.hdfcbank.com"
}, {
    name: "Axis Bank",
    redirectUrl: "https://www.axisbank.com/"
}];

type transactionStatus="Success" | "Failure" | "Processing" | "" |{ message: string; };


export const AddMoney = () => {
    const [provider,setProvider]=useState(SUPPORTED_BANKS[0]?.name || "");
    const [redirectUrl, setRedirectUrl] = useState(SUPPORTED_BANKS[0]?.redirectUrl);
    const [amount,setAmount]=useState(0);
    const [transactionState,setTransactionState]=useState<transactionStatus>();

    return <Card title="Add Money">
    <div className="w-full">
        <TextInput label={"Amount"} placeholder={"Amount"} onChange={(value) => {
            setAmount(Number(value));
        }} />
        <div className="py-4 text-left">
            Bank
        </div>
        <Select onSelect={(value) => {
            setRedirectUrl(SUPPORTED_BANKS.find(x => x.name === value)?.redirectUrl || "")
            setProvider(SUPPORTED_BANKS.find(x=>x.name===value)?.name || "")
        }} options={SUPPORTED_BANKS.map(x => ({
            key: x.name,
            value: x.name
        }))} />
        <div className="flex justify-center pt-4">
            <Button onClick={async () => {
                const status=await createOnrampTransaction(amount,provider)
                if(status=="Success" || "Failure" ){
                    setTransactionState(status)
                }
                
                //window.location.href = redirectUrl || "";
            }}>
            Add Money
            </Button>
        </div>
        {transactionState === "Success" ? (
                    <div className="bg-green-500 rounded-md p-4 text-xl font-semibold text-white">Added money to wallet</div>
                ) : transactionState === "Failure" ? (
                    <div className="bg-red-500 rounded-md p-4 text-xl font-semibold text-white">Failed to add money to wallet</div>
                ) : transactionState === "Processing" ? (
                    <div>Transaction is processing</div>
                ) : null
        }
    </div>
</Card>
}