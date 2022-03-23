import './Style/captors.css';
import React, {Fragment} from "react";

class Captors extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    displayCaptors() {
        if(this.props.Parentjson !== '') {
            let json = '';
            try {
                json = JSON.parse(this.props.Parentjson);
                return <div>{json.map(e => <Fragment key={e.id}><button onClick={() => this.handleClick(e.id)}>{e.name}</button><br/></Fragment>)}</div>;
            } catch (error) {
                throw new Error("JSON parse error");
            }
        }
    }

    handleClick(id) {
        this.props.getSelected(id);
    }

    render() {
        return (
            <div>
                {this.displayCaptors()}
            </div>
        );
    }
}

export default Captors;
