import React, { useState, useEffect }  from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { Row, Col, Table, Button } from 'react-bootstrap';
import { getUserList, deleteUser } from '../actions/user';
import Loader from '../componets/Loader';
import Message from '../componets/Message';

const UserListPage = () => {
  const dispatch = useDispatch();
  const [message, setMessage] = useState(null);
  const history = useHistory();
  const { goBack } = useHistory();
  const { loading, error, users } = useSelector((state) => state.userList);
  const { userInfo } = useSelector((state) => state.user);
  const { success:successDelete } = useSelector((state) => state.userDelete);
 
  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(getUserList());
    } else {
      setMessage('Доступ запрещен');
      history.push('/login');
    } 
  },[history, userInfo,  dispatch, successDelete ])

  const removeUserHandler = (_id) =>{
    if(window.confirm('Вы уверены?')){
      dispatch(deleteUser(_id));
    }
  }

  return (
    <>
      <Row className='justify-content-md-center text-center'>
        <Col md={12} xs={12}>
          <button className="btn btn-light" onClick={goBack}>назад</button>
          <h3 className="mt-5 mb-5">Список пользователей</h3>
        </Col>
      </Row>
      {loading && <Loader />} 
      {message &&  <Message text={message} variant={'danger'}/>}
      {error &&  <Message text={error} variant={'danger'}/>}
      <Table striped bordered hover variant="light">
        <thead>
          <tr>
            <th>#</th>
            <th>Имя</th>
            <th>Email</th>
            <th>Администратор</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {users && users.map((user) => {
            const {_id, name, email, isAdmin} = user;
            return (
            <tr key={_id}>
              <td>{_id}</td>
              <td>{name}</td>
              <td>{email}</td>
              <td style={{textAlign: 'center', }}>{isAdmin ? <i className="bi bi-check lg" style={{color: 'green',fontSize: '40px',  }}></i> : ''}</td>
              <td style={{whiteSpace: 'nowrap', }}>
                <LinkContainer to={`/admin/users/${_id}/edit`}>
                  <Button variant="warning"><i className="bi bi-pencil"></i></Button>
                </LinkContainer>
                {' '}
              <Button variant="danger" onClick={() => removeUserHandler(_id)}><i className="bi bi-trash"></i></Button>
              </td>
            </tr>
          )
          })}
        </tbody>
      </Table>
    </>
  );
};
export default UserListPage;