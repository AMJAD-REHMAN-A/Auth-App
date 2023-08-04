export default function name({params}:any) {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h1 className="text-4xl">Profile page <span className="text-center p-2 bg-orange-600 text-black rounded">{params.id}</span></h1>
        </div>
    )
}