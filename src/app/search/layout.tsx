import { Sidebar } from "@/components/layout/Sidebar";

export default function SearchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex gap-8">
      <div className="flex-1">{children}</div>
      <Sidebar />
    </div>
  );
}
