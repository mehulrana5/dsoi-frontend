"use client"
import { toast } from "sonner"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useContext, useEffect, useState } from "react"
import { UserContext } from "@/context/UserContextProvider"

const formSchema = z.object({
    name_7230181643: z.coerce.number(),
});

function MyForm({ minPay }: { minPay: number }) {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    })
    function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            console.log(values);
            toast(
                <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                    <h3>{`Added ${values.name_7230181643} to you wallet`}</h3>
                </pre>
            );
        } catch (error) {
            console.error("Form submission error", error);
            toast.error("Failed to submit the form. Please try again.");
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-3xl mx-auto py-10">
                <FormField
                    control={form.control}
                    name="name_7230181643"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Amount (min:{minPay})</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Enter amount"
                                    type="number"
                                    min={minPay}
                                    {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit">Submit</Button>
            </form>
        </Form>
    )
}

function RechargePage() {
    const context = useContext(UserContext)

    const [minPay, setMinPay] = useState(0);

    useEffect(() => {
        context?.minPayment({id:"haieyst1212"}).then((res)=>{
            setMinPay(res)
            console.log(res);
        })
    }, [])

    return (
        <div style={{
            display: 'flex',
            flexWrap: "wrap",
            flexDirection: "column",
            padding: "1em",
            alignItems: "center",
            justifyContent: "center",
            maxWidth: "1300px",
            margin: "auto"
        }}>
            Recharge Page
            <MyForm minPay={minPay} />
        </div>
    )
}

export default RechargePage
