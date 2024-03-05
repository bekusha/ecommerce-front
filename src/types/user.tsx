enum Role {
  ADMIN = "ADMIN",
  VENDOR = "VENDOR",
  CONSUMER = "CONSUMER",
}

interface User {
  id: number;
  username: string;
  email: string;
  role: Role;
  // Add other fields as necessary, e.g., firstName, lastName
}
