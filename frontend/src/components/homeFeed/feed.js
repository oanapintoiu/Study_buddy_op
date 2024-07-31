import React, { useEffect, useState } from "react";
import Post from "../post/Post";
import "./feed.css";
import GroupCard from "./GroupCard";
import { Grid } from "@mui/material";

const Feed = ({ navigate }) => {
  const [posts, setPosts] = useState([]);
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  const [username, setUsername] = useState(
    window.localStorage.getItem("username")
  );
  const [groups, setGroups] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [subjectCategory, setSubjectCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [level, setLevel] = useState("");
  const [groupType, setGroupType] = useState("");
  const [name, setName] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    if (token) {
      fetch("/posts", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then(async (data) => {
          window.localStorage.setItem("token", data.token);
          setToken(window.localStorage.getItem("token"));
          setPosts(data.posts);
        });
    }
  }, [token]);
  useEffect(() => {
    if (token) {
      fetch("/groups", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setGroups(data.groups);
        });
    }
  }, [token]);

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
      setSubcategories(data.subcategories);
    } catch (error) {
      console.error("Error fetching subcategories:", error);
    }
  };

  const handleCategoryChange = (event) => {
    const selectedCategory = event.target.value;
    setSubjectCategory(selectedCategory);
    setSubCategory("");
    fetchSubcategories(selectedCategory);
  };

  const createGroup = () => {
    navigate("/create-group");
  };

  const handleSearch = (value) => {
    clearTimeout(searchTimeout);
    const timeout = setTimeout(() => {
      performSearch(value);
    }, 10);
    setSearchTimeout(timeout);
  };

  const performSearch = async (value) => {
    try {
      console.log(value);

      const response = await fetch("/groups/filter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          category: subjectCategory,
          subcategory: subCategory,
          level: level,
          groupType: groupType,
          name: value,
        }),
      });

      const data = await response.json();
      setGroups(data.groups);
      console.log(data.groups);
    } catch (error) {
      console.error("Error searching groups:", error);
    }
  };

  const joinGroup = (groupId) => {
    fetch(`/groups/${groupId}/join`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: username }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        handleSearch();
        navigate(`/groups/${groupId}`);
      });
  };

  if (token) {
    return (
      <>
        <h1 className="heading">Study Buddy</h1>

        <div className="feed-container"></div>
        <div>
          <div>
            <button className="create-study-group" onClick={createGroup}>
              Create a Study Group
            </button>
            <br></br>
            <br></br>
          </div>
          {/* Search Bar */}
          <div className="search-box">
            <input
              placeholder="Search for a Study Group"
              className="search-input"
              type="text"
              onChange={(event) => {
                setName(event.target.value);
                handleSearch(event.target.value);
              }}
            />
            <button
              className="filter-button"
              onClick={() => setShowFilters(!showFilters)}
            >
              Filter
            </button>
            <button
              className="search-button"
              onClick={() => handleSearch(name)}
            >
              🔍
            </button>
          </div>

          {showFilters && (
            <div className="filter-box">
              {/* Category Select */}
              <label>
                Subject Category:
                <select
                  className="select"
                  value={subjectCategory}
                  onChange={handleCategoryChange}
                  required
                >
                  <option value="">Select</option>
                  {categories.map((category) => (
                    <option key={category._id} value={category._id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </label>
              {/* Sub-Category Select */}
              <label>
                Sub-Category:
                <select
                  className="select"
                  value={subCategory}
                  onChange={(event) => setSubCategory(event.target.value)}
                  required
                >
                  <option value="">Select</option>
                  {subcategories.map((subcategory) => (
                    <option key={subcategory._id} value={subcategory._id}>
                      {subcategory.name}
                    </option>
                  ))}
                </select>
              </label>

              <label>
                Level:
                <br />
                <select
                  className="select-level"
                  value={level}
                  onChange={(event) => setLevel(event.target.value)}
                  required
                >
                  <option value="">Select</option>
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="proficient">Proficient</option>
                  <option value="advanced">Advanced</option>
                  <option value="expert">Expert</option>
                </select>
              </label>
              {/* Group Type Select */}
              <label>
                Group Type:
                <select
                  className="select"
                  value={groupType}
                  onChange={(event) => setGroupType(event.target.value)}
                >
                  <option value="">Select</option>
                  <option value="public">Public</option>
                  <option value="private">Private</option>
                </select>
              </label>
            </div>
          )}

          <div id="feed" role="feed">
            <Grid container spacing={3}>
              {groups.map((group) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={group._id}>
                  <GroupCard group={group} onJoin={joinGroup} />
                </Grid>
              ))}
            </Grid>
            {posts.map((post) => (
              <Post post={post} key={post._id} />
            ))}
          </div>
        </div>
      </>
    );
  } else {
    navigate("/signup");
    return null;
  }
};
export default Feed;
