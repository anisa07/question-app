interface CheckboxProps {
    onCheck: (v: boolean) => void,
    label: string,
    value: boolean
}


export const Checkbox = ({onCheck, label, value}: CheckboxProps ) => {
    const handleChange = () => {
        onCheck(!value);
    };

    return (
        <label>
            <input
                type="checkbox"
                checked={value}
                onChange={handleChange}
            />
            {label}
        </label>
    );
};
