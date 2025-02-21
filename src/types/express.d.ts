import { User as PrismaUser } from "@prisma/client"; // Import Prisma's User type
import { Request } from "express";

declare global {
  namespace Express {
    interface User extends PrismaUser {} // Extend Passport's User type
    interface Request {
      user?: User; // Mark it as optional in case it's missing
    }
  }
}
