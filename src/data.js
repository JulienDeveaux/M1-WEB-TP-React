import './Style/data.css';
import React from "react";

class Data extends React.Component {
    constructor(props) {
        super(props);
    }

    displayType() {
        if(this.props.Parentjson !== '') {
            let json = '';
            try {
                json = JSON.parse(this.props.Parentjson);
                let item = json.find(e => e.id === this.props.idSelected);
                return <h2>Type : {item.type}</h2>;
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

    displayArray() {
        if(this.props.Parentjson !== '') {
            let json = '';
            try {
                json = JSON.parse(this.props.Parentjson);
                console.log(json)
                let item = json.find(e => e.id === this.props.idSelected);
                if(item.data.hasOwnProperty("value")) {
                    let status = "";
                    if(item.type === "DOOR") {
                        status = item.data.value === 1 ? "OPEN" : "CLOSED";
                    } else if(item.type === "SWITCH" || item.type === "LIGHT") {
                        status = item.data.value === 1 ? "ON" : "OFF";
                    }
                    return <h2>Status : {status}</h2>
                } else {
                    let myFormatedData = [];
                    let id = 0;
                    for(let i = 0; i < item.data.values.length; i++) {
                        myFormatedData[i] = ({
                            id: id,
                            label: item.data.labels[i],
                            data: item.data.values[i]
                        });
                        if (item.type === "HUMIDITY") {
                            myFormatedData[i].data = item.data.values[i] + "%"
                        } else if(item.type === "TEMPERATURE") {
                            myFormatedData[i].data = item.data.values[i] + "°"
                        } else if(item.type === "FAN_SPEED") {
                            myFormatedData[i].data = item.data.values[i] + "rpm"
                        }
                        id++;
                    }
                    return <table><tbody>
                    {myFormatedData.map(e => <tr key={e.id}><th>{e.label}</th><th>{e.data}</th></tr>)}
                    </tbody></table>;
                }
            } catch (error) {
            }
        }
    }

    render() {
        return (
            <div>
                {this.displayTitle()}
                {this.displayType()}
                {this.displayArray()}
            </div>
        );
    }
}

export default Data;
