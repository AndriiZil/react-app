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

export const createDirectory = (directoryName) => {
    return async (dispatch) => {
        await axios({
            method: 'POST',
            url: 'http://localhost:3200/api/directories',
            data: {
                name: directoryName,
            }
        });

        const directories = await axios({
            method: 'GET',
            url: 'http://localhost:3200/api/directories',
        })

        dispatch({
            type: 'LOAD_DIRECTORIES',
            payload: directories.data,
        });
    };
}

export const createSubDirectory = (directoryName, directoryId = '') => {
    return async (dispatch) => {
        await axios({
            method: 'POST',
            url: `http://localhost:3200/api/subfolders/${directoryId}/create`,
            data: {
                name: directoryName,
            }
        });

        const directories = await axios({
            method: 'GET',
            url: 'http://localhost:3200/api/directories',
        })

        dispatch({
            type: 'LOAD_DIRECTORIES',
            payload: directories.data,
        });
    };
}

export const setCurrentDirectory = (currentDirectory) => {
    return (dispatch) => {
        console.log('setCurrentDirectory', currentDirectory);
        dispatch({
            type: 'SET_CURRENT_PARENT_FOLDER',
            payload: currentDirectory,
        });
    }
}

export const setCurrentSubDir = (currentSubDir, parentDir) => {
    return (dispatch) => {
        dispatch({
            type: 'SET_CURRENT_SUBDIR',
            payload: {
                currentSubDir,
                parentDir
            },
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

export const deleteSubdirectory = (subDirectoryId) => {
    return async (dispatch) => {
        await axios({
            method: 'DELETE',
            url: `http://localhost:3200/api/subfolders/${subDirectoryId}`
        });

        const directories = await axios({
            method: 'GET',
            url: 'http://localhost:3200/api/directories',
        })


        dispatch({
            type: 'LOAD_DIRECTORIES',
            payload: directories.data,
        });
    }
}

export const deleteDirectory = (directoryId) => {
    return async (dispatch) => {
        await axios({
            method: 'DELETE',
            url: `http://localhost:3200/api/directories/${directoryId}`
        });

        const directories = await axios({
            method: 'GET',
            url: 'http://localhost:3200/api/directories',
        })


        dispatch({
            type: 'LOAD_DIRECTORIES',
            payload: directories.data,
        });
    }
}

const actionCreators = {
    loadDirectories,
    setCurrentDirectory,
    setCurrentSubDir,
    setCurrentDropItem,
    showSubFolder,
    setCurrentFile,
    setSubFolders,
    moveFileToDirectory,
    moveFileToSubFolder,
    createDirectory,
    createSubDirectory,
    deleteSubdirectory,
    deleteDirectory
}

export default actionCreators;
