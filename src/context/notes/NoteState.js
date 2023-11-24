import { useState } from "react";
import noteContext from "./noteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const notesinitial = []
  const [notes, setnotes] = useState(notesinitial);

  const getNote = async () => {
    try {
      const response = await fetch(`${host}/api/notes/fetchallnotes`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token":
            localStorage.getItem('token'),
        },
      });
  
      if (!response.ok) {
        throw new Error("Failed to fetch notes");
      }
      const jsonData = await response.json();
      console.log(jsonData);
      setnotes(jsonData);
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };
  

  const addNote = async (title, description, tag) => {
    const response = await fetch(
      `${host}/api/notes/addnote`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token":
            localStorage.getItem('token'),
        },
        body: JSON.stringify({title,description,tag}),
      }
    );
    
    const note = await response.json();
    setnotes(notes.concat(note));
  };

  const deleteNote = async (id) => {
    const response = await fetch(
      `${host}/api/notes/deletenote/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token":
            localStorage.getItem('token'),
        }
      }
    );
    const jsonData = await response.json();
    console.log(jsonData);

    console.log("the note is deleting" + id);
    const newnote = notes.filter((note) => {
      return note._id !== id;
    });
    setnotes(newnote);
  };

  const editNote = async (id, title, description, tag) => {
    const response = await fetch(
      `${host}/api/notes/updatenote/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token":
            localStorage.getItem('token'),
        },
        body: JSON.stringify({title,description,tag}),
      }
    );
    
    const jsonData = await response.json();
    console.log(jsonData);

    const newnote=JSON.parse(JSON.stringify(notes))
    for (let index = 0; index < newnote.length; index++) {
      const element = newnote[index];
      if (element._id === id) {
        element.title = title;
        element.description = description;
        element.tag = tag;
        break;
      }
    }
    setnotes(newnote)
  };
  return (
    <noteContext.Provider value={{ notes, addNote, deleteNote, editNote,getNote }}>
      {props.children}
    </noteContext.Provider>
  );
};

export default NoteState;
