import Link from 'next/link'

export default () => (
  <>
    <div>Horace-a page</div>
    <Link href='/'>
      <a>
        <span>返回首页</span>
        <span>Icon</span>
      </a>
    </Link>
  </>
)