interface Product {
  id: number; // Assuming there's an ID field
  vendor: User;
  name: string;
  description: string;
  price: number; // TypeScript doesn't have a specific type for decimals, so number is used
  createdAt: string; // Dates can be represented as strings in ISO format, which you can then convert to Date objects if needed
}
