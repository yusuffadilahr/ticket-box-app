export default function FeatureCard({ icon, title, description }:any) {
    return (
        <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div className="text-4xl mb-4">{icon}</div>
            <h2 className="text-xl font-semibold mb-2">{title}</h2>
            <p className="text-gray-600">{description}</p>
        </div>
    )
}