import React from "react";
import { TextInput } from "react-native";
import { useFormikContext } from "formik";

import ErrorMessage from "./ErrorMessage";

function AppFormField({ name, error = true, ...otherProps }) {
  const {
    setFieldTouched,
    setFieldValue,
    errors,
    touched,
    values,
  } = useFormikContext();

  return (
    <>
      <TextInput
        onBlur={() => setFieldTouched(name)}
        onChangeText={(text) => setFieldValue(name, text)}
        value={values[name]}
        {...otherProps}
      />
      {error && <ErrorMessage error={errors[name]} visible={touched[name]} />}
    </>
  );
}

export default AppFormField;
