import axios from "axios";
import { useEffect, useState } from "react";

function Main() {
    const [notes, setNotes] = useState([]);
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
        </div>
    );
}

export default Main;