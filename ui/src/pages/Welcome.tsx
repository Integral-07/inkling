import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useSession } from '../hooks/auth'

export function Welcome() {
  const { user } = useSession()
  const [showUnauthorizedNotice, setShowUnauthorizedNotice] = useState(false)

  useEffect(() => {
    if (sessionStorage.getItem('unauthorized')) {
      sessionStorage.removeItem('unauthorized')
      setShowUnauthorizedNotice(true)
    }
  }, [])

  return (
    <section>
      <div className="stage-header">
        <div className="eyebrow">Welcome</div>
        <h1 className="stage-title">Inkling</h1>
      </div>

      {showUnauthorizedNotice && (
        <div className="toast">ログインの有効期限が切れました。もう一度ログインしてください。</div>
      )}

      <div className="frame">
        <div className="frame-bar">
          <div className="dot" />
          <div className="dot" />
          <div className="dot" />
        </div>
        <div className="detail-body" style={{ textAlign: 'center', paddingTop: '60px' }}>
          <div className="wordmark" style={{ fontSize: '42px' }}>
            Inkling
          </div>
          <p className="wordmark-sub" style={{ marginBottom: '32px' }}>
            Reading, Writing ー Growing
          </p>

          <div className="article-text" style={{ maxWidth: '520px', margin: '0 auto', textAlign: 'center' }}>
            <p>
              英文記事の読解からアウトプットまでを、ワンストップで。
            </p>
            <p>
              生の英語に触れながら、「使える英語力」へ変える学習プラットフォーム。
            </p>
            <p style={{ textAlign: 'left', marginTop: '32px' }}>
              <b>興味のあるニュースやドキュメント</b>を読みながら、気になった単語やフレーズを文脈ごとスピーディーにストック。読み終えたら、得た知見をもとに<b>自分の言葉で要約や感想を英語で書き残します</b>。
            </p>
            <p style={{ textAlign: 'left', marginTop: '32px' }}>
              単なる記事の消費で終わらせず、「読む・蓄積する・書く」の一連のフローを通すことで、<b>英文の構造把握力・速読力・語彙力、そして実用的なアウトプット力を一気通貫で鍛えます。</b>
            </p>
          </div>

          <div style={{ marginTop: '32px', display: 'flex', gap: '12px', justifyContent: 'center' }}>
            <Link className="btn btn-primary" to={user ? '/' : '/login'}>
              Getting Started
            </Link>
            <Link className="btn btn-ghost" to="/help">
              How to use
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
