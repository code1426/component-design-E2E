import React from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import EditMemberForm from "@/components/Member/EditMemberForm";
import { Member } from "@/types/member.type";

interface EditMemberDialogProps {
  member: Member;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (member: Member) => void;
  onCancel: () => void;
}

const EditMemberDialog: React.FC<EditMemberDialogProps> = ({
  member,
  open,
  onOpenChange,
  onSubmit,
  onCancel,
}) => {
  const handleSubmit = (updatedMember: Member) => {
    onSubmit(updatedMember);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
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
          onSubmit={handleSubmit}
          onCancel={onCancel}
          open={open}
        />
      </DialogContent>
    </Dialog>
  );
};

export default EditMemberDialog;
