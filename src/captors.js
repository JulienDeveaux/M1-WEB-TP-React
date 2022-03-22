import './Style/captors.css';
import React, {Fragment} from "react";

class Captors extends React.Component {
    constructor(props) {
        super(props);
    }

    displayCaptors() {
        if(this.props.Parentjson !== '') {
            let json = '';
            try {
                json = JSON.parse(this.props.Parentjson);

                return <div>
                    {json.map(e => <Fragment key={e.id}><button>{e.name}</button><br/></Fragment>)}
                </div>
            } catch (error) {

            }
        }
    }

    render() {
        return (
            <div>
                {this.displayCaptors()}
            </div>
        )
    }
}

export default Captors;
