import { AuditInfo } from "./audit-info"

export class User {
  username: string = ''
  role: string = ''
  id: string = ''
  auditInfo: AuditInfo = new AuditInfo()
}