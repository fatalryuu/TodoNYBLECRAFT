import React, {useState} from 'react';
import './Form.scss';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';

type PropsType = {
    putTodo: (text: string) => void
    filterTags: (text: string) => void
    showTodos: () => void
    editMode: boolean
}

const Form: React.FC<PropsType> = ({putTodo, filterTags, showTodos, editMode}) => {
    const [text, setText] = useState("");
    const [isFilter, setIsFilter] = useState(false);

    const onTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setText(e.target.value);
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        isFilter ? filterTags(text.trim()) : putTodo(text.trim());
        if (!isFilter)
            setText("");
    }

    const handleFilter = () => {
        setIsFilter(!isFilter);
        if (isFilter)
            showTodos(); //show todos after filter
        setText(isFilter ? "" : "#");
    }

    return (
        <form className="form" onSubmit={handleSubmit}>
            <input type="text" placeholder={isFilter ? "Enter a tag that starts with \"#\"..." : "Enter text..."}
                   className="input" value={text} onChange={onTextChange}
                   autoFocus={isFilter} disabled={editMode} required/>
            <button type="submit" className="plus" disabled={editMode}>{isFilter ? <SearchIcon /> : <AddIcon />}</button>
            <button type="button" className="filter" onClick={handleFilter} disabled={editMode}><FilterAltIcon /></button>
        </form>
    );
};

export default Form;