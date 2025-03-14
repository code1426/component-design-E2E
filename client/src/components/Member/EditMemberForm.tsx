import React, { useState, useEffect } from "react";
import { Member } from "@/types/member.type";

interface EditMemberFormProps {
  initialValues: Member;
  onSubmit: (member: Member) => void;
  onCancel: () => void;
}

interface FormData {
  firstName: string;
  lastName: string;
  groupName: string;
  role: string;
  expectedSalary: string;
  expectedDateOfDefense: string;
}

const EditMemberForm: React.FC<EditMemberFormProps> = ({
  initialValues,
  onSubmit,
  onCancel,
}) => {
  const [formData, setFormData] = useState<FormData>({
    firstName: initialValues.firstName,
    lastName: initialValues.lastName,
    groupName: initialValues.groupName,
    role: initialValues.role,
    expectedSalary: initialValues.expectedSalary.toString(),
    expectedDateOfDefense: new Date(initialValues.expectedDateOfDefense)
      .toISOString()
      .slice(0, 10),
  });

  useEffect(() => {
    // Reset to initial values if they change
    setFormData({
      firstName: initialValues.firstName,
      lastName: initialValues.lastName,
      groupName: initialValues.groupName,
      role: initialValues.role,
      expectedSalary: initialValues.expectedSalary.toString(),
      expectedDateOfDefense: new Date(initialValues.expectedDateOfDefense)
        .toISOString()
        .slice(0, 10),
    });
  }, [initialValues]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const member: Member = {
      id: initialValues.id,
      firstName: formData.firstName,
      lastName: formData.lastName,
      groupName: formData.groupName,
      role: formData.role,
      expectedSalary: formData.expectedSalary
        ? Number(formData.expectedSalary)
        : 0,
      // Convert the input string back to a Date object.
      expectedDateOfDefense: new Date(formData.expectedDateOfDefense),
    };
    onSubmit(member);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Row 1: First Name and Last Name */}
      <div className="flex flex-col md:flex-row md:space-x-4">
        <div className="flex-1">
          <label
            htmlFor="firstName"
            className="block text-sm font-medium text-gray-700"
          >
            First Name
          </label>
          <input
            type="text"
            name="firstName"
            id="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="Enter your first name"
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            required
          />
        </div>
        <div className="flex-1">
          <label
            htmlFor="lastName"
            className="block text-sm font-medium text-gray-700"
          >
            Last Name
          </label>
          <input
            type="text"
            name="lastName"
            id="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Enter your last name"
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            required
          />
        </div>
      </div>
      {/* Row 2: Group Name and Role */}
      <div className="flex flex-col md:flex-row md:space-x-4">
        <div className="flex-1">
          <label
            htmlFor="groupName"
            className="block text-sm font-medium text-gray-700"
          >
            Group Name
          </label>
          <input
            type="text"
            name="groupName"
            id="groupName"
            value={formData.groupName}
            onChange={handleChange}
            placeholder="Enter your group name"
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            required
          />
        </div>
        <div className="flex-1">
          <label
            htmlFor="role"
            className="block text-sm font-medium text-gray-700"
          >
            Role
          </label>
          <input
            type="text"
            name="role"
            id="role"
            value={formData.role}
            onChange={handleChange}
            placeholder="Enter your role"
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            required
          />
        </div>
      </div>
      {/* Row 3: Expected Salary and Expected Date of Defense */}
      <div className="flex flex-col md:flex-row md:space-x-4">
        <div className="flex-1">
          <label
            htmlFor="expectedSalary"
            className="block text-sm font-medium text-gray-700"
          >
            Expected Salary
          </label>
          <input
            type="number"
            name="expectedSalary"
            id="expectedSalary"
            value={formData.expectedSalary}
            onChange={handleChange}
            placeholder="Enter salary (e.g., 50000)"
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          />
        </div>
        <div className="flex-1">
          <label
            htmlFor="expectedDateOfDefense"
            className="block text-sm font-medium text-gray-700"
          >
            Expected Date of Defense
          </label>
          <input
            type="date"
            name="expectedDateOfDefense"
            id="expectedDateOfDefense"
            value={formData.expectedDateOfDefense}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            required
          />
        </div>
      </div>
      <div className="flex justify-end space-x-2">
        <button
          type="button"
          onClick={onCancel}
          className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Update Member
        </button>
      </div>
    </form>
  );
};

export default EditMemberForm;
