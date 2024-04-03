import type { User } from './types';
import type AuthProvider from './auth_provider';

class AuthService implements AuthProvider {
  constructor(private provider: AuthProvider) {}
  get currentUser(): User {
    return this.provider.currentUser;
  }

  createUser(email: string, password: string): User {
    throw new Error('Method not implemented.');
  }

  sendeMemailVerification(): void {
    throw new Error('Method not implemented.');
  }

  loginIn(email: string, password: string): User {
    throw new Error('Method not implemented.');
  }

  logOut(): void {
    throw new Error('Method not implemented.');
  }

  sendPasswordReset(email: string): void {
    throw new Error('Method not implemented.');
  }
}
