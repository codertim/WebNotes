import React from "react";


class Notes extends React.Component {
    constructor(props) {
        super(props);

        this.updateNotes = this.updateNotes.bind(this);

        this.state = {
            notes: "test"
        };

        this.selectedCategory = this.selectedCategory.bind(this);
        this.selectedNewCategory = this.selectedNewCategory.bind(this);
    }

    componentDidMount() {
        if (typeof(Storage) !== "undefined") {
            console.log("Notes#componentDidMount - storage supported");
            const storageNotes = window.localStorage.getItem("notes");
            console.log("Notes#componentDidMount - storageNotes: ", storageNotes);

            // check if there were previous notes in local storage
            if (storageNotes) {
                console.log("Notes#componentDidMount - notes found in local storage");
                const notesParsed = JSON.parse(storageNotes);
                console.log("Notes#componentDidMount - notesParsed = ", notesParsed);
                const defaultNotes = notesParsed['default'];
                console.log("Notes#componentDidMount - defaultNotes = ", defaultNotes);
                console.log("Notes#componentDidMount - typsof defaultNotes = ", typeof(defaultNotes));

                if (defaultNotes != undefined) {
                    console.log("Notes#componentDidMount - default notes are NOT undefined");
                    this.setState({notes: defaultNotes});
                } else {
                    console.log("Notes#componentDidMount - setting notes to empty string");
                    this.setState({notes: ''}, () => {
                        console.log("Notes#componentDidMount - set notes to:", this.state.notes);
                    });
                }

                console.log("Notes#componentDidMount - this.state.notes:", this.state.notes);
                ///this._textArea.value = defaultNotes;
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

    selectedCategory() {
        console.log("##### selectedCategory - starting");
        const catSelectorEl = document.getElementById("notes-category");
        const selectedCat = catSelectorEl.value;
        console.log("##### selectedCategory - selectedCat = ", selectedCat);

        if (selectedCat === "select-category") {
            console.log("##### selectedCategory - setting notes to empty");
            this.setState({notes: ''});
            this._textArea.value = "";
            return;
        }

        if (selectedCat === "new-category") {
            this.selectedNewCategory();
            return;   // NOTE: early return
        }
    }

    selectedNewCategory() {
        console.log("##### selectedNewCategory - starting");
        const modalEl = document.querySelector("[data-modal]");
        console.log("Notes#selectedNewCategory - modalEl:", modalEl);
        modalEl.showModal();
        const dialogAddCategory = document.querySelector("[data-modal-new]");
        console.log("Notes#selectedNewCategory - dialogAddCategory:", dialogAddCategory);

        dialogAddCategory.addEventListener("click", () => {
            console.log("Notes#selectedNewCategory - click evt listener - adding new category");
            // TODO: get new category frmo text field and add it
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
                <dialog data-modal className="my-modal">
                    <form method="dialog">
                        <input type="text" id="new-group-text" />
                        <button type="submit" data-cancel-modal style={{marginLeft: '2em', padding: '0.5 em'}}>Cancel</button>
                        <button type="submit" data-modal-new style={{marginLeft: '1em', padding: '0.5 em'}}>Go</button>
                    </form>
                </dialog>
                <div id="category-container">
                    <select id="notes-category" style={styleDropDown} onChange={this.selectedCategory}
                        ref={
                            function(el) {
                                self._categoryDropDown = el;
                            }
                        }>
                        <option value="select-category">Select category</option>
                        <option value="default">default</option>
                        <option value="new-category" onClick={this.selectedNewCategory}>(New)</option>
                    </select>
                </div>
                <textarea id="msg-text-area" rows="10" cols="50"
                          style={ {backgroundColor: '#72bcd4'} }
                          defaultValue={this.state.notes}
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

