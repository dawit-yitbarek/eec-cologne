export default function DashboardLayout({ children }) {
    return (
        <div className="min-h-screen bg-gradient-to-br from-white to-yellow-50">
            {/* Main */}
            <main className="max-w-7xl mx-auto px-6 py-24 space-y-10">
                {children}
            </main>
        </div>
    );
}