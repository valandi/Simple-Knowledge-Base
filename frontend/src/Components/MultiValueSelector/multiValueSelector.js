import { useState, useEffect } from "react";

export default function MultiValueSelector(props) {
    const [currentValues, setCurrentValues] = useState([]);

    const setInitialValue = function() {
        if (props.initialValue)
            setCurrentValues(props.initialValue);
        else
            setCurrentValues([]);
    }

    useEffect(() => {
        setInitialValue()
    }, [])

    useEffect(() => {
        setInitialValue()
    }, [props.initialValue])

    const handleAdd = (index) => {
        let addedValue = props.options[index];
        let temp = [...currentValues];
        if (currentValues.findIndex((value) => value[props.displayField] == addedValue[props.displayField]) >= 0) return;
        temp.push(addedValue);
        console.log(temp);
        setCurrentValues(temp);
        props.onValueChange(temp);
    }

    const handleDelete = (index) => {
        let temp = [...currentValues];
        if (index == 0) {
            temp.shift();
        } else {
            temp.splice(index, 1);
        }
        setCurrentValues(temp);
        props.onValueChange(temp);
    }

    return (
        <div>
            <label>{props.label}</label>
            <select value="" onChange={(e) => handleAdd(e.target.value)}>
                <option value=""></option>
                {props.options && props.options.map((option, index) => {
                    return <option key={index} value={index}>{option[props.displayField]}</option>
                })}
            </select>
            <div>
                {currentValues && currentValues.map((value, index) => {
                    return <span key={index}>{value[props.displayField]} <button onClick={() => handleDelete(index)}>X</button></span>
                })}
            </div>
        </div>
    )
}