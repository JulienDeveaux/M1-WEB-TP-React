import './Style/App.css';
import Captors from './captors';
import Data from './data';
import FetchData from './fetchData';
import React from "react";
import {BrowserRouter} from "react-router-dom";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.handleJson = this.handleJson.bind(this);
    }

    handleJson(json) {
        this.setState({json: json});
        console.log(json);
    }

    render() {
        return (
            <BrowserRouter>
                <FetchData getJson={this.handleJson}/>
                <Captors/>
                <Data/>
            </BrowserRouter>
        )
    }
}

export default App;
