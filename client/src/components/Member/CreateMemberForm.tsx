import React, { useState, useEffect } from "react";
import { Member } from "@/types/member.type";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

interface CreateMemberFormProps {
  onSubmit: (member: Member) => void;
  onCancel: () => void;
  open: boolean;
}

interface FormData {
  firstName: string;
  lastName: string;
  groupName: string;
  role: string;
  expectedSalary: string;
  expectedDateOfDefense: string;
}

const CreateMemberForm: React.FC<CreateMemberFormProps> = ({
  onSubmit,
  onCancel,
  open,
}) => {
  const initialState: FormData = {
    firstName: "",
    lastName: "",
    groupName: "",
    role: "",
    expectedSalary: "",
    expectedDateOfDefense: "",
  };

  const [formData, setFormData] = useState<FormData>(initialState);

  useEffect(() => {
    if (!open) {
      setFormData(initialState);
    }
  }, [open]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const member: Member = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      groupName: formData.groupName,
      role: formData.role,
      expectedSalary: formData.expectedSalary
        ? Number(formData.expectedSalary)
        : 0,
      expectedDateOfDefense: new Date(formData.expectedDateOfDefense),
    };
    onSubmit(member);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 ">
      <div className="flex flex-col md:flex-row md:space-x-4">
        <div className="flex-1">
          <Label htmlFor="firstName" className="block text-sm font-medium">
            First Name
          </Label>
          <Input
            type="text"
            name="firstName"
            id="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="Enter your first name"
            required
            className="mt-1"
          />
        </div>
        <div className="flex-1">
          <Label htmlFor="lastName" className="block text-sm font-medium">
            Last Name
          </Label>
          <Input
            type="text"
            name="lastName"
            id="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Enter your last name"
            required
            className="mt-1"
          />
        </div>
      </div>
      <div className="flex flex-col md:flex-row md:space-x-4">
        <div className="flex-1">
          <Label htmlFor="groupName" className="block text-sm font-medium">
            Group Name
          </Label>
          <Input
            type="text"
            name="groupName"
            id="groupName"
            value={formData.groupName}
            onChange={handleChange}
            placeholder="Enter your group name"
            required
            className="mt-1"
          />
        </div>
        <div className="flex-1">
          <Label htmlFor="role" className="block text-sm font-medium">
            Role
          </Label>
          <Input
            type="text"
            name="role"
            id="role"
            value={formData.role}
            onChange={handleChange}
            placeholder="Enter your role"
            required
            className="mt-1"
          />
        </div>
      </div>
      <div className="flex flex-col md:flex-row md:space-x-4">
        <div className="flex-1">
          <Label htmlFor="expectedSalary" className="block text-sm font-medium">
            Expected Salary
          </Label>
          <Input
            type="number"
            name="expectedSalary"
            id="expectedSalary"
            value={formData.expectedSalary}
            onChange={handleChange}
            placeholder="Enter salary (e.g., 50000)"
            className="mt-1"
          />
        </div>
        <div className="flex-1">
          <Label
            htmlFor="expectedDateOfDefense"
            className="block text-sm font-medium"
          >
            Expected Date of Defense
          </Label>
          <Input
            type="date"
            name="expectedDateOfDefense"
            id="expectedDateOfDefense"
            value={formData.expectedDateOfDefense}
            onChange={handleChange}
            required
            className="mt-1"
          />
        </div>
      </div>
      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">Add Member</Button>
      </div>
    </form>
  );
};

export default CreateMemberForm;
