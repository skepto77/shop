import React from 'react';
import { Helmet } from 'react-helmet';

const Meta = ({ title, description, keywords  }) => {

  return (
    <>
      <Helmet>
        <title>{ title } | React shop</title>
        <meta name='description' content={description} />
        <meta name='keywords' content={keywords} />
      </Helmet>
    </>
  )
}

Meta.defaultProps =  {
  title: 'Главная страница',
  description: 'Магазин техники',
  keywords: 'react, shop, iphone, купить iphone',
}
export default Meta;