import AdministratorLayout from '@/Layouts/AdministratorLayout';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Head } from '@inertiajs/react';
import React, { useState } from 'react';
import Sidebar from '../../Components/Administrator/Sidebar';
import Card from '../../Components/Administrator/Card';

export default function Home(props) {
    return (
        <Router>
        <AdministratorLayout
            user={props.auth.user}
        >
            <Head title="Adminstrator" />

            <div className="flex">
                <Sidebar />
                <div className="w-full">
                  <Card title="Total Users" value="1,234" />
                </div>
            </div>   

        </AdministratorLayout>
        </Router>
    );
}