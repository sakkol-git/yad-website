export enum Role {
  ADMIN = 'admin',
  MANAGER = 'manager',
  USER = 'user',
}

export interface PermissionMatrix {
  [Role.ADMIN]: string[];
  [Role.MANAGER]: string[];
  [Role.USER]: string[];
}
