import FileItem from './FileItem';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../app';
import { useDispatch, useSelector } from 'react-redux';

function DirectorySubfolderItem ({ subfolder }) {

    const currentDirectory = useSelector(state => state.app.currentDirectory);
    const directories = useSelector(state => state.app.directories);

    const dispatch = useDispatch();
    const { setCurrentSubDir } = bindActionCreators(actionCreators, dispatch);

    const removeClassFromAllElements = (className) =>  {
        const elements = document.getElementsByClassName(className);
        while (elements.length)
            elements[0].classList.remove(className);
    }

    const handleSubfolderClick = e => {
        e.stopPropagation();
        const element = e.target;

        removeClassFromAllElements('selected');
        element.classList.add('selected');

        const directory = directories.find(directory => directory.name === currentDirectory.name);

        if (!directory?.subfolders) {
            return;
        }

        const subfolder = directory.subfolders?.find(sub => sub.name === element.innerText);

        setCurrentSubDir(subfolder)
    }

    return (
        <li onClick={handleSubfolderClick}>
            <span id={subfolder.id}>{subfolder.name}</span>
            {
                subfolder &&
                subfolder.files &&
                subfolder.files.map(file => (
                    <FileItem key={file.id} file={file} />
                ))
            }
        </li>
    )
}

export default DirectorySubfolderItem;