import './Style/fetchData.css';
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
            <div>
                <input value={this.state.url} onChange={this.handleChange} />
            </div>
        );
    }
}

export default FetchData;
