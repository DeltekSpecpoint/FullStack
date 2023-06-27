import { useReducer } from 'react';
import { ACTIONS, dialogAction, IDialogData, IRowData } from '../commonModels';

const validateField = (field: string, action: ACTIONS) => {
    switch (action) {
        case ACTIONS.UPDATE_LASTNAME:
        case ACTIONS.UPDATE_FIRSTNAME: {
            // validate as required
            return field.trim() !== '';
        }
        case ACTIONS.UPDATE_EMAIL: {
            // validate format and as optional
            return field === '' || field.match('^[a-zA-Z0-9]+@[a-zA-Z0-9]+.+[a-zA-Z]$') !== null;
        }
        case ACTIONS.UPDATE_PHONE: {
            // validate format and as optional
            return field === '' || field.match('^[0-9]*$') !== null;
        }
        default: {
            return false;
        }
    }
};

const validateForSave = (dialogData: IDialogData) => {
    // Unpolished save validation but looks good..
    return {
    ...dialogData,
    isReadyForSave: dialogData.firstName.trim() !== '' && dialogData.lastName.trim() !== '' && dialogData.isEmailAddressValid && dialogData.isPhoneNumberValid
  }; 
};

const dialogDataReducer = (dialogData: IDialogData, action: dialogAction) => {
    const { actionType, payload } = action;
    switch (actionType) {
        case ACTIONS.LOAD: {
            const newData = payload as IRowData;
            return {
                ...dialogData,
                id: newData.id,
                lastName: newData.lastName,
                firstName: newData.firstName,
                emailAddress: newData.emailAddress,
                phoneNumber: newData.phoneNumber,
                isStarred: newData.isStarred
            };
        }
        case ACTIONS.UPDATE_LASTNAME: {
            const newData = payload as string;
            const newState = {
                ...dialogData,
                lastName: newData,
                isLastNameValid: validateField(newData, actionType)
            };
            return validateForSave(newState);
        }
        case ACTIONS.UPDATE_FIRSTNAME: {
            const newData = payload as string;
            const newState = {
                ...dialogData,
                firstName: newData,
                isFirstNameValid: validateField(newData, actionType)
            };
            return validateForSave(newState);
        }
        case ACTIONS.UPDATE_EMAIL: {
            const newData = payload as string;
            const newState = {
                ...dialogData,
                emailAddress: newData,
                isEmailAddressValid: validateField(newData, actionType)
            };
            return validateForSave(newState);
        }
        case ACTIONS.UPDATE_PHONE: {
            const newData = payload as string;
            const newState = {
                ...dialogData,
                phoneNumber: newData,
                isPhoneNumberValid: validateField(newData, actionType)
            };
            return validateForSave(newState);
        }
        default:
            return dialogData;
    }
};

const useDialogReducer = () => {
    const [dialogData, dispatch] = useReducer(dialogDataReducer, {
        id: 0,
        lastName: '',
        firstName: '',
        phoneNumber: '',
        emailAddress: '',
        isStarred: true,
        isLastNameValid: true,
        isFirstNameValid: true,
        isEmailAddressValid: true,
        isPhoneNumberValid: true,
        isReadyForSave: false
    });

    return { dialogData, dispatch };
}

export default useDialogReducer