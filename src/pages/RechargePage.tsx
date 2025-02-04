"use client";

import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "@/context/UserContextProvider";

const formSchema = z.object({
    name_7230181643: z.coerce.number(),
});

function RechargePage() {
    const context = useContext(UserContext);
    const [minPay, setMinPay] = useState(0);

    useEffect(() => {
        if (context) {
            const id = localStorage.getItem("id") || "";
            context.minPayment(id).then((res) => {
                setMinPay(res);
            });
        }
    }, []);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            context?.createOrder(values.name_7230181643)
        } catch (error) {
            console.error("Form submission error", error);
            toast.error("Failed to submit the form. Please try again.");
        }
    }

    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.async = true;
        document.body.appendChild(script);
        return () => {
            document.body.removeChild(script);
        };
    }, []);

    return (
        <div
            style={{
                display: "flex",
                flexWrap: "wrap",
                flexDirection: "column",
                padding: "1em",
                alignItems: "center",
                justifyContent: "center",
                maxWidth: "1300px",
                margin: "auto",
            }}
        >
            <h2>Recharge Page</h2>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-8 max-w-3xl mx-auto py-10"
                >
                    <FormField
                        control={form.control}
                        name="name_7230181643"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Amount (min: {minPay})</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Enter amount"
                                        type="number"
                                        min={minPay}
                                        {...field}
                                    />
                                </FormControl>
                                <FormDescription>
                                    You need to add at least the minimum amount.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit" disabled={context?.loading === "addAmount"}>
                        {context?.loading === "addAmount" ? "Loading..." : "Submit"}
                    </Button>
                </form>
            </Form>
        </div>
    );
}

export default RechargePage;
