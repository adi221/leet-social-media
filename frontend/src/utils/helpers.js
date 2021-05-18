export const getBase64 = file => {
  return new Promise(resolve => {
    let baseURL = '';
    let reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
      baseURL = reader.result;
      resolve(baseURL);
    };
  });
};
