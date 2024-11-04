import { SidebarMenu } from "@/components/Sidebar";

interface ILayoutChildren {
    children: React.ReactNode;
}
export default function RootLayout({ children }: ILayoutChildren) {
    return (
        <>
            <SidebarMenu />
            {children}
        </>
    )

}