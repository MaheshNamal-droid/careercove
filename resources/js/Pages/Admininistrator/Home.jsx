import AdministratorLayout from '@/Layouts/AdministratorLayout';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Head } from '@inertiajs/react';
import React, { useState } from 'react';
import Sidebar from '../../Components/Administrator/Sidebar';
import { BarChart } from '@mui/x-charts/BarChart';
import { LineChart } from '@mui/x-charts/LineChart';
import { PieChart } from '@mui/x-charts/PieChart';

export default function Home(props) {
    //console.log(props.vacancies_locations);
    // define the data for the chart
    const newArray = [];
    const dataArray = [];
    const jobApplicationArry = [];
    // push the data to the arrays
    props.job_categorys.forEach((element) => {
        let count=0;
        props.my_vacancies.forEach((vacancy) => {
            if (vacancy.job_category == element.id) {
                count++;
            }
        })
        let count2=0;
        props.my_applications.forEach((application) => {
            if (application.job_category == element.id) {
                count2++;
            }
        })
        jobApplicationArry.push(count2);
        dataArray.push(count);
        newArray.push(element.title);
    });
    return (
        <Router>
        <AdministratorLayout
            user={props.auth.user}
        >
            <Head title="Adminstratorr" />
            <div className="flex">
                <Sidebar />
                <div className="grid grid-cols-2 gap-4">
                    <div>
                    <BarChart
                    series={[
                        { data: dataArray, label: 'Vacancies',color: 'rgb(218, 0, 255)' },
                    ]}
                    height={290}
                    width={500}
                    xAxis={[{ data: newArray, scaleType: 'band' }]}
                    margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
                    />
                    </div>
                    <div >
                    <BarChart
                    series={[
                        { data: jobApplicationArry, label: 'Applications' },
                    ]}
                    height={290}
                    width={500}
                    xAxis={[{ data: newArray, scaleType: 'band',color: 'red' }]}
                    margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
                    />
                   </div>
                   <div>
                   <LineChart
                        series={[
                            { curve: "monotoneY", data: dataArray, label: 'Vacancies',color: 'rgb(218, 0, 255)' },
                            { curve: "monotoneY", data: jobApplicationArry, label: 'Applications',color: 'red' },
                        ]}
                        height={290}
                        width={500}
                        xAxis={[{ data: newArray, scaleType: 'band' }]}
                        margin={{ top: 10, bottom: 30, left: 40, right: 10 }}     

                        />
                   </div>
                   <div>
                   <PieChart
                    series={[
                        {
                        data: props.vacancies_locations,
                        },
                    ]}
                    width={400}
                    height={200}
                    />

                   </div>
                </div>
            </div>   
        </AdministratorLayout>
        </Router>
    );
}