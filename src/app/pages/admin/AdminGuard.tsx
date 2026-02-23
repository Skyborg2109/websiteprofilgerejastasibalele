import { useNavigate } from "react-router";
import { ReactNode, useEffect } from "react";
import { useSiteContent } from "../../context/SiteContentContext";
import { AdminLayout } from "./AdminLayout";

export function AdminGuard({ children }: { children: ReactNode }) {
    const { isAdmin } = useSiteContent();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAdmin) {
            navigate("/admin/login");
        }
    }, [isAdmin, navigate]);

    if (!isAdmin) return null;

    return <AdminLayout>{children}</AdminLayout>;
}
