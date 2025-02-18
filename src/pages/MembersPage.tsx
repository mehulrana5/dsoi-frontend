import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UserContext } from "@/context/UserContextProvider";
import { useContext, useEffect } from "react";

const MembersPage = () => {

    const context = useContext(UserContext)

    useEffect(() => {
        if (context?.member === null) { context.getMember() }
        if (context?.family === null) { context.getFamily() }
    }, [])

    const memberData = {
        name: context?.member?.userName || "",
        contact: context?.member?.contact || "",
        wallet: context?.member?.wallet-4000 || "",
        image: context?.member?.photo || "",
        alt: context?.member?.userName || ""
    };

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
            <Card style={{
                display: 'flex',
                flexDirection: "column",
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'space-around',
                width: "30%",
                minWidth: "300px"
            }}>
                <div>
                    <Avatar style={{
                        width: "200px",
                        height: "200px"
                    }}>
                        <AvatarImage src={memberData.image} alt="User Image" style={{ objectFit: 'cover', width: '100%', height: '100%' }} />
                        <AvatarFallback>{memberData.alt}</AvatarFallback>
                    </Avatar>
                    <div>
                        <Label>Name</Label>
                        <Input value={memberData.name} readOnly />
                        <Label>Contact</Label>
                        <Input value={memberData.contact} readOnly />
                        <Label>Wallet</Label>
                        <Input value={memberData.wallet} readOnly />
                    </div>
                </div>
            </Card>
            <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                width: "70%",
                minWidth: "300px"
            }}>
                {context?.family?.family?.map((member: any, index: number) => (
                    <Card key={index} style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '.5em',
                        minWidth: "300px"
                    }}>
                        <Avatar style={{
                            width: '200px',
                            height: '200px',
                        }}>
                            <AvatarImage src={member.photo || ""} alt="User Image" style={{ objectFit: 'cover' }} />
                            <AvatarFallback>{member.name || ""}</AvatarFallback>
                        </Avatar>
                        <div style={{
                            margin: "0 0 0 20px"
                        }}>
                            <Label>Name</Label>
                            <Input value={member.name || ""} readOnly />
                            <Label>Date of Birth</Label>
                            <Input value={member.dob ? new Date(member.dob).toLocaleDateString() : ""} readOnly />
                            <Label>Type</Label>
                            <Input value={member.type || ""} readOnly />
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
}

export default MembersPage;