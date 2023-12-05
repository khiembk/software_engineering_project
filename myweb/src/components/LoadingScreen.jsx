import CircularProgress from "@mui/material/CircularProgress";

const LoadingScreen = () =>{
    return (
        <div className="justify-center h-screen flex-grow" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <CircularProgress style={{height: '4rem', width: '4rem'}}/>
            <p className="font-semibold text-[2rem]" style={{marginTop: '30px'}}>Loading...</p>
        </div>
    );
}

export default LoadingScreen;