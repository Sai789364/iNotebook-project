import React, { useContext, useEffect, useRef , useState } from "react";
import noteContext from "../context/notes/noteContext";
import Noteitem from "./Noteitem";
import Addnote from "./Addnote";
import { useNavigate} from "react-router-dom"

const Note = () => {
  const context = useContext(noteContext);
  const { notes, getNote, loading , editNote } = context;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      if (localStorage.getItem('token')) {
        await getNote();
      } else {
        navigate('/login');
      }
    };
    fetchData();
  }, [getNote, navigate]);

  const ref = useRef(null);
  const refclose = useRef(null);
  const [note,setnote]=useState({id:"",etitle:"",edescription:"",etag:""})

  const updatenote = (currentnote) => {
    ref.current.click();
    setnote({id:currentnote._id , etitle:currentnote.title , edescription:currentnote.description , etag:currentnote.tag})
  };

  const handleclick=(e)=>{
    console.log("Updating the note",note)
    editNote(note.id,note.etitle,note.edescription,note.etag)
    refclose.current.click()
}

const onchange=(e)=>{
    setnote({...note,[e.target.name]:e.target.value})
}

  return (
    <>
      <Addnote />
      <button
        ref={ref}
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Launch demo modal
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Edit Note
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="etitle" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etitle"
                    name="etitle"
                    value={note.etitle}
                    onChange={onchange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="edescription" className="form-label">
                    Description
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="edescription"
                    name="edescription"
                    value={note.edescription}
                    onChange={onchange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="etag" className="form-label">
                    Tag
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etag"
                    name="etag"
                    value={note.etag}
                    onChange={onchange}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                ref={refclose}
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="button" className="btn btn-primary" onClick={handleclick}>
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="row my-3">
        <h2>Your notes</h2>
        {loading ? (
          <p>Loading...</p>
        ) : (
          notes.map((note) => (
            <Noteitem key={note._id} updatenote={updatenote} note={note} />
          ))
        )}
      </div>
    </>
  );
};

export default Note;
