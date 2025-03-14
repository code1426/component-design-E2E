import { useState } from "react";

export const useDeleteMember = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const deleteMember = async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      await fetch(`http://localhost:3001/api/members/${id}`, {
        method: "DELETE",
      });
    } catch (error) {
      setError("Error deleting member");
      console.error("Error deleting member:", error);
    } finally {
      setLoading(false);
    }
  };

  return { deleteMember, loading, error };
};
