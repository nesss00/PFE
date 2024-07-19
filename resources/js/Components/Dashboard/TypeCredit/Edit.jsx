import { useForm } from '@inertiajs/inertia-react';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function EditTypeCredit({ close, institution, model }) {
    const { data, setData, put, reset, errors } = useForm({
        name: model.name,
        TypeCredit: model.TypeCredit,
        TauxInteret: model.TauxInteret,
        DuréeMax: model.DuréeMax,
        institution_id: model.institution_id,
        max_money_credited: model.max_money_credited,
    });


    const [institutions, setInstitutions] = useState(institution);
    const onChange = (e) => setData({ ...data, [e.target.id]: e.target.value });

    const onSubmit = (e) => {
        e.preventDefault();
        put(route('typecredit.update', model.id), {
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
                        <input type="text" className="form-control" name="name" value={data.name} onChange={onChange} id="name"/>
                        {errors.name && <div className='text-danger mt-1'>{errors.name}</div>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="TypeCredit" className="col-form-label">TypeCredit:</label>
                        <select className="form-control" name="TypeCredit" value={data.TypeCredit} onChange={onChange}
                                id="TypeCredit">
                            <option value="">Select a type of credit</option>
                            <option value="credit de consommation">Credit de consommation</option>
                            <option value="credit de logement">Credit de logement</option>
                            <option value="credit de immobilier">Credit de immobilier</option>
                            <option value="credit de voiture">Credit de voiture</option>
                            <option value="credit long terme">Credit long terme</option>
                            <option value="credit court terme">Credit court terme</option>
                        </select>
                        {errors.TypeCredit && <div className='text-danger mt-1'>{errors.TypeCredit}</div>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="TauxInteret" className="col-form-label">TauxInteret:</label>
                        <input type="number" className="form-control" name="TauxInteret" value={data.TauxInteret}
                               onChange={onChange} id="TauxInteret"/>
                        {errors.TauxInteret && <div className='text-danger mt-1'>{errors.TauxInteret}</div>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="DuréeMax" className="col-form-label">DuréeMax:</label>
                        <input type="number" className="form-control" name="DuréeMax" value={data.DuréeMax}
                               onChange={onChange} id="DuréeMax"/>
                        {errors.DuréeMax && <div className='text-danger mt-1'>{errors.DuréeMax}</div>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="institution_id" className="col-form-label">Institution:</label>
                        <select className="form-control" name="institution_id" value={data.institution_id} onChange={onChange} id="institution_id">
                            <option value="">Select an institution</option>
                            {institution.map(institution => (
                                <option key={institution.id} value={institution.id}>{institution.name}</option>
                            ))}
                        </select>
                        {errors.institution_id && <div className='text-danger mt-1'>{errors.institution_id}</div>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="max_money_credited" className="col-form-label">Max Money Credited:</label>
                        <input type="number" className="form-control" name="max_money_credited" value={data.max_money_credited} onChange={onChange} id="max_money_credited"/>
                        {errors.max_money_credited && <div className='text-danger mt-1'>{errors.max_money_credited}</div>}
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
