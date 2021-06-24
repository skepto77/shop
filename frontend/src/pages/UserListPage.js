import React, { useState, useEffect }  from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button } from 'react-bootstrap';
import { getUserList } from '../actions/user';
import Loader from '../componets/Loader';
import Message from '../componets/Message';

const UserListPage = () => {
  const dispatch = useDispatch();
  const [message, setMessage] = useState(null);
  const history = useHistory();
  const { loading, error, users } = useSelector((state) => state.userList);
  const { userInfo } = useSelector((state) => state.user);
 
  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(getUserList());
    } else {
      setMessage('Доступ запрещен');
      history.push('/login');
    } 
  },[history, userInfo,  dispatch])

  const removeUserHandler = (_id) =>{
    console.log(_id);
  }

  return (
    <>
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
              <td style={{textAlign: 'center', }}>{isAdmin ? <i class="bi bi-check lg" style={{color: 'green',fontSize: '40px',  }}></i> : ''}</td>
              <td style={{whiteSpace: 'nowrap', }}>
                <LinkContainer to={`/user/${_id}/edit`}>
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