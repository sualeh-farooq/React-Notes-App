import { Button, Modal } from "react-bootstrap"
import { AiFillDelete, AiTwotoneEdit, AiFillEye } from 'react-icons/ai'
import { useState, useEffect } from "react";
import Form from 'react-bootstrap/Form';
import { doc, addDoc, collection, getDocs, deleteDoc, query, onSnapshot, where, updateDoc } from "firebase/firestore"
import { database } from "../services/firebase";
import Swal from "sweetalert2";

export default function NotesComponent() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [info, setInfo] = useState([])
  const [ids, setIds] = useState([])
  const [title, setTitle] = useState('')
  const [data, setData] = useState('')
  const [viewNotes, setViewNotes] = useState(false)
  const viewNotesClose = () => setViewNotes(false)
  const viewNotesOpen = () => setViewNotes(true)
  const [viewNoteData, setViewNoteData] = useState([])
  const [isLoading, setLoading] = useState(false)
  const [updatedTitle, setUpdatedTitle] = useState('')
  const [updatedContent, setUpdatedContent] = useState('')
  const [updateModal, setUpdateModal] = useState(false)
  const ToggleUpdateModal = () => setUpdateModal(!updateModal)

  useEffect(() => {
    getData()
  }, [])

  const CheckDocument = async (title) => {
    const databaseRef = collection(database, 'notes');
    const querySnapshot = await getDocs(query(databaseRef, where("title", "==", title)));
    const dataInfo = [];
    querySnapshot.forEach(async (doc) => {
      const docId = doc.id;
      const docData = doc.data();
      dataInfo.push(doc.data())
    });
    setViewNoteData(dataInfo)
    console.log(viewNotes)
  };


  const deleteDocument = async (title) => {
    const databaseRef = collection(database, 'notes');
    const querySnapshot = await getDocs(query(databaseRef, where("title", "==", title)));
    const dataInfo = [];
    querySnapshot.forEach(async (doc) => {
      const docId = doc.id;
      const docData = doc.data();
      dataInfo.push(doc.data());
      await deleteDoc(doc.ref).then(() => {
        Swal.fire(
          'Note Deleted',
          '',
          'success'
        )
      })

    });
    setViewNoteData(dataInfo);
    console.log(viewNotes);
  };


  const deleteConfirmation = (data) => {

    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert note!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ad7eea',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        deleteDocument(data)
      }
    })
  }


  const getData = async () => {
    setLoading(true)
    const data = query(collection(database, "notes"));
    await onSnapshot(data, (querySnapshot) => {
      const databaseInfo = [];
      const dataIds = []
      querySnapshot.forEach((doc) => {
        databaseInfo.push(doc.data());
        dataIds.push(doc.id)
      });
      setLoading(false)
      setIds(dataIds)
      setInfo(databaseInfo)
    });
  }

  const AddNote = async () => {
    if(title==="" && data ===""){
    alert("Note Fields Cannot be Empty")

    } else {
      const docRef = await addDoc(collection(database, "notes"), {
        title: title,
        content: data,
        date: new Date().toLocaleString()
      });

      setData('')
      setTitle('')
    }
   
  }




  const UpdateDocument = async (docId, updatedFields) => {
    const documentRef = doc(database, 'notes', docId);

    try {
      await updateDoc(documentRef, updatedFields);
      console.log("Document fields updated successfully!");
    } catch (error) {
      console.error("Error updating document fields:", error);
    }
  };

  const EditDocument = async (title) => {
    const databaseRef = collection(database, 'notes');
    const querySnapshot = await getDocs(query(databaseRef, where("title", "==", title)));
    const dataInfo = [];

    querySnapshot.forEach(async (doc) => {
      const docId = doc.id;
      const docData = doc.data();
      console.log("Document ID:", docId);
      console.log("Document Data:", docData);
      dataInfo.push(docData);
      const updatedFields = {
        title: updatedTitle,
        content: updatedContent,
      };
      await UpdateDocument(docId, updatedFields).then(() => {
        Swal.fire(
          'Note Updated',
          '',
          'success'
        )
      })
    });

    setViewNoteData(dataInfo);
    console.log(viewNotes);
  };


  return (
    <>
      <div className='mt-4 notes-card-parent p-2 d-flex justify-content-center align-self-center border border-white w-75' >
        <h3 className="text-white p-2" >Daily Notes App </h3>
        <div className="mt-4 bg-white p-2" >
          {isLoading ? (
            <h5>Loading Notes...</h5>
          ) : info.length === 0 ? (
            <h5 className="text-muted my-3">Currently, you don't have any notes</h5>
          ) : (
            <>
              {info
                .sort((a, b) => new Date(b.time) - new Date(a.time))
                .map((val) => (
                  <div key={val.title}>
                    <ul>
                      <li className="notes-li">
                        <div className="d-flex align-items-center justify-content-between">
                          <h5>{val.title}</h5>
                          <div className="d-flex gap-3">

                            <AiFillEye
                              onClick={() => {
                                CheckDocument(val.title);
                                viewNotesOpen();
                              }}
                              className="notes-icon"
                            />

                            <AiTwotoneEdit onClick={() => {
                              CheckDocument(val.title);

                              ToggleUpdateModal()
                            }} className="notes-icon" />
                            <AiFillDelete
                              className="notes-icon"
                              onClick={() => deleteConfirmation(val.title)}
                            />
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                ))}
            </>
          )}


          <div>
            <Button onClick={handleShow} className="add-note-btn my-3" type="button" > +  Add Note </Button>
          </div>


        </div>
      </div>



      {/** Add Note Modal */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title  >Add Your Note</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Note Title</Form.Label>
            <Form.Control onChange={event => setTitle(event.target.value)} type="text" placeholder="Add Your Title of Notes Here" />
          </Form.Group>
          <Form.Group className="mb-3" placeholder="Add Your Note Content Here">
            <Form.Label>Note Content</Form.Label>
            <Form.Control as="textarea" onChange={event => setData(event.target.value)} rows={5} />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button className="bg-dark border-0" onClick={handleClose}>
            Close
          </Button>
          <Button className="save-note" onClick={() => {
            AddNote()
            handleClose()
          }}>
            Add Note
          </Button>
        </Modal.Footer>
      </Modal>

      {/** View Note Modal */}

      <Modal show={viewNotes} onHide={viewNotesClose}>
        {viewNoteData.map((data) => {
          return (
            <span key={data.title} >
              <Modal.Header closeButton>
                <Modal.Title>{data.title}</Modal.Title>
              </Modal.Header>
              <Modal.Body>
              <div className="view-note-space px-2" >

              <p>
              {data.content}
              </p>

              <small className="text-center" >
               <em>Created On : {data.date}</em> 
              </small>
              </div>
              </Modal.Body>
            </span>)
        })}
      </Modal>


      {/** Update Note Modal */}

      <Modal show={updateModal} onHide={ToggleUpdateModal}>
        {viewNoteData.map((data) => {
          return (
            <span key={data.title} >
              <Modal.Header closeButton>
                <Modal.Title  >Update Your Note</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                  <Form.Label>Update Note Title</Form.Label>
                  <Form.Control onChange={event => setUpdatedTitle(event.target.value)} type="text" placeholder={data.title} />
                </Form.Group>
                <Form.Group className="mb-3" placeholder="Add Your Note Content Here">
                  <Form.Label>Note Content</Form.Label>
                  <Form.Control as="textarea" onChange={event => setUpdatedContent(event.target.value)} rows={5} placeholder={data.content} />
                </Form.Group>
              </Modal.Body>
              <Modal.Footer>
                <Button className="bg-dark border-0" onClick={ToggleUpdateModal}>
                  Close
                </Button>
                <Button className="save-note" onClick={() => {
                  EditDocument(data.title)
                  ToggleUpdateModal()
                }}>
                  Update Note
                </Button>
              </Modal.Footer>
            </span>)
        })}
      </Modal>



    </>
  )
}



