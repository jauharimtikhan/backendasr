import { Link } from "@inertiajs/react";

interface PaginationProps {
    links: {
        url: string;
        label: string;
        active: boolean;
    }[];
}

const Pagination = ({ links }: PaginationProps) => {
    return (
        <div className="flex justify-center sm:overflow-x-scroll">
            <nav className="py-4">
                <ul className="flex items-center gap-3 text-gray-800 dark:text-gray-100">
                    {links.map((link, index) => (
                        <li
                            key={index + 1}
                            className={
                                link.active === true
                                    ? `bg-indigo-600 py-1 px-2 rounded-md`
                                    : ""
                            }
                        >
                            <Link
                                href={link.url}
                                dangerouslySetInnerHTML={{ __html: link.label }}
                            ></Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    );
};

export default Pagination;
