import './Style/App.css';
import Captors from './captors';
import Data from './data';
import FetchData from './fetchData';
import React from "react";
import {BrowserRouter} from "react-router-dom";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {json: ''};
        this.getJson = this.getJson.bind(this);
    }

    async getJson(url) {
        const res = await fetch(url).catch(() => {});
        let json = res.ok ? await res.text() : "";
        this.setState({json: json});
    }

    render() {
        return (
            <BrowserRouter>
                <FetchData getJson={this.getJson}/>
                <Captors Parentjson={this.state.json}/>
                <Data/>
            </BrowserRouter>
        )
    }
}

export default App;
