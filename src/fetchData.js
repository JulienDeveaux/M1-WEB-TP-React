import styles from './Style/fetchData.module.css';
import React from "react";

class FetchData extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            url: `/data.json`
        };
        this.handleChange = this.handleChange.bind(this);
        this.props.getJson(this.state.url);
    }

    handleChange(event) {
        this.setState({url: event.target.value});
        this.props.getJson(event.target.value);
    }

    render()
    {
        return (
            <div className={styles.txtInput}>
                <p>URL :</p>&nbsp;<input value={this.state.url} onChange={this.handleChange} />
                <br/>
            </div>
        );
    }
}

export default FetchData;
