import { useEffect, useRef, useState } from 'react';
import { Modal } from 'bootstrap';

import { useSelector, useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import actionCreators from './../app/action-creators';

function ModalComponent({ disabled, typeModal, title, buttonClassNames, dataModalId }) {
    const {
        directories,
        currentDirectory,
        currentSubDir,
        currentFile
    } = useSelector((state) => state.app);

    const [name, setName] = useState('');
    const [type, setType] = useState('1');
    const [folder, setFolder] = useState('');
    const [tag, setTag] = useState('');
    const [text, setText] = useState('');

    useEffect(() => {
        setName('');
        setFolder('');
        setTag('');
        setText('');
        if (currentDirectory && currentSubDir && currentFile) {
            setType('2');
            setTag(currentFile.tag || '');
            setText(currentFile.text || '');
        } else {
            setType('1');
        }

    }, [currentDirectory , currentSubDir , currentFile]);

    const dispatch = useDispatch();
    const {
        createDirectory,
        createSubDirectory,
        createFile ,
        editSubDirectory,
        editDirectory,
        editFile
    } = bindActionCreators(actionCreators, dispatch);

    const setDefaultVal = () => {
        if (typeModal === 'edit' && name.length === 0 && (currentDirectory || currentSubDir || currentFile)) {
            if (currentFile) {
                return currentFile.name;
            }

            if (currentSubDir) {
                return currentSubDir.name;
            }

            if (currentDirectory) {
                return currentDirectory.name;
            }

            return '';

        }
    }

    const onSubmit = () => {
        if (!name) return true;

        if (typeModal === 'create') {
            if (type === '2' && (currentSubDir || currentDirectory)) {
                createFile({
                    type: currentSubDir ? 'subDir' : 'dir',
                    name,
                    parentId: currentSubDir.id || currentDirectory.id,
                })
                return false;
            }
            if (folder.length > 0) {
                if (type === '1') {
                    createSubDirectory(name, folder)
                    setName('')
                    setType('1')
                    return false;
                }
            } else {
                createDirectory(name)
                setName("")
                setType("1")
                return false;
            }
        }

        if (typeModal === 'edit') {
            if (type === '2' && (currentSubDir && currentDirectory && currentFile)) {
                editFile(
                    name,
                    tag,
                    text,
                    currentFile.id
                )
                return false
            }

            if (currentSubDir && type === '1') {
                editSubDirectory(name, currentSubDir.id)
                setName('')
                setType('1')
                return false
            }

            if (currentDirectory && type === '1') {
                editDirectory(name, currentDirectory.id)
                setName('')
                setType('1')
            }
        }
    }

    return (
        <>
            {/* show btn Modal */}
            <button disabled={disabled} type="button" className={`btn btn-primary ${buttonClassNames}`} data-bs-toggle="modal" data-bs-target={`#${dataModalId}`}>
                {title}
            </button>

            {/* Modal */}
            <div className="modal fade customModal" id={dataModalId} tabIndex="-1" aria-labelledby="exampleModalLabel"
                 aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">{title}</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            {
                                typeModal !== 'edit' &&
                                (
                                    <select className="form-select mb-3" aria-label="Default select example"
                                     onChange={(e) => setType(e.target.value)}>
                                        <option value={"1"} selected={type === "1" ? 'selected' : false}>folder</option>
                                        <option value={"2"} selected={type === "2" ? 'selected' : false}>file</option>
                                    </select>
                                )}
                            <div className="input-group mb-3">
                                <span className="input-group-text" id="basic-addon1">@</span>
                                <input type="text" className="form-control" placeholder="Name" aria-label="Username"
                                       aria-describedby="basic-addon1" name={"name"} value={setDefaultVal()} onChange={(e) => setName(e.target.value)}/>
                            </div>

                            {
                                type === '2' && (
                                    <>
                                        <div className="input-group mb-3">
                                            <span className="input-group-text" id="basic-addon1">@</span>
                                            <input type="text" className="form-control" placeholder="Tag" aria-label="Username"
                                                   aria-describedby="basic-addon1" name={"name"} value={tag} onChange={(e) => setTag(e.target.value)}/>
                                        </div>

                                        <div className="input-group mb-3">
                                            <span className="input-group-text" id="basic-addon1">@</span>
                                            <input type="text" className="form-control" placeholder="Text" aria-label="Username"
                                                   aria-describedby="basic-addon1" name={"name"} value={text} onChange={(e) => setText(e.target.value)}/>
                                        </div>
                                    </>
                                )
                            }
                            {
                                typeModal !== 'edit' &&
                                type === '1' && (
                                    <select className="form-select" aria-label="Default select example" onChange={(e) => setFolder(e.target.value)}>
                                        <option value={""} selected>----</option>
                                        {
                                            directories &&
                                            directories.map((folder => (
                                                <option key={folder.id} value={folder.id}>{folder.name}</option>
                                            )))
                                        }
                                    </select>
                                )
                            }
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button
                                type="button"
                                className="btn btn-primary" onClick={() => onSubmit()}
                                disabled={type === "2" ? currentDirectory || currentSubDir ? false : true : false}
                            >
                                Save {type === "2" ? "file" : "folder" }
                            </button>
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
    dataModalId: "exampleModalLabel",
    typeModal: "create",
    disabled: false
}

export default ModalComponent;
