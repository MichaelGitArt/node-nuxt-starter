export interface IUserRole {
  USER: 'USER';
  ADMIN: 'ADMIN';
}

export interface IPermissionRole extends IUserRole {
  ALL: 'ALL';
  ANONYMOUS: 'ANONYMOUS';
  AUTHORIZED: 'AUTHORIZED';
}
