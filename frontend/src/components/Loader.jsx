import loaderSvg from '/loading-circle.svg'

const Loader = () => {
    return(
        <div className='min-w-screen relative h-screen flex bg-slate-950 justify-center items-center z-10 overflow-hidden'>
            <div className="absolute bottom-0 left-[-20%] right-0 top-[-10%] h-[700px] w-[700px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(255,0,182,.15),rgba(255,255,255,0))] -z-10"></div>

            <div className="absolute bottom-0 right-[-20%] top-[1%] h-[700px] w-[700px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(255,0,182,.15),rgba(255,255,255,0))] -z-10">
            </div>
            <img src={loaderSvg} alt="loader-circle" className='w-20'/>
        </div>
    )
}

export default Loader