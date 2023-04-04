import { useState } from 'react';

export default function useForm(initialValues, onSubmitHandler) {
    const [formValues, setFormValues] = useState(initialValues);

    function onChangeHandler (e) {
        setFormValues(state => ({...state, [e.target.name]: e.target.value}));
    }

    function onSubmit(e) {
        e.preventDefault();
        onSubmitHandler(formValues);
        setFormValues(initialValues);
    }

    function onChangeValues(newValues) {
        setFormValues(newValues);
    }

    return {
        formValues,
        onChangeHandler,
        onSubmit,
        onChangeValues
    };
}
