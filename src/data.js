import './Style/data.css';
import React from "react";

class Data extends React.Component {
    constructor(props) {
        super(props);
        this.json = '';
    }

    displayDetails() {
        if(this.props.Parentjson !== '') {
            let json = '';
            try {
                json = JSON.parse(this.props.Parentjson);
                let item = json.find(e => e.id === this.props.idSelected);
                return <div>{item.type}</div>;
            } catch (error) {
            }
        }
    }

    displayTitle() {
        if(this.props.Parentjson !== '') {
            let json = '';
            try {
                json = JSON.parse(this.props.Parentjson);
                let item = json.find(e => e.id === this.props.idSelected);
                return <h1>{item.name}</h1>;
            } catch (error) {
            }
        }
    }

    render() {
        return (
            <div>
                {this.displayTitle()}
                {this.displayDetails()}
            </div>
        );
    }
}

export default Data;
