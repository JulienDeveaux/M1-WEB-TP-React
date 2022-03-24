import './Style/App.css';
import Captors from './captors';
import Data from './data';
import FetchData from './fetchData';
import React from "react";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            json: '',
            idSelected: null
        };
        this.getJson = this.getJson.bind(this);
        this.getSelected = this.getSelected.bind(this);
    }

    async getJson(url) {
        const res = await fetch(url).catch(() => {});
        let json = res.ok ? await res.text() : "";
        this.setState({json: json});
    }

    getSelected(id) {
        this.setState({idSelected: id});
    }

    render() {
        return (
            <div>
                <FetchData getJson={this.getJson}/>
                <Captors Parentjson={this.state.json} getSelected={this.getSelected}/>
                <Data Parentjson={this.state.json} idSelected={this.state.idSelected}/>
            </div>
        );
    }
}

export default App;
