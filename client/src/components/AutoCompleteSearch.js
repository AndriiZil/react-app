import Autocomplete from 'react-autocomplete'
import {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {bindActionCreators} from 'redux';
import actionCreators from '../app/action-creators';
import axios from 'axios';

function AutoCompleteSearch () {

    const [value, setValue] = useState('');
    const [files, setFiles] = useState([]);
    const [items, setItems] = useState([]);

    const getAllFiles = async () => {
        const response = await axios.get('http://localhost:3200/api/files');
        setFiles(response.data);
    }

    const dispatch = useDispatch();
    const { setSearchFiles } = bindActionCreators(actionCreators, dispatch);

    const searchFiles = async (search) => {
        setSearchFiles(search);
    }

    useEffect(() => {
       getAllFiles().catch(console.error);
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
        searchFiles(e)
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
