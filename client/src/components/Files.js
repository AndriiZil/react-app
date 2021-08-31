import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect } from 'react';
import { bindActionCreators } from 'redux';
import actionCreators from '../app/action-creators';

function Files() {

    let files = [];

    const dispatch = useDispatch();
    const {
        setCurrentDropItem,
        setSubFolders,
        setCurrentFile,
        moveFile,
    } = bindActionCreators(actionCreators, dispatch);
    const {
        currentDirectory,
        currentSubDir,
        currentFile,
        searchFiles,
        currentDropItem,
        dropDestinationId,
    } = useSelector(state => state.app)

    useEffect(() => {
        files = document.querySelectorAll('.file');

        files?.forEach(file => {
            file.addEventListener('dragstart', dragStart);
            file.addEventListener('dragend', dragEnd);
        });

        return () => {
            files?.forEach(file => {
                file.removeEventListener('dragstart', dragStart);
                file.removeEventListener('dragend', dragEnd);
            });
        }
    }, [files]);

    function dragStart(e) {
        setCurrentDropItem(e.target.id);
        setSubFolders();
    }

    function dragEnd(e) {
        console.log('dragEnd >>', e);
        // console.log('currentDropItem >>', currentDropItem);
        // console.log('dropDestinationId >>', dropDestinationId);
        moveFile(currentDropItem, dropDestinationId);
    }

    let fileItems = [];

    if (currentDirectory && !currentSubDir) {
        fileItems = currentDirectory.files;
    }

    if (currentSubDir) {
        fileItems = currentSubDir.files
    }

    const onSelectFile = (e, item) => {
        e.preventDefault();
        setCurrentFile(item)
    }

    return (
        <>
            {
                (currentDirectory || currentSubDir) &&
                fileItems?.map(item => {
                    return <div
                        key={item.id}
                        className={`file ${currentFile.id === item.id ? 'active' : ''}`}
                        draggable='true'
                        id={item.id}
                        onClick={(e) => onSelectFile(e, item)}
                    >
                        {item.name}
                    </div>
                })
            }

            {
                !currentDirectory &&
                !currentSubDir &&
                !currentFile &&
                searchFiles?.map(item => {
                    return <div
                        key={item.id}
                        className={`file`}
                        draggable='true'
                        id={item.id}
                        onClick={(e) => onSelectFile(e, item)}
                    >
                        {item.name}
                    </div>
                })
            }
        </>
    )
}

export default Files;
