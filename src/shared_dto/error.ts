export const serverError = {
  status: 500,
  message: 'Server error. Please contact developer.',
};

export const serverErrorResponse = (data?: object) => ({
  ...serverError,
  data,
});
