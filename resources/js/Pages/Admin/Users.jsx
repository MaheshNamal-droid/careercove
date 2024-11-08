import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import React, { useEffect, useState } from "react";
export default function AdminUsers({ auth }) {    
    // return (    
    //     <AuthenticatedLayout
    //         user={auth.user}
    //         header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Administrator/Users</h2>}
    //     >
    //         <Head title="Adminstrator" />

    //         <div className="py-12">
    //             <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
    //                 <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
    //                     <div className="p-6 text-gray-900">Users</div>
    //                 </div>
    //             </div>
    //         </div>
    //     </AuthenticatedLayout>
    // );
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);
  
    // Note: the empty deps array [] means
    // this useEffect will run once
    // similar to componentDidMount()
    useEffect(() => {
      fetch("/getUsers")
        .then(res => res.json())
        .then(
          (result) => {
            setIsLoaded(true);
            setItems(result);
          },
          // Note: it's important to handle errors here
          // instead of a catch() block so that we don't swallow
          // exceptions from actual bugs in components.
          (error) => {
            setIsLoaded(true);
            setError(error);
          }
        )
    }, [])
  
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <ul>
          {items.map(item => (
            <li key={item.id}>
              {item.name} {item.price}
            </li>
          ))}
        </ul>
      );
    }
}