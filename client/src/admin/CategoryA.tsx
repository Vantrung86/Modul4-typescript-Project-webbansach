import { useEffect, useState } from 'react'
import AdminHeader from './AdminHeader'
import Sildebar from './Sildebar'
import publicAxios from '../config/publicAxios';
import tokenAxios from '../config/privateAxios'

export type Cate={
    id?:number,
    catergoryName:string
}
export default function CategoryA() {
   
    const [catergorys,serCatergory] = useState<Array<Cate>>([]);
    const [cate,setCate] = useState<Cate>({catergoryName:""});
    const [flag,setFlag] = useState<boolean>(false);
    const [check,setCheck] = useState<boolean>(false);
    const [search,setSearch] = useState<string>("")

    //lay catergory
    const getByCatergory = async () =>{
        try {
            let response = await publicAxios.get("/api/v1/catergory");
            serCatergory(response.data);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(()=>{
        getByCatergory()
    },[flag]);
    //them catergory
    const handleAddCatergory=async()=>{
        try {
            let response = await tokenAxios.post("/api/v1/catergory",cate)
            alert(response.data.message);
            setFlag(!flag)
            setCate({catergoryName:""})
        } catch (error) {
            console.log();
        }
    }
    //xoa
    const handleDeleteCatergory=async(id:number)=>{
        if (confirm("Bạn có chắc chắn muốn xoá?")) {
            try {
                let response = await tokenAxios.delete(`/api/v1/catergory/${id}`)
                alert(response.data.message)
                setFlag(!flag)
            } catch (error) {
                console.log();
            }         
        }
    }
    //Edit
   const handleEditCatergory = (item:Cate) =>{
        setCate(item);
        setCheck(true)
   }
   //Update
   const handleUpdateCatergory = async () =>{
        try {
            let response = await tokenAxios.put(`/api/v1/catergory/${cate.id}`,cate)
            alert(response.data.message)
            setFlag(!flag)
            setCheck(false)
            setCate({catergoryName:""})
        } catch (error) {
            console.log(error);
        }
   }
   //search
   const handleSearchCatergory = async () => {
        try {
            let response = await publicAxios.get(`/api/v1/search?key=${search}`)
            serCatergory(response.data);
            setSearch("")
        } catch (error) {
            console.log(error);
        }
   }
  return (
    <div>
        <AdminHeader />
        <Sildebar />
        <main className='main-container'>
            <div className="main-title">
                <h3>Quản lý danh mục</h3>
            </div>
            <div>
                <input type="text" placeholder='Nhập danh mục' value={cate.catergoryName} 
                    onChange={(e)=>setCate({...cate,catergoryName:e.target.value})}
                    style={{padding:"5px 12px",width:"50%",borderRadius:"5px",outline:"none"}}
                    
                />
                <button style={{padding:"5px 12px",borderRadius:"5px",backgroundColor:"aqua"}}
                    onClick={check ? handleUpdateCatergory : handleAddCatergory}
                >
                    Add
                </button>
            </div>
            <div>
                <input type="text" placeholder='Tìm kiếm' value={search} 
                    style={{padding:"5px 12px",width:"50%",borderRadius:"5px",outline:"none"}}
                    onChange={(e)=>setSearch(e.target.value)}
                />
                <button style={{padding:"5px 12px",borderRadius:"5px",backgroundColor:"aqua"}}
                   onClick={handleSearchCatergory}
                >
                    Search
                </button>
            </div>
            <div>
                <table className="table_product">
                    <thead>
                        <tr>
                            <th>Stt</th>
                            <th>catergoryName</th>
                            <th>Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {catergorys.map((item:Cate,index)=>(
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{item.catergoryName}</td>
                                <td>
                                    <button style={{padding:"3px 7px",backgroundColor:"aqua",borderRadius:"5px",border:"none"
                                        ,marginRight:"5px"}}
                                        onClick={()=>handleEditCatergory(item)}
                                    >
                                        Edit
                                    </button>
                                    <button style={{padding:"3px 7px",backgroundColor:"red",borderRadius:"5px",border:"none"
                                        ,color:"white"}}
                                        onClick={()=>handleDeleteCatergory(Number(item.id))}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </main>
    </div>
  )
}
