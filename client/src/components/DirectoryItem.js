import DirectorySubfolders from './DirectorySubfolders';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

function DirectoryItem ({ directory,  handleClickOnDirectory, showSubfolders}) {
    const [isShowSubDirectories, setIsShowSubDirectories] = useState(false)
    const currentDirectory = useSelector(state => state.app.currentDirectory);

    useEffect(() => {
        if (currentDirectory.id !== directory.id) {
            setIsShowSubDirectories(false)
        } else {
            setIsShowSubDirectories(true)
        }
    }, [currentDirectory])

    const toggleSubdirectories = () => {
        if (currentDirectory.id === directory.id) {
            setIsShowSubDirectories(!isShowSubDirectories)
        } else {
            setIsShowSubDirectories(false)
        }
    }

    if (!directory) {
        return <></>
    }

    return (
        <li
            id={directory.id}
            key={directory.id}
            onClick={(e) => {
                handleClickOnDirectory(e, showSubfolders !== directory.id ? directory.id : false)
                toggleSubdirectories()
            }}
            className={'destination'}
        >
            { directory.name }

            {
                isShowSubDirectories && (
                    <DirectorySubfolders subfolders={directory.subfolders} parentFolder={directory} />
                )
            }
        </li>
    )
}

export default DirectoryItem
