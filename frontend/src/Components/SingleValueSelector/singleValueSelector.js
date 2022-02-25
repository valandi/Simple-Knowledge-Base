import { useState, useEffect } from "react";

// return one selected value onChange

export default function SingleValueSelector(props) {
    const [currentValue, setCurrentValue] = useState("");

    const setInitialValue = function() {
        let index;
        if (props.initialValue)
            index = props.options.findIndex((option) => option[props.displayField] == props.initialValue[props.displayField]);
        else
            index = "";
        setCurrentValue(index);
    }

    useEffect(() => {
        setInitialValue();
    }, [])

    useEffect(() => {
        setInitialValue();
    }, [props.initialValue])

    const handleSelection = (index) => {
        let selectedValue = props.options[index];
        setCurrentValue(index);
        props.onValueChange(selectedValue);
    }

    return (
        <div style={{margin: "20px 0px"}}>
            <label>{props.label}</label>
            <select value={currentValue} onChange={(e) => handleSelection(e.target.value)}>
                <option value=""></option>
                {props.options && props.options.map((option, index) => {
                    return <option key={index} value={index}>{option[props.displayField]}</option>
                })}
            </select>
        </div>
    )
}