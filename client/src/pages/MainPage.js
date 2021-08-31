import React, {useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import actionCreators from './../app/action-creators';
import './MainPage.css';
import FolderTree from '../components/FolderTree';
import Navigation from '../components/Navigation';
import { loadDirectories } from '../app/action-creators';
import Files from '../components/Files';
import AutoCompleteSearch from '../components/AutoCompleteSearch';
// import FileContainer from '../components/FileContainer';

export default function MainPage() {
    // const store = useSelector(store => store);
    const dispatch = useDispatch();

    const { loadDirectories } = bindActionCreators(actionCreators, dispatch);

    useEffect(() => loadDirectories(), []);

    const currentFolder = useSelector(state => state.app.currentDirectory);
    const currentSubfolder = useSelector(state => state.app.currentSubDir);

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
                            <AutoCompleteSearch />
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
