import axios from "axios";
import { useEffect, useState } from "react";

function Main() {
    const [notes, setNotes] = useState([]);
<<<<<<< HEAD
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
=======
    const [formData, setFormData] = useState({ heading: '', description: '', city: '', job: '' });
    const [editId, setEditId] = useState(null);

    const API_URL = 'https://69dd38ef84f912a26404e7d2.mockapi.io/notes';

    const fetchNotes = async () => {
        try {
            const res = await axios.get(API_URL);
            setNotes(res.data);
        } catch (err) { console.error(err); }
    };

    
    const handleSubmit = async () => {
        if (!formData.heading) return;

        try {
            if (editId) {
              
                await axios.put(`${API_URL}/${editId}`, formData);
                setEditId(null);
            } else {
             
                await axios.post(API_URL, formData);
            }
            setFormData({ heading: '', description: '', city: '', job: '' });
            fetchNotes();
        } catch (err) { console.error(err); }
    };


    const deleteNote = async (id) => {
        await axios.delete(`${API_URL}/${id}`);
        fetchNotes();
    };

   
    const startEdit = (note) => {
        setEditId(note.id);
        setFormData({ 
            heading: note.heading, 
            description: note.description, 
            city: note.city || '', 
            job: note.job || '' 
        });
    };

    useEffect(() => { fetchNotes(); }, []);

    return (
        <div className="container">
            <h2>Добавление нескольких данных в JSON</h2>
            
            <div className="form-group">
                <input placeholder="Имя" value={formData.heading} onChange={e => setFormData({...formData, heading: e.target.value})} />
                <input placeholder="Возраст" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} />
                <input placeholder="Город" value={formData.city} onChange={e => setFormData({...formData, city: e.target.value})} />
                <input placeholder="Должность" value={formData.job} onChange={e => setFormData({...formData, job: e.target.value})} />
                <button className="submit-btn" onClick={handleSubmit}>
                    {editId ? "Обновить" : "Добавить / Обновить"}
                </button>
            </div>

            <h3>Таблица данных:</h3>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Имя</th>
                        <th>Возраст</th>
                        <th>Город</th>
                        <th>Должность</th>
                        <th>Действия</th>
                    </tr>
                </thead>
                <tbody>
                    {notes.map((note) => (
                        <tr key={note.id}>
                            <td>{note.id}</td>
                            <td>{note.heading}</td>
                            <td>{note.description}</td>
                            <td>{note.city || "—"}</td>
                            <td>{note.job || "—"}</td>
                            <td className="actions-btns">
                                <button className="edit-btn" onClick={() => startEdit(note)}>Редактировать</button>
                                <button className="delete-btn" onClick={() => deleteNote(note.id)}>Удалить</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
>>>>>>> 230c8392d915ef21bcac2c3ed765fe0085272a5c
        </div>
    );
}

export default Main;