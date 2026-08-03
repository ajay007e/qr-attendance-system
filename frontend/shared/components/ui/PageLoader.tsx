import { PageLoaderProps } from "./types";

export default function PageLoader({
  message = "Loading...",
}: PageLoaderProps) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="flex flex-col items-center gap-5">
        {/* Spinner */}
        <div className="relative h-12 w-12">
          <div className="absolute inset-0 rounded-full border-4 border-blue-100" />

          <div className="absolute inset-0 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
        </div>

        {/* Text */}
        <div className="text-center">
          <p className="text-sm font-medium text-gray-700">{message}</p>

          <p className="mt-1 text-xs text-gray-500">Please wait a moment</p>
        </div>
      </div>
    </div>
  );
}
