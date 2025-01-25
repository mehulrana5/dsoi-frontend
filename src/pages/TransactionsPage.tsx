import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
import { useEffect, useState } from "react";

interface Transaction {
    id: number;
    dateTime: string;
    type: string;
    amount: number;
}

const tData = [
    { id: 1, dateTime: "2023-10-01 10:00", type: "Deduct", amount: 100 },
    { id: 2, dateTime: "2023-10-02 11:30", type: "Deduct", amount: 50 },
    { id: 3, dateTime: "2023-10-03 14:45", type: "Recharge", amount: 200 },
    { id: 4, dateTime: "2023-10-04 09:20", type: "Deduct", amount: 75 },
    { id: 5, dateTime: "2023-10-05 16:10", type: "Recharge", amount: 150 },
    { id: 6, dateTime: "2023-10-06 12:00", type: "Deduct", amount: 60 },
    { id: 7, dateTime: "2023-10-07 08:30", type: "Recharge", amount: 300 },
    { id: 8, dateTime: "2023-10-08 14:00", type: "Deduct", amount: 90 },
    { id: 9, dateTime: "2023-10-09 11:15", type: "Recharge", amount: 250 },
    { id: 10, dateTime: "2023-10-10 10:45", type: "Deduct", amount: 40 },
    { id: 11, dateTime: "2023-10-11 13:30", type: "Recharge", amount: 220 },
    { id: 12, dateTime: "2023-10-12 15:50", type: "Deduct", amount: 110 },
    { id: 13, dateTime: "2023-10-13 09:40", type: "Recharge", amount: 180 },
];

function TransactionsPage() {
    const [data, setData] = useState<Transaction[]>([]);

    const rowsPerPage = 5
    const [startIndex, setStartIndex] = useState(0);
    const [endIndex, setEndIndex] = useState(rowsPerPage);

    useEffect(() => {
        setData(tData)
    }, [])

    return (
        <div style={{
            display: 'flex',
            flexWrap: "wrap",
            padding: "1em",
            alignItems: "center",
            justifyContent: "center",
            maxWidth: "1300px",
            margin: "auto"
        }}>
            <h1>Transactions Page</h1>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Date Time</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Amount</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data.map((transaction) => (
                        <TableRow key={transaction.id}>
                            <TableCell>{transaction.dateTime}</TableCell>
                            <TableCell>{transaction.type}</TableCell>
                            <TableCell>{transaction.amount}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <Pagination>
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious href="#"
                        // className={"pointer-events-none opacity-50"}
                        />
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink href="#">1</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationEllipsis />
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationNext href="#"
                        // className={"pointer-events-none opacity-50"}
                        />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div>
    )
}

export default TransactionsPage
