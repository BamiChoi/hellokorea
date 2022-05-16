export const handleErrorResponse = (error: any) => {
  const httpStatus = error.response.status;
  let errorMessage;
  switch (httpStatus) {
    case 400:
      errorMessage = "Failed to load data, please try again.";
      break;
    case 401:
      errorMessage = "You are not authenticated. please login.";
      break;
    case 403:
      errorMessage = "You are not autorization to this request.";
      break;
    case 404:
      errorMessage = "We can not found.";
      break;
    case 500:
      errorMessage = "Server Error. please try again.";
      break;
    default:
      errorMessage = "Occurred unknwon error, please try again.";
  }
  return errorMessage;
};
