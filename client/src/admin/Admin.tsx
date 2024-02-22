import { useEffect, useState } from "react";
import AdminHeader from "./AdminHeader";
import Sildebar from "./Sildebar";
import "../admin/AdminCSS.css";

import { Pagination } from "antd";

import publicAxios from "../config/publicAxios"
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import {VND} from "../Until/Until";
import axios from "axios";
import { Cate } from "./CategoryA";

export type Product={
  productId?:number
  nameProduct: string,
  src: string,
  price: string,
  author: string,
  catergoryId: string,
}

function Admin() {
  //link ảnh
  const [selectedMedia, setSelectedMedia] = useState<any>(null);
  const [preview, setPreview] = useState<any>(null);

  const [search,setSearch] = useState<string>("")
  const [show, setShow] = useState<boolean>(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [check,setCheck] = useState<boolean>(false)
  const [flag,setFlag] = useState<boolean>(false)
  const [data,setData] = useState<Array<Product>>([]);
  const [dataCatergory,setDataCatergory] = useState<Array<Cate>>([])
  const [product, setProduct] = useState<Product>({
    nameProduct: "",
    src: "",
    price: "",
    author: "",
    catergoryId: "",
  });
  const { nameProduct, price, author, catergoryId } = product;

  //Lay catergory
  const getCatergory=async()=>{
    try {
        let response = await publicAxios.get("/api/v1/catergory")
        setDataCatergory(response.data);
    } catch (error) {
        console.log(error);
    }
  }

  //Lay product
  const getData = async ()=>{
      try {
        let response = await publicAxios.get("/api/v1/product");
        setData(response.data)
      } catch (error) {   
        console.log(error);
      }
  }
  useEffect(()=>{
    getCatergory()
    getData()
  },[flag])

  //Phan trang
  const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;
    const endIndex = currentPage * itemsPerPage;
    const startIndex = endIndex - itemsPerPage;
    const displayedProducts = data.slice(startIndex, endIndex);
    const onPageChange = (page:number) => {
      setCurrentPage(page);
    };

  //Lay gia tri input
  const handleChange = (e:any) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  //upload ảnh
  const handleAddMedia = (event:any) => {
    setSelectedMedia(event.target.files[0]);
    // xem trước media
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = function (event:any) {
      setPreview(event.target.result);  
    };
    reader.readAsDataURL(file);
    //////////////////////////////////////////////////
  };
  //them product
  const handleSubmit = async (event:any) => {
    event.preventDefault(); 

    if (!nameProduct || !price || !author || !catergoryId) {
      alert("Vui lòng điền đầy đủ thông tin sản phẩm.");
      return;
    }else{
      try {
          const formData = new FormData();
          formData.append("file", selectedMedia);
          formData.append("upload_preset", "project"); //tên thư mục
          const [uploadMedia] = await Promise.all([
            axios.post(
              "https://api.cloudinary.com/v1_1/dzbslalab/image/upload", //mã cloud name
              formData
            ),
          ]);
          const media = uploadMedia.data.secure_url; //link ảnh nhận đc
          //////
          let response = await publicAxios.post("/api/v1/product",{...product,src:media})
          alert(response.data.message)
          setFlag(!flag)
          setShow(false);
          setProduct({
            nameProduct: "",
            src: "",
            price: "",
            author: "",
            catergoryId: "",
          })
          setSelectedMedia(null)
          setPreview(null)
      } catch (error) {
          console.log(error);
      }
    }
  };
  // edit
  const handleEdit = async (item:Product) => {
      setProduct(item);
      setPreview(item.src)
      setShow(true);
      setCheck(true)
  };
  //update
  const handleUpdate = async (event:any)=>{
    event.preventDefault();
      try {
        if (!selectedMedia) {
          const response = await publicAxios.put(
              `/api/v1/product/${product.productId}`,
              product
          );
          alert(response.data.message)
          setFlag(!flag)
          setShow(false);
          setCheck(false)
          setProduct({
            nameProduct: "",
            src: "",
            price: "",
            author: "",
            catergoryId: "",
          })
          setSelectedMedia(null)
          setPreview(null)
          return;
        }
        //
        const formData = new FormData();
        formData.append("file", selectedMedia);
        formData.append("upload_preset", "project"); //tên thư mục
        const [uploadMedia] = await Promise.all([
          axios.post(
            "https://api.cloudinary.com/v1_1/dzbslalab/image/upload", //mã cloud name
            formData
          ),
        ]);
        const media = uploadMedia.data.secure_url; //link ảnh nhận đc
        let data={...product,src:media};
        
        let response = await publicAxios.put(`/api/v1/product/${product.productId}`,data);
        alert(response.data.message)
        setFlag(!flag)
        setShow(false);
        setCheck(false)
        setProduct({
          nameProduct: "",
          src: "",
          price: "",
          author: "",
          catergoryId: "",
        })
        setSelectedMedia(null)
        setPreview(null)
      } catch (error) {
        console.log(error);
      }
  }
  //xoa
  const handleDelete = async (id:number) => {
    if (confirm("Bạn có chắc chắn muốn xoá")) {
      try {
          let response = await publicAxios.delete(`/api/v1/product/${id}`)
          alert(response.data.message)
          setFlag(!flag)
      } catch (error:any) {
        alert(error.response.data.message);
      }  
    }
  }
  //search
  const handleSearchProduct = async () =>{
    try {
      let response = await publicAxios.get(`/api/v1/searchProduct?key=${search}`)
      setData(response.data);
      setSearch("")
    } catch (error) {
        console.log(error);
    }
  }
  //Sort
  const [checkSort,setCheckSort] = useState(false)
  const handleSort = (sort:string) => {
    if (sort == "1") {
      let result = data.sort((a:any,b:any)=>a.price - b.price)
      setData(result)
    }else if(sort == "2"){
      let result = data.sort((a:any,b:any)=>-a.price + b.price)
      setData(result)
    }else{
      getData()
    }
    setCheckSort(!checkSort)
  }

  return (
    <div>
      <AdminHeader />
      <Sildebar />
      <main className="main-container">
        <div className="main-title">
          <div className="btn_add_Product">
            <button onClick={handleShow}>Add Product</button>
          </div>
          <h3>Quản lý sản phẩm</h3>
        </div>
        <div className="input_product">
          <input
            style={{padding:"5px 12px",width:"50%",borderRadius:"5px",outline:"none"}}
            type="text"
            placeholder="Search ..."
            value={search}
            onChange={(e)=>setSearch(e.target.value)}
          />
          <button
            style={{padding:"5px 12px",borderRadius:"5px",backgroundColor:"aqua"}}
            onClick={handleSearchProduct}
          >search</button>
        </div>
        <div>
          <div className="select_sort_product">
            <select onChange={(e) => handleSort(e.target.value)}>
              <option>Sắp xếp theo</option>
              <option value="1">Sắp xếp theo giá tăng dần</option>
              <option value="2">Sắp xếp theo giá giảm dần</option>
            </select>
          </div>
          <table className="table_product">
            <thead>
              <tr>
                <th>STT</th>
                <th>Tên</th>
                <th>Ảnh</th>
                <th>Giá</th>
                <th>Tác giả</th>
                <th>Thể loại</th>
                <th>Hành Động</th>
              </tr>
            </thead>
            <tbody>
              {displayedProducts.map((element:any, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{element.nameProduct}</td>
                  <td className="img_product_admin">
                    <img src={element.src} alt="" />
                  </td>
                  <td>{VND.format(element.price)}</td>
                  <td>{element.author}</td>
                  <td>{element.catergoryName}</td>
                  <td>
                    <button
                      className="btn_edit_product"
                      onClick={() => handleEdit(element)}
                    >
                      <i className="fas fa-edit"></i>
                    </button>
                    <button
                      className="btn_delete_product"
                      onClick={() => handleDelete(element.productId)}
                    >
                      <i className="fas fa-trash-alt"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Phân trang */}

          <Pagination
                      className="mt-4 mb-4 text-center"
                      current={currentPage}
                      onChange={onPageChange}
                      pageSize={itemsPerPage}
                      total={data.length}
                    />

          {/* Kết thúc phân trang */}
        </div>

        {/* modal sửa và thêm sản phẩm  */}
        <>
          <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
          >
            <Modal.Header closeButton className="modal_add_product">
              <Modal.Title className="modal_title_product">
                Add Product
              </Modal.Title>
            </Modal.Header>
            <div className="forn_add_product">
              <form className="form" onSubmit={check?handleUpdate:handleSubmit}>
                <label className="form_label">Name:</label>
                <input
                  type="text"
                  value={nameProduct}
                  name="nameProduct"
                  onChange={handleChange}
                />
                <br />

                <label style={{marginLeft:"90px"}} className="form_label">Image:</label>
                <input
                  type="file"
                  // value={src}
                  name="src"
                  onChange={handleAddMedia}
                />
                <br />
                <p><img style={{width:"100px"}} src={preview} alt="" /></p>
                <label className="form_label">Price:</label>
                <input
                  type="text"
                  value={price}
                  name="price"
                  onChange={handleChange}
                />
                <br />

                <label className="form_label">Author:</label>
                <input
                  type="text"
                  value={author}
                  name="author"
                  onChange={handleChange}
                />
                <br />
                <label className="form_label">Tagname:</label>
                <select
                  name="catergoryId"
                  value={catergoryId}
                  onChange={handleChange}
                >
                  <option>Chọn danh mục</option>
                  {dataCatergory.map((item:any)=>(
                    <option key={item.id} value={item.id}>{item.catergoryName}</option>
                  ))}               
                </select>
                <br />
                <Button
                  variant="success"
                  type="submit"
                  className="btn_modal_add_product"
                >
                  Save
                </Button>
              </form>
            </div>
          </Modal>
        </>
        {/* kết thúc modal sửa và thêm sản phẩm  */}
      </main>
    </div>
  );
}
export default Admin;
