import React from 'react';
import Modal from './Modal';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import actionCreators from '../app/action-creators';

function Navigation() {

    const { currentSubDir, currentDirectory, currentFile } = useSelector(state => state.app);

    const dispatch = useDispatch();
    const { deleteSubdirectory, deleteDirectory, deleteFile } = bindActionCreators(actionCreators, dispatch);

    const onDeleteClick = () => {
        if (currentFile) {
            return deleteFile(currentFile.id);
        }

        if (currentSubDir) {
            return deleteSubdirectory(currentSubDir.id);
        }

        if (currentDirectory) {
            return deleteDirectory(currentDirectory.id);
        }
    }

    return (
        <nav>
            <Modal title={"Add"} buttonClassNames={" mb-3"} dataModalId={"createModal"} />
            <Modal disabled={currentSubDir || currentDirectory || currentFile ? false : true} title={"Edit"} buttonClassNames={"btn-warning mb-3"} id={"null"} dataModalId={"editModal"} typeModal={"edit"}  />
            <button disabled={currentSubDir || currentDirectory || currentFile ? false : true} type="button" className={`btn btn-danger`} onClick={onDeleteClick} >
                Remove
            </button>
        </nav>
    )
}

export default Navigation;
