export type Member = {
  id?: number;
  firstName: string;
  lastName: string;
  groupName: string;
  role: string;
  expectedSalary: number;
  expectedDateOfDefense: Date; // if you're converting the string to Date on receipt
};
