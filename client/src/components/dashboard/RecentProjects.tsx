interface Props {
    projects: any[];
}

const RecentProjects = ({
    projects
}: Props) => {
    return (
        <div className="bg-[#0f172a] border border-zinc-800 rounded-3xl p-6">
            <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-semibold text-white">
                    Recent Projects
                </h2>

                <button className="text-purple-400 text-sm">
                    View All
                </button>
            </div>

            <div className="space-y-6">
                {projects
                    .slice(-5)
                    .reverse()
                    .map((project) => (
                        <div
                            key={project.id}
                            className="border-b border-zinc-800 pb-4"
                        >
                            <p className="text-white font-medium">
                                {project.title}
                            </p>

                            <p className="text-zinc-400 text-sm mt-2 line-clamp-2">
                                {project.description}
                            </p>
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default RecentProjects;