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

const MembersPage = () => {
    return (
        <div>
            <div>
                <Card className="flex flex-wrap items-center justify-around">
                    <div className="flex flex-wrap items-center justify-center p-4 m-2">
                        <Avatar className="w-60 h-60 mr-6">
                            <AvatarImage src={memberData.image} alt="User Image" style={{ objectFit: 'cover', width: '100%', height: '100%' }} />
                            <AvatarFallback>{memberData.alt}</AvatarFallback>
                        </Avatar>
                        <div className="">
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
                    <div style={{
                        display: 'flex',
                        width: "350px",
                        flexWrap: 'wrap',
                    }}>
                        {actionButtons.map((button, index) => (
                            <Button className="m-3 w-[fit-content]" key={index} onClick={() => console.log(button.action)}>
                                {button.label}
                            </Button>
                        ))}
                    </div>
                </Card>
            </div>
            <div className="flex flex-wrap">
                {familyMembers.map((member, index) => (
                    <Card className="flex flex-wrap items-center justify-center p-4 m-2" key={index}>
                        <Avatar className="w-60 h-60 mr-6">
                            <AvatarImage src={member.image} alt="User Image" style={{ objectFit: 'cover', width: '100%', height: '100%' }} />
                            <AvatarFallback>AB</AvatarFallback>
                        </Avatar>
                        <div className="">
                            <Label>Name</Label>
                            <Input value={member.name} readOnly />
                            <Label>Date of Birth</Label>
                            <Input value={member.dateOfBirth} readOnly />
                            <Label>Type</Label>
                            <Input value={member.type} readOnly />
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
}

export default MembersPage;
