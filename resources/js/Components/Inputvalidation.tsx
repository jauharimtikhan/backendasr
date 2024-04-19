const Inputvalidation = ({
    id,
    name,
    label,
    error,
    type,
    onChanges,
    value,
}: {
    id: string;
    name: string;
    label: string;
    error?: string;
    type: string;
    onChanges?: (e: any) => void;
    value?: string | number;
}) => {
    return (
        <div className="flex flex-col mb-3">
            <label htmlFor={id}>{label}</label>
            <input
                type={type}
                name={name}
                id={id}
                value={value}
                onChange={(e) => {
                    if (type === "file") {
                        onChanges && onChanges(e);
                    }
                    onChanges && onChanges(e);
                }}
                className={`bg-gray-700 border-0 outline-0 text-gray-200 dark:text-gray-200 rounded-md w-full h-9 ${
                    type === "file" ? "py-1 px-2" : null
                }`}
            />
            <span className="text-red-600">{error}</span>
        </div>
    );
};

export default Inputvalidation;
