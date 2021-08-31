import axios from 'axios';

export const loadDirectories = () => {
    return async (dispatch) => {
        const directories = await axios.get('http://localhost:3200/api/directories');

        dispatch({
            type: 'LOAD_DIRECTORIES',
            payload: directories.data,
        });
    };
}

export const setCurrentDirectory = (currentDirectory) => {
    return (dispatch) => {
        dispatch({
            type: 'SET_CURRENT_PARENT_FOLDER',
            payload: currentDirectory,
        });
    }
}

export const setCurrentSubDir = (currentSubDir) => {
    return (dispatch) => {
        dispatch({
            type: 'SET_CURRENT_SUBDIR',
            payload: currentSubDir,
        });
    }
}

export const setCurrentDropItem = (currentDropId) => {
    return (dispatch) => {
        dispatch({
            type: 'SET_CURRENT_DROP_ITEM',
            payload: currentDropId
        });
    }
}

export const showSubFolder = (value) => {
    return (dispatch) => {
        dispatch({
            type: 'SHOW_SUBFOLDERS',
            payload: value
        });
    }
}

export const setCurrentFile = (file) => {
    return (dispatch) => {
        dispatch({
            type: 'SET_CURRENT_FILE',
            payload: file,
        });
    }
}

export const setSubFolders = () => {
    return async (dispatch) => {
        const subFolders = await axios.get('http://localhost:3200/api/subfolders');

        dispatch({
            type: 'SET_CURRENT_FILE',
            payload: subFolders,
        });
    }
}

export const moveFileToDirectory = (dropItemId, destinationId) => {
    return async (dispatch) => {
        dispatch({
            type: 'SET_CURRENT_FILE',
            payload: {
                directories: [],
                subFolders: []
            },
        });
    }
}

export const moveFileToSubFolder = (dropItemId, subFolderId) => {
    return async (dispatch) => {
        const directories = await axios.get('http://localhost:3200/api/directories');

        await axios.put(`http://localhost:3200/api/files/${dropItemId}`, {
            subFolderId
        });

        dispatch({
            type: 'MOVE_FILE_TO_SUBFOLDER',
            payload: {
                directories,
                subFolders: []
            },
        });
    }
}
