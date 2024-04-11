import { useEffect, useRef, useState } from 'react';


function Notes() {
    let currentlySelectedCategory = 'default';
    const [customCategories, setCustomCategories] = useState(Array(0));
    const [notes, setNotes] = useState("test");
    let initialNotes = "";
    const categoryDropDownEl = useRef(null);
    const _textAreaEl = useRef(null);
    const newGroupTextEl = useRef(null);
    const notesCategoryEl = useRef(null);
    const modalEl = useRef(null);


    setTimeout(() => {
        console.log("Notes - currentlySelectedCategory:", currentlySelectedCategory);
    }
    , 2000);

    const loadStorageData = () => {
        console.log("##### Notes#loadStorageData - starting");
        let initNotes = 'TEST';

        ///componentDidMount() {
        if (typeof(Storage) !== "undefined") {
            console.log("Notes#loadStorageData - storage supported");
            const storageNotesStr = window.localStorage.getItem("notes");
            console.log("Notes#loadStorageData - storageNotes: ", storageNotesStr);

            // check if there were previous notes in local storage
            if (storageNotesStr) {
                console.log("Notes#loadStorageData - notes found in local storage");
                const storageNotes = JSON.parse(storageNotesStr);
                console.log("Notes#loadStorageData - storageNotes object = ", storageNotes);

                const defaultNotes = storageNotes['default'];
                console.log("Notes#loadStorageData - defaultNotes = ", defaultNotes);
                console.log("Notes#loadStorageData - typeof defaultNotes = ", typeof(defaultNotes));

                setTimeout(() => {
                    console.log("Notes#loadStorageData - setTimeout - this.state.notes:", notes);
                }, 3000);

                if (defaultNotes != undefined) {
                    console.log("Notes#loadStorageData - default notes are NOT undefined");
                    //this.setState({notes: defaultNotes});
                    initNotes = defaultNotes;
                } else {
                    console.log("Notes#loadStorageData - setting notes to empty string");
                    //this.setState({notes: ''}, () => {
                    //    console.log("Notes#componentDidMount - set notes to:", this.state.notes)
                    //});;
                    initNotes = '';
                }

                console.log("Notes#loadStorageData - this.state.notes:", notes);
                initialNotes = initNotes;
            }
        } else {
            console.log("Notes#v - storage NOT supported");
            alert("storage not supported");
        }

        return initNotes;
    };

    initialNotes = loadStorageData();

    const myComponentDidMount = () => {
        console.log("##### Notes#componentDidMount - starting ...");
        (notesCategoryEl.current as any).value = currentlySelectedCategory;
        if(initialNotes) {
            setNotes(initialNotes);                    //this.setState({notes: defaultNotes});
        } else {
            setNotes('');
            console.log("Notes#componentDidMount - set notes to:", notes);
        }

        // user-defined custom categories
        const storageNotesStr = window.localStorage.getItem("notes");
        console.log("Notes#componentDidMount - storageNotes: ", storageNotesStr);
        const storageNotes = JSON.parse(storageNotesStr || '');
        console.log("Notes#componentDidMount - storageNotes object = ", storageNotes);
        const notesKeys = Object.keys(storageNotes);
        console.log("Notes#componentDidMount - notesKeys:", notesKeys);
        const customCats = notesKeys.filter((k) => k !== 'default');
        console.log("Notes#componentDidMount - customCatss:", customCats);
        if (customCats) {
            setCustomCategories(customCats);
        }
    };

    // note: useEffect with empty array means it only runs once
    useEffect(myComponentDidMount, []);

    const getNotesObjectFromLocalStorage = (storageKey = "notes") => {
        let notesObject: any = {};
        const storageNotesString = window.localStorage.getItem(storageKey);   // TODO: create global string for Notes
        console.log("Notes#getNotesObjectFromLocalStorage - storageNotesString:", storageNotesString);

        if (storageNotesString) {
            notesObject = JSON.parse(storageNotesString || '');
        }

        return notesObject;
    };

    const updateNotes = () => {
        console.log("updateNotes - starting ...");
        ///const notesToSave = this.state.notes;
        const noteToSave = (_textAreaEl.current as any).value;
        ///const categoryToSave = document.getElementById("notes-category").value;
        const categoryToSave: string = (notesCategoryEl.current as any).value || '';
        console.log("updateNotes - categoryToSave:", `|${categoryToSave}|`);
        let notesObject: Object = getNotesObjectFromLocalStorage();
        //const notesObject = { [categoryToSave]: noteToSave};  TODO: remove when working
        console.log("##### updateNOtes - notesObject:", notesObject);
        notesObject[categoryToSave as keyof typeof notesObject] = noteToSave;
        const notesStringified = JSON.stringify(notesObject);
        console.log("updateNotes - notesStringified:", notesStringified);
        window.localStorage.setItem("notes", notesStringified);
        (_textAreaEl.current as any).value = noteToSave;

        // animation
        console.log("updateNotes - animating ....");
        ///document.getElementById('msg-text-area').classList.add('changecolor');
        (_textAreaEl.current as any).classList.add('changecolor');
        console.log("##### Notes#updateNOtes - _textAreaEl:", _textAreaEl);
        setTimeout(() => {
            console.log("running setTimeout");
            /// TODO: change this document.getElementById('msg-text-area').classList.remove('changecolor');
          }, 5000);
          
    };

    const selectCategory = () => {
        console.log("##### selectCategory - starting");
        ///const catSelectorEl = document.getElementById("notes-category");
        ///const selectedCat = catSelectorEl.value;
        const selectedCat = (notesCategoryEl?.current as any).value;
        console.log("##### selectCategory - selectedCat = |" + selectedCat + "|");
        currentlySelectedCategory = selectedCat || '';   // TODO: need global default

        if (selectedCat === "select-category") {
            console.log("##### selectCategory - setting notes to empty");
            setNotes('');
            (_textAreaEl.current as any).value = '';
            return;
        }

        if (selectedCat === "new-category") {
            selectedNewCategory();
            return;   // NOTE: early return
        }

        const notesStorageStr = window.localStorage['notes'];
        console.log("##### selectCategory - notesStorageStr:", notesStorageStr);
        let notesStorageObj = null;
        if (notesStorageStr) {
            notesStorageObj = JSON.parse(notesStorageStr);
        } else {
            console.log("##### Notes#seletCategory - 'notes' key NOT in local storage");
        }

        console.log("##### selectCategory - notesStorageObj:", notesStorageObj);
        let selectedNotes = '';
        if (notesStorageObj) {
            selectedNotes = notesStorageObj[String(selectedCat)];
            console.log("##### selectCategory - selectedNotes from storage:", selectedNotes);
            if(selectedNotes === undefined) {
                console.log("##### selectCategory - setting notes to empty string");
                selectedNotes = "";
            }
        }

        setNotes(selectedNotes);
        (_textAreaEl.current as any).value = selectedNotes || '';
    };

    const selectedNewCategory = () =>{
        console.log("##### selectedNewCategory - starting");
        const modalEl = document.querySelector("[data-modal]");
        console.log("Notes#selectedNewCategory - modalEl:", modalEl);
        (modalEl as HTMLDialogElement).showModal();
        const dialogAddCategoryEl = document.querySelector("[data-modal-new]");
        console.log("Notes#selectedNewCategory - dialogAddCategoryEk:", dialogAddCategoryEl);

        (dialogAddCategoryEl as HTMLElement).addEventListener("click", () => {
            console.log("Notes#selectedNewCategory - click evt listener - adding new category");
            ///const newCat = document.getElementById('new-group-text').value;
            const newCat = (newGroupTextEl.current as any).value;
            console.log("Notes#selectedNewCategory - click evt listener - new category:", newCat);
            console.log("##### selectedNewCategory - this.state.customCategories:", customCategories);

            if (customCategories.find(k => k == newCat)) {
                // already exists
                console.log("##### selectedNewCategory - new category already exists");
            } else {
                // new category does not yet exists so ok to add
                (_textAreaEl as any).value = '';
                const allCats = [...customCategories, newCat];
                console.log("##### selectedNewCategory - updated allCats:", allCats);
                setCustomCategories(allCats);
                currentlySelectedCategory = newCat;
                console.log("##### selectedNewCategory - currentlySelectedCatgory:", currentlySelectedCategory);
            }
            (modalEl as HTMLDialogElement).close();
        });

        // check if user clicks outside popup - close when they do
        (modalEl as HTMLElement).addEventListener("click", e => {
            const dimensions = (modalEl as HTMLElement).getBoundingClientRect();
            if (
                e.clientX < dimensions.left ||
                e.clientX > dimensions.right ||
                e.clientY < dimensions.top ||
                e.clientY > dimensions.bottom
            ) {
                (modalEl as HTMLDialogElement).close();
            }
        });
    };

    const validateNoteText = () => {
        console.log("##### validateNoteText - starting ...");
        if ((newGroupTextEl.current as any).value.length < 2) {
            console.log("##### validateNoteText - setting error message");
            (newGroupTextEl.current as any).setCustomValidity("Need at least two characters");
        } else {
            console.log("##### validateNoteText - validation ok");
            (newGroupTextEl.current as any).setCustomValidity("");
        }
    };

    const componentDidUpdate = () => {
        console.log("##### componentDidUpdate - starting  - this.currentlySelectedCategory:", currentlySelectedCategory);
        (notesCategoryEl as any).value = currentlySelectedCategory;
    };

        ///var self = this;
        if (notesCategoryEl) {
            console.log("##### Notes#render - this.notesCategoryEl.value:", (notesCategoryEl as any).value);
        }
        const customCats = customCategories;
        console.log("##### Notes#render - customCategories:", customCats);
        const customCategoryOptions = customCats.map((cat) =>
            <option value={cat} key={cat}>{cat}</option>
        );
        console.log("##### Notes#render - customCategoryOptions:", customCategoryOptions);

    return (

            <div id="notes" style={{display: 'flex', flexDirection: 'column'}}>
                <dialog data-modal className="my-modal" ref={modalEl}>
                    {/* popup for adding a new note category */}
                    <form method="dialog">
                        <label>New category:</label>
                        <input type="text" id="new-group-text" onInput={validateNoteText} ref={newGroupTextEl} required />
                        <button type="submit" data-cancel-modal style={{marginLeft: '2em', paddingLeft: '5 em'}}>Cancel</button>
                        <button type="submit" data-modal-new style={{marginLeft: '1em', paddingLeft: '5 em'}}>Go</button>
                    </form>
                </dialog>
                <div id="category-container">
                    <select id="notes-category" ref={notesCategoryEl} style={styleDropDown} onChange={selectCategory}
                        data-delete-ref={categoryDropDownEl}>
                        <option value="select-category">Select category</option>
                        <option value="default">default</option>
                        {/* user-defined categories */}
                        {customCategoryOptions}
                        <option value="new-category" onClick={selectedNewCategory}>(New)</option>
                    </select>
                </div>
                <textarea id="msg-text-area" ref={_textAreaEl} rows={10} cols={50}
                          style={ {backgroundColor: '#72bcd4'} }
                          defaultValue={initialNotes}
                          ></textarea>
                <div>
                    <button type="button" style={{margin: '1rem'}} className="hover:bg-blue-400 border-slate-200 h-10 px-6 bg-orange shadow rounded text-red w-56" onClick={updateNotes}>Update</button>
                </div>
            </div>
    );
}


const styleDropDown = {
    marginBottom: 12,
    marginTop: 12
};

export default Notes;

