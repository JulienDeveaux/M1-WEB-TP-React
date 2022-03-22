import './Style/fetchData.css';
import React from "react";

class FetchData extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            url: `/data.json`,
            json: '',
            click: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.click = this.click.bind(this)
    }

    click() {
        this.setState({click: true});
    }

    handleChange(event) {
        this.setState({url: event.target.value});
    }

    async componentDidUpdate(prevProps, prevState) {
        if(prevState.url !== this.state.url || this.state.click) {
            this.state.click = false
            const res = await fetch(this.state.url);
            this.state.json = res.ok ? await res.json() : "";
            this.props.getJson(this.state.json);
        }
    }

    render()
    {
        return (
            <div>
                <input value={this.state.url} onChange={this.handleChange} />
                <button onClick={this.click}>Update Data</button>
            </div>
        )
    }
}

export default FetchData;
