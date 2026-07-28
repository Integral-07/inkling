export function Help() {
  return (
    <section>
      <div className="stage-header">
        <div className="eyebrow">00 / How to use</div>
        <h1 className="stage-title">使い方</h1>
      </div>

      <div className="frame">
        <div className="frame-bar">
          <div className="dot" />
          <div className="dot" />
          <div className="dot" />
        </div>
        <div className="detail-body">
          <div className="article-text">
            <h2>1. 記事を追加する</h2>
            <p>
              Libraryの画面で、興味のあるニュースやドキュメントの<b>URL</b>を貼り付けて「＋ 追加」を押すと、記事の本文を取り込めます。<b>BCC</b>
            </p>

            <h2>2. 記事を読みながら単語を選ぶ</h2>
            <p>
              記事を開いた状態で、気になった単語やフレーズを選択すると、意味を調べられます。単語は辞書から、フレーズはWiktionary/Wikipediaから定義を探します。「＋
              単語帳へ」を押すとその場で単語帳に保存されます。同じ単語を複数回選ぶと、1つのカードに統合されて回数がカウントされます。
            </p>

            <h2>3. 単語帳を見返す</h2>
            <p>
              Vocabularyの画面で保存した単語・フレーズを一覧・検索できます。単語・フレーズをタップすると詳細を確認でき、定義やメモを自由に編集して保存できます。
            </p>

            <h2>4. 記事について書く</h2>
            <p>
              記事閲覧画面の「この記事について書く」からWriting画面に進めます。左に原文、右にMarkdownエディタが並び、入力内容は自動保存されます。プレビュー切り替えで書いた内容の見え方を確認できます。
            </p>

            <h2>5. 書いたものを見返す</h2>
            <p>
              Writingsの画面で、これまで書いた記事についての文章を一覧・検索できます。タイトルをタップすると、その記事のWriting画面にすぐ戻れます。
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
