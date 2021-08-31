import React from 'react';
import Modal from './Modal';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import actionCreators from '../app/action-creators';

function Navigation() {

    const { currentSubDir, currentDirectory } = useSelector(state => state.app);

    const dispatch = useDispatch();
    const { deleteSubdirectory, deleteDirectory } = bindActionCreators(actionCreators, dispatch);

    const onDeleteClick = () => {
        if (currentSubDir) {
            deleteSubdirectory(currentSubDir.id);
        } else {
            deleteDirectory(currentDirectory.id);
        }
    }

    return (
        <nav>
            <Modal title={"Add"} buttonClassNames={" mb-3"} dataModalId={"createModal"} />
            <Modal title={"Edit"} buttonClassNames={" mb-3"} id={"null"} dataModalId={"editModal"}  />
            <button disabled={currentSubDir || currentDirectory ? false : true} type="button" className={`btn btn-danger`} onClick={onDeleteClick} >
                Remove
            </button>
        </nav>
    )
}

export default Navigation;
