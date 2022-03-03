import { useState, useEffect } from "react";
import "./singleValueSelector.css";
// return one selected value onChange

export default function SingleValueSelector(props) {
    const [currentValue, setCurrentValue] = useState("");

    const setInitialValue = function() {
        let index;
        if (props.initialValue && props.displayField)
            index = props.options.findIndex((option) => option[props.displayField] == props.initialValue[props.displayField]);
        else if (props.initialValue && !props.displayField) 
            index = props.options.findIndex((option) => option == props.initialValue);
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
        <div className="single-selector-container">
            <label>{props.label}: </label>
            <select value={currentValue} onChange={(e) => handleSelection(e.target.value)}>
                <option value=""></option>
                {props.options && props.options.map((option, index) => {
                    return <option key={index} value={index}>{props.displayField ? option[props.displayField] : option}</option>
                })}
            </select>
        </div>
    )
}