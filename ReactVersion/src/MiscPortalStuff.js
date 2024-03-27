import React from "react";
import ReactDOM from "react-dom";


class MiscPortalStuff extends React.Component {
    constructor(props) {
        super(props);
        console.log("##### MiscPortalStuff#constructor - starting ...");
        this.el = document.getElementById("main-heading");
    }

    render() {
        //let heading = document.querySelector("h2");
        console.log("##### MiscPortalStuff#render - heading:", this.el);

        return ReactDOM.createPortal(
            <h2>Your Web Notes</h2>,
            this.el
        );
    }
}

export default MiscPortalStuff;
