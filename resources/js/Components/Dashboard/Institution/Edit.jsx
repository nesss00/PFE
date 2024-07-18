import { useForm } from '@inertiajs/inertia-react';
import React from 'react';

export default function CreateInstitution({ close, model }) {
    const { data, setData, put, reset, errors } = useForm({
        name: model.name,
        type: model.type
    });

    const onChange = (e) => setData({ ...data, [e.target.id]: e.target.value });

    const onSubmit = (e) => {
        e.preventDefault();
        put(route('institution.update', model.id), {
            data,
            onSuccess: () => {
                reset();
                close();
            },
        });
    }

    return (
        <>
            <form onSubmit={onSubmit}>
                <div className="modal-body">
                    <div className="form-group">
                        <label htmlFor="name" className="col-form-label">Name:</label>
                        <input type="text" className="form-control" name="name" value={data.name} onChange={onChange} id="name" />
                        {errors.name && <div className='text-danger mt-1'>{errors.name}</div>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="type" className="col-form-label">Type:</label>
                        <select className="form-control" name="type" value={data.type} onChange={onChange} id="type">
                            <option value="">Select a type</option>
                            <option value="Banque">Banque</option>
                            <option value="BMF">BMF</option>
                            <option value="ONG">ONG</option>
                        </select>
                        {errors.type && <div className='text-danger mt-1'>{errors.type}</div>}
                    </div>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn bg-gradient-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="submit" className="btn bg-gradient-primary">Save</button>
                </div>
            </form>
        </>
    );
}
