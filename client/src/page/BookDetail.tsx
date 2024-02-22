import { useEffect, useState } from "react";
import "../components/css/BookDetail.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";

import {VND} from "../Until/Until"
import publicAxios from "../config/publicAxios";
function BookDetail() {
  const navigate = useNavigate();
  // Cuộn lên đầu trang
  const onUpdate = () => {
    window.scrollTo(0, 0);
  };
  
  // gọi từ local lấy user người dùng đang hoạt động.
  const userLogin = JSON.parse(localStorage.getItem("userLogin") || "[]");
  // Kiểm tra người dùng đã đăng nhập chưa
  const userId = userLogin ? userLogin.id : null;

  // gọi API lấy sản phẩm theo id
  type Obj={
    productId:number,
    nameProduct:string,
    src: string,
    price: number,
    author: string,
    catergoryId: number,
  }
  const [product, setProduct] = useState<Obj>({
    productId:0,
    nameProduct:"",
    src:"",
    price:0,
    author:"",
    catergoryId:0,
  });
  const { id } = useParams();
  const loadBook = async () => {
    try {
      const response = await publicAxios.get(`/api/v1/product/${id}`)
      setProduct(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    onUpdate();
    loadBook();
  }, [id]);

  //Add to Cart
  const addToCart = async (item:Obj)=>{
    if (userLogin.length===0) {
      alert("Đăng nhập để mua hàng");
      navigate("/login");
      return
    }
    try {
      let response = await publicAxios.post(`/api/v1/cart/${userId}`,item)
      alert(response.data.message);
      navigate("/cart")
    } catch (error) {
      console.log(error);
    }
  }

  // Bạn có thể quan tâm
  const [datas, setDatas] = useState([]);
  const loadBookCare = async () => {
    try {
      let response = await publicAxios.get("/api/v1/product");
      let res = response.data.filter((e:Obj)=>e.catergoryId == product.catergoryId)
      setDatas(res)
    } catch (error) {   
      console.log(error);
    }
  };
  useEffect(()=>{
    loadBookCare()
  },[product])

  return (
    <div>
      <Header />
      <div className="container container-infor">
        <h3>Thông tin sản phẩm </h3>
        <hr />
        <div className="row">
          <div className="col-3">
            <img src={product.src} alt="" />
          </div>
          <div className="col-9">
            <h5>{product.nameProduct}</h5>
            <p>Tác Giả: {product.author}</p>
            <p>Phát Hành: Công ty cổ phần ZGroup</p>
            <h4 className="price">
              Giá:
              <span>
                {VND.format(Number(product.price))}
              </span>
            </h4>
            <button className="btn-infor" onClick={()=>addToCart(product)}>
              Mua Ngay
            </button>

            <div>
              <p>
                <i className="fa-solid fa-check"></i>Bọc Plastic theo yêu cầu
              </p>
              <p>
                <i className="fa-solid fa-check"></i>
                Giao hàng miễn phí trong nội thành TP. HCM với đơn hàng ≥
                200.000 đ Giao hàng miễn phí toàn quốc với đơn hàng ≥ 350.000 đ
              </p>
            </div>
          </div>
        </div>

        <h5 className="care_about">Có Thể Bạn Quan Tâm</h5>
        <hr />
        <div className="bonnus_detail">
            {datas
                .slice(-10)
                .map((element:Obj) => (
                  <div className="newbook_decoration" key={element.productId}>
                    <Link to={`/bookdetail/${element.productId}`}>
                      <img
                        src={element.src}
                        alt=""
                      />
                      <p className="newbook-name">
                        {element.nameProduct}
                      </p>
                      <p className="newbook-author">{element.author}</p>
                      <p className="newbook_price">
                      {VND.format(element.price)}
                      </p>
                    </Link>
                </div>
            ))}
        </div>

        {/* <div className="commnent">
          <div className="duongvien"><span className="comment_length">{commentProduct.length}</span></div>
          <p className="danhgia">Đánh giá khách hàng</p>
        </div> */}
  
        {/* <div>
          <div className="comments container">
            <div className="review_form field_form">
              <h5>Add a review</h5>
              <form className="row mt-3">
                <div className="error-message-comment" />
                <div className="form-group col-12 mb-3">
                  <textarea
                    required="required"
                    placeholder="Hãy là người bình luận đầu tiên.... "
                    className="form-control"
                    name="message"
                    onChange={(e) => setInputComment(e.target.value)}
                  />
                </div>
                <div className="form-group col-12 mb-3">
                  <button
                    type="submit"
                    className="btn btn-fill-out btn-comment-product"
                    name="submit"
                    onClick={handleComment}
                  >
                    Đăng bình luận
                  </button>
                </div>
              </form>
            </div>
            <ul className="list_none comment_list mt-4 comment_list_product">
              {commentProduct.map((element, index) => (
                <li key={index} className="commentli">
                  <div className="comment_img">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIaE2CzhO1vNQTxBuTSKxtENpIldyOvMkTLw&usqp=CAU" alt="" />
                  </div>

                  <div className="content_comment">
                    <p className="customer_meta">
                      <span className="review_author">{element.user_name}</span>
                      <span className="comment-date">{element.date}</span>
                    </p>
                    <div>
                      <p>
                        {element.content}
                      </p>
                    </div>

                    <div className="handlelike">
                      <span><i className="fa-regular fa-thumbs-up"></i></span>
                      <span><i className="fa-regular fa-thumbs-down"></i></span>
                      <span className="feedback">Phản hồi</span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div> */}
      </div>
      <hr />
      <Footer />
    </div>
  );
}

export default BookDetail;
