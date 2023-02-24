import exportFromJSON from 'export-from-json';

export const exportFile = ({ data = [], fileName = 'PulseemReport', exportType = 'csv', fields = null }) => {
  exportFromJSON({
    data,
    fileName,
    exportType,
    fields,
    withBOM: true,
  });
};

export const preferredOrder = (obj, order) => {
  const arr = [];
  for (var i = 0; i < obj.length; i++) {
    let newObject = {};
    order.forEach((o) => {
      newObject[o] = obj[i][o];
    });

    arr.push(newObject);
  }
  return arr;
};
