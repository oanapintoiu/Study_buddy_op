import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./createGroup.css";

const CreateGroup = () => {
  const [groupName, setGroupName] = useState("");
  const [subjectCategory, setSubjectCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [level, setLevel] = useState("");
  const [partySize, setPartySize] = useState(1);
  const [groupType, setGroupType] = useState("private");
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [description, setDescription] = useState("");
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  const navigate = useNavigate();
  const [groupCard, setGroupCard] = useState(null);

  const handleCardGroupChange = (event) => {
    setGroupCard(event.target.files[0]);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch("/categories");
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const fetchSubcategories = async (selectedCategory) => {
    try {
      const response = await fetch(
        `/categories/${selectedCategory}/subcategories`
      );
      const data = await response.json();
      console.log("selectedCategory: ", data);
      setSubcategories(data.subcategories);
    } catch (error) {
      console.error("Error fetching subcategories:", error);
    }
  };

  const handleCategoryChange = (event) => {
    const selectedCategory = event.target.value;
    setSubjectCategory(selectedCategory);
    setSubCategory("");
    fetchSubcategories(selectedCategory); // Call fetchSubcategories after updating subjectCategory
  };
  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleCreateGroup = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("name", groupName);
    formData.append("category", subjectCategory);
    formData.append("subcategory", subCategory);
    formData.append("level", level);
    formData.append("partySize", partySize);
    formData.append("groupType", groupType);
    if (groupCard) {
      formData.append("groupCard", groupCard);
    }

    try {
      const response = await fetch("/groups", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (response.ok) {
        navigate("/posts");
      } else if (response.status === 401) {
        throw new Error("Unauthorized: Please log in");
      } else {
        throw new Error("Error creating group");
      }
    } catch (error) {
      console.error("Error creating group:", error);
    }
  };

  return (
    <div className="create-group">
      <div className="create-group-container">
        <h2>Create Group</h2>
        <form onSubmit={handleCreateGroup}>
          <label htmlFor="create-group-name">Study Group Name:</label>
          <input
            id="create-group-name"
            type="text"
            value={groupName}
            onChange={(event) => setGroupName(event.target.value)}
            required
          />
          <br />
          <label htmlFor="create-group-description">Description:</label>
          <input
            id="create-group-description"
            type="text"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            required
          />
          <br />
          <label htmlFor="create-group-categories">Subject Category:</label>
          <select
            id="create-group-categories"
            value={subjectCategory}
            onChange={handleCategoryChange}
            required
          >
            <option value="">Select Category</option>
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>
          <br />
          <label>Sub-Category:</label>
          <select
            value={subCategory}
            onChange={(event) => setSubCategory(event.target.value)}
            required
          >
            <option value="">Select Sub-Category</option>
            {subcategories.map((subcategory) => (
              <option key={subcategory._id} value={subcategory._id}>
                {subcategory.name}
              </option>
            ))}
          </select>
          <br />
          <label>Level:</label>
          <select
            value={level}
            onChange={(event) => setLevel(event.target.value)}
            required
          >
            <option value="">Select Level</option>
            <option value="novice">NOVICE</option>
            <option value="intermediate">INTERMEDIATE</option>
            <option value="proficient">PROFICIENT</option>
            <option value="advanced">ADVANCED</option>
            <option value="expert">EXPERT</option>
          </select>
          <br />
          <label>Group Party Size:</label>
          <select
            value={partySize}
            onChange={(event) => setPartySize(parseInt(event.target.value))}
          >
            {[...Array(10)].map((_, index) => (
              <option key={index} value={index + 1}>
                {index + 1}
              </option>
            ))}
          </select>
          <br />
          <label>Group Type:</label>
          <select
            value={groupType}
            onChange={(event) => setGroupType(event.target.value)}
          >
            <option value="private">Private</option>
            <option value="public">Public</option>
          </select>
          <br />
          <label>Image URL:</label>
          <input
            placeholder="Card Photo"
            id="group-card-file"
            type="file"
            onChange={handleCardGroupChange}
          />
          <br />
          <br />
          <button type="submit">Create</button>
        </form>
      </div>
    </div>
  );
};

export default CreateGroup;
