import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { Row, Col, Image, Button, Tabs, Tab, Form,  ListGroup, ListGroupItem} from 'react-bootstrap';
import Rating from '../componets/Rating';
import Loader from '../componets/Loader';
import Message from '../componets/Message';
import Meta from '../componets/Meta';
import { getProductDetails, createProductReview } from '../actions/product';
import { addToCart } from '../actions/cart';
import { PRODUCT_CREATE_REVIEW_RESET } from '../constants/product';


const ProductPage = () => {
  const dispatch = useDispatch();

  const { loading, error, product } = useSelector((state) => state.productDetails);
  const { success: successCreateReview, error: errorCreateReview, loading: loadingCreateReview } = useSelector((state) => state.productCreateReview);
  const { userInfo } = useSelector((state) => state.user);
  
  const {id} = useParams();

  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  useEffect(() => {
    if(successCreateReview) {
      setActiveTab('reviews');
      alert('Ваш отзыв добавлен');
      setRating(0);
      setComment('');
    }
    dispatch(getProductDetails(id));
    return () => {
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
    }
  }, [dispatch, id, successCreateReview]);


  const handlerAddToCart = (id, quantity) => {
    dispatch(addToCart(id, quantity));
  }

  const handlerSubmitReview = (e) => {
    e.preventDefault();
    dispatch(createProductReview(id, { rating, comment }));
  };

  return (
    <>
      {loading 
          ? <Loader /> 
          : error 
            ? (<h3><Message variant={'danger'}>{error}</Message></h3>)
            : (
        <>
          <Row>
            <Col md={4}>
              <Image src={product.images[0].url} variant='top' alt={product.title} fluid className="rounded"/>
            </Col>
            <Col md={8}>
              <Meta title={product.title} description={product.description}/>
              <h3>{product.title}</h3>
              <Rating value={product.rating} text={` ${product.numReviews} отзывов`}/>
              <h2>{product.price} &#8381;</h2>
              <p>{(product.status === 1) ? 'В наличии': 'Нет в наличии'}</p>
              <Button variant="light" size="lg" onClick={() => setQuantity((quantity) => quantity - 1)} style={{marginRight: '10px'}} disabled={quantity < 2}>-</Button> 
              {quantity}
              <Button variant="light" size="lg" onClick={() => setQuantity((quantity) => quantity + 1)} style={{marginRight: '10px', marginLeft: '10px'}} disabled={quantity === product.quantity}>+</Button> 
              <Button 
                variant="primary" 
                size="lg"
                disabled={product.status === 0}
                onClick={() => handlerAddToCart(id, quantity)}>
                В корзину
              </Button>
            </Col>
          </Row>
          <Row  className='mt-5'>
            <Col md={12}>
            <Tabs defaultActiveKey={activeTab} id="uncontrolled-tab-example">
              <Tab eventKey="description" title="О товаре"  >
                <p className='mt-4'>{product.description}</p>
              </Tab>
              <Tab eventKey="characteristics" title="Характеристики">
                {product.characteristics.map((el, i) => {
                  return (
                    <div key={i} className='mt-4'>
                      <h5>{el.title}</h5>
                        {el.items.map((item, j) => (
                          <div key={j}>
                            <dt className="col-sm-4">{item.name}</dt>
                            <dd className="col-sm-8">{item.value}</dd>
                          </div>
                        ))}
                    </div>
                  )
                })}
              </Tab>
              <Tab eventKey="reviews" title="Отзывы">
              {loadingCreateReview && <Loader />}
              {product.reviews.length === 0 && <Message variant={'info'}>Отзывов пока нет</Message>}
              {errorCreateReview && <Message variant={'danger'}>{errorCreateReview}</Message>}
              {successCreateReview && <Message variant={'success'}>Отзыв добавлен</Message>}
              <ListGroup variant="flush">
                {product.reviews.map((review, i) => (
                  <ListGroupItem key={i}>
                    <h5>{review.name}</h5>
                    <div><Rating value={review.rating} /></div>
                    {review.comment}
                  </ListGroupItem>
              ))}
              <ListGroupItem>
              {userInfo ? (
                <Form onSubmit={handlerSubmitReview}>
                <Form.Group controlId="rating">
                  <Form.Label>Рейтинг товара</Form.Label>
                  <Form.Control as="select"  value={rating} onChange={(e)=>setRating(e.target.value)} style={{background: 'rgba(0, 0, 0, 0.02)'}}>
                    <option>Выберите оценку...</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="3">4</option>
                    <option value="3">5</option>
                  </Form.Control>
                </Form.Group>
                <Form.Group controlId="comment">
                  <Form.Label>Отзыв</Form.Label>
                  <Form.Control 
                    as="textarea"
                    placeholder="Ваш отзыв" 
                    value={comment}
                    onChange={(e)=>setComment(e.target.value)}  
                    row="5"
                  />
                </Form.Group>
                <Button variant="primary" type="submit">
                  Добавить отзыв
                </Button>
              </Form>
                ) : <Message variant={'info'}>Только зарегистрированные пользователи могут оставить отзыв. <Link to="/login">Войдите</Link>, чтобы  оставить отзыв</Message>}
              </ListGroupItem>
            </ListGroup>
                </Tab>
              </Tabs>
              </Col>
            </Row>
        </>
      )}
    </>
  );
};

export default ProductPage;
