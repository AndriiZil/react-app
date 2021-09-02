import Autocomplete from 'react-autocomplete'
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import actionCreators from '../app/action-creators';

function AutoCompleteSearch () {

    const [value, setValue] = useState('');
    const [items, setItems] = useState([]);

    const dispatch = useDispatch();
    const { setSearchFiles, setFiles } = bindActionCreators(actionCreators, dispatch);
    const { files } = useSelector(state => state.app);

    const searchFiles = async (search) => {
        setSearchFiles(search);
    }

    useEffect(() => {
        setFiles().catch(console.error);
    }, [])

    useEffect(() => {
        if (files.length) {
            getItemsForAutoComplete(files)
        }
    }, [files]);

    const getItemsForAutoComplete = (files) => {
        setItems(files.map(file => {
            return {
                label: file.name,
            }
        }))
    }

    const onSelectHandler = (e) => {
        searchFiles(e).catch(console.error);
    }

    return (
        <>
            <Autocomplete
                getItemValue={(item) => item.label}
                items={items}
                renderItem={(item, isHighlighted) =>
                    <div key={item.label} style={{ background: isHighlighted ? 'lightgray' : 'white' }}>
                        {item.label}
                    </div>
                }
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onSelect={(val) => onSelectHandler(val)}
            />
        </>
    )
}

export default AutoCompleteSearch;
