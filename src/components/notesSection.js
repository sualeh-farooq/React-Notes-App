import { Button, Card, Modal } from "react-bootstrap"
import { AiFillDelete, AiTwotoneEdit, AiFillEye } from 'react-icons/ai'
import { useState } from "react";
import Form from 'react-bootstrap/Form';
import { doc, addDoc, collection, getDocs } from "firebase/firestore"
import { database } from "../services/firebase";





export default function NotesAdd() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [notes, setNotes] = useState([])


  useState(async () => {
    const querySnapshot = await getDocs(collection(database, "notes"));
    querySnapshot.forEach((doc) => {
      // console.log(doc.id, " => ", doc.data());
      setNotes(doc.data())
    });
  }, [])
  console.log(notes)
  const NotesList = [notes]
  console.log(NotesList)
  let NoteTitle = document.getElementById('note-title')
  let NoteContent = document.getElementById('note-content')
  const AddNote = async () => {
    const docRef = await addDoc(collection(database, "notes"), {
      title: NoteTitle.value,
      content: NoteContent.value
    });
    console.log("Document written with ID: ", docRef.id);

  }
  return (
    <>
      <div className='mt-4 notes-card-parent p-2 d-flex justify-content-center align-self-center border border-white w-75' >
        <h3 className="text-white p-2" >Daily Notes App </h3>
        <div className="mt-4 bg-white p-2" >

          {NotesList.map((val) => {
            return (
              <div key={val.title} >

                <ul>
                  <li className="notes-li" >
                    <div className="d-flex align-items-center justify-content-between">
                      <h5>{val.title}</h5>
                      <div className="d-flex gap-3" >

                        <abbr title="Check Note" >
                          <AiFillEye className="notes-icon" />
                        </abbr>
                        <AiTwotoneEdit className="notes-icon" />
                        <AiFillDelete className="notes-icon" />
                      </div>
                    </div>
                  </li>
                 
                </ul>
              </div>
            )
          })}


          <div>

            <Button onClick={handleShow} className="add-note-btn" type="button" > +  Add Note </Button>
          </div>
        </div>
      </div>


      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title  >Add Your Note</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Note Title</Form.Label>
              <Form.Control id="note-title" type="text" placeholder="Add Your Title of Notes Here" />
            </Form.Group>
            <Form.Group className="mb-3" placeholder="Add Your Note Content Here">
              <Form.Label>Note Content</Form.Label>
              <Form.Control id="note-content" as="textarea" rows={3} />
            </Form.Group>
          </Form>


        </Modal.Body>
        <Modal.Footer>
          <Button className="bg-dark border-0" onClick={handleClose}>
            Close
          </Button>
          <Button className="save-note" onClick={AddNote}>
            Add Note
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}



