export interface IProfile {
  user_id: number;
  bio: string;
  address: string;
  phone: number;
  gender: "male" | "female";
}