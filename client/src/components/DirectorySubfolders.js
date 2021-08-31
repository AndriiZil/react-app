import DirectorySubfolderItem from './DirectorySubfolderItem';

function DirectorySubfolders({subfolders, parentFolder}) {

    return (
        <ul>
            {
                subfolders &&
                subfolders.map(subfolder => (
                    <DirectorySubfolderItem
                        key={subfolder.id}
                        subfolder={subfolder}
                        parentFolder={parentFolder}
                    />
                ))
            }
        </ul>
    )
}

export default DirectorySubfolders;
