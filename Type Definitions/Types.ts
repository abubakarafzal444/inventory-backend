import { Request } from "express";

export interface AuthenticateUserRequest extends Request {
  id: Number | string;
  UserName: string;
  Role: String;
}

export interface LoginUser {
  id: Number;
  UserName: String;
  Password: string;
  Role: string;
  created_at: Date;
  updated_at: Date;
}
export interface AuthenticateJWT {
  id: Number;
  UserName: String;
  Password: string;
  Role: string;
  created_at: Date;
  updated_at: Date;
}
