import DirectoryItem from './DirectoryItem';
import { bindActionCreators } from 'redux';
import actionCreators from '../app/action-creators';
import { useDispatch, useSelector } from 'react-redux';

function Directories() {

    const directories = useSelector(state => state.app.directories);
    const dispatch = useDispatch();

    const {
        setCurrentDirectory,
    } = bindActionCreators(actionCreators, dispatch);

    const removeClassFromAllElements = (className) =>  {
        const elements = document.getElementsByClassName(className);
        while (elements.length)
            elements[0].classList.remove(className);
    }

    const handleClickOnDirectory = (e, directory) => {
        e.stopPropagation();
        const element = e.target;

        removeClassFromAllElements('selected');
        element.classList.add('selected');

        setCurrentDirectory(directory);
    }

    return (
        <ul>
            {
                directories?.map(directory => (
                    <DirectoryItem
                        key={directory.id}
                        directory={directory}
                        handleClickOnDirectory={(e) => handleClickOnDirectory(e, directory)}
                    />
                ))
            }
        </ul>
    )
}

export default Directories;
