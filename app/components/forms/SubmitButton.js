import React from 'react';
import { useFormikContext } from "formik";

import Button from "../Button";
import colors from "../config/colors";


function SubmitButton({ title, color = colors.black, textColor = colors.white }) {
    const { handleSubmit } = useFormikContext();

    return (
        <Button title={title} color={color} textColor={textColor} onPress={handleSubmit} />
    );
}

export default SubmitButton;