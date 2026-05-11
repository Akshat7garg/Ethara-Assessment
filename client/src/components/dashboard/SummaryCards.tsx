interface Props {
    summary: any;
}

const SummaryCards = ({
    summary
}: Props) => {
    const cards = [
        {
            title: "Projects",
            value:
                summary.totalProjects,
            color: "text-purple-400"
        },
        {
            title: "Tasks",
            value:
                summary.totalTasks,
            color: "text-blue-400"
        },
        {
            title: "Completed",
            value:
                summary.completedTasks,
            color: "text-green-400"
        },
        {
            title: "Overdue",
            value:
                summary.overdueTasks,
            color: "text-red-400"
        },
        {
            title: "Members",
            value:
                summary.totalMembers,
            color: "text-yellow-400"
        }
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-6">
            {cards.map((card) => (
                <div
                    key={card.title}
                    className="bg-[#0f172a] border border-zinc-800 rounded-3xl p-6"
                >
                    <p className="text-zinc-400">
                        {card.title}
                    </p>

                    <h2
                        className={`text-5xl font-bold mt-5 ${card.color}`}
                    >
                        {card.value}
                    </h2>
                </div>
            ))}
        </div>
    );
};

export default SummaryCards;