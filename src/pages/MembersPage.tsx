import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const memberData = {
    name: "Prakash Singh Rana",
    contact: "9711009451",
    rank: "AxRt35$$1",
    wallet: "7000",
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUuFXHdGlhMEcadqT-yb5CkmmYGVI0hsB0ig&s',
    alt: 'Prakash Singh Rana'
};

const actionButtons = [
    { label: "Transactions", action: "handleTransactions" },
    { label: "Recharge", action: "handleRecharge" },
    { label: "Notifications", action: "handleNotificatio" },
    { label: "Add Guest", action: "handleAddGuest" },
    { label: "Book DSOI", action: "handleBooking" },
];

const familyMembers = [
    {
        name: "Mehul",
        dateOfBirth: "20-06-2003",
        type: "Dependent",
        image: "https://media.istockphoto.com/id/1132797961/photo/latin-male-portrait-standing-at-work-studio.jpg?s=612x612&w=0&k=20&c=le4ixoWSjGdM6yzGwXFEGUGxNCLwnqZC5yEvFJ9Vpb0=",
        alt: "Mehul",
    },
    {
        name: "Mitul",
        dateOfBirth: "18-01-2005",
        type: "Dependent",
        image: "https://media.istockphoto.com/id/1058733496/photo/headshot-of-a-teenage-boy.jpg?s=612x612&w=0&k=20&c=m3YRRtqhjYTHh3L0d1UUvDpXl0OnDDZJ83ItA5g4O5I=",
        alt: "Mitul",
    },
    {
        name: "Hema Rana",
        dateOfBirth: "31-07-1980",
        type: "Spouse",
        image: "https://t3.ftcdn.net/jpg/02/37/07/78/360_F_237077800_5zPsGCgnVfSoBDJkIYrw2ktbbYIpPynL.jpg",
        alt: "Hema",
    },
];

interface Member {
    name: string;
    dateOfBirth: string;
    type: string;
    image: string;
    alt: string;
}

const MemberCard = ({ member }: { member: Member }) => (
    <Card style={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '.5em',
    }}>
        <Avatar style={{
            width: '200px',
            height: '200px',
        }}>
            <AvatarImage src={member.image} alt="User Image" style={{ objectFit: 'cover' }} />
            <AvatarFallback>{member.alt}</AvatarFallback>
        </Avatar>
        <div style={{
            width: '200px',
            margin:"0 0 0 20px"
        }}>
            <Label>Name</Label>
            <Input value={member.name} readOnly />
            <Label>Date of Birth</Label>
            <Input value={member.dateOfBirth} readOnly />
            <Label>Type</Label>
            <Input value={member.type} readOnly />
        </div>
    </Card>
);

const MembersPage = () => {
    return (
        <div style={{
            display: 'flex',
            flexWrap: "wrap",
            padding:"1em",
            width: "95VW",
            justifyContent:"space-between"
        }}>
            <Card style={{
                display: 'flex',
                flexDirection: "column",
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'space-around',
                // padding: '1rem',
                width: "400px"
            }}>
                <div className="flex flex-wrap items-center justify-center m-2 w-full md:w-auto">
                    <Avatar className="w-60 h-60 md:w-40 md:h-40 mr-6">
                        <AvatarImage src={memberData.image} alt="User Image" style={{ objectFit: 'cover', width: '100%', height: '100%' }} />
                        <AvatarFallback>{memberData.alt}</AvatarFallback>
                    </Avatar>
                    <div className="md:w-auto">
                        <Label>Name</Label>
                        <Input value={memberData.name} readOnly />
                        <Label>Contact</Label>
                        <Input value={memberData.contact} readOnly />
                        <Label>Rank</Label>
                        <Input value={memberData.rank} readOnly />
                        <Label>Wallet</Label>
                        <Input value={memberData.wallet} readOnly />
                    </div>
                </div>
                <div className="flex flex-wrap justify-center w-full md:w-auto">
                    {actionButtons.map((button, index) => (
                        <Button className="m-3 w-full md:w-auto" key={index} onClick={() => console.log(button.action)}>
                            {button.label}
                        </Button>
                    ))}
                </div>
            </Card>
            <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                width: "900px",
            }}>
                {familyMembers.map((member, index) => (
                    <MemberCard member={member} key={index} />
                ))}
            </div>
        </div>
    );
}

export default MembersPage;