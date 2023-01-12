function Card(props) {
  return (
    <div style={styles.cardContainer}>
      <div style={{ width: "20%" }}>
        <img
          style={{
            height: "60px",
            width: "60px",
            borderRadius: "50%",
            marginTop: "10px",
          }}
          src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"
          alt="dp"
        ></img>
      </div>
      <div style={styles.contactDetails}>
        <h3>{props.Number}</h3>
        <h4 style={{ marginTop: "-25px", marginLeft: "15px" }}>{props.Name}</h4>
      </div>
      <div style={styles.deleteButton}>
        <button style={{ backgroundColor: "red" }} onClick={() => {}}>
          Delete Contact
        </button>
      </div>
    </div>
  );
}

export default Card;

const styles = {
  cardContainer: {
    display: "flex",
    justifyContent: "space-evenly",
    alignItem: "center",
    backgroundColor: "grey",
    color: "black",
    width: "450px",
    height: "80px",
    padding: "5px",
    marginTop: "10px",
    borderRadius: "10px",
  },
  deleteButton: { marginTop: "25px", Color: "red", width: "20%" },
  contactDetails: { width: "60%" },
};
