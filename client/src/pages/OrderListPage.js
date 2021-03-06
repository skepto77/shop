import React, { useEffect }  from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { Row, Col, Button, Table } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { getOrderList } from '../actions/order';
import Loader from '../componets/Loader';
import Message from '../componets/Message';
import Paginate from '../componets/Paginate';

const OrderListPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { goBack } = useHistory();
  const { error, userInfo } = useSelector((state) => state.user);
  const { error: errorOrder, orders, loading, pages, page} = useSelector((state) => state.orderListAllUsers);
  
  const { pageNumber } = useParams();
  
  useEffect(() => {
    if (!userInfo && !userInfo.isAdmin) {
      history.push('/login');
    } else {
    dispatch(getOrderList(pageNumber))
    };
  }, [dispatch, userInfo, history, pageNumber]);

  return (
    <>
    {error && <Message variant={'danger'}>{error}</Message>}
    {errorOrder && <Message variant={'danger'}>{errorOrder}</Message>}
    <Row className='justify-content-md-center text-center'>
        <Col md={12} xs={12}>
        <button className="btn btn-light" onClick={goBack}>назад</button>
        <h3 className="mt-5 mb-5">Список заказов</h3>
        </Col>
      </Row>
      <Row className='mt-5 justify-content-md-center'>
        <Col md={12} xs={12}>
          {loading 
            ? <Loader /> 
            : error 
              ? (<h3><Message variant={'danger'}>{error}</Message></h3>)
              : (
          <Table responsive="md">
            <thead>
              <tr>
                <th>ID</th>
                <th>Пользователь</th>
                <th>Дата</th>
                <th>Сумма</th>
                <th>Оплачен</th>
                <th>Доставлен</th>
              </tr>
            </thead>
            <tbody>
        
          {orders && orders
            .map((item, index) => {
            const {_id, user, createdAt, totalPrice, isPaid, isDelivered} = item;
            return (
              <tr key={index}>
                <td>{_id}</td>
                <td>{user.name}</td>
                <td>{createdAt.substring(0, 10)}</td>
                <td>{totalPrice}</td>
                <td>{!isPaid ? <i className="bi bi-x lg" style={{color: 'red',fontSize: '40px',  }}></i> : <i className="bi bi-check lg" style={{color: 'green',fontSize: '40px',  }}></i>}</td>
                <td>{!isDelivered? <i className="bi bi-x lg" style={{color: 'red',fontSize: '40px',  }}></i> : <i className="bi bi-check lg" style={{color: 'green',fontSize: '40px',  }}></i>}</td>
                <td>
                <LinkContainer to={`/order/${_id}`}>
                  <Button variant="light" size="lg" >подробности</Button>
                </LinkContainer>
                </td>
              </tr>
                )
                })} 
                </tbody>
              </Table>
            )}
        </Col>
      </Row>
      <Paginate pages={pages} page={page}/>

    </>
  );
};
export default OrderListPage;