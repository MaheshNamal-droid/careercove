import React from 'react';
import { Link } from '@inertiajs/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function Pagination({ links }) {

    function getClassName(active) {
        if (active) {
            return "mr-1 mb-1 px-4 py-3 text-sm leading-4 border rounded hover:bg-white focus:border-primary focus:text-primary bg-blue-700 text-white flex items-center";
        } else {
            return "mr-1 mb-1 px-4 py-3 text-sm leading-4 border rounded hover:bg-white focus:border-primary focus:text-primary flex items-center";
        }

    }

    return (

        links.length > 3 && (

            <div className="mb-4">

                <div className="flex flex-wrap mt-8">

                    {links.map((link, key) => (
                        <React.Fragment key={key}>
                            {link.label === '&laquo; Previous' ? (
                                <Link className={getClassName(link.active)} href={link.url}>
                                    <ChevronLeft size={18} className="mr-1" />
                                    Previous
                                </Link>
                            ) : link.label === 'Next &raquo;' ? (
                                <Link className={getClassName(link.active)} href={link.url}>
                                    Next
                                    <ChevronRight size={18} className="ml-1" />
                                </Link>
                            ) : link.url === null ? (
                                <div className="mr-1 mb-1 px-4 py-3 text-sm leading-4 text-gray-400 border rounded">
                                    {link.label}
                                </div>
                            ) : (
                                <Link className={getClassName(link.active)} href={link.url}>
                                    {link.label}
                                </Link>
                            )}
                        </React.Fragment>
                    )
        )}
                </div>
            </div>

        )

    );

}

