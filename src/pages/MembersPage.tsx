import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
        minWidth:"300px"
    }}>
        <Avatar style={{
            width: '200px',
            height: '200px',
        }}>
            <AvatarImage src={member.image} alt="User Image" style={{ objectFit: 'cover' }} />
            <AvatarFallback>{member.alt}</AvatarFallback>
        </Avatar>
        <div style={{
            margin: "0 0 0 20px"
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
            padding: ".5em",
        }}>
            <Card style={{
                display: 'flex',
                flexDirection: "column",
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'space-around',
                width: "30%",
                minWidth:"300px"
            }}>
                <div>
                    <Avatar style={{
                        width:"200px",
                        height:"200px"
                    }}>
                        <AvatarImage src={memberData.image} alt="User Image" style={{ objectFit: 'cover', width: '100%', height: '100%' }} />
                        <AvatarFallback>{memberData.alt}</AvatarFallback>
                    </Avatar>
                    <div>
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
            </Card>
            <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                width: "70%",
            }}>
                {familyMembers.map((member, index) => (
                    <MemberCard member={member} key={index} />
                ))}
            </div>
        </div>
    );
}

export default MembersPage;