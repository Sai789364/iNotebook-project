import React, { useContext, useState } from "react";
import noteContext from "../context/notes/noteContext";
const Addnote = () => {
    const context=useContext(noteContext);
    const {addNote}=context;


    const [note,setnote]=useState({title:"",description:"",tag:""})
    const handleclick=(e)=>{
        e.preventDefault();
        addNote(note.title,note.description,note.tag)
        setnote({title:"",description:"",tag:""})
    }

    const onchange=(e)=>{
        setnote({...note,[e.target.name]:e.target.value})
    }
  return (
    <div className="container my-3">
        <h2>Add a note</h2>
        <form>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              value={note.title}
              onChange={onchange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <input
              type="text"
              className="form-control"
              id="description"
              name="description"
              value={note.description}
              onChange={onchange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="tag" className="form-label">
              Tag
            </label>
            <input
              type="text"
              className="form-control"
              id="tag"
              name="tag"
              value={note.tag}
              onChange={onchange}
            />
          </div>
          <button type="submit" className="btn btn-primary" onClick={handleclick}>
            Add Note
          </button>
        </form>
      </div>
  )
}

export default Addnote
