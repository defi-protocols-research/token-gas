import React from 'react'

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Button } from '../ui/button'
import { erc20Schema, faucetSchema } from '@/validators/transactions';
import { RiSafe2Fill } from "react-icons/ri";
import { tokens } from '@/lib/tokens';
import { IDomain, createPermit, createTransferPermit, getMaxFee, getPaymasterDomain, getTokenDomain, getTokenNonce } from '@/lib/utils';
import { useAccount } from 'wagmi';
import { paymaster } from '@/lib/paymasters';
import { Address, parseEther } from 'viem';
import { ITransactions } from '@/lib/interfaces';


export default function FaucetForm() {
    const { address } = useAccount()

    //define form
    const form = useForm<z.infer<typeof faucetSchema>>({
        resolver: zodResolver(faucetSchema),
        defaultValues: {
            token: "",
            receiver: ""
        },
    })


    const onSubmit = async (values: z.infer<typeof faucetSchema>) => {
        console.log("🚀 ~ onSubmit ~ values:", values)

    }


    return (
        <Card className="w-full max-w-[400px] shadow-md">
            <CardHeader>
                <CardTitle className='text-center flex items-center justify-center gap-x-3'>
                    <div className="h-12 w-12 rounded-full bg-primary flex items-center justify-center text-black">
                        <RiSafe2Fill size={30} />
                    </div>
                    ERC20 Faucet
                </CardTitle>
                <CardDescription className='text-center'>Get Test ERC20 for this protocol</CardDescription>
            </CardHeader>
            <CardContent>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">

                        <FormField
                            control={form.control}
                            name="token"
                            render={({ field }: { field: any }) => (
                                <FormItem>
                                    <FormLabel>Token</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a token to claim" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="dai">DAI</SelectItem>
                                            <SelectItem value="usdc">USDC</SelectItem>

                                        </SelectContent>
                                    </Select>
                                    {/* <FormDescription>
                                        Gas fee will be charged on the selected token

                                    </FormDescription> */}
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="receiver"
                            render={({ field }: { field: any }) => (
                                <FormItem>
                                    <FormLabel>Wallet Address</FormLabel>
                                    <FormControl>
                                        <Input placeholder="enter wallet address" {...field} />
                                    </FormControl>
                                    {/* <FormDescription>
                                        This is the address of your token receiver.
                                    </FormDescription> */}
                                    <FormMessage />
                                </FormItem>
                            )}
                        />



                        <div className='flex w-full justify-end'>
                            <Button type="submit" className='w-full'>Claim</Button>
                        </div>
                    </form>
                </Form>

            </CardContent>

        </Card>
    )
}