import styles from './Style/captors.module.css';
import React, {Fragment} from "react";
import {BrowserRouter, Link, Route, Routes} from "react-router-dom";
import Data from "./data";

class Captors extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.selectedId = undefined;
    }

    displayCaptors() {
        if(this.props.Parentjson !== '' && this.props.Parentjson !== undefined) {
            let json = '';
            try {
                json = JSON.parse(this.props.Parentjson);
                return <Fragment>{json.map(
                    e => <Fragment key={e.id}>
                        <Link to={e.name.replace(/ /g, '-').replace(/[^\w-]+/g, '')} className={this.selectedId === e.id ? styles.selectedLink: styles.link} onClick={() => this.handleClick(e.id)}>{e.name}</Link>
                        <br/></Fragment>
                )}</Fragment>;
            } catch (error) {
            }
        }
    }

    handleClick(id) {
        this.props.getSelected(id);
        this.selectedId = id;
    }

    getRoutes() {
        if(this.props.Parentjson !== '' && this.props.Parentjson !== undefined) {
            let json = '';
            try {
                json = JSON.parse(this.props.Parentjson);
                return <Routes>{json.map(
                    e => <Route key={e.id} path={e.name.replace(/ /g, '-').replace(/[^\w-]+/g, '')} element={this.selectedId !== undefined ? <Data hasStyle={false}/> : ""}/>
                )}</Routes>;
            } catch (error) {
            }
        }
    }

    render() {
        return (
            <BrowserRouter>
                {this.getRoutes()}
                <div className={styles.captorSide}>
                {this.displayCaptors()}
                </div>
            </BrowserRouter>
        );
    }
}

export default Captors;
