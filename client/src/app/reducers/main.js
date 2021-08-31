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
                currentDirectory: '',
                currentSubDir: '',
                currentFile: '',
            }
        case 'SET_CURRENT_PARENT_FOLDER':
            console.log(action.payload);
            return {
                ...state,
                directories: [...state.directories],
                currentDirectory: action.payload,
                currentSubDir: '',
                currentFile: '',
            }
        case 'SET_CURRENT_SUBDIR':
            return {
                ...state,
                currentFile: '',
                currentDirectory: action.payload.parentDir,
                currentSubDir: action.payload.currentSubDir,
            }
        case 'SET_CURRENT_DROP_ITEM':
            return {
                ...state,
                currentDropItem: action.payload,
            }
        case 'SET_CURRENT_FILE':
            return {
                ...state,
                currentFile: action.payload,
            }
        case 'SET_SUB_FOLDERS':
            return {
                ...state,
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
