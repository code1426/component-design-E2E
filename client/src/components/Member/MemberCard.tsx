import React, { useState } from "react";
import { Member } from "@/types/member.type";
import EditMemberDialog from "@/components/Member/EditMemberDialog";
import ConfirmDeleteDialog from "@/components/Member/ConfirmDeleteDialog";
import { User, Users } from "lucide-react";

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
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);

  const handleEdit = (updatedMember: Member) => {
    onUpdate(member.id!.toString(), updatedMember);
    setEditDialogOpen(false);
  };

  const handleDeleteConfirm = () => {
    onDelete(member.id!.toString());
    setConfirmDialogOpen(false);
  };

  return (
    <div className="border bg-gray-900 rounded p-4 shadow-md text-white">
      <div className="flex justify-between items-center mb-4">
        <span className="bg-blue-600 px-2 py-1 rounded text-xs font-medium flex items-center gap-x-2">
          <Users className="h-5 w-5 text-white" />
          {member.groupName}
        </span>

        <div className="flex items-center">
          <User className="h-4 w-4 mr-1" />
          <span className="text-sm font-medium">{member.role}</span>
        </div>
      </div>

      <p>
        <strong>First Name:</strong> {member.firstName}
      </p>
      <p>
        <strong>Last Name:</strong> {member.lastName}
      </p>
      <p>
        <strong>Expected Salary:</strong> {member.expectedSalary}
      </p>
      <p>
        <strong>Expected Date of Defense:</strong>{" "}
        {new Date(member.expectedDateOfDefense).toLocaleDateString()}
      </p>

      <div className="mt-2 flex space-x-2">
        <EditMemberDialog
          member={member}
          open={editDialogOpen}
          onOpenChange={setEditDialogOpen}
          onSubmit={handleEdit}
          onCancel={() => setEditDialogOpen(false)}
        />
        <ConfirmDeleteDialog
          open={confirmDialogOpen}
          onOpenChange={setConfirmDialogOpen}
          onConfirmDelete={handleDeleteConfirm}
        />
      </div>
    </div>
  );
};

export default MemberCard;
