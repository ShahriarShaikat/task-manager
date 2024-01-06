function Member({ team }) {
  const { name, avatar } = team || {};
  return (
    <div className="checkbox-container">
      <img src={avatar} alt={name} className="team-avater" />
      <p className="label">{name}</p>
    </div>
  );
}
export default Member;
