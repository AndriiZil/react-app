import React, {useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../app';
import './MainPage.css';
import FolderTree from '../components/FolderTree';
import Navigation from '../components/Navigation';
import { loadDirectories } from '../app/action-creators';
import Files from '../components/Files';
// import FileContainer from '../components/FileContainer';

export default function MainPage() {
    // const store = useSelector(store => store);
    const dispatch = useDispatch();

    const { loadDirectories } = bindActionCreators(actionCreators, dispatch);

    useEffect(() => loadDirectories(), []);

    const currentFolder = useSelector(state => state.app.currentDirectory);
    const currentSubfolder = useSelector(state => state.app.currentSubDir);

    // const [buttonText, setButtonText] = useState('edit');
    // const [inputValue, setInputValue] = useState('Folder');

    // const handleEvent = (e) => {
    //     const element = e.target;
    //     removeClassFromAllElements('selected');
    //     element.classList.add('selected');
    // }

    // const removeClassFromAllElements = (className) =>  {
    //     const elements = document.getElementsByClassName(className);
    //     while (elements.length)
    //         elements[0].classList.remove(className);
    // }

    // const editFolder = (e) => {
    //     const input = document.getElementById('editInput');
    //     input.style.display = input.style.display === 'inline-block' ? 'none' : 'inline-block';
    //
    //     const folder = input.previousSibling;
    //     folder.style.display = folder.style.display === 'none' ? 'inline-block' : 'none';
    //
    //     const buttonText = e.target.textContent === 'edit' ? 'ok' : 'edit';
    //     e.target.textContent = buttonText;
    //     setButtonText(buttonText);
    //
    //     if (buttonText === 'ok') {
    //         folder.textContent = inputValue;
    //     }
    // }

    // const onChangeInputHandler = (e) => {
    //     const value = e.target.value;
    //     if (!value) {
    //         return;
    //     }
    //     setInputValue(value);
    // }

    return (
        <div>
            <header>
                <h2>Manager</h2>
            </header>
            <main>
                <div className='container'>
                    <Navigation />
                    <div className='folders'>
                        <FolderTree />
                    </div>
                    <div className='files'>
                        <div>
                            <input type='text'/>
                        </div>
                        <div className='filesContainer'>
                            <Files />
                            {/*<FileContainer />*/}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}
