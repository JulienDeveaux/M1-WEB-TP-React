import styles from './Style/App.module.css';
import Captors from './captors';
import Data from './data';
import FetchData from './fetchData';
import React, {Fragment} from "react";

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
        try {
            const res = await fetch(url).catch(() => {});
            let json = res.ok ? await res.text() : "";
            this.setState({json: json});
        } catch(error) {

        }
    }

    getSelected(id) {
        this.setState({idSelected: id});
    }

    render() {
        return (
            <Fragment>
                <FetchData getJson={this.getJson}/>
                <div className={styles.sideBySide}>
                    <Captors Parentjson={this.state.json} getSelected={this.getSelected}/>
                    {this.state.idSelected !== null ? <Data Parentjson={this.state.json} idSelected={this.state.idSelected}/> : ""}
                </div>
            </Fragment>
        );
    }
}

export default App;
