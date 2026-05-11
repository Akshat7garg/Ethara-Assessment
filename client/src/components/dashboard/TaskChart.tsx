import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    Cell
} from "recharts";

interface Props {
    tasks: any[];
}

const TaskChart = ({ tasks }: Props) => {
    const normalizeStatus = (status: string) => {
        return status
            ?.toUpperCase()
            .replace(/\s/g, "")
            .replace(/_/g, "");
    };

    const todo = tasks.filter((task) =>
        normalizeStatus(
            task.status
        ) === "TODO"
    ).length;

    const inProgress = tasks.filter((task) =>
        normalizeStatus(
            task.status
        ) === "INPROGRESS"
    ).length;

    const completed = tasks.filter((task) =>
        normalizeStatus(
            task.status
        ) === "COMPLETED"
    ).length;

    const chartData = [
        {
            name: "Todo",
            value: todo,
            color: "#eab308"
        },
        {
            name: "In Progress",
            value: inProgress,
            color: "#3b82f6"
        },
        {
            name: "Completed",
            value: completed,
            color: "#22c55e"
        }
    ];

    return (
        <div className="xl:col-span-2 bg-[#0f172a] border border-zinc-800 rounded-3xl p-6">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h2 className="text-2xl font-semibold text-white">
                        Task Progress
                    </h2>

                    <p className="text-zinc-400 text-sm mt-1">
                        Current task
                        status overview
                    </p>
                </div>

                <div className="flex items-center gap-5">
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>

                        <span className="text-zinc-400 text-sm">
                            Todo
                        </span>
                    </div>

                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-blue-500"></div>

                        <span className="text-zinc-400 text-sm">
                            Progress
                        </span>
                    </div>

                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>

                        <span className="text-zinc-400 text-sm">
                            Completed
                        </span>
                    </div>
                </div>
            </div>

            <ResponsiveContainer
                width="100%"
                height={340}
            >
                <BarChart
                    data={chartData}
                >
                    <CartesianGrid
                        stroke="#27272a"
                        vertical={false}
                    />

                    <XAxis
                        dataKey="name"
                        stroke="#a1a1aa"
                    />

                    <YAxis
                        stroke="#a1a1aa"
                        allowDecimals={false}
                    />

                    <Tooltip
                        contentStyle={{
                            background: "#111827",
                            border: "1px solid #27272a",
                            borderRadius: "12px",
                            color: "white"
                        }}
                    />

                    <Bar
                        dataKey="value"
                        radius={[12, 12, 0, 0]}
                        minPointSize={25}
                        label={{
                            position: "top",
                            fill: "#fff"
                        }}
                    >
                        {chartData.map(
                            (
                                entry,
                                index
                            ) => (
                                <Cell
                                    key={`cell-${index}`}
                                    fill={entry.color}
                                />
                            )
                        )}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>

            <div className="grid grid-cols-3 gap-4 mt-8">
                <div className="bg-[#111827] rounded-2xl p-4 border border-zinc-800">
                    <p className="text-zinc-400 text-sm">
                        Todo
                    </p>

                    <h3 className="text-3xl font-bold text-yellow-500 mt-3">
                        {todo}
                    </h3>
                </div>

                <div className="bg-[#111827] rounded-2xl p-4 border border-zinc-800">
                    <p className="text-zinc-400 text-sm">
                        In Progress
                    </p>

                    <h3 className="text-3xl font-bold text-blue-500 mt-3">
                        {inProgress}
                    </h3>
                </div>

                <div className="bg-[#111827] rounded-2xl p-4 border border-zinc-800">
                    <p className="text-zinc-400 text-sm">
                        Completed
                    </p>

                    <h3 className="text-3xl font-bold text-green-500 mt-3">
                        {completed}
                    </h3>
                </div>
            </div>
        </div>
    );
};

export default TaskChart;