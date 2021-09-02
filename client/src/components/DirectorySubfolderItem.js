import { bindActionCreators } from 'redux';
import actionCreators from '../app/action-creators';
import { useDispatch } from 'react-redux';

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
        <li onClick={handleSubfolderClick} className={'destination'} id={subfolder.id} >
            <img src="./icons/Folder-icon.png" alt=""/>
            <span id={subfolder.id}>{subfolder.name}</span>
        </li>
    )
}

export default DirectorySubfolderItem;
