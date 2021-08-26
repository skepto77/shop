import React from 'react';
import { useLocation  } from 'react-router-dom';
import { Pagination } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const Paginate = ({ pages, page, keyword = ''}) => {

  //location without pagination
  const location = useLocation().pathname.split('page')[0];

  return pages > 1 && (
    <Pagination className='mt-5 justify-content-md-center'>
      {[...Array(pages).keys()].map(x => (
        <LinkContainer key={x + 1} to={keyword ? `/search/page/${x + 1}/?text=${keyword}` : `${location}page/${x + 1}`}>
          <Pagination.Item active={ x + 1 === page}>{ x + 1 }</Pagination.Item>
        </LinkContainer>
      ))}
    </Pagination>
  )
}

export default Paginate;