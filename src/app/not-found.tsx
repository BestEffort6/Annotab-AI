export const metadata = {
  title: `Annotab - Not Found`,
  description: `Not Found`,
};

export default function NotFound() {
  return (
    <div className="flex h-screen flex-col-reverse items-center justify-center gap-16 px-4 py-24 md:gap-28 md:px-44 md:py-20 lg:flex-row lg:px-24 lg:py-24">
      <div className="m-auto w-full xl:w-2/3">
        <h1 className="my-2 text-2xl font-bold text-gray-800">
          Looks like you&apos;ve found the doorway to the great nothing
        </h1>
        <p className="my-2 text-gray-800">
          Sorry about that! Please visit our hompage to get where you need to
          go.
        </p>
        <a
          type="button"
          className=" my-2 rounded  border bg-gray-900 px-8 py-4 text-center text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-opacity-50 sm:w-full lg:w-auto"
          href="/"
        >
          Take me there!
        </a>
      </div>
    </div>
  );
}
