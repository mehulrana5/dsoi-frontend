import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { UserContext } from "@/context/UserContextProvider";
import { useContext, useEffect, useState } from "react";

export function TransactionTable() {
    interface Transaction {
        action: string;
        amount: number;
        timeStamp: string;
    }

    const context = useContext(UserContext);
    const [data, setData] = useState<Transaction[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 5;
    const [totalTransactions, setTotalTransactions] = useState(0);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchTransactions();
    }, [currentPage]);

    const fetchTransactions = async () => {
        setLoading(true);
        try {
            const id = localStorage.getItem("id") || "";
            const skip = (currentPage - 1) * rowsPerPage;
            const limit = rowsPerPage.toString();
            const res = await context?.getTransactions(id, skip.toString(), limit);
            if (res && res.data) {
                setData(res.data);
                setTotalTransactions(res.count || 0);
            }
        } catch (error) {
            console.error("Error fetching transactions:", error);
        } finally {
            setLoading(false);
        }
    };

    const statusColors: Record<string, string> = {
        cancelled: "bg-yellow-500 text-black",
        pending: "bg-orange-500 text-white",
        delivered: "bg-green-600 text-white",
    };

    const totalPages = Math.ceil(totalTransactions / rowsPerPage);

    return (
        <>
            <div className="w-full flex justify-between items-center mb-4">
                <Button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1 || loading}
                >
                    Previous
                </Button>
                <span className="text-sm">
                    Page {currentPage} of {totalPages || 1}
                </span>
                <Button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages || loading}
                >
                    Next
                </Button>
            </div>
            {loading ? (
                <p className="text-center">Loading transactions...</p>
            ) : (
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[50px] text-center">#</TableHead>
                            <TableHead className="text-left w-[150px]">Status</TableHead>
                            <TableHead className="text-left w-[200px]">Action</TableHead>
                            <TableHead className="text-right w-[100px]">Amount</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data.length > 0 ? (
                            data.map((e, idx) => {
                                const [mainAction, status] = e.action.split("|");
                                return (
                                    <TableRow key={idx}>
                                        <TableCell className="text-center">
                                            {(currentPage - 1) * rowsPerPage + idx + 1}
                                        </TableCell>
                                        <TableCell className="text-left">
                                            {new Date(e.timeStamp).toLocaleString("en-GB", {
                                                day: "2-digit",
                                                month: "2-digit",
                                                year: "numeric",
                                                hour: "2-digit",
                                                minute: "2-digit",
                                                hour12: true,
                                            }).replace(",", "")}
                                        </TableCell>
                                        <TableCell className="text-left flex items-center gap-2">
                                            <span>
                                                {mainAction}
                                                {status && (
                                                    <Badge className={statusColors[status] || "bg-gray-500 text-white"}>
                                                        {status}
                                                    </Badge>
                                                )}
                                            </span>
                                        </TableCell>
                                        <TableCell className="text-right">{e.amount}</TableCell>
                                    </TableRow>
                                );
                            })
                        ) : (
                            <TableRow>
                                <TableCell colSpan={4} className="text-center py-4">
                                    No transactions found.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            )}
        </>
    );
}
