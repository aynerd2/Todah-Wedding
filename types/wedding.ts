// src/types/wedding.ts
import { Timestamp } from 'firebase/firestore';

export interface GuestWish {
  id?: string;
  name: string;
  message: string;
  imageUrl: string | null;
  createdAt: Timestamp | any; // Use 'any' if you want to handle the local state before the server syncs
}