const defaultSucces = (res, data = "", message = "", code = 200) => {
  return defaults(res, data, code, message);
};

const defaulMessage = (res, message, code = 200) => {
  return defaults(res, "", code, message);
};

const defaults = (res, data = "", code, message = "", error = true) => {
  if (code == 200 || code == 201) error = false;

  return res.status(code).json({
    error: error,
    found: error ? false : true,
    message,
    data,
  });
};

module.exports = {
  defaultSucces,
  defaulMessage,
};
