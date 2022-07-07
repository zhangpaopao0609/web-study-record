import { User } from "./types";

export default abstract class AuthProvider {
  abstract get currentUser(): User;
  abstract createUser(email: string, password: string): User;
  abstract sendeMemailVerification(): void;
  abstract loginIn(email: string, password: string): User;
  abstract logOut(): void;
  abstract sendPasswordReset(email: string): void;
}