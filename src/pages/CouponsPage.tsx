import { UserContext } from "@/context/UserContextProvider";
import { useContext, useEffect, useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import QRCode from 'react-qr-code'
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

function CouponsPage() {
    const context = useContext(UserContext)
    const [selectedOrder, setSelectedOrder] = useState<string | null>(null);

    function genQR(id: string) {
        setSelectedOrder(id);
    }

    useEffect(() => {
        context?.getOrders();
    }, []);

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
            <h1>Coupons Page</h1>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead style={{ textAlign: 'center' }}>Sno.</TableHead>
                        <TableHead style={{ textAlign: 'center' }}>Name</TableHead>
                        <TableHead style={{ textAlign: 'center' }}>Date</TableHead>
                        <TableHead style={{ textAlign: 'center' }}>QR</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {context?.ordersData.data.map((order, idx) => (
                        <TableRow key={order._id} >
                            <TableCell style={{ textAlign: 'center' }}>{idx + 1}</TableCell>
                            <TableCell style={{ textAlign: 'center' }}>{order.itemInfo.split("|")[0]}</TableCell>
                            <TableCell style={{ textAlign: 'center' }}>{new Date(order.orderDate).toLocaleDateString()}</TableCell>
                            <TableCell style={{ textAlign: 'center' }}>
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Button onClick={() => genQR(order._id)}>QR Code</Button>
                                    </DialogTrigger>
                                    <DialogContent>
                                        <DialogHeader>
                                            <VisuallyHidden>
                                                <DialogTitle>QR Code</DialogTitle>
                                            </VisuallyHidden>
                                            <DialogDescription></DialogDescription>
                                        </DialogHeader>
                                        {selectedOrder === order._id && (
                                            <div style={{ backgroundColor: "white", padding: "10px" }}>
                                                <QRCode
                                                    value={`${context?.BASE_URL}/getOrders/?orderId=${order._id}`}
                                                    style={{ height: "auto", maxWidth: "500px", width: "100%", }}
                                                />
                                            </div>
                                        )}
                                    </DialogContent>
                                </Dialog>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}

export default CouponsPage
