import DirectoryItem from './DirectoryItem';
import { bindActionCreators } from 'redux';
import actionCreators from '../app/action-creators';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentFile } from '../app/action-creators';

function Directories() {

    const directories = useSelector(state => state.app.directories);
    const dispatch = useDispatch();

    const {
        setCurrentDirectory,
        setCurrentSubDir,
        setCurrentFile,
    } = bindActionCreators(actionCreators, dispatch);

    const removeClassFromAllElements = (className) =>  {
        const elements = document.getElementsByClassName(className);
        while (elements.length)
            elements[0].classList.remove(className);
    }

    const handleClickOnDirectory = (e) => {
        e.stopPropagation();
        const element = e.target;
        const currentDirectory = directories.find(d => {
            return d.name === element.innerText || element.innerText.includes(d.name)
        });

        removeClassFromAllElements('selected');
        element.classList.add('selected');

        console.log(currentDirectory);
        if (currentDirectory) {
            setCurrentDirectory(currentDirectory);
        }

    }

    return (
        <ul>
            {
                directories?.map(directory => (
                    <DirectoryItem
                        key={directory.id}
                        directory={directory}
                        handleClickOnDirectory={handleClickOnDirectory}
                    />
                ))
            }
        </ul>
    )
}

export default Directories;
