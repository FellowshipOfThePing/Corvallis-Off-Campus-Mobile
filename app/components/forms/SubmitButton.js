import React from 'react';
import { useFormikContext } from "formik";

import Button from "../Button";


function SubmitButton({ color, textColor, title }) {
    const { handleSubmit } = useFormikContext();

    return (
        <Button title={title} color={color} textColor={textColor} onPress={handleSubmit} />
    );
}

export default SubmitButton;