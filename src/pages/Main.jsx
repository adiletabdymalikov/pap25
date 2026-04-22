import axios from "axios";
import { useEffect, useState } from "react";

function Main() {
    const [notes, setNotes] = useState([]);
    const [heading, setHeading] = useState('');

    const fetchNotes = async () => {
        try {
            const response = await axios.get('https://69dd38ef84f912a26404e7d2.mockapi.io/notes');
            if (response.status === 200) setNotes(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    const postNotes = async () => {
        if (!heading.trim()) return;
        try {
            const response = await axios.post('https://69dd38ef84f912a26404e7d2.mockapi.io/notes', {
                heading: heading,
                description: "Done" 
            });
            if (response.status === 201 || response.status === 200) {
                setHeading('');
                fetchNotes();
            }
        } catch (error) {
            console.error(error);
        }
    }

    const deleteNote = async (id) => {
        try {
            await axios.delete(`https://69dd38ef84f912a26404e7d2.mockapi.io/notes/${id}`);
            fetchNotes();
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        fetchNotes();
    }, [])

    return (
        <div className="notes-container">
            <div className="header-banner">ToDo App</div>

            <div className="input-section">
                <input 
                    type="text" 
                    placeholder="write your tasks here..." 
                    value={heading}
                    onChange={(e) => setHeading(e.target.value)} 
                />
                <button className="add-btn" onClick={postNotes}>
                    Add Task
                </button>
            </div>

            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            <th className="col-id">#</th>
                            <th className="col-task">Tasks</th>
                            <th className="col-status">Status</th>
                            <th className="col-action">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {notes.map((note, index) => (
                            <tr key={note.id}>
                                <td className="col-id">{index + 1}</td>
                                <td className="col-task">{note.heading}</td>
                                <td className="col-status">
                                    <span className="status-text">{note.description || "Done"}</span>
                                </td>
                                <td className="col-action">
                                    <button className="delete-icon" onClick={() => deleteNote(note.id)}>
                                        ✖
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {notes.length === 0 && (
                    <p style={{ textAlign: 'center', padding: '20px', color: '#999' }}>Список пуст</p>
                )}
            </div>
        </div>
    );
}

export default Main;