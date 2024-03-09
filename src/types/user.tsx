enum Role {
  ADMIN = "ADMIN",
  VENDOR = "VENDOR",
  CONSUMER = "CONSUMER",
}

export interface User {
  id: number;
  username: string;
  email: string;
  role: Role;
}
