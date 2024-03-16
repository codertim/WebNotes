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

    selectedNewCategory() {
        console.log("##### selected new category");
        const modalEl = document.querySelector("[data-modal]");
        console.log("Notes#selectedNewCategory - modalEl:", modalEl);
        modalEl.showModal();
        const dialogCloseEl = document.querySelector("[data-modal-close]");
        console.log("Notes#selectedNewCategory - dialogCloseEl:", dialogCloseEl);

        dialogCloseEl.addEventListener("click", () => {
            console.log("Notes#selectedNewCategory - click evt listener - closing modal");
            modalEl.close();
        });

        // check if user clicks outside popup - close when they do
        modalEl.addEventListener("click", e => {
            const dimensions = modalEl.getBoundingClientRect();
            if (
                e.clientX < dimensions.left ||
                e.clientX > dimensions.right ||
                e.clientY < dimensions.top ||
                e.clientY > dimensions.bottom
            ) {
                modalEl.close();
            }
        });
    }

    render() {
        var self = this;

        return (
            <div id="notes">
                <h2>Web Notes</h2>
                <dialog data-modal class="my-modal">
                    <form method="dialog">
                        <input type="text" id="new-group-text" />
                        <button type="submit" data-cancel-modal style={{marginLeft: '2em', padding: '0.5 em'}}>Cancel</button>
                        <button type="submit" data-modal-close style={{marginLeft: '1em', padding: '0.5 em'}}>Go</button>
                    </form>
                </dialog>
                <div id="category-container">
                    <select id="notes-category" style={styleDropDown}
                        ref={
                            function(el) {
                                self._categoryDropDown = el;
                            }
                        }>
                        <option>Select category</option>
                        <option>default</option>
                        <option onClick={this.selectedNewCategory}>(New)</option>
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

const styleDropDown = {
    marginBottom: 12,
    marginTop: 12
};

export default Notes;

