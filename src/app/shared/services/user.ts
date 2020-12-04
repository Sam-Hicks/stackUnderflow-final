export interface User {
   uid: string;
   email: string;
   displayName?: string;
   photoURL?: string;
   emailVerified: boolean;
   DoB?: string;
   age?: string;
   languages?: Array<string>;
   experience?: string;
   reasons?: string;
   roles: Roles;
}

export interface Roles { 
   guest?: boolean;
   editor?: boolean;
   admin?: boolean;
}