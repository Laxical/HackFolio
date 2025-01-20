import { useState, useEffect, useRef } from "react"

function ResizableTextArea(props) {
    const textRef = useRef(null);

    function handleFieldChange(index, fieldType, value) {
        const updatedFields = props.otherFields.map((field, i) =>
            i === index ? { ...field, [fieldType]: value } : field
        );
        props.setOtherFields(updatedFields);
    }

    function handleChange(e) {
        textRef.current.style.height = "0px";
        const scrollHeight = textRef.current.scrollHeight;
        textRef.current.style.height = scrollHeight + "px";

        handleFieldChange(props.ind, "value", e.target.value);
    }

    useEffect(() => {
        handleChange({ target: { value: props.val || "" } });
    }, []);

    return(
        <textarea ref={textRef} onChange={handleChange} value={props.val} className="w-full border overflow-y-hidden min-h-[150px] rounded-md p-2" placeholder={props.placeholder}></textarea>
    );
}

export default ResizableTextArea