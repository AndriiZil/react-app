import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import actionCreators from './../app/action-creators';
import './MainPage.css';
import FolderTree from '../components/FolderTree';
import Navigation from '../components/Navigation';
import Files from '../components/Files';
import AutoCompleteSearch from '../components/AutoCompleteSearch';

export default function MainPage() {

    const dispatch = useDispatch();
    const { loadDirectories } = bindActionCreators(actionCreators, dispatch);

    useEffect(() => loadDirectories().catch(console.error), []);

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
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}
