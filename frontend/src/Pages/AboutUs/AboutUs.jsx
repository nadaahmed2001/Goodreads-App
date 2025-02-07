import Navbar from "../../../components/navbar";
import FooterPage from "../Footer/FooterPage";
export default function AboutUs() {
    return (
        <>
            <Navbar />
            <div style={styles.container}>
                <h1 style={styles.heading}>About Us</h1>
                <p style={styles.text}>
                    Welcome to our platform! We are dedicated to providing the best
                    experience for book lovers, offering a vast collection of books
                    and a seamless reading journey.
                </p>
                <p style={styles.text}>
                    Our mission is to connect readers with their favorite books and
                    authors while ensuring a user-friendly experience. Whether you're
                    here to discover new reads or manage your book collection, we've
                    got you covered!
                </p>
                <p style={styles.text}>
                    Thank you for being a part of our community. Happy reading! 📚
                </p>
            </div>
            <FooterPage />
        </>
    );
}

const styles = {
    container: {
        maxWidth: "800px",
        margin: "50px auto",
        padding: "20px",
        textAlign: "center",
        backgroundColor: "#f9f9f9",
        borderRadius: "10px",
        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
    },
    heading: {
        fontSize: "2.5rem",
        color: "#333",
        marginBottom: "20px",
    },
    text: {
        fontSize: "1.2rem",
        color: "#555",
        lineHeight: "1.6",
    },
};
