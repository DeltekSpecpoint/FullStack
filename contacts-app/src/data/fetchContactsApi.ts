import { IRowData, UpdateAction } from '../commonModels';

export const getRowData = () => {
  const result: { data: IRowData[], hasError: boolean, error: string } = { data: [], hasError: false, error: '' };
  return fetch('https://localhost:5001/api/Contact/GetAllContacts', {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    },
    // body: null,
  })
    .then(res => {
      return res.json()
    })
    .catch(() => {
      result.hasError = true;
      result.error = 'ERROR: Api not online.';
      return result;
    })
    .then(data => {
      console.log(data.value);
      result.data = data.value as IRowData[];
      return result;
    })
    .catch(() => {
      result.hasError = true;
      result.error = 'ERROR: getRowData failed.';
      return result;
    });
}

export const updateData = (mode: UpdateAction, row: IRowData) => {
  const result: { hasError: boolean, error: string } = { hasError: false, error: '' };
  let controllerName = '', methodName = '', bodyContent = null;
  switch (mode) {
    case 'add':
      controllerName = 'CreateContact';
      methodName = 'POST';
      bodyContent = JSON.stringify(row);
      break;
    case 'edit':
      controllerName = 'UpdateContact';
      methodName = 'PUT';
      bodyContent = JSON.stringify(row);
      break;
    case 'delete':
      controllerName = 'DeleteContact';
      methodName = 'DELETE';
      bodyContent = JSON.stringify(row.id);
      break;
    default:
      break;
  }
  return fetch(`https://localhost:5001/api/Contact/${controllerName}`, {
    method: methodName,
    headers: {
      "Content-Type": "application/json",
      "Method" : methodName
    },
    body: bodyContent,
  })
    .then(res => {
      return res.json()
    })
    .catch(() => {
      result.hasError = true;
      result.error = 'ERROR: Api not online.';
      return result;
    })
    .then(data => {
      console.log(data.value);
      return result;
    })
    .catch(() => {
      result.hasError = true;
      result.error = `ERROR: ${controllerName} failed.`;
      return result;
    });
}
