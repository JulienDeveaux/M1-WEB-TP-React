import styles from './Style/data.module.css';
import React, {Fragment} from "react";

class Data extends React.Component {
    constructor(props) {
        super(props);
    }

    displayType() {
        if(this.props.Parentjson !== '' && this.props.Parentjson !== undefined) {
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
        if(this.props.Parentjson !== '' && this.props.Parentjson !== undefined) {
            let json = '';
            try {
                json = JSON.parse(this.props.Parentjson);
                let item = json.find(e => e.id === this.props.idSelected);
                return <h1 className={styles.title}>{item.name}</h1>;
            } catch (error) {
            }
        }
    }

    displayArray() {
        if(this.props.Parentjson !== '' && this.props.Parentjson !== undefined) {
            let json = '';
            try {
                json = JSON.parse(this.props.Parentjson);
                let item = json.find(e => e.id === this.props.idSelected);
                if(item.data.hasOwnProperty("value")) {
                    if(item.type === "DOOR") {
                        if(item.data.value === 1) {
                            return <img className={styles.imageBig} src="/ressources/door_OPEN.png" alt="OPEN"/>
                        } else {
                            return <img className={styles.imageBig} src="/ressources/door_CLOSED.png" alt="CLOSED"/>
                        }
                    } else if(item.type === "LIGHT") {
                        if(item.data.value === 1) {
                            return <img className={styles.image} src="/ressources/lightbulb_ON.png" alt="ON"/>
                        } else {
                            return <img className={styles.image} src="/ressources/lightbulb_OFF.png" alt="OFF"/>
                        }
                    } else if(item.type === "SWITCH") {
                        if(item.data.value === 1) {
                            return <img className={styles.image} src="/ressources/switch_ON.png" alt="ON"/>
                        } else {
                            return <img className={styles.image} src="/ressources/switch_OFF.png" alt="OFF"/>
                        }
                    } else {
                        return <h3>Status : {item.data.value}</h3>;
                    }
                } else {
                    let myFormatedData = [];
                    let id = 0;
                    for(let i = item.data.values.length-1; i >= 0; i--) {
                        let theLabel = new Date(item.data.labels[i]).toUTCString();
                        if(theLabel.normalize() === "Invalid Date".normalize()) {
                            theLabel = item.data.labels[i];
                        }
                        myFormatedData[id] = ({
                            id: id,
                            label: theLabel,
                            data: item.data.values[i]
                        });
                        if (item.type === "HUMIDITY") {
                            myFormatedData[id].data = item.data.values[i] + "%"
                        } else if(item.type === "TEMPERATURE") {
                            myFormatedData[id].data = item.data.values[i] + "°"
                        } else if(item.type === "FAN_SPEED") {
                            myFormatedData[id].data = item.data.values[i] + "rpm"
                        }
                        id++;
                    }
                    return <Fragment><h3>Valeur Actuelle : {myFormatedData[0].data}</h3>
                        <table className={styles.array} id="table"><tbody>
                        <tr><th className={`${styles.cellTitle} ${styles.cell}`}>labels</th><th className={`${styles.cellTitle} ${styles.cell}`}>data</th></tr>
                        {myFormatedData.map(e => <tr key={e.id}><th className={styles.cell}>{e.label || "no label"}</th><th className={styles.cell}>{e.data}</th></tr>)}
                        </tbody></table></Fragment>;
                }
            } catch (error) {
            }
        }
    }

    render() {
        return (
            <div className={this.props.hasStyle === true ? styles.dataSide : ""}>
                {this.displayTitle()}
                {this.displayType()}
                {this.displayArray()}
            </div>
        );
    }
}

export default Data;
