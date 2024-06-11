import Button from "react-bootstrap/Button";
import Nav from "react-bootstrap/Nav";
import ListGroup from "react-bootstrap/ListGroup";
import PagingBar from "../../components/common/PagingBar";
import MystoreProductItem from "../../components/items/MystoreProductItem";
import {useEffect, useState} from "react";
import {callProductListAPI, callSellerProductListAPI, callStoreProductListAPI} from "../../apis/ProductAPI";
import {useDispatch, useSelector} from "react-redux";
import {Col, Row} from "react-bootstrap";
import ProductItem from "../../components/items/ProductItem";

function ProductManagement() {

    const {sellerProducts} = useSelector(state => state.productReducer);
    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        dispatch(callSellerProductListAPI({currentPage}));
    }, [currentPage, dispatch]);

    console.log('sellerProducts: ', sellerProducts);


    return (
        <div>
            <button className="submit-btn">
                <Nav.Link href="/seller/mystore/regist">
                    상품 등록
                </Nav.Link>
            </button>

            <div className="mystore-product-list">
                { sellerProducts && sellerProducts.length > 0 ? (
                    <ListGroup key={sellerProducts.productName}>

                            {sellerProducts.map(product => (
                                <ListGroup.Item key={product.productCode} style={{marginTop: '5px', marginBottom: '10px'}}>
                                    <MystoreProductItem product={product}/>
                                </ListGroup.Item>
                            ))}
                    </ListGroup>
                ):(
                    <p>등록된 상품이 없습니다.</p>
                    )}


            </div>

            <PagingBar/>
        </div>
    )
}
export default ProductManagement;