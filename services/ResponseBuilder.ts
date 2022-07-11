type ResponseTemplate = {
  status: string;
  message: any;
  data?: object;
};

const responseBuilder = (status: string, message: string, data?: object): ResponseTemplate => {
  return {
    status: status,
    message: message,
    data: data,
  };
};

export default responseBuilder