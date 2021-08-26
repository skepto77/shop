import React, { useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Row, CardGroup } from 'react-bootstrap';
import Product from '../componets/Product';
import Loader from '../componets/Loader';
import Meta from '../componets/Meta';
import Paginate from '../componets/Paginate';
import { getProductsList } from '../actions/product';

const SearchPage = () => {
  const dispatch = useDispatch();
  const {loading, error, products, countOfProducts, pages, page} = useSelector((state) => state.productList);

  const location = useLocation();

  const keyword = location.search ? location.search.split('?text=')[1].trim() : '';

  const { pageNumber } = useParams();

  useEffect(() => {
    dispatch(getProductsList(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber]);

  const declOfWords = (number, titles) => {
    const cases = [2, 0, 1, 1, 1, 2]
    return titles[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]];
  };

  return (
    <>
      <Meta />
      {keyword ? <h3>По запросу {keyword} {declOfWords(countOfProducts, ['найден', 'найдено', 'найдено'])}  {countOfProducts} {declOfWords(countOfProducts, ['товар', 'товара', 'товаров'])}</h3>
        : <h3>Поиск по сайту</h3>}
      { loading 
      ? <Loader />
      : error 
        ? (<h1>{error}</h1>)
        : (
          <>
          <Row>
            <CardGroup>
              {keyword && products.map((product) => (
                <Col sm={12} md={6} lg={4} xl={3} key={product._id}>
                    <Product product={product} />
                </Col>
              ))}
            </CardGroup>
          </Row>
          <Paginate pages={pages} page={page} keyword={keyword}/>
          </>
          )
      }
    </>
  )
}

export default SearchPage;