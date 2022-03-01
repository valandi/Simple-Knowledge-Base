import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./errorReporter.css";
import { updateErrorMessage } from "../../Redux/errorSlice";

export default function ErrorReporter() {
    const errorMessage = useSelector((state) => state.errors.errorMessage);
    const dispatch = useDispatch();
    useEffect(() => {
        if (errorMessage.length > 0) {
            setTimeout(() => {
                dispatch(updateErrorMessage(""));
            }, 3500);
        }
    }, [errorMessage]);

    const handleDismiss = () => {
        dispatch(updateErrorMessage(""));
    }

    return (
        <div>
            {errorMessage && errorMessage.length > 0 && (
                <div className="message-container" onClick={handleDismiss}>
                    <h1>Error</h1>
                    <p>{errorMessage}</p>
                </div>
            )}
        </div>
    )
}