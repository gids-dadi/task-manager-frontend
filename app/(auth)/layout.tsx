export const AuthLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="w-full max-w-md">
        <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-xl">
          {/* Header Section */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-6 text-center">
            <div className="mx-auto mb-3 flex size-12 items-center justify-center rounded-xl bg-white">
              <svg
                className="size-6 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-white">TaskFlow</h1>
            <p className="mt-1 text-sm text-blue-100">
              Manage your tasks efficiently
            </p>
          </div>

          {/* Form Content */}
          <div className="p-8">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
