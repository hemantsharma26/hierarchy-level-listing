import React, { useEffect, useState } from "react";
import axios from "axios";

export default function CategorySelector() {
    const [levels, setLevels] = useState([]);

    useEffect(() => {
        loadLevel(null, 0);
    }, []);

    const loadLevel = async (parentId, levelIndex) => {
        try {
            const res = await axios.get(
                `http://localhost:8080/api/categories?parentId=${parentId || ""}`
            );

            if (res.data.length === 0) {
                setLevels((prev) => prev.slice(0, levelIndex));
                return;
            }

            setLevels((prev) => {
                const newLevels = prev.slice(0, levelIndex);
                newLevels.push({
                    parentId: parentId,
                    options: res.data,
                    selected: "",
                });
                return newLevels;
            });
        } catch (err) {
            console.error(err);
        }
    };

    const handleChange = (levelIndex, selectedId) => {
        setLevels((prev) => {
            const newLevels = [...prev];
            newLevels[levelIndex].selected = selectedId;
            return newLevels.slice(0, levelIndex + 1);
        });

        loadLevel(selectedId, levelIndex + 1);
    };

    return (
        <div className="container mt-4">
            <h3>Multi-Level Category Selector</h3>
            {levels.map((level, idx) => (
                <div className="mb-3" key={idx}>
                    <select
                        className="form-select"
                        value={level.selected}
                        onChange={(e) => handleChange(idx, e.target.value)}
                    >
                        <option value="">Select</option>
                        {level.options.map((opt) => (
                            <option key={opt._id} value={opt._id}>
                                {opt.name}
                            </option>
                        ))}
                    </select>
                </div>
            ))}
        </div>
    );
}
