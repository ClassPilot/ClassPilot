function MessagesPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <div className="bg-white rounded-2xl shadow-lg p-10 flex flex-col items-center">
        <svg
          width="64"
          height="64"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="text-fuchsia-700 mb-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8a9.77 9.77 0 01-4-.8l-4 1 1-4A8.96 8.96 0 013 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
          />
        </svg>
        <h2 className="text-2xl font-bold text-fuchsia-700 mb-2">Messages</h2>
        <p className="text-gray-600 mb-4 text-center">
          Messaging features are coming soon! Stay tuned for updates.
        </p>
        <span className="inline-block bg-fuchsia-100 text-fuchsia-700 px-4 py-2 rounded-full text-sm font-semibold">
          Coming Soon
        </span>
      </div>
    </div>
  );
}

export default MessagesPage;
