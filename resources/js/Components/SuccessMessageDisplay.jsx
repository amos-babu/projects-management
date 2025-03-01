import React, { useEffect, useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { Terminal } from "lucide-react";
import { usePage } from "@inertiajs/react";

export default function SuccessMessageDisplay({ children }) {
    const { flash } = usePage().props;
    const [successMessage, setSuccessMessage] = useState(flash.success);

    setTimeout(() => {
        if (successMessage) {
            setSuccessMessage(null);
        }
    }, 3000);

    useEffect(() => {
        setSuccessMessage(flash.success);
    }, [flash.success]);

    return (
        <>
            {successMessage && (
                <Alert className="mb-4 bg-green-400">
                    <Terminal className="w-4 h-4" />
                    <AlertTitle>Success</AlertTitle>
                    <AlertDescription>{successMessage}</AlertDescription>
                </Alert>
            )}
            {children}
        </>
    );
}
