import FileItem from './FileItem';
import { bindActionCreators } from 'redux';
import actionCreators from '../app/action-creators';
import { useDispatch, useSelector } from 'react-redux';

function DirectorySubfolderItem ({ subfolder, parentFolder }) {
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

        setCurrentSubDir(subfolder, parentFolder)
    }

    return (
        <li onClick={handleSubfolderClick}>
            <span id={subfolder.id}>{subfolder.name}</span>
        </li>
    )
}

export default DirectorySubfolderItem;
