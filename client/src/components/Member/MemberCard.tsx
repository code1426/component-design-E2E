import React, { useState } from "react";
import { Member } from "@/types/member.type";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import EditMemberForm from "@/components/Member/EditMemberForm";

interface MemberCardProps {
  member: Member;
  onDelete: (id: string) => void;
  onUpdate: (id: string, member: Member) => void;
}

const MemberCard: React.FC<MemberCardProps> = ({
  member,
  onDelete,
  onUpdate,
}) => {
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  const handleEdit = (updatedMember: Member) => {
    onUpdate(member.id!.toString(), updatedMember);
    setEditDialogOpen(false);
  };

  return (
    <div className="border rounded p-4 shadow-md">
      <p>
        <strong>First Name:</strong> {member.firstName}
      </p>
      <p>
        <strong>Last Name:</strong> {member.lastName}
      </p>
      <p>
        <strong>Group Name:</strong> {member.groupName}
      </p>
      <p>
        <strong>Role:</strong> {member.role}
      </p>
      <p>
        <strong>Expected Salary:</strong> {member.expectedSalary}
      </p>
      <p>
        <strong>Expected Date of Defense:</strong>{" "}
        {new Date(member.expectedDateOfDefense).toLocaleDateString()}
      </p>
      <div className="mt-2 flex space-x-2">
        <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-3 rounded">
              Edit
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-screen-md p-6">
            <DialogHeader>
              <DialogTitle>Edit Member</DialogTitle>
            </DialogHeader>
            <EditMemberForm
              initialValues={member}
              onSubmit={handleEdit}
              onCancel={() => setEditDialogOpen(false)}
            />
            <DialogClose asChild>
              <button className="mt-4 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
                Close
              </button>
            </DialogClose>
          </DialogContent>
        </Dialog>
        <Button
          onClick={() => onDelete(member.id!.toString())}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded"
        >
          Delete
        </Button>
      </div>
    </div>
  );
};

export default MemberCard;
