import type { UserSchema } from "./zodSchema";

export interface User extends UserSchema {
  id: string;
}

export interface Credentials {
  accountNumber: string;
  password: string;
}
