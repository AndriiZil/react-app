import DirectorySubfolders from './DirectorySubfolders';
import FileItem from './FileItem';

function DirectoryItem ({ directory,  handleClickOnDirectory, showSubfolders}) {
    if (!directory) {
        return <></>
    }
    return (
        <li
            id={directory.id}
            key={directory.id}
            onClick={(e) => handleClickOnDirectory(e, showSubfolders !== directory.id ? directory.id : false)}
            className={'destination'}
        >
            {directory.name}
            <DirectorySubfolders subfolders={directory.subfolders} />
            {
                directory &&
                directory.files &&
                directory.files.map(file => (
                    <FileItem key={file.id} file={file} />
                ))
            }
        </li>
    )
}

export default DirectoryItem