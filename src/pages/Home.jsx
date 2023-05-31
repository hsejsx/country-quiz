import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <section className='flex flex-col items-center justify-center h-[100vh] text-center'>
      <img className='block mb-4' src='./title.png' alt='나라, 수도 퀴즈' />
      <Link to='/study' className='btn-53'>
        공부하기
      </Link>
      <Link to='/' className='btn-53'>
        나라퀴즈
      </Link>
      <Link to='/' className='btn-53'>
        수도퀴즈
      </Link>
    </section>
  );
}
