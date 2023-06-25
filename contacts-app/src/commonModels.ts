export interface IRowData {
  id: number;
  lastName: string;
  firstName: string;
  emailAddress: string;
  phoneNumber: string;
  isStarred: boolean;
}

export type UpdateAction = 'add' | 'edit' | 'delete';

export interface IDialogData {
  isShown: boolean;
  mode: UpdateAction;
  id: number;
}

export const ContactFields = {
  lastName: 'lastName',
  firstName: 'firstName',
  emailAddress: 'emailAddress',
  phoneNumber: 'phoneNumber'
}

export interface IFetchResult {
  type: 'success' | 'warning';
  message: string;
  isShown: boolean;
}