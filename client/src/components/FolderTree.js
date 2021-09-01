import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

import Directories from './Directories'
import { bindActionCreators } from 'redux';
import actionCreators from '../app/action-creators';

function FolderTree() {
    let dirs = [];

    const dispatch = useDispatch();
    const { setDropDestination } = bindActionCreators(actionCreators, dispatch);

    useEffect(() => {
        dirs = document.querySelectorAll('.destination');

        dirs?.forEach(directory => {
            directory.addEventListener('dragover', dragOver);
            directory.addEventListener('dragenter', dragEnter);
            directory.addEventListener('dragleave', dragLeave);
            directory.addEventListener('drop', dragDrop);
        });

        return () => {
            dirs?.forEach(directory => {
                directory.removeEventListener('dragover', dragOver);
                directory.removeEventListener('dragenter', dragEnter);
                directory.removeEventListener('dragleave', dragLeave);
                directory.removeEventListener('drop', dragDrop);
            });
        }

    }, [dirs]);

    function dragOver(e) {
        // console.log('dragOver');
        // setDropDestination(e.target.id)
    }

    function dragEnter(e) {
        setDropDestination(e.target.id)
    }

    function dragLeave(e) {}

    function dragDrop(e) {}

    return (
        <>
            <h2>Folder Tree</h2>
            <Directories />
        </>
    )
}

export default FolderTree;
