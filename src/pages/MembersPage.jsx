import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";

const memberData = {
    name: "Prakash Singh Rana",
    contact: "9711009451",
    rank: "AxRt35$$1",
    wallet: "7000",
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
        image: "src/assets/mehul.png",
        alt: "Mehul",
    },
    {
        name: "Mitul",
        dateOfBirth: "18-01-2005",
        type: "Dependent",
        image: "src/assets/mitul.png",
        alt: "Mitul",
    },
    {
        name: "Hema Rana",
        dateOfBirth: "31-07-1980",
        type: "Spouse",
        image: "src/assets/hema.png",
        alt: "Hema",
    },
];

const MemberInfoField = ({ label, value }) => (
    <div className="flex flex-col text-left w-[200px]">
        <Label>{label}</Label>
        <Input defaultValue={value} readOnly />
    </div>
);

const FamilyMemberCard = ({ member }) => (
    <Card>
        <CardContent className="flex w-[fit-content]">
            <img
                src={member.image}
                alt={member.alt}
                className="object-cover h-[200px] w-[200px]"
            />
            <div className="space-y-4">
                <MemberInfoField label="Name" value={member.name} />
                <MemberInfoField label="Date Of Birth" value={member.dateOfBirth} />
                <MemberInfoField label="Type" value={member.type} />
            </div>
        </CardContent>
    </Card>
);

function MembersPage() {
    return (
        <div>
            <div className="flex flex-col lg:flex-row justify-between mb-2">
                <div className="flex flex-col lg:flex-row gap-1">
                    <img
                        src="src/assets/prakash.png"
                        alt="Member"
                        className="w-full lg:w-[200px] h-[200px] object-cover"
                    />
                    <div className="space-y-4">
                        {Object.entries(memberData).map(([key, value]) => (
                            <MemberInfoField
                                key={key}
                                label={key.charAt(0).toUpperCase() + key.slice(1)}
                                value={value}
                            />
                        ))}
                    </div>
                </div>

                <div className="flex flex-col space-y-6 w-full lg:w-[297px] mt-8 lg:mt-0">
                    {actionButtons.map((action) => (
                        <div onClick={action.action}>
                            <Button key={action}>
                                {action.label}
                            </Button>
                        </div>
                    ))}
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {familyMembers.map((member) => (
                    <FamilyMemberCard key={member.name} member={member} />
                ))}
            </div>
        </div>
    );
}

export default MembersPage
