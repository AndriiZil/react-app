import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

import Directories from './Directories'
import {bindActionCreators} from 'redux';
import {actionCreators} from '../app';
import {moveFileToSubFolder} from '../app/action-creators';
function FolderTree() {
    let dirs = [];

    const [dropId, setDropId] = useState('');

    const { currentDropItem, directories, subFolders } = useSelector(state => state.app);

    const dispatch = useDispatch();
    const { moveFileToDirectory, moveFileToSubFolder } = bindActionCreators(actionCreators, dispatch);

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
        const elementId = e.target.id;
        setDropId(elementId);
    }

    function dragEnter(e) {
        console.log('dragEnter >>>', e);
    }

    function dragLeave(e) {
        console.log('currentDropItem', currentDropItem);
        console.log('DROP_DIR', dropId);
    }

    function dragDrop(e) {
        console.log('DROP');
    }

    return (
        <>
            <h2>Folder Tree</h2>
            <Directories />
        </>
    )
}

export default FolderTree;
