import { useState } from "react";
import { Member } from "@/types/member.type";

export const useCreateMember = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const createMember = async (member: Member) => {
    setLoading(true);
    setError(null);
    try {
      await fetch("http://localhost:3001/api/members", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(member),
      });
    } catch (error) {
      setError("Error creating member");
      console.error("Error creating member:", error);
    } finally {
      setLoading(false);
    }
  };

  return { createMember, loading, error };
};
