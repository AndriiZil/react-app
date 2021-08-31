import { useEffect, useRef, useState } from 'react';
import { Modal } from 'bootstrap';

import { useSelector, useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import actionCreators from './../app/action-creators';

function ModalComponent({ id, title, buttonClassNames, dataModalId }) {
    const [modal, setModal] = useState(null)

    const folders = useSelector((state) => state.app.directories)
    const exampleModal = useRef()

    const dispatch = useDispatch();
    const { createDirectory, createSubDirectory } = bindActionCreators(actionCreators, dispatch);

    const [name, setName] = useState('')
    const [type, setType] = useState('')

    useEffect(() => {
        setModal(
            new Modal(exampleModal.current)
        )
    }, [])

    const onSubmit = () => {
        console.log('-=-= onSubmit', name, type)
        if (!name) return true;
        if (type.length > 0) {
            createSubDirectory(name, type)
            setName("")
            setType("")
        } else {
            createDirectory(name)
            setName("")
            setType("")
        }
    }

    return (
        <>
            {/* show btn Modal */}
            <button type="button" className={`btn btn-primary ${buttonClassNames}`} data-bs-toggle="modal" data-bs-target={`#${dataModalId}`}>
                {title}
            </button>

            {/* Modal */}
            <div className="modal fade" id={dataModalId} tabIndex="-1" aria-labelledby="exampleModalLabel"
                 aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">{title}</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="input-group mb-3">
                                <span className="input-group-text" id="basic-addon1">@</span>
                                <input type="text" className="form-control" placeholder="Name" aria-label="Username"
                                       aria-describedby="basic-addon1" name={"name"} defaultValue={name} onChange={(e) => setName(e.target.value)}/>
                            </div>
                            <select className="form-select" aria-label="Default select example" onChange={(e) => setType(e.target.value)}>
                                <option value={""} selected>----</option>
                                {
                                    folders &&
                                    folders.map((folder => (
                                        <option key={folder.id} value={folder.id}>{folder.name}</option>
                                    )))
                                }
                            </select>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" onClick={() => onSubmit()}>Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

ModalComponent.defaultProps = {
    title: "",
    buttonClassNames: "",
    dataModalId: "exampleModalLabel"
}

export default ModalComponent;
