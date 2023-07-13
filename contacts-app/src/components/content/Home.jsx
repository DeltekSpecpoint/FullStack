const Home = () => {
    const title = "Home";

    const HandleClick = (name, e) => {
        console.log(name, e);
    }

    return (
        <div className="home">
            <h1>{title}</h1>
        </div>
    );
}

export default Home;