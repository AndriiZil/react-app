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

export const createFile = (data) => {
    return async (dispatch) => {
        const { type, parentId, name, tag, text } = data;
        if (type === 'subDir') {
            await axios({
                method: 'POST',
                url: `http://localhost:3200/api/files/${parentId}/create`,
                data: { name, tag, text }
            });
        } else {
            await axios({
                method: 'POST',
                url: `http://localhost:3200/api/files/directory/${parentId}/create`,
                data: { name, tag, text }
            });
        }

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

export const editSubDirectory = (name, directoryId) => {
    return async (dispatch) => {
        await axios({
            method: 'PATCH',
            url: `http://localhost:3200/api/subfolders/${directoryId}`,
            data: {
                name
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
    }
}

export const editDirectory = (name, directoryId) => {
    return async (dispatch) => {
        await axios({
            method: 'PATCH',
            url: `http://localhost:3200/api/directories/${directoryId}`,
            data: {
                name
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
    }
}

export const editFile = (name = '', tag = '', text = '', directoryId) => {
    return async (dispatch) => {
        await axios({
            method: 'PATCH',
            url: `http://localhost:3200/api/files/${directoryId}`,
            data: {
                name,
                tag,
                text
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
    }
}

export const deleteFile = (fileId) => {
    return async (dispatch) => {
        await axios({
            method: 'DELETE',
            url: `http://localhost:3200/api/files/${fileId}`
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

export const setSearchFiles = (search) => {
    return async (dispatch) => {
        const response = await axios.get(`http://localhost:3200/api/files?search=${search}`);

        dispatch({
            type: 'SET_SEARCH_FILES',
            payload: response.data,
        });
    }
}

export const setDropDestination = (destinationId) => {
    return (dispatch) => {
        dispatch({
            type: 'SET_DROP_DESTINATION_ID',
            payload: destinationId,
        });
    }
}

export const moveFile = (currentFileId, destinationId) => {
    return async (dispatch) => {
        await axios({
            method: 'PATCH',
            url: `http://localhost:3200/api/files/${currentFileId}/moveto/${destinationId}`
        })


        const directories = await axios({
            method: 'GET',
            url: 'http://localhost:3200/api/directories',
        });

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
    deleteDirectory,
    createFile,
    editSubDirectory,
    editDirectory,
    editFile,
    deleteFile,
    setSearchFiles,
    setDropDestination,
    moveFile,
}

export default actionCreators;
