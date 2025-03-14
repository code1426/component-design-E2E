import { useState } from "react";
import { Member } from "@/types/member.type";

export const useFetchMembers = () => {
  const [members, setMembers] = useState<Member[]>([]);

  const fetchMembers = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/members");
      const data = await response.json();
      setMembers(data);
    } catch (error) {
      console.error("Error fetching members:", error);
    }
  };

  return { members, fetchMembers };
};
