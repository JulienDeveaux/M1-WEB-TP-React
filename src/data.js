import styles from './Style/data.module.css';
import React, {Fragment} from "react";

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
                let item = json.find(e => e.id === this.props.idSelected);
                if(item.data.hasOwnProperty("value")) {
                    let status = "";
                    if(item.type === "DOOR") {
                        status = item.data.value === 1 ? "OPEN" : "CLOSED";
                    } else if(item.type === "SWITCH" || item.type === "LIGHT") {
                        status = item.data.value === 1 ? "💡" : "OFF";
                    } else {
                        status = item.data.value;
                    }
                    return <h2>Status : {status}</h2>
                } else {
                    let myFormatedData = [];
                    let id = 0;
                    for(let i = 0; i < item.data.values.length; i++) {
                        let theLabel = new Date(item.data.labels[i]).toUTCString();
                        if(theLabel.normalize() === "Invalid Date".normalize()) {
                            theLabel = item.data.labels[i];
                        }
                        myFormatedData[i] = ({
                            id: id,
                            label: theLabel,
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
                    return <Fragment><h2>Valeur Actuelle : {myFormatedData[0].data}</h2>
                        <table className={styles.array}><tbody>
                        <tr><th className={styles.cell}>labels</th><th className={styles.cell}>data</th></tr>
                        {myFormatedData.map(e => <tr key={e.id}><th className={styles.cell}>{e.label || "no label"}</th><th className={styles.cell}>{e.data}</th></tr>)}
                        </tbody></table></Fragment>;
                }
            } catch (error) {
            }
        }
    }

    render() {
        return (
            <Fragment>
                {this.displayTitle()}
                {this.displayType()}
                {this.displayArray()}
            </Fragment>
        );
    }
}

export default Data;
