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
                const notesParsed = JSON.parse(storageNotes);
                console.log("Notes#componentDidMount - notesParsed = ", notesParsed);
                const defaultNotes = notesParsed['default'];
                console.log("Notes#componentDidMount - defaultNotes = ", defaultNotes);
                this.setState({notes: defaultNotes});
                this._textArea.value = defaultNotes;
                this._categoryDropDown.value = "default";
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
        const categoryToSave = document.getElementById("notes-category").value;
        console.log("updateNotes - categoryToSave:", `|${categoryToSave}|`);
        const notesObject = { [categoryToSave]: notesToSave};
        const notesStringified = JSON.stringify(notesObject);
        console.log("updateNotes - notesStringified:", notesStringified);
        window.localStorage.setItem("notes", notesStringified);
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
                <div id="category-container">
                    <select id="notes-category"
                        ref={
                            function(el) {
                                self._categoryDropDown = el;
                            }
                        }>
                        <option>Select category</option>
                        <option>default</option>
                    </select>
                </div>
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

