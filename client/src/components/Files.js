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
            console.log('start useEffect');
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

    const removeClassFromAllElements = (className) =>  {
        const elements = document.getElementsByClassName(className);
        while (elements.length)
            elements[0].classList.remove(className);
    }

    function dragStart(e) {
        const elementId =  e.target.id;
        const element = document.getElementById(elementId);

        if (element) {
            element.style.border = '1px dashed red';
            element.style.boxShadow = '4px 4px 8px 0px rgba(34, 60, 80, 0.2)';
            element.style.borderRadius = '5px';
        }

        setCurrentDropItem(elementId);
        setSubFolders();
    }

    function dragEnd(e) {
        const elementId =  e.target.id;
        const element = document.getElementById(elementId);

        if (element) {
            element.style.border = '';
            element.style.boxShadow = '';
            element.style.borderRadius = '';
        }

        removeClassFromAllElements('selected');
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
                        <img src="./icons/file.png" alt="" className='file-icon'/>
                        { item.name }
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
                        { item.name }
                    </div>
                })
            }
        </>
    )
}

export default Files;
