import React, { useRef } from 'react';
import { Captcha } from 'aj-captcha-react';


export default () => {
  const ref = useRef<any>();

  const click = () => {
    ref.current?.verify();
  };

  return (
    <Captcha
      onSuccess={(data) => console.log(data)}
      path='/api'
      type='slide'
      ref={ref}
    >
      <button
        onClick={click}
        style={{
          border: 'none',
          color: '#fff',
          width: '100px',
          height: '50px',
          lineHeight: '50p',
          background: '#1890ff',
        }}
      >
        点击
      </button>
    </Captcha>
  );
}