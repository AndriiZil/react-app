import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

import Directories from './Directories'
import { bindActionCreators } from 'redux';
import actionCreators from '../app/action-creators';

function FolderTree() {
    let dirs = [];

    setTimeout(() => {
        dirs = document.querySelectorAll('.destination');
    }, 1000)

    useEffect(() => {
        setTimeout(() => {
            dirs?.forEach(directory => {
                directory.addEventListener('dragover', dragOver);
                directory.addEventListener('dragenter', dragEnter);
                directory.addEventListener('dragleave', dragLeave);
            });
        }, 1500)

        return () => {
            dirs?.forEach(directory => {
                directory.removeEventListener('dragover', dragOver);
                directory.removeEventListener('dragenter', dragEnter);
                directory.removeEventListener('dragleave', dragLeave);
            });
        }

    }, [dirs]);

    const dispatch = useDispatch();
    const { setDropDestination } = bindActionCreators(actionCreators, dispatch);

    function dragOver(e) {
        if (e.target.id) {
            document.getElementById(e.target.id).style.backgroundColor = 'green';
        }
    }

    function dragEnter(e) {
        setDropDestination(e.target.id);
    }

    function dragLeave(e) {
        if (e.target.id) {
            document.getElementById(e.target.id).style.backgroundColor = 'transparent';
        }
    }

    return (
        <>
            <h2>Folder Tree</h2>
            <Directories />
        </>
    )
}

export default FolderTree;
