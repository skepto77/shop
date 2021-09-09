import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { Row, Col, Image, Button, Tabs, Tab, Form, ListGroup, ListGroupItem} from 'react-bootstrap';
import { Formik } from 'formik';
import * as yup from 'yup';
import Rating from '../componets/Rating';
import Loader from '../componets/Loader';
import Message from '../componets/Message';
import Meta from '../componets/Meta';
import { getProductDetails, createProductReview } from '../actions/product';
import { addToCart } from '../actions/cart';
import { PRODUCT_CREATE_REVIEW_RESET } from '../constants/product';

const schema = yup.object().shape({
  rating: yup.string().matches(/^[1-5]*$/, 'Оцените товар').required(),
  comment: yup.string().min(10, 'Длина отзыва должна быть минимум 10 символов').required('Введите отзыв'),
});

const ProductPage = () => {
  const dispatch = useDispatch();

  const { loading, error, product } = useSelector((state) => state.productDetails);
  const { success: successCreateReview, error: errorCreateReview, loading: loadingCreateReview } = useSelector((state) => state.productCreateReview);
  const { userInfo } = useSelector((state) => state.user);
  
  const {id} = useParams();

  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [message, setMessage] = useState('');

  useEffect(() => {
    if(successCreateReview) {
      setMessage('Ваш отзыв добавлен');
    }
    dispatch(getProductDetails(id));
    return () => {
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
    }
  }, [dispatch, id, successCreateReview]);


  const handlerAddToCart = (id, quantity) => {
    dispatch(addToCart(id, quantity));
  }

  return (
    <>
      {(loading || loadingCreateReview)
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
            <Tabs id="controlled-tab" activeKey={activeTab} onSelect={(key) => setActiveTab(key)} >
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
              {product.reviews.length === 0 && <Message variant={'info'}>Отзывов пока нет</Message>}
              {errorCreateReview && <Message variant={'danger'}>{errorCreateReview}</Message>}
              {message && <Message variant={'success'}>{message}</Message>}
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
                <Formik
                  validationSchema={schema}
                  onSubmit={(values, actions) => {
                    dispatch(createProductReview(id, values));
                    actions.setSubmitting(false);
                    actions.resetForm({});
                    setActiveTab('reviews');
                  }}
                  initialValues={{
                    rating: 0,
                    comment: '',
                  }}
                  >
                  {({
                    handleSubmit,
                    handleChange,
                    values,
                    touched,
                    isValid,
                    dirty,
                    isSubmitting,
                    errors,
                  }) => (
                    <Form
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleSubmit();
                    }}
                    className="comment-form"
                  >
                  <Form.Group
                    controlId="validationFormik101"
                    className="position-relative"
                  >
                    <Form.Label>Ваша оценка*</Form.Label>
                    <Form.Control
                      as="select"
                      name="rating"
                      value={values.rating}
                      onChange={handleChange}
                      isInvalid={!!errors.rating}
                    >
                      <option>Выберите оценку...</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                      </Form.Control>
                    <Form.Control.Feedback type="invalid" tooltip>{errors.rating}</Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group
                    controlId="validationFormik102"
                    className="position-relative"
                  >
                    <Form.Label>Ваш отзыв*</Form.Label>
                    <Form.Control
                      as="textarea"
                      name="comment"
                      rows="5"
                      value={values.comment}
                      onChange={handleChange}
                      isInvalid={!!errors.comment}
                    />
                    <Form.Control.Feedback type="invalid" tooltip>{errors.comment}</Form.Control.Feedback>
                  </Form.Group>
                  <Button type="submit" disabled={!(dirty && isValid) || isSubmitting}>Добавить отзыв</Button>
                  </Form>
                  )}
                </Formik> 
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
