import React from "react";


class Notes extends React.Component {
    constructor(props) {
        super(props);

        this.updateNotes = this.updateNotes.bind(this);

        this.state = {
            notes: "test"
        };

 
    }

    componentDidMount() {
        if (typeof(Storage) !== "undefined") {
            console.log("Notes#componentDidMount - storage supported");
            const storageNotes = window.localStorage.getItem("notes");
            console.log("Notes#componentDidMount - storageNotes: ", storageNotes);
            if (storageNotes) {
                this.setState({notes: storageNotes});
                this._textArea.value = storageNotes;
            }
        } else {
            console.log("Notes#componentDidMount - storage NOT supported");
            alert("storage not supported");
        }
    }

    updateNotes() {
        console.log("updateNotes - starting ...");
        ///const notesToSave = this.state.notes;
        const notesToSave = this._textArea.value;
        window.localStorage.setItem("notes", notesToSave);
        this._textArea.value = notesToSave;

        // animation
        console.log("updateNotes - animating ....");
        document.getElementById('msg-text-area').classList.add('changecolor');
        setTimeout(() => {
            console.log("running setTimeout");
            document.getElementById('msg-text-area').classList.remove('changecolor');
          }, "5000")
          
    }

    render() {
        var self = this;

        return (
            <div id="notes">
                <h2>Notes</h2>
                <textarea id="msg-text-area" rows="10" cols="50" defaultValue={this.state.notes}
                          style={ {backgroundColor: '#72bcd4'} }
                          ref={
                              function(el) {
                                  self._textArea = el;
                              }
                          }></textarea>
                <div>
                    <button type="button" onClick={this.updateNotes}>Update</button>
                </div>
            </div>
        );
    }
}

export default Notes;

