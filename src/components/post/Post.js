import React, { useRef, useState, useEffect } from "react";
import "./Post.css";
import axios from "axios";
import cookie from "react-cookies";

function Post() {
    const [err, setErr] = useState("");
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState([]);
    const [subcategories, setSubcategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [selectedSubcategory, setSelectedSubcategory] = useState("");
    const [posted, setPosted] = useState(false);

    const image = useRef();
    const title = useRef();
    const description = useRef();
    const price = useRef();
    const condition = useRef();
    const categorySelected = useRef();
    const subCategorySelected = useRef();

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        const formData = new FormData();
        formData.append("user_id", cookie.load("user")._id);
        formData.append("image", image.current.files[0]);
        formData.append("title", title.current.value);
        formData.append("description", description.current.value);
        formData.append("price", price.current.value);
        formData.append("condition", condition.current.value);
        formData.append("categorySelected", categorySelected.current.value);
        formData.append("subCategorySelected", subCategorySelected.current.value);
        axios
            .post(`${process.env.REACT_APP_URL}/products/create`, formData, {
                headers: { auth_token: cookie.load("auth_token") },
            })
            .then((response) => {
                console.log(response);
                setErr("");
                setLoading(false);
                setPosted(true);
            })
            .catch((error) => {
                console.log(error);
                if (error.response === undefined) {
                    setErr(error.message);
                } else {
                    setErr(error.response.data.err);
                }
                setLoading(false);
            });
    };

    // Fetch categories from the API and set the state
    const fetchCategories = () => {
        axios
            .get(`${process.env.REACT_APP_URL}/category`)
            .then((res) => {
                setCategories(res.data.response.docs);
            })
            .catch((err) => console.log(err));
    };
    useEffect(() => {
        fetchCategories();
        fetchSubCategories();
    }, [selectedCategory]);

    // Fetch subcategories from the API based on the selected category and set the state
    const fetchSubCategories = () => {
        if (selectedCategory) {
            axios
                .get(`${process.env.REACT_APP_URL}/subcategory`)
                .then((res) => {
                    setSubcategories(res.data.response.docs);
                })
                .catch((err) => console.log(err));
        } else {
            setSubcategories([]);
        }
    };

    return (
        <>
            {posted ? (
                <h2 className="post-successful">Product Posted Successfully!</h2>
            ) : (
                <form onSubmit={handleSubmit} className="post-form">
                    <h2 className="post-title">Create a Post</h2>
                    <label htmlFor="image" className="post-label">
                        Image
                    </label>

                    <input
                        required
                        ref={image}
                        type="file"
                        id="image"
                        name="image"
                        accept="image/png, image/jpeg"
                        className="post-input"
                    />
                    <label htmlFor="title" className="post-label">
                        Title
                    </label>

                    <input
                        ref={title}
                        type="text"
                        id="title"
                        name="title"
                        className="post-input"
                        placeholder="title"
                        minLength={3}
                        required
                    />

                    <label htmlFor="description" className="post-label">
                        Description
                    </label>

                    <input
                        ref={description}
                        type="text"
                        id="description"
                        name="description"
                        className="post-input"
                        placeholder="description"
                        minLength={3}
                        required
                    />

                    <label htmlFor="price" className="post-label">
                        Price
                    </label>

                    <input
                        ref={price}
                        type="number"
                        id="price"
                        name="price"
                        className="post-input"
                        placeholder="price"
                        minLength={3}
                        required
                    />

                    <label htmlFor="condition" className="post-label">
                        Condition
                    </label>

                    <input
                        ref={condition}
                        type="text"
                        id="condition"
                        name="condition"
                        className="post-input"
                        placeholder="condition"
                        minLength={3}
                        required
                    />

                    <label htmlFor="category" className="post-label">
                        Category
                    </label>

                    <select
                        required
                        name="category"
                        ref={categorySelected}
                        className="post-input post-select"
                        id="category"
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                    >
                        <option className="post-input" disabled value="">
                            Select a category
                        </option>
                        {categories.map((category) => (
                            <option
                                className="post-input"
                                key={category._id}
                                value={category._id}
                            >
                                {category.name}
                            </option>
                        ))}
                    </select>

                    {selectedCategory && (
                        <>
                            <label htmlFor="subcategory" className="post-label">
                                Subcategory
                            </label>

                            <select
                                required
                                name="subcategory"
                                ref={subCategorySelected}
                                className="post-input post-select"
                                id="subcategory"
                                value={selectedSubcategory}
                                onChange={(e) => setSelectedSubcategory(e.target.value)}
                            >
                                <option className="post-input" disabled value="">
                                    Select a subcategory
                                </option>
                                {subcategories.map((subcategory) => (
                                    <option
                                        className="post-input"
                                        key={subcategory._id}
                                        value={subcategory._id}
                                    >
                                        {subcategory.name}
                                    </option>
                                ))}
                            </select>
                        </>
                    )}

                    {err !== "" && err && (
                        <div className="post-error-message" style={{ marginBottom: "1pc" }}>
                            {err}
                        </div>
                    )}

                    <button type="submit" className="post-button">
                        {loading ? "Checking..." : "Post"}
                    </button>
                </form>
            )}
        </>
    );
}

export default Post;
