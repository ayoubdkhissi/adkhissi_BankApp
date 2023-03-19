import { Account } from "./customer.interface";

export interface CustomerFormData{
    firstName: string;
    lastName: string;
    email: string;
    address: string;
    gender: string;
    image: string;
    account: Account;
}