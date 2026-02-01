// ===== Mock Data for Experience Finder =====
// データは定期的な手動更新、またはAPI連携が必要です
// 最終更新: 2026年1月31日（本・音楽カテゴリ2025年最新版に更新）

const trendingData = {
  books: [
    {
      id: 1,
      title: "カフネ",
      author: "阿部暁子",
      image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=600&fit=crop",
      description: "本屋大賞2025大賞受賞作。ブラジルの言葉「カフネ（愛する人の髪を優しく撫でる）」をタイトルに、深い愛と絆を描く感動作。",
      trendReason: "本屋大賞2025 大賞受賞",
      score: 100,
      url: "https://bookclub.kodansha.co.jp/"
    },
    {
      id: 2,
      title: "部下をもったらいちばん最初に読む本",
      author: "橋本卓典",
      image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=600&fit=crop",
      description: "ビジネス書グランプリ2025総合1位。新任マネージャー必読の一冊。チームを動かすための実践的なリーダーシップ論。",
      trendReason: "ビジネス書グランプリ2025 総合1位",
      score: 98,
      url: "https://www.amazon.co.jp/dp/4478119376"
    },
    {
      id: 3,
      title: "イシューからはじめよ【改訂版】",
      author: "安宅和人",
      image: "https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=400&h=600&fit=crop",
      description: "累計58万部のベストセラーが改訂版として復活。「何を解くべきか」を見極める思考法は、今なお色あせない。",
      trendReason: "累計58万部 改訂版発売",
      score: 96,
      url: "https://eijipress.co.jp/products/2085"
    },
    {
      id: 4,
      title: "習慣化が10割",
      author: "吉井雅之",
      image: "https://images.unsplash.com/photo-1456324504439-367cee3b3c32?w=400&h=600&fit=crop",
      description: "ハーバード等の科学的エビデンスに基づく習慣化メソッド。21日で人生を変える、再現性の高いノウハウを解説。",
      trendReason: "科学的習慣化メソッドで話題",
      score: 94,
      url: "https://www.amazon.co.jp/dp/4799110438"
    },
    {
      id: 5,
      title: "日本経済の死角",
      author: "河野龍太郎",
      image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=600&fit=crop",
      description: "TOPPOINT大賞2025受賞。BNPパリバ証券チーフエコノミストが日本経済の真の課題と処方箋を提示。",
      trendReason: "TOPPOINT大賞2025 受賞",
      score: 92,
      url: "https://www.nikkeibook.com/"
    }
  ],

  movies: [
    {
      id: 1,
      title: "プラダを着た悪魔2",
      director: "デヴィッド・フランケル",
      image: "https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?w=400&h=600&fit=crop",
      description: "20年ぶりの続編。メリル・ストリープ、アン・ハサウェイに加え、レディー・ガガも出演。ファッション業界の新たな戦いが始まる。",
      trendReason: "2026年5月1日公開",
      score: 99,
      url: "https://www.foxmovies.jp/"
    },
    {
      id: 2,
      title: "オデュッセイア",
      director: "クリストファー・ノーラン",
      image: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=400&h=600&fit=crop",
      description: "全編IMAXで撮影された超大作。マット・デイモン、トム・ホランド、ゼンデイヤなどオールスターキャスト。",
      trendReason: "2026年公開予定",
      score: 98,
      url: "https://www.warnerbros.com/"
    },
    {
      id: 3,
      title: "Michael／マイケル",
      director: "アントワーン・フークア",
      image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=600&fit=crop",
      description: "マイケル・ジャクソンの伝記映画。本人の甥ジャファー・ジャクソンが主演。「ボヘミアン・ラプソディ」製作陣。",
      trendReason: "2026年6月公開予定",
      score: 97,
      url: "https://www.sonypictures.jp/"
    },
    {
      id: 4,
      title: "スパイダーマン：ブランド・ニュー・デイ",
      director: "デスティン・ダニエル・クレットン",
      image: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=400&h=600&fit=crop",
      description: "トム・ホランド主演シリーズ第4作。マーベルの新章が幕を開ける。",
      trendReason: "2026年夏公開予定",
      score: 96,
      url: "https://www.sonypictures.jp/he/spider-man"
    },
    {
      id: 5,
      title: "名探偵コナン ハイウェイの堕天使",
      director: "満仲勧",
      image: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400&h=600&fit=crop",
      description: "劇場版コナンシリーズ最新作。高速道路を舞台にした新たな事件に挑む。",
      trendReason: "2026年4月公開予定",
      score: 95,
      url: "https://www.conan-movie.jp/"
    }
  ],

  music: [
    {
      id: 1,
      title: "オトノケ",
      artist: "Creepy Nuts",
      image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop",
      description: "アニメ「ダンダダン」OPテーマ。Billboard Japan年間1位を獲得。コーチェラ2026への出演も決定。",
      trendReason: "Billboard Japan 年間1位",
      score: 100,
      url: "https://open.spotify.com/track/5n9Cly4z6dDJBBPbHgX0Fx"
    },
    {
      id: 2,
      title: "ライラック",
      artist: "Mrs. GREEN APPLE",
      image: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=400&h=400&fit=crop",
      description: "Spotify Japan 3年連続最も再生されたアーティスト。1503日連続デイリー1位の驚異的記録。",
      trendReason: "Spotify 3年連続1位アーティスト",
      score: 98,
      url: "https://open.spotify.com/track/0rKPTlxKRLejHRp3pyRxAs"
    },
    {
      id: 3,
      title: "IRIS OUT",
      artist: "米津玄師",
      image: "https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=400&h=400&fit=crop",
      description: "「チェンソーマン」主題歌。ストリーミング歴代最多記録を更新し続ける。",
      trendReason: "歴代最多ストリーミング記録",
      score: 97,
      url: "https://open.spotify.com/artist/1snhtMLeb2DYoMOcVbb8iB"
    },
    {
      id: 4,
      title: "Die With A Smile",
      artist: "Lady Gaga & Bruno Mars",
      image: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=400&h=400&fit=crop",
      description: "2025年、世界で最も聴かれた楽曲。二大スターの夢のコラボレーション。",
      trendReason: "2025年 世界で最も聴かれた曲",
      score: 96,
      url: "https://open.spotify.com/track/2plbrEY59IikOBgBGLjaoe"
    },
    {
      id: 5,
      title: "BON",
      artist: "Number_i",
      image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400&h=400&fit=crop",
      description: "元King & Prince平野紫耀らが結成したグループ。SNSシェア数1位を記録。",
      trendReason: "SNSシェア数 1位",
      score: 94,
      url: "https://open.spotify.com/artist/0VPXeJqWwHJpEfdEw8voQi"
    }
  ],

  theater: [
    {
      id: 1,
      title: "ディア・エヴァン・ハンセン",
      venue: "日生劇場",
      image: "https://images.unsplash.com/photo-1503095396549-807759245b35?w=400&h=600&fit=crop",
      description: "トニー賞受賞の話題作が日本人キャスト版で初演。柿澤勇人と吉沢亮のWキャスト。SNS時代の孤独と繋がりを描く感動作。",
      trendReason: "日本初演 2026年",
      score: 99,
      url: "https://www.tohostage.com/dearevanhansen/"
    },
    {
      id: 2,
      title: "新宿発8時15分",
      venue: "東京芸術劇場",
      image: "https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?w=400&h=600&fit=crop",
      description: "三谷幸喜の新作コメディ。天海祐希、香取慎吾、尾上松也、ウエンツ瑛士ら豪華キャスト。",
      trendReason: "三谷幸喜最新作 4月上演",
      score: 98,
      url: "https://www.parco-play.com/"
    },
    {
      id: 3,
      title: "オペラ座の怪人",
      venue: "名古屋四季劇場[熱田]",
      image: "https://images.unsplash.com/photo-1580809361436-42a7ec204889?w=400&h=600&fit=crop",
      description: "劇団四季の代名詞が、2026年7月オープンの新劇場でこけら落とし公演。名古屋に新たな感動の殿堂が誕生。",
      trendReason: "新劇場 7月オープン",
      score: 97,
      url: "https://www.shiki.jp/applause/operaza/"
    },
    {
      id: 4,
      title: "SPY×FAMILY 2",
      venue: "帝国劇場",
      image: "https://images.unsplash.com/photo-1549213783-8284d0336c4f?w=400&h=600&fit=crop",
      description: "大人気アニメのミュージカル第2弾。フォージャー家の新たな任務が始まる。",
      trendReason: "2026年9月・10月上演",
      score: 96,
      url: "https://spyfamily-musical.com/"
    },
    {
      id: 5,
      title: "ミス・サイゴン",
      venue: "東急シアターオーブ他",
      image: "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?w=400&h=600&fit=crop",
      description: "不朽の名作ミュージカルが全国ツアーで復活。東京、大阪、福岡、札幌で上演。",
      trendReason: "全国ツアー 10月開始",
      score: 95,
      url: "https://www.tohostage.com/miss-saigon/"
    }
  ],

  tech: [
    {
      id: 1,
      title: "Claude Opus 4.5",
      company: "Anthropic",
      image: "https://images.unsplash.com/photo-1677442135136-760c813028c0?w=400&h=400&fit=crop",
      description: "コーディング、エージェント、コンピュータ操作で世界最高性能。SWE-Benchで80.9%を達成した初のモデル。人間の候補者を超えるスコアを記録。",
      trendReason: "2025年11月リリース 最強AIモデル",
      score: 100,
      url: "https://www.anthropic.com/news/claude-opus-4-5"
    },
    {
      id: 2,
      title: "GPT-5.2-Codex",
      company: "OpenAI",
      image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=400&h=400&fit=crop",
      description: "OpenAI史上最高のエージェント型コーディングモデル。大規模リファクタリング、マイグレーション、サイバーセキュリティに特化。",
      trendReason: "2026年1月リリース",
      score: 99,
      url: "https://openai.com/index/introducing-gpt-5-2-codex/"
    },
    {
      id: 3,
      title: "Tesla Optimus V3",
      company: "Tesla",
      image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=400&fit=crop",
      description: "人型ロボットの新時代。両手で50のアクチュエータを持ち、人間の外科医を超える精度を目指す。2026年末に量産開始予定。",
      trendReason: "2026年生産開始予定",
      score: 98,
      url: "https://www.tesla.com/optimus"
    },
    {
      id: 4,
      title: "Google Gemini 3 Pro",
      company: "Google DeepMind",
      image: "https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?w=400&h=400&fit=crop",
      description: "Googleの最新マルチモーダルAI。OpenAIとAnthropicに対抗し、AIレースを加速させた「コードレッド」の結実。",
      trendReason: "AI覇権争い激化",
      score: 97,
      url: "https://deepmind.google/technologies/gemini/"
    },
    {
      id: 5,
      title: "Starship 火星ミッション",
      company: "SpaceX",
      image: "https://images.unsplash.com/photo-1541185933-ef5d8ed016c2?w=400&h=400&fit=crop",
      description: "2026年、Optimusロボットを載せた無人Starshipが火星へ。人類のマルチプラネタリー化への第一歩。",
      trendReason: "2026年火星打ち上げ予定",
      score: 96,
      url: "https://www.spacex.com/vehicles/starship/"
    }
  ],

  travel: [
    {
      id: 1,
      title: "ポケパーク カントー",
      area: "東京・よみうりランド",
      image: "https://images.unsplash.com/photo-1613771404784-3a5686aa2be3?w=400&h=600&fit=crop",
      description: "ポケモン初の屋外常設テーマパーク。600匹以上のポケモンが暮らすカントー地方を再現。グリーティング・パレードも開催。",
      trendReason: "2026年2月5日 グランドオープン",
      score: 100,
      url: "https://www.yomiuriland.com/pokepark/"
    },
    {
      id: 2,
      title: "東京ディズニーシー ファンタジースプリングス",
      area: "千葉・浦安",
      image: "https://images.unsplash.com/photo-1597466599360-3b9775841aec?w=400&h=600&fit=crop",
      description: "「アナ雪」「ラプンツェル」「ピーターパン」の世界。入場制限解除で誰でも入れるように。TDS開園25周年イベント「スパークリング・ジュビリー」が4月15日開幕。",
      trendReason: "入場制限解除 & 25周年イヤー",
      score: 99,
      url: "https://www.tokyodisneyresort.jp/special/fantasysprings/"
    },
    {
      id: 3,
      title: "JUNGLIA 沖縄",
      area: "沖縄・今帰仁村",
      image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=400&h=600&fit=crop",
      description: "USJ再建の森岡毅氏が手がける新テーマパーク。やんばるの大自然で熱気球やジャングルサファリを体験。ギネス認定のインフィニティスパも。",
      trendReason: "2025年7月オープン 大人気",
      score: 98,
      url: "https://junglia.jp/"
    },
    {
      id: 4,
      title: "TOKYO DREAM PARK",
      area: "東京・有明",
      image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400&h=600&fit=crop",
      description: "テレビ朝日が手がける複合エンタメ施設。5,000人収容の多目的ホール、劇場、没入型デジタルアートなど。",
      trendReason: "2026年3月27日 オープン予定",
      score: 97,
      url: "https://www.tv-asahi.co.jp/"
    },
    {
      id: 5,
      title: "ジブリパーク",
      area: "愛知・長久手",
      image: "https://images.unsplash.com/photo-1565402170291-8491f14678db?w=400&h=600&fit=crop",
      description: "ジブリ映画の世界観を体感できる公園。「なりきり名場面展」がリニューアルし『君たちはどう生きるか』コーナーが新登場。",
      trendReason: "展示リニューアル実施",
      score: 96,
      url: "https://ghibli-park.jp/"
    }
  ]
};

// Category metadata with hero images
const categoryMeta = {
  books: {
    name: "本",
    icon: "📚",
    color: "#8B5CF6",
    description: "話題の書籍・ベストセラー",
    heroText: "物語の世界へ飛び込もう",
    heroImage: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=1600&h=900&fit=crop",
    cardImage: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=600&h=800&fit=crop"
  },
  movies: {
    name: "映画",
    icon: "🎬",
    color: "#EF4444",
    description: "話題の映画・受賞作品",
    heroText: "感動のスクリーン体験を",
    heroImage: "https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?w=1600&h=900&fit=crop",
    cardImage: "https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?w=600&h=800&fit=crop"
  },
  music: {
    name: "音楽",
    icon: "🎵",
    color: "#10B981",
    description: "ヒット曲・注目アーティスト",
    heroText: "心に響く音楽を見つけよう",
    heroImage: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=1600&h=900&fit=crop",
    cardImage: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=600&h=800&fit=crop"
  },
  theater: {
    name: "舞台・コンサート",
    icon: "🎭",
    color: "#F59E0B",
    description: "演劇・ミュージカル・オーケストラ",
    heroText: "生の感動を体験しよう",
    heroImage: "https://images.unsplash.com/photo-1503095396549-807759245b35?w=1600&h=900&fit=crop",
    cardImage: "https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?w=600&h=800&fit=crop"
  },
  tech: {
    name: "テクノロジー",
    icon: "🚀",
    color: "#06B6D4",
    description: "AI・宇宙・ロボット最前線",
    heroText: "未来を変えるテクノロジー",
    heroImage: "https://images.unsplash.com/photo-1677442135136-760c813028c0?w=1600&h=900&fit=crop",
    cardImage: "https://images.unsplash.com/photo-1677442135136-760c813028c0?w=600&h=800&fit=crop"
  },
  travel: {
    name: "旅行・テーマパーク",
    icon: "✈️",
    color: "#3B82F6",
    description: "注目スポット・新施設",
    heroText: "新しい冒険へ出かけよう",
    heroImage: "https://images.unsplash.com/photo-1597466599360-3b9775841aec?w=1600&h=900&fit=crop",
    cardImage: "https://images.unsplash.com/photo-1597466599360-3b9775841aec?w=600&h=800&fit=crop"
  }
};

// Special sections data
const specialSections = {
  movies: {
    title: "2026年 注目の公開映画",
    items: [
      { title: "5月1日", content: "プラダを着た悪魔2（20年ぶり続編）" },
      { title: "6月", content: "Michael／マイケル（MJ伝記映画）" },
      { title: "夏", content: "スパイダーマン：ブランド・ニュー・デイ" },
      { title: "2026年", content: "オデュッセイア（ノーラン新作）" }
    ]
  },
  travel: {
    title: "2026年 注目オープン情報",
    items: [
      { title: "2026年2月5日", content: "ポケパーク カントー（よみうりランド）" },
      { title: "2026年3月27日", content: "TOKYO DREAM PARK（有明）" },
      { title: "2026年3月28日", content: "東映太秦映画村 全面リニューアル" },
      { title: "2026年4月15日", content: "TDS25周年「スパークリング・ジュビリー」開幕" }
    ]
  },
  books: {
    title: "2025年 注目のビジネス書・文学賞",
    items: [
      { title: "本屋大賞2025", content: "カフネ（阿部暁子）" },
      { title: "ビジネス書GP", content: "部下をもったらいちばん最初に読む本" },
      { title: "TOPPOINT大賞", content: "日本経済の死角（河野龍太郎）" },
      { title: "ロングセラー", content: "イシューからはじめよ 累計58万部" }
    ]
  },
  music: {
    title: "2025年 音楽シーン注目ニュース",
    items: [
      { title: "Creepy Nuts", content: "コーチェラ2026出演決定・年間1位" },
      { title: "Mrs. GREEN APPLE", content: "Spotify 1503日連続デイリー1位" },
      { title: "米津玄師", content: "ストリーミング歴代最多記録更新" },
      { title: "Number_i", content: "新グループ SNSシェア数1位" }
    ]
  },
  theater: {
    title: "2026年 注目の公演",
    items: [
      { title: "日本初演", content: "ディア・エヴァン・ハンセン（柿澤勇人/吉沢亮）" },
      { title: "話題作", content: "プラダを着た悪魔2（メリル・ストリープ復帰）" },
      { title: "三谷幸喜", content: "新宿発8時15分（天海祐希/香取慎吾）" },
      { title: "劇団四季", content: "名古屋四季劇場[熱田] 7月オープン" }
    ]
  },
  tech: {
    title: "2026年 AI・テック注目ニュース",
    items: [
      { title: "Anthropic", content: "Claude Opus 4.5 - SWE-Bench 80.9%達成" },
      { title: "OpenAI", content: "GPT-5.2-Codex リリース" },
      { title: "Tesla", content: "Optimus V3 量産開始予定" },
      { title: "SpaceX", content: "Starship 火星無人ミッション" }
    ]
  }
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { trendingData, categoryMeta, specialSections };
}
