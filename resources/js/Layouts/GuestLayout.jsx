import ApplicationLogo from "@/Components/ApplicationLogo";
import { Link } from "@inertiajs/react";

export default function GuestLayout({ children }) {
    return (
        <div className="flex min-h-screen flex-col items-center bg-gray-50 pt-6 sm:justify-start sm:pt-0">
            <div>
                <Link href="/">
                    <ApplicationLogo className="h-20 w-20  mt-10 fill-current text-gray-500" />
                </Link>
            </div>

            <div className="mt-6 w-full overflow-hidden bg-white px-6 py-4 shadow-md sm:max-w-lg lg:max-w-4xl sm:rounded-lg">
                {children}
            </div>
        </div>
    );
}
