import { useState } from "react";
import { Member } from "@/types/member.type";

export const useUpdateMember = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const updateMember = async (id: string, member: Member) => {
    setLoading(true);
    setError(null);
    try {
      await fetch(`http://localhost:3001/api/members/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(member),
      });
    } catch (error) {
      setError("Error updating member");
      console.error("Error updating member:", error);
    } finally {
      setLoading(false);
    }
  };

  return { updateMember, loading, error };
};
