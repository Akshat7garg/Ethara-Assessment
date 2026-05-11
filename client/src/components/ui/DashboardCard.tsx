interface DashboardCardProps {
    title: string;
    value: number;
    color: string;
}

const DashboardCard = ({
    title,
    value,
    color
}: DashboardCardProps) => {
    return (
        <div className="bg-white rounded-2xl p-6 border border-gray-100">
            <p className="text-gray-500 text-sm">
                {title}
            </p>

            <h2
                className={`text-4xl font-bold mt-4 ${color}`}
            >
                {value}
            </h2>
        </div>
    );
};

export default DashboardCard;