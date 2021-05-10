import { useState, useEffect } from "react";

export const usePasswordValidation = ({

    firstPassword = "",
    secondPassword = "",
    requiredLength = 6,
}) => {
    // state variables for validation criteria
    const [validLength, setValidLength] = useState(null);
    const [hasNumber, setHasNumber] = useState(null);
    const [upperCase, setUpperCase] = useState(null);
    const [lowerCase, setLowerCase] = useState(null);
    const [specialChar, setSpecialChar] = useState(null);
    const [match, setMatch] = useState(null);

    useEffect(() => {
        // evaluates the criteria and returns truthy values
        setValidLength(firstPassword.length >= requiredLength ? true : false);
        setUpperCase(firstPassword.toLowerCase() !== firstPassword);
        setLowerCase(firstPassword.toUpperCase() !== firstPassword);
        setHasNumber(/\d/.test(firstPassword));
        setSpecialChar(/[ `!@#$%^&*()_+\-=\]{};':"\\|,.<>?~]/.test(firstPassword));
        setMatch(firstPassword && firstPassword === secondPassword);

    }, [firstPassword, secondPassword, requiredLength]);

    return [validLength, hasNumber, upperCase, lowerCase, specialChar, match];
};