import { useState } from "react";

const useForm = () => {
    const [userInput, setUserInput] = useState({});
    const handleChange = ({ target }) =>
        setUserInput({
            ...userInput,
            [target.name]: target.value,
        });

    return [userInput, handleChange];
};

export default useForm;
