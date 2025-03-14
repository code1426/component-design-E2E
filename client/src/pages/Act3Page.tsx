import React, { useEffect, useState } from "react";
import { Member } from "@/types/member.type";
import MemberCard from "@/components/Member/MemberCard";
import { useCreateMember } from "@/hooks/Members/useCreateMember";
import { useFetchMembers } from "@/hooks/Members/useFetchMembers";
import { useDeleteMember } from "@/hooks/Members/useDeleteMember";
import { useUpdateMember } from "@/hooks/Members/useUpdateMember";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import CreateMemberForm from "@/components/Member/CreateMemberForm";

const Act3Page: React.FC = () => {
  const { createMember, error: createError } = useCreateMember();
  const { members, fetchMembers } = useFetchMembers();
  const { deleteMember, error: deleteError } = useDeleteMember();
  const { updateMember, error: updateError } = useUpdateMember();

  const [refresh, setRefresh] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    fetchMembers();
  }, [refresh, fetchMembers]);

  const handleAddMember = async (member: Member) => {
    await createMember(member);
    setRefresh((prev) => !prev);
    setDialogOpen(false);
  };

  const handleDeleteMember = async (id: string) => {
    await deleteMember(id);
    setRefresh((prev) => !prev);
  };

  const handleUpdateMember = async (id: string, member: Member) => {
    await updateMember(id, member);
    setRefresh((prev) => !prev);
  };

  return (
    <div className="container mx-auto h-screen w-screen bg-stone-800">
      <header className="flex bg-lime-500 justify-between items-center p-5">
        <h1 className="text-2xl font-bold">Member Management</h1>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Add Member
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-screen-md p-6">
            <DialogHeader>
              <DialogTitle>Add Member</DialogTitle>
            </DialogHeader>
            <CreateMemberForm
              onSubmit={handleAddMember}
              onCancel={() => setDialogOpen(false)}
              open={dialogOpen}
            />
            <DialogClose asChild>
              <button className="mt-4 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
                Close
              </button>
            </DialogClose>
          </DialogContent>
        </Dialog>
      </header>

      <div className="p-10">
        <h2 className="text-xl font-bold mb-2">Members List</h2>
        {members && members.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {members.map((member) => (
              <MemberCard
                key={member.id}
                member={member}
                onDelete={handleDeleteMember}
                onUpdate={handleUpdateMember}
              />
            ))}
          </div>
        ) : (
          <p>No members found.</p>
        )}
      </div>

      {(createError || deleteError || updateError) && (
        <p className="text-red-500 mt-4">
          {createError || deleteError || updateError}
        </p>
      )}
    </div>
  );
};

export default Act3Page;
