import SingleValueSelector from "../SingleValueSelector/singleValueSelector";

export default function ZendeskQuery(props) {

    const handleValueChange = (value, key) => {
        props.handleChange(key, value);
    }

    return (
        <div>
            <SingleValueSelector
                label="SDK Tag"
                options={props.options && props.options.sdks}
                onValueChange={(value) => handleValueChange(value, 'sdk')}
                initialValue={props.query ? props.query['sdk']: null}
            ></SingleValueSelector>
            <SingleValueSelector
                label="Grid Providers"
                options={props.options && props.options.grids}
                onValueChange={(value) => handleValueChange(value, 'grid')}
                initialValue={props.query ? props.query['grid']: null}
            ></SingleValueSelector>
            <SingleValueSelector
                label="Topics"
                options={props.options && props.options.topics}
                onValueChange={(value) => handleValueChange(value, 'topic')}
                initialValue={props.query ? props.query['topic']: null}
            ></SingleValueSelector>
        </div>
    )
}