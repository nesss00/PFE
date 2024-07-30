import React from 'react'
import Base from '../Layouts/Base'
import {usePage} from "@inertiajs/inertia-react";
import Index from './Simulation/Index';

export default function Dashboard() {
    console.log('flash',usePage().props.auth.user.role)
    return (
        <>
            {<div className="container-fluid py-4">

            </div>}

        </>
    )
}

Dashboard.layout = (page) => <Base children={page} title={"Dashboard"}/>
