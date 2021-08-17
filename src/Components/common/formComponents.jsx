import { TextField } from "@material-ui/core";

export const TextInputField = ({ name, state, errors, onChange, ...rest }) => {
  const label = name.charAt(0).toUpperCase() + name.slice(1);
  return (
    <TextField
      id={label}
      variant='outlined'
      fullWidth={true}
      label={label}
      name={name}
      value={state[name]}
      error={errors[name] ? true : false}
      helperText={errors && errors[name] ? errors[name] : ""}
      onChange={onChange}
      {...rest}
    />
  );
};
