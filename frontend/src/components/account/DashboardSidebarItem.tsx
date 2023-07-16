import clsxm from "@/lib/clsxm";

const DashboardSidebarItem = ({ name, active, onClick }: { name: string, active?: boolean, onClick: () => void }) => (
    <div onClick={onClick} className={clsxm(
      "px-6 py-4 rounded-xl text-gray-700 cursor-pointer hover:bg-gray-200 transition-colors",
      active ? "bg-gray-200 text-primary-600 font-bold" : ""
    )}>
      {name}
    </div>
)

export default DashboardSidebarItem
