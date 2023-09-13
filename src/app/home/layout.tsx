export default function DashboardLayout({
    children, // will be a page or nested layout
  }: {
    children: React.ReactNode
  }) {
    return (
      <section className='ml-1  border-gray-400 border-r-2 border-opacity-30 border-l-2 w-full pl-2 sticky top-0'>
        <div className="sticky top-0 bg-black bg-opacity-80 pb-8">
        <h1 className='mt-2 font-bold text-white'>Home </h1>
        </div>
              
        {children}
      </section>
    )
  }