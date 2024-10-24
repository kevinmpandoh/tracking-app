import React from "react";

const TrackingStep = ({ status, title, step, index, rejectReason }) => {
    return (
        <li className="flex md:contents" key={index}>
            <div className="col-start-2 col-end-2 mr-10 md:mx-auto relative">
                <div
                    className={`h-full w-6 flex ${
                        step === 1
                            ? "items-end"
                            : step === 10
                            ? "items-start"
                            : "items-center"
                    } justify-center`}
                >
                    <div
                        className={`${
                            step === 1 || step === 10 ? "h-12" : "h-full"
                        } w-1 ${
                            status === "completed"
                                ? "bg-green-500"
                                : status === "rejected"
                                ? "bg-red-500"
                                : "bg-yellow-500"
                        } pointer-events-none`}
                    />
                </div>
                <div
                    className={`w-6 h-6 absolute top-1/2 -mt-3 rounded-full ${
                        status === "completed"
                            ? "bg-green-500"
                            : status === "rejected"
                            ? "bg-red-500"
                            : "bg-yellow-500"
                    } shadow text-center`}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-6"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                        />
                    </svg>
                </div>
            </div>
            <div
                className={`col-start-3 col-end-10 p-4 rounded-xl my-4 mr-auto shadow-md w-full ${
                    status === "completed"
                        ? "bg-green-500"
                        : status === "rejected"
                        ? "bg-red-500"
                        : "bg-yellow-500"
                }`}
            >
                <h3 className="font-semibold text-lg mb-1">{title}</h3>
                {status === "rejected" && (
                    <p className="text-sm text-white mb-2">
                        Keterangan: {rejectReason}
                    </p>
                )}
                <p className="leading-tight text-justify w-full">
                    21 July 2021, 04:30 PM
                </p>
            </div>
        </li>
    );
};

export default TrackingStep;
