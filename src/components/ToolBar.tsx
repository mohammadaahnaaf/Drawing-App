import { FC, LegacyRef, useContext } from 'react';
import Swal from 'sweetalert2';
import { baseUrl } from '../../config';
import { AppContext } from '@/App';
import { useNavigate } from 'react-router-dom';

interface ToolBarProps {
    titleRef: LegacyRef<HTMLInputElement>;
    setTool: React.Dispatch<React.SetStateAction<string>>;
    saveDrawing: () => void;
    loading?: boolean;
    tool: string;
    drawingId?: string;
    setLoading?: React.Dispatch<React.SetStateAction<boolean>>;
}

const ToolBar: FC<ToolBarProps> = ({ titleRef, setTool, saveDrawing, loading, drawingId, setLoading }) => {
    const { setDrawings } = useContext(AppContext);
    const navigate = useNavigate();
    const handleDelete = async () => {
        Swal.fire({
            title: "Are you sure?",
            showCancelButton: true,
            confirmButtonText: "Delete",
            confirmButtonColor: "#e53e3e",
        }).then((result) => {
            if (result.isConfirmed) {
                setLoading && setLoading(true);
                fetch(`${baseUrl}/drawing/${drawingId}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }).then(res => res.json()).then(_data => {
                    setDrawings((prev: any) => prev.filter((d: any) => d._id !== drawingId))
                    Swal.fire({
                        position: "top-end",
                        icon: 'success',
                        toast: true,
                        title: 'Drawing Deleted',
                        showConfirmButton: false,
                        timer: 1500,
                    })
                    navigate('/')
                }).catch(err => {
                    console.log(err);
                }
                ).finally(() => {
                    setLoading && setLoading(false);
                })
            }
        });
    }
    return (
        <div className='bg-gradient-to-tr from-pink-100 to-green-100'>
            <div className="w-full flex max-w-7xl mx-auto justify-between px-5 items-center py-2 gap-2"  >
                <div className='flex items-center gap-5'>
                    <input ref={titleRef} type="text" defaultValue={`New Drawing`} className='px-5 py-2 font-semibold text-lg rounded-full' />
                    {drawingId && <button className={`bg-pink-100 text-pink-700 p-2 rounded-md 
                    hover:bg-pink-700 hover:text-white duration-300
                    `} onClick={handleDelete
                        } title={"Delete"}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                        </svg>

                    </button>}
                </div>
                {/* tool buttons */}
                <div className='flex gap-10 justify-center w-full'>

                    <button onClick={() => setTool("pen")} title='pen'>
                        <img src='/pen.svg' height={30} width={30} />
                    </button>
                    <button onClick={() => setTool("circle")} title='circle'>
                        <img src='/circle.svg' height={30} width={30} />
                    </button>
                    <button onClick={() => setTool("rectangle")} title='rectangle'>
                        <img src='/square.svg' height={30} width={30} />
                    </button>
                </div>
                <button type='button' disabled={loading} onClick={saveDrawing} className='px-5 hover:text-black duration-300 hover:scale-95 text-white font-semibold from-purple-600 to-teal-600 py-1 bg-gradient-to-tr hover:from-purple-300 hover:to-teal-300 rounded-full' >Save</button>
            </div>
        </div>
    );
};

export default ToolBar;