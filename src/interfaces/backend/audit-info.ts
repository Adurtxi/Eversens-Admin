import { User } from "./user"

export class AuditInfo {
  createdAt: string = ''
  updatedAt: string = ''
  createdBy: User = new User()
  updatedBy: User | null = null
}