const initialState = {
    directories: [],
    subFolders: [],
    currentDirectory: '',
    currentSubDir: '',
    currentDropItem: '',
    currentFile: '',
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOAD_DIRECTORIES':
            return {
                ...state,
                directories: action.payload,
            }
        case 'SET_CURRENT_PARENT_FOLDER':
            return {
                ...state,
                directories: [...state.directories],
                currentDirectory: action.payload,
            }
        case 'SET_CURRENT_SUBDIR':
            return {
                ...state,
                directories: [...state.directories],
                currentDirectory: state.currentDirectory,
                currentSubDir: action.payload,
            }
        case 'SET_CURRENT_DROP_ITEM':
            return {
                ...state,
                directories: [...state.directories],
                currentDirectory: state?.currentDirectory,
                currentSubDir: state?.currentSubDir,
                currentDropItem: action.payload,
            }
        case 'SET_CURRENT_FILE':
            return {
                ...state,
                directories: [...state.directories],
                currentDirectory: state?.currentDirectory,
                currentSubDir: state?.currentSubDir,
                currentDropItem: state?.currentDropItem,
                currentFile: action.payload,
            }
        case 'SET_SUB_FOLDERS':
            return {
                ...state,
                directories: [...state.directories],
                currentDirectory: state?.currentDirectory,
                currentSubDir: state?.currentSubDir,
                currentDropItem: state?.currentDropItem,
                currentFile: state?.currentFile,
                subFolders: action.payload,
            }
        case 'MOVE_FILE_TO_SUBFOLDER':
            return {
                ...state,
                directories: action.payload.directories,
                subFolders: action.payload.subFolders,
            }
        default:
            return state;
    }
}

export default reducer;
