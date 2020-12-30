export default function (errors, $tc) {
  const parsedErrors = {};

  Object.values(errors).forEach((error) => {
    const errorCode = 'errors.validation.' + error.msg;
    const field = $tc('forms.' + error.param);

    parsedErrors[error.param] = $tc(errorCode, 1, { field });
  });

  return parsedErrors;
}
