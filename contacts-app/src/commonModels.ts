export interface IRowData {
  id: number;
  lastName: string;
  firstName: string;
  emailAddress: string;
  phoneNumber: string;
  isStarred: boolean;
}

export interface IDialogData extends IRowData {
  isLastNameValid: boolean;
  isFirstNameValid: boolean;
  isEmailAddressValid: boolean;
  isPhoneNumberValid: boolean;
  isReadyForSave: boolean;
}

export type UpdateAction = 'add' | 'edit' | 'delete';

export interface IDialogParams {
  isShown: boolean;
  mode: UpdateAction;
  id: number;
}

export interface IFetchResult {
  type: 'success' | 'warning';
  message: string;
  isShown: boolean;
}

export const enum ACTIONS {
  LOAD = 'LOAD',
  UPDATE_FIRSTNAME = 'update_firstname',
  UPDATE_LASTNAME = 'update_lastname',
  UPDATE_EMAIL = 'update_email',
  UPDATE_PHONE = 'update_phone',
  VALIDATE_SAVE = 'validate_save',
}

export interface dialogAction {
  actionType: ACTIONS;
  payload: string | IRowData;
}