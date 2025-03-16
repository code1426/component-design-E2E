import React, { useState } from "react";
import { Member } from "@/types/member.type";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import CreateMemberForm from "@/components/Member/CreateMemberForm";
import { UserPlus } from "lucide-react";

interface CreateMemberDialogProps {
  onSubmit: (member: Member) => void;
}

const CreateMemberDialog: React.FC<CreateMemberDialogProps> = ({
  onSubmit,
}) => {
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleSubmit = async (member: Member) => {
    await onSubmit(member);
    setDialogOpen(false);
  };

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Button className="bg-green-900 hover:bg-green-950 text-white font-bold py-2 px-4 rounded">
          <span className="flex items-center gap-x-2">
            <UserPlus />
            Create Member
          </span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-screen-md p-6">
        <DialogHeader>
          <DialogTitle>Create Member</DialogTitle>
        </DialogHeader>
        <CreateMemberForm
          onSubmit={handleSubmit}
          onCancel={() => setDialogOpen(false)}
          open={dialogOpen}
        />
      </DialogContent>
    </Dialog>
  );
};

export default CreateMemberDialog;
