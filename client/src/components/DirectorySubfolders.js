import DirectorySubfolderItem from './DirectorySubfolderItem';

function DirectorySubfolders({subfolders}) {

    return (
        <ul>
            {
                subfolders &&
                subfolders.map(subfolder => (
                    <DirectorySubfolderItem
                        key={subfolder.id}
                        subfolder={subfolder}
                    />
                ))
            }
        </ul>
    )
}

export default DirectorySubfolders;