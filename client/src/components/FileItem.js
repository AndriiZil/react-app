import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import actionCreators from '../app/action-creators';

function FileItem ({ file }) {

    const currentDirectory = useSelector(state => state.app.currentDirectory);
    const directories = useSelector(state => state.app.directories);
    const currentSubDir = useSelector(state => state.app.currentSubDir);

    const dispatch = useDispatch();
    const { setCurrentFile } = bindActionCreators(actionCreators, dispatch);

    const removeClassFromAllElements = (className) =>  {
        const elements = document.getElementsByClassName(className);
        while (elements.length)
            elements[0].classList.remove(className);
    }

    const handleFile = e => {
        e.stopPropagation();
        const element = e.target;

        removeClassFromAllElements('selected');
        element.classList.add('selected');

        let file = '';
        let directory = directories.find(d => d.name === currentDirectory.name);

        if (directory?.files?.length) {
            file = directory?.files?.find(f => f.name === element.innerText);
        }

        if (!file || !directory.subfolders.length) {
            const subfolder = directory?.subfolders?.find(s => s.name === currentSubDir.name);
            file = subfolder?.files?.find(f => f.name === element.innerText)
        }

        setCurrentFile(file);
    }

    return (
        <ul>
            <li id={file.id} onClick={handleFile} style={{ width: "auto"}}>
                {file.name}
            </li>
        </ul>
    )
}

export default FileItem;
