export default function Header() {
  return (
    <header className="header">
      <div className="padding-global">
        <div className="container-large-xl">
          <div className="header_wrapper">
            <a className="header_logo" href="#">
              <img src="/images/header/Nav Left (1).avif" fetchPriority="high" width={672} height={83} alt="Virtual Coworker" />
            </a>
            <div className="header_right-image">
              <img src="/images/header/Nav Right (1).avif" fetchPriority="high" width={860} height={75} alt="" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
