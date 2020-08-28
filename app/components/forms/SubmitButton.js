import React from "react";
import { useFormikContext } from "formik";

import Button from "../Button";

function SubmitButton({ color, textColor, title, onPress }) {
  const { handleSubmit } = useFormikContext();

  return (
    <Button
      title={title}
      color={color}
      textColor={textColor}
      onPress={() => {
        if (onPress) {
          onPress();
        }
        handleSubmit();
      }}
    />
  );
}

export default SubmitButton;
