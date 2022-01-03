import { assert } from "./utils";
import * as wordsActions from "./store/actions/word";
import { useDispatch } from 'react-redux';
import { useState } from "react";

const dispatch = useDispatch();
const [testPassed, setTestPassed] = useState(0);

//Write to database
let write_to_database = (id, word, path, phonetic) => {
    dispatch(wordsActions.createWord(id, word, path, phonetic));
    const response = await fetch(`https://speechboard-api.herokuapp.com/words/${id}`);
    assert(response.id === id &&
        response.word === word &&
        response.newPath === path &&
        response.phonetic === phonetic,
        "Write to database failed");
    dispatch(wordsActions.deleteWord(id));
    const delete_res = await fetch(`https://speechboard-api.herokuapp.com/words/${id}`);
    assert(delete_res === "not found", "Word not deleted");
    setTestPassed(testPassed++);
}

write_to_database(101, "tiger", "/path", "taser");


