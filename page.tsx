"use client";

import { useState } from "react";
import {
  ArrowUpRight, Bookmark, CalendarDays, Camera, Check, FileText, Globe,
  Heart, Image as ImageIcon, Mail, MapPin, MessageCircle, MoreHorizontal,
  Pencil, Settings, Share2, Sparkles, Users, Video, Github, Instagram,
  Linkedin, Link as LinkIcon, BriefcaseBusiness, Grid2X2
} from "lucide-react";

const tabs = [
  { id: "posts", label: "Все посты", icon: Grid2X2 },
  { id: "media", label: "Медиа", icon: ImageIcon },
  { id: "docs", label: "Документы", icon: FileText },
  { id: "saved", label: "Избранное", icon: Bookmark },
] as const;

const posts = [
  { type: "posts", tag: "ДИЗАЙН", date: "12 октября 2026", title: "Как я собираю интерфейсы, которые приятно использовать", text: "Несколько принципов, которые помогают делать цифровые продукты понятнее: визуальная иерархия, аккуратные детали и внимание к пользователю.", color: "lavender" },
  { type: "media", tag: "ЗАКУЛИСЬЕ", date: "8 октября 2026", title: "Новая рабочая зона - новые мысли", text: "Обновил рабочее пространство и собрал референсы для следующего проекта.", color: "peach" },
  { type: "docs", tag: "ЗАМЕТКИ", date: "2 октября 2026", title: "Тест перед запуском проекта", text: "Короткий список проверок, который помогает ничего не упустить перед релизом.", color: "mint" },
  { type: "saved", tag: "ИЗБРАННОЕ", date: "7 октября 2026", title: "Маленькие детали создают большой опыт", text: "Сохранил несколько мыслей о том, как микровзаимодействия делают интерфейс живым.", color: "blue" },
];

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<(typeof tabs)[number]["id"]>("posts");
  const [following, setFollowing] = useState(false);
  const [editing, setEditing] = useState(false);
  const [notice, setNotice] = useState("");

  const visiblePosts = activeTab === "posts" ? posts : posts.filter((post) => post.type === activeTab);

  async function shareProfile() {
    const url = typeof window !== "undefined" ? window.location.href : "";
    try {
      if (navigator.share) await navigator.share({ title: "Профиль Ярослава", url });
      else if (navigator.clipboard) {
        await navigator.clipboard.writeText(url);
        setNotice("Ссылка на профиль скопирована");
        setTimeout(() => setNotice(""), 2500);
      } else {
        setNotice("Скопируйте адрес страницы из браузера");
      }
    } catch {
      setNotice("Поделиться не удалось — попробуйте ещё раз");
      setTimeout(() => setNotice(""), 2500);
    }
  }

  return (
    <main className="page-shell">
      <nav className="topbar">
        <a className="brand" href="#" aria-label="VKL — главная">
          <span className="brand-mark"><Sparkles size={19} strokeWidth={2.4} /></span>
          <span>VKL<span className="brand-dot">.</span></span>
        </a>
        <div className="topbar-right">
          <span className="topbar-label">ПРОФИЛЬ СООБЩЕСТВА</span>
          <button className="icon-button top-settings" aria-label="Общие настройки" onClick={() => setNotice("Настройки платформы")}>
            <Settings size={18} />
          </button>
          <div className="mini-avatar">Я</div>
        </div>
      </nav>

      <div className="content">
        <div className="breadcrumb"><span>Сообщество</span><span className="crumb-slash">/</span><strong>Профиль</strong></div>

        <section className="profile-card">
          <div className="cover">
            <div className="cover-orb orb-one" /><div className="cover-orb orb-two" /><div className="cover-orb orb-three" />
            <span className="cover-caption"><Sparkles size={13} /> СДЕЛАНО С ИДЕЕЙ</span>
          </div>
          <div className="profile-main">
            <div className="avatar-wrap">
              <div className="avatar">Я<span className="online-dot" /></div>
            </div>
            <div className="profile-heading">
              <div className="name-row"><h1>Хрипливых Ярослав</h1><span className="verified"><Check size={12} /></span></div>
              <p className="role"><BriefcaseBusiness size={15} /> Front-end Programmer <span className="role-separator">·</span> <span className="handle">@art.hriplivyh</span></p>
              <p className="short-bio">Создаю сайты с интересным подходом, продвигаю их другим людям.</p>
            </div>
            <div className="profile-actions">
              <button className="button button-primary" onClick={() => setEditing(true)}><Pencil size={16} /> Редактировать профиль</button>
              <button className="button button-secondary" onClick={shareProfile}><Share2 size={16} /> Поделиться</button>
              <button className="icon-button bordered" aria-label="Настройки профиля" onClick={() => setNotice("Настройки профиля открыты")}><Settings size={18} /></button>
            </div>
          </div>
          <div className="profile-bottom">
            <div className="location"><MapPin size={15} /> Москва, Россия</div>
            <div className="member-status"><span className="status-dot" /> На платформе с марта 2026</div>
            <button className={`follow-button ${following ? "is-following" : ""}`} onClick={() => setFollowing(!following)}>
              {following ? <><Check size={15} /> Вы подписаны</> : <><Users size={15} /> Подписаться</>}
            </button>
          </div>
        </section>

        <section className="stats-grid" aria-label="Статистика профиля">
          <Stat icon={<FileText size={18} />} label="Публикации" value="128" trend="+12 за месяц" />
          <Stat icon={<Users size={18} />} label="Подписчики" value={following ? "2 481" : "2 480"} trend="+8,4% за месяц" />
          <Stat icon={<UserIcon />} label="Подписки" value="316" trend="Люди и команды" />
          <Stat icon={<Heart size={18} />} label="Лайки" value="8,6K" trend="+340 за месяц" />
        </section>

        <div className="main-grid">
          <aside className="about-card panel">
            <div className="section-heading"><div><span className="eyebrow">ЗНАКОМСТВО</span><h2>О себе</h2></div><button className="more-button" aria-label="Дополнительно"><MoreHorizontal size={20} /></button></div>
            <p className="about-copy">Всем привет! Я Front-end программист, которому нравится превращать сложные задачи в простые и красивые решения. Последние 4 года работаю над веб-сайтами и серверами для игр — от первых набросков до готового продукта.</p>
            <p className="about-copy">Верю в дизайн, который не просто выглядит хорошо, а действительно помогает людям найти нужное на сайте. В свободное время изучаю новые языки, углубляюсь в игры и делюсь своими фотками здесь.</p>
            <div className="subsection"><h3>Ключевые навыки</h3><div className="skills"><span>UI/UX дизайн</span><span>Figma</span><span>HTML & CSS</span></div></div>
            <div className="subsection contacts"><h3>Контакты</h3>
              <a href="mailto:hello@artvlasov.design"><span className="contact-icon"><Mail size={16} /></span><span><small>ЭЛЕКТРОННАЯ ПОЧТА</small>hello@art.hriplivyh.design</span><ArrowUpRight size={15} className="contact-arrow" /></a>
              <a href="https://example.com" target="_blank" rel="noreferrer"><span className="contact-icon"><Globe size={16} /></span><span><small>ВЕБ-САЙТ</small>hriplivyhwebart.design</span><ArrowUpRight size={15} className="contact-arrow" /></a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer"><span className="contact-icon"><Instagram size={16} /></span><span><small>СОЦИАЛЬНЫЕ СЕТИ</small>@web.hriplivyh</span><ArrowUpRight size={15} className="contact-arrow" /></a>
              <div className="contact-row"><span className="contact-icon"><CalendarDays size={16} /></span><span><small>ДАТА РЕГИСТРАЦИИ</small>Октябрь 2026</span></div>
            </div>
          </aside>

          <section className="activity-section">
            <div className="activity-header"><div><span className="eyebrow">ИЗ МОЕЙ ЖИЗНИ</span><h2>Публикации</h2></div><button className="view-all" onClick={() => { setActiveTab("posts"); setNotice("Показаны все публикации"); }}>Смотреть все <ArrowUpRight size={15} /></button></div>
            <div className="tabs" role="tablist" aria-label="Категории публикаций">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return <button key={tab.id} role="tab" aria-selected={activeTab === tab.id} className={`tab ${activeTab === tab.id ? "active" : ""}`} onClick={() => setActiveTab(tab.id)}><Icon size={15} />{tab.label}</button>;
              })}
            </div>
            <div className="posts-list">
              {visiblePosts.length ? visiblePosts.map((post) => <article className="post-card" key={post.type}>
                <div className={`post-art ${post.color}`}>
                  {post.type === "media" ? <Camera size={30} /> : post.type === "docs" ? <FileText size={30} /> : post.type === "saved" ? <Bookmark size={30} /> : <Sparkles size={30} />}
                  <span className="art-orbit" />
                  <span className="art-label">VKL / NOTES</span>
                </div>
                <div className="post-body"><div className="post-meta"><span>{post.tag}</span><i />{post.date}</div><h3>{post.title}</h3><p>{post.text}</p><div className="post-footer"><span><Heart size={14} /> {post.type === "media" ? "86" : post.type === "docs" ? "42" : "124"}</span><span><MessageCircle size={14} /> {post.type === "docs" ? "6" : "18"}</span><button aria-label="Открыть публикацию"><ArrowUpRight size={16} /></button></div></div>
              </article>) : <div className="empty-state">В этой категории пока нет публикаций.</div>}
            </div>
          </section>
        </div>
      </div>

      <footer className="footer">
        <div className="footer-top"><a className="brand footer-brand" href="#"><span className="brand-mark"><Sparkles size={17} /></span><span>VKL<span className="brand-dot">.</span></span></a><span className="copyright">© 2026 VKL. Все права защищены.</span><div className="footer-links"><a href="#about">О нас</a><a href="#support">Поддержка</a><a href="#blog">Блог</a><a href="#jobs">Вакансии</a></div><div className="footer-legal"><a href="#privacy">Конфиденциальность</a><a href="#terms">Условия использования</a></div><div className="social-links"><a href="https://github.com/Dllhost666g" aria-label="GitHub"><Github size={17} /></a><a href="https://instagram.com" aria-label="Instagram"><Instagram size={17} /></a><a href="https://linkedin.com" aria-label="LinkedIn"><Linkedin size={17} /></a></div></div>
        <div className="footer-bottom"><span>Создано для людей, которым важны детали.</span><span>DESIGNED WITH INTENTION <Sparkles size={12} /></span></div>
      </footer>

      {notice && <div className="toast" role="status">{notice}<button onClick={() => setNotice("")} aria-label="Закрыть">×</button></div>}
      {editing && <div className="modal-backdrop" onClick={() => setEditing(false)}><div className="modal" onClick={(event) => event.stopPropagation()}><div className="modal-head"><div><span className="eyebrow">ПРОФИЛЬ</span><h2>Редактировать профиль</h2></div><button className="icon-button" onClick={() => setEditing(false)} aria-label="Закрыть">×</button></div><label>Имя<input defaultValue="Хрипливых Ярослав" /></label><label>Должность<input defaultValue="Front-end Programmer" /></label><label>Краткое описание<textarea defaultValue="Создаю сайты с интересным подходом, продвигаю их другим людям." /></label><div className="modal-actions"><button className="button button-secondary" onClick={() => setEditing(false)}>Отмена</button><button className="button button-primary" onClick={() => { setEditing(false); setNotice("Демо: изменения сохранены локально"); }}>Сохранить изменения</button></div></div></div>}
    </main>
  );
}

function Stat({ icon, label, value, trend }: { icon: React.ReactNode; label: string; value: string; trend: string }) {
  return <div className="stat-card"><div className="stat-top"><span className="stat-icon">{icon}</span><span className="stat-trend">{trend}</span></div><div className="stat-value">{value}</div><div className="stat-label">{label}</div></div>;
}

function UserIcon() {
  return <Users size={18} />;
}
